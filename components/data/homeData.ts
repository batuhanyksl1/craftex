// Ana servislerimiz
export const editingServices = [
  {
    id: "profile-picture",
    disabled: false,
    title: "Profil Fotoğrafı",
    subtitle: "LinkedIn Ready",
    description: "LinkedIn için profesyonel profil fotoğrafları oluşturun",
    prompt:
      "Put this person into an image that taken in a studio with a good background. Clean looking face with a soft smile looking into the camera",
    icon: "person",
    color: "#0077B5",
    gradient: ["#0077B5", "#005885"],
    features: [
      "Profesyonel çekim",
      "Otomatik boyutlandırma",
      "LinkedIn uyumlu format",
    ],
    rating: 4.8,
    usageCount: "2.5K+",
    isPopular: true,
    badge: "En Popüler",
    aiToolRequest: "https://queue.fal.run/fal-ai/nano-banana/edit",
    aiToolStatus:
      "https://queue.fal.run/fal-ai/nano-banana/requests/${requestId}/status",
    aiToolResult: "https://queue.fal.run/fal-ai/nano-banana/requests/${requestId}",
    image1: require("@/assets/images/carousel/image-a-1.png"),
    image2: require("@/assets/images/carousel/image-a-2.jpg"),
  },
  {
    id: "background-removal",
    disabled: false,
    title: "Arka Plan Kaldırma",
    subtitle: "AI Powered",
    prompt: "Remove the background of the image and make it transparent",
    description: "Fotoğraflarınızdan arka planı otomatik olarak kaldırın",
    icon: "image",
    color: "#10B981",
    gradient: ["#10B981", "#059669"],
    features: [
      "AI destekli arka plan kaldırma",
      "Hassas kenar tespiti",
      "Şeffaf PNG çıktı",
    ],
    rating: 4.7,
    usageCount: "1.8K+",
    isPopular: false,
    badge: "Hızlı",
    aiToolRequest: "https://queue.fal.run/fal-ai/flux-pro/kontext",
    aiToolStatus:
      "https://queue.fal.run/fal-ai/flux-pro/requests/${requestId}/status",
    aiToolResult: "https://queue.fal.run/fal-ai/flux-pro/requests/${requestId}",
    image1: require("@/assets/images/carousel/image-a-1.png"),
    image2: require("@/assets/images/carousel/image-a-2.jpg"),
  },
  {
    id: "photo-enhancement",
    disabled: false,
    title: "Fotoğraf İyileştirme",
    subtitle: "Smart Enhancement",
    prompt: "Enhance the image to make it look more natural and realistic",
    description: "Fotoğraflarınızı AI ile otomatik olarak iyileştirin",
    icon: "color-wand",
    color: "#F59E0B",
    gradient: ["#F59E0B", "#D97706"],
    features: [
      "Otomatik parlaklık ayarı",
      "Gürültü azaltma",
      "Keskinlik artırma",
    ],
    rating: 4.6,
    usageCount: "1.2K+",
    isPopular: false,
    badge: "Kaliteli",
    aiToolRequest: "https://queue.fal.run/fal-ai/ccsr",
    aiToolStatus:
      "https://queue.fal.run/fal-ai/ccsr/requests/${requestId}/status",
    aiToolResult: "https://queue.fal.run/fal-ai/ccsr/requests/${requestId}",
    image1: require("@/assets/images/carousel/image-a-1.png"),
    image2: require("@/assets/images/carousel/image-a-2.jpg"),
  },
  {
    id: "style-transfer",
    disabled: false,
    title: "Stil Transferi",
    subtitle: "Artistic AI",
    prompt:
      "Transfer the style of the image to the new image. Make it look more natural and realistic",
    description: "Fotoğraflarınıza sanatsal stiller uygulayın",
    icon: "cut",
    color: "#8B5CF6",
    gradient: ["#8B5CF6", "#7C3AED"],
    features: [
      "Çoklu sanat stili",
      "Gerçek zamanlı önizleme",
      "Stil yoğunluğu ayarı",
    ],
    rating: 4.9,
    usageCount: "3.1K+",
    isPopular: true,
    badge: "Yaratıcı",
    aiToolRequest: "https://queue.fal.run/fal-ai/flux-pro/kontext",
    aiToolStatus:
      "https://queue.fal.run/fal-ai/flux-pro/requests/${requestId}/status",
    aiToolResult: "https://queue.fal.run/fal-ai/flux-pro/requests/${requestId}",
    image1: require("@/assets/images/carousel/image-a-1.png"),
    image2: require("@/assets/images/carousel/image-a-2.jpg"),
  },
];

// Hızlı aksiyonlar
export const quickActions = [
  {
    id: "camera",
    title: "Fotoğraf Çek",
    icon: "camera",
    color: "#3B82F6",
    gradient: ["#3B82F6", "#1D4ED8"],
  },
  {
    id: "gallery",
    title: "Galeriden Seç",
    icon: "image",
    color: "#10B981",
    gradient: ["#10B981", "#059669"],
  },
  {
    id: "recent",
    title: "Son Düzenlemeler",
    icon: "pencil",
    color: "#F59E0B",
    gradient: ["#F59E0B", "#D97706"],
  },
  {
    id: "premium",
    title: "Premium Özellikler",
    icon: "color-wand",
    color: "#8B5CF6",
    gradient: ["#8B5CF6", "#7C3AED"],
  },
];

// Son aktiviteler (mock data)
export const recentActivity = [
  {
    id: "1",
    title: "LinkedIn Profil Fotoğrafı",
    service: "Profil Fotoğrafı",
    timestamp: "2 saat önce",
    status: "completed",
    thumbnail: "📸",
  },
  {
    id: "2",
    title: "Arka Plan Kaldırma",
    service: "Arka Plan Kaldırma",
    timestamp: "1 gün önce",
    status: "completed",
    thumbnail: "🖼️",
  },
  {
    id: "3",
    title: "Sanatsal Stil",
    service: "Stil Transferi",
    timestamp: "3 gün önce",
    status: "completed",
    thumbnail: "🎨",
  },
];

// İstatistikler
export const todayStats = [
  {
    title: "Bugün İşlenen",
    value: "24",
    change: "+12%",
    icon: "trending-up",
    color: "#10B981",
  },
  {
    title: "Bu Hafta",
    value: "156",
    change: "+8%",
    icon: "accessibility",
    color: "#3B82F6",
  },
  {
    title: "Toplam Proje",
    value: "1.2K",
    change: "+24%",
    icon: "accessibility",
    color: "#8B5CF6",
  },
];
