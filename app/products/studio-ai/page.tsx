import Link from "next/link";

export default function StudioAI() {
  return (
    <main className="py-16">
      <section className="text-center">
        <span className="inline-block rounded-full glass px-3 py-1 text-sm">
          Craftex Ürünü
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-gradient-animated">
          Studio AI
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          Mobil içerik üretimi, görsel düzenleme ve akıllı otomasyon için güçlü
          bir uygulama.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="mailto:info@craftex.com.tr"
            className="rounded-xl bg-neutral-900 px-5 py-3 text-white dark:bg-white dark:text-neutral-900 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
            Destek: info@craftex.com.tr
          </a>
          <Link href="/" className="rounded-xl glass px-5 py-3">
            Geri Dön
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          [
            "Anında Düzenleme",
            "Filtreler, kırpma, arka plan kaldırma ve metin bindirme",
          ],
          [
            "Yapay Zeka Yardımı",
            "İçerik önerileri, otomatik başlıklar ve akıllı şablonlar",
          ],
          ["Toplu İşlemler", "Çoklu görsel üzerinde aynı anda düzenleme"],
          ["Paylaşım", "Tek tıkla sosyal ağlara uygun çıktı alma"],
          ["Bulut Senkron", "Cihazlar arası proje devamlılığı"],
          ["Güvenlik", "Veri gizliliği ve güvenli saklama"],
        ].map(([title, desc]) => (
          <div
            key={title as string}
            className="rounded-2xl glass gradient-border p-6"
          >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              {desc}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-2xl glass p-8 bg-gradient-card">
        <h2 className="text-2xl font-semibold">Destek ve İletişim</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Studio AI ile ilgili tüm sorularınız için bize{" "}
          <a
            className="underline decoration-dotted"
            href="mailto:info@craftex.com.tr"
          >
            info@craftex.com.tr
          </a>{" "}
          adresinden ulaşabilirsiniz.
        </p>
      </section>
    </main>
  );
}
