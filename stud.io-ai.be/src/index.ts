import {onRequest, HttpsError} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params"; // ✅ Secrets API
import * as admin from "firebase-admin";

// ----------------------------------------------------------------------------
// Global config
// ----------------------------------------------------------------------------
setGlobalOptions({maxInstances: 5, region: "europe-west1"});

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

// Keep your FAL key in Firebase Secrets Manager
const FAL_SECRET = defineSecret("FAL_KEY");

// ----------------------------------------------------------------------------
// Utilities
// ----------------------------------------------------------------------------
/**
 * Gets the FAL API key from Firebase Secrets Manager.
 * @return {string} The FAL API key.
 */
function getFalKey(): string {
  const key = FAL_SECRET.value();
  if (!key) {
    throw new HttpsError("failed-precondition", "FAL_KEY is missing.");
  }
  return key;
}


/**
 * Builds request body for FAL AI API calls.
 * @param {object} params - Request parameters.
 * @param {string} params.prompt - The prompt text.
 * @param {string[]} params.image_urls - Array of image URLs.
 * @param {Record<string, unknown> | null} params.extra - Extra parameters.
 * @return {object} The request body.
 */
function buildRequestBody({
  prompt,
  image_urls, // eslint-disable-line camelcase
  extra,
}: {
  prompt: string;
  image_urls: string[]; // eslint-disable-line camelcase
  extra?: Record<string, unknown> | null;
}) {
  return {
    prompt,
    image_urls, // eslint-disable-line camelcase
    guidance_scale: 3.5,
    num_images: 1,
    output_format: "jpeg",
    safety_tolerance: "2",
    ...(extra || {}),
  };
}

/**
 * Builds request body for status check requests.
 * @param {object} params - Request parameters.
 * @param {string} params.requestId - The request ID to check status for.
 * @param {Record<string, unknown> | null} params.extra - Extra parameters.
 * @return {object} The status request body.
 */
function buildStatusBody({
  requestId,
  extra,
}: {
  requestId: string;
  extra?: Record<string, unknown> | null;
}) {
  return {
    request_id: requestId,
    ...(extra || {}),
  };
}

// ----------------------------------------------------------------------------
// Generic BFF Service
// ----------------------------------------------------------------------------

interface BffRequestData {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  useAuth?: boolean; // FAL API key kullanılsın mı?
}

/**
 * Makes HTTP requests to external APIs.
 * @param {BffRequestData} params - Request parameters.
 * @return {Promise<unknown>} The API response.
 */
async function makeHttpRequest({
  url,
  method = "GET",
  headers = {},
  body,
  useAuth = true,
}: BffRequestData) {
  try {
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    // FAL API key ekle
    if (useAuth) {
      const falKey = getFalKey();
      requestHeaders["Authorization"] = `Key ${falKey}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && (method === "POST" || method === "PUT")) {
      requestOptions.body = JSON.stringify(body);
    }

    logger.info(`Making ${method} request to: ${url}`);

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(
        `Request failed: ${response.status} ${response.statusText}`,
        {
          url,
          method,
          error: errorText,
        });
      throw new HttpsError(
        "internal",
        `Request failed: ${response.status} ${response.statusText}`,
        {url, status: response.status, error: errorText},
      );
    }

    const data = await response.json();
    logger.info(`Request successful to: ${url}`);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error("HTTP request error:", {url, method, error: errorMessage});

    if (error instanceof HttpsError) {
      throw error;
    }

    throw new HttpsError("internal", `Network error: ${errorMessage}`, {
      url,
      method,
      originalError: errorMessage,
    });
  }
}

// ----------------------------------------------------------------------------
// BFF HTTP Endpoint
// ----------------------------------------------------------------------------

export const bffService = onRequest(
  {
    secrets: [FAL_SECRET],
    cors: true,
    maxInstances: 10,
  },
  async (req, res) => {
    // CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({error: "Method not allowed"});
      return;
    }

    try {
      const {url, method, headers, body, useAuth} = req.body as BffRequestData;

      // URL validasyonu
      if (!url || typeof url !== "string") {
        res.status(400).json({
          error: "URL gereklidir ve string olmalıdır",
        });
        return;
      }

      // URL güvenlik kontrolü (sadece belirli domainlere izin ver)
      const allowedDomains = [
        "queue.fal.run",
        "fal.run",
        // İhtiyaç duyduğunuz diğer domainler
      ];

      const urlObj = new URL(url);
      const isAllowed = allowedDomains.some((domain) =>
        urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`),
      );

      if (!isAllowed) {
        res.status(403).json({
          error: `Bu domain'e istek yapılamaz: ${urlObj.hostname}`,
        });
        return;
      }

      const result = await makeHttpRequest({
        url,
        method: method || "GET",
        headers: headers || {},
        body,
        useAuth: useAuth !== false, // Default true
      });

      res.status(200).json({
        success: true,
        data: result,
        url,
        method: method || "GET",
        timestamp: new Date().toISOString(),
      });
    } catch (error: unknown) {
      logger.error("BFF Service error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown";
      res.status(500).json({
        error: errorMessage,
        success: false,
      });
    }
  },
);

// ----------------------------------------------------------------------------
// Örnek Kullanım Fonksiyonları
// ----------------------------------------------------------------------------

// AI Tool Request HTTP Endpoint
export const aiToolRequest = onRequest(
  {
    secrets: [FAL_SECRET],
    cors: true,
  },
  async (req, res) => {
    // CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({error: "Method not allowed"});
      return;
    }

    try {
      // Authentication kontrolü
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({error: "Kimlik doğrulama gerekli"});
        return;
      }

      const idToken = authHeader.split("Bearer ")[1];
      logger.info("Auth token received", {
        tokenPrefix: idToken.substring(0, 10) + "...",
      });

      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const userId = decodedToken.uid;

      logger.info("Authenticated request", {
        uid: decodedToken.uid,
        email: decodedToken.email,
        structuredData: true,
      });

      // eslint-disable-next-line camelcase
      const {serviceUrl, prompt, image_urls, extra, token} = req.body;

      // token doğrulama
      if (typeof token !== "number" || !Number.isFinite(token) || token <= 0) {
        res.status(400).json({
          error: "token sayısal ve 0'dan büyük olmalıdır",
        });
        return;
      }

      // eslint-disable-next-line max-len, camelcase
      if (!prompt || !image_urls || !Array.isArray(image_urls) || image_urls.length === 0) {
        res.status(400).json({
          // eslint-disable-next-line camelcase
          error: "prompt ve image_urls (dizi) gereklidir",
        });
        return;
      }

      // URL'lerin string olduğunu kontrol et
      // eslint-disable-next-line camelcase
      if (!image_urls.every((url) => typeof url === "string")) {
        res.status(400).json({
          // eslint-disable-next-line camelcase
          error: "image_urls dizisindeki tüm elemanlar string olmalıdır",
        });
        return;
      }

      // Firestore Account kontrolü ve token karşılaştırması
      const db = admin.firestore();
      const accountRef = db.collection("Account").doc(userId);
      const accountSnap = await accountRef.get();
      if (!accountSnap.exists) {
        res.status(402).json({
          error: "Yetersiz token",
          success: false,
        });
        return;
      }
      const accountData = accountSnap.data() as {
        currentToken?: unknown
      } | undefined;
      const currentToken =
        typeof accountData?.currentToken === "number" ?
          accountData.currentToken :
          0;
      if (currentToken < token) {
        res.status(402).json({
          error: "Yetersiz token",
          success: false,
        });
        return;
      }

      // eslint-disable-next-line camelcase
      const body = buildRequestBody({prompt, image_urls, extra});

      const result = await makeHttpRequest({
        url: serviceUrl,
        method: "POST",
        body,
        useAuth: true,
      });

      // Başarılı işlem sonrası token düş
      try {
        await accountRef.update({
          currentToken: admin.firestore.FieldValue.increment(-token),
        });
      } catch (decrementError) {
        logger.error("Token decrement failed", decrementError);
        // Ana akışı bozmayalım
      }

      // Başarılı çağırımı Firestore'a kaydet - INLINE
      let documentId = null;
      try {
        const firestore = admin.firestore();
        const logData = {
          userId,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          serviceUrl: serviceUrl || "",
          prompt: prompt || "",
          // eslint-disable-next-line camelcase
          imageUrls: image_urls || [],
        };

        const docRef = await firestore.collection("aiToolRequests")
          .add(logData);
        documentId = docRef.id;
        logger.info("AI Tool Request logged to Firestore successfully", {
          docId: docRef.id,
          status: "success",
          userId,
          serviceUrl,
          structuredData: true,
        });
      } catch (firestoreError) {
        logger.error("Failed to log AI Tool Request to Firestore:",
          firestoreError);
        // Don't throw error to avoid breaking the main flow
      }

      res.status(200).json({
        success: true,
        data: result,
        url: serviceUrl,
        method: "POST",
        timestamp: new Date().toISOString(),
        documentId, // Firestore doküman ID'si (null olabilir)
      });
    } catch (error: unknown) {
      logger.error("AI Tool Request error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown";

      // Authentication hatası kontrolü
      if (errorMessage.includes("Firebase ID token") ||
          errorMessage.includes("auth") ||
          errorMessage.includes("token")) {
        res.status(403).json({
          error: "Geçersiz token veya doğrulama hatası",
          success: false,
        });
        return;
      }

      // Diğer hatalar için Firestore'a kaydet (eğer userId varsa)
      try {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith("Bearer ")) {
          const idToken = authHeader.split("Bearer ")[1];
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          const userId = decodedToken.uid;

          // eslint-disable-next-line camelcase
          const {serviceUrl, prompt, image_urls, extra} = req.body || {};

          // Hata durumunu Firestore'a kaydet - INLINE
          try {
            const firestore = admin.firestore();
            const errorLogData = {
              userId,
              timestamp: new Date().toISOString(),
              status: "error",
              request: {
                serviceUrl: serviceUrl || "",
                prompt: prompt || "",
                // eslint-disable-next-line camelcase
                imageUrls: image_urls || [],
                extra: extra || {},
              },
              error: {message: errorMessage},
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            const errorDocRef = await firestore.collection("aiToolRequests")
              .add(errorLogData);
            logger.info("AI Tool Request error logged to Firestore", {
              docId: errorDocRef.id,
              status: "error",
              userId,
              error: errorMessage,
              structuredData: true,
            });
          } catch (firestoreError) {
            logger.error("Failed to log error to Firestore:", firestoreError);
          }
        }
      } catch (authError) {
        logger.error("Could not log error to Firestore due to auth:",
          authError);
      }

      res.status(500).json({
        error: errorMessage,
        success: false,
      });
    }
  },
);

export const aiToolStatus = onRequest(
  {
    secrets: [FAL_SECRET],
    cors: true,
  },
  async (req, res) => {
    // CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({error: "Method not allowed"});
      return;
    }

    try {
      const {serviceUrl, requestId, extra} = req.body;

      if (!requestId) {
        res.status(400).json({
          error: "requestId gereklidir",
        });
        return;
      }

      const body = buildStatusBody({requestId, extra});

      const result = await makeHttpRequest({
        url: serviceUrl,
        method: "GET",
        body,
        useAuth: true,
      });

      res.status(200).json({
        success: true,
        data: result,
        method: "GET",
        timestamp: new Date().toISOString(),
      });
    } catch (error: unknown) {
      logger.error("AI Tool Status error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown";
      res.status(500).json({
        error: errorMessage,
        success: false,
      });
    }
  },
);

export const aiToolResult = onRequest(
  {
    secrets: [FAL_SECRET],
    cors: true,
  },
  async (req, res) => {
    // CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({error: "Method not allowed"});
      return;
    }

    try {
      // Authentication kontrolü
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({error: "Kimlik doğrulama gerekli"});
        return;
      }

      const idToken = authHeader.split("Bearer ")[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const userId = decodedToken.uid;

      logger.info("Authenticated aiToolResult request", {
        uid: decodedToken.uid,
        email: decodedToken.email,
        structuredData: true,
      });

      const {serviceUrl, requestId, extra, documentId} = req.body;

      if (!requestId) {
        res.status(400).json({
          error: "requestId gereklidir",
        });
        return;
      }

      if (!documentId) {
        res.status(400).json({
          error: "documentId gereklidir",
        });
        return;
      }

      const body = buildStatusBody({requestId, extra});

      const result = await makeHttpRequest({
        url: serviceUrl,
        method: "GET",
        body,
        useAuth: true,
      });

      // Result verilerini Firestore dokümanına ekle
      try {
        const firestore = admin.firestore();
        const docRef = firestore.collection("aiToolRequests").doc(documentId);

        // Dokümanın var olduğunu ve kullanıcıya ait olduğunu kontrol et
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
          logger.error("Document not found", {documentId, userId});
          res.status(404).json({
            error: "Belirtilen doküman bulunamadı",
            success: false,
          });
          return;
        }

        const docData = docSnapshot.data();
        if (docData?.userId !== userId) {
          logger.error("Document access denied", {documentId, userId});
          res.status(403).json({
            error: "Bu dokümana erişim yetkiniz yok",
            success: false,
          });
          return;
        }

        // Result verilerini dokümana ekle
        await docRef.update({
          result: {
            data: result,
            completedAt: new Date().toISOString(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
        });

        logger.info("Result added to Firestore document successfully", {
          docId: documentId,
          userId,
          structuredData: true,
        });
      } catch (firestoreError) {
        logger.error("Failed to update Firestore document:", firestoreError);
        // Don't throw error to avoid breaking the main flow
      }

      res.status(200).json({
        success: true,
        data: result,
        method: "GET",
        timestamp: new Date().toISOString(),
        documentId, // Güncellenen doküman ID'sini de dön
      });
    } catch (error: unknown) {
      logger.error("AI Tool Result error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown";
      res.status(500).json({
        error: errorMessage,
        success: false,
      });
    }
  },
);
