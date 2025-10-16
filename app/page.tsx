import Link from "next/link";

export default function Home() {
  return (
    <main className="py-20">
      {/* HERO */}
      <section className="py-20 text-center">
        <span className="inline-block rounded-full glass px-3 py-1 text-sm">
          Craftex v1 · Next.js + TS
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl text-gradient-animated">
          Hızlı, güvenli ve ölçeklenebilir web
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          Cloudflare + Nginx + PM2 ile üretimde sorunsuz çalışan modern Next.js
          siteleri.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="#contact"
            className="rounded-xl bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500 px-5 py-3 text-white shadow-lg shadow-violet-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
            Teklif Al
          </Link>
          <Link
            href="#Features"
            className="rounded-xl glass px-5 py-3 transition hover:bg-white/20 dark:hover:bg-neutral-900/40"
          >
            Özellikler
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[
          ["Performans", "SSR/SSG/ISR ve global CDN ile ışık hızında."],
          ["Güvenlik", "Cloudflare WAF & Full(Strict) SSL."],
          ["SEO", "Meta/OpenGraph, temiz HTML ve hızlı TTFB."],
          ["CI/CD", "Git push → Actions → Canlı."],
          ["Gözlem", "PM2 monitör & loglar."],
          ["Esneklik", "API’ler ve mikroservis mimarisine hazır."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-2xl glass gradient-border p-6 transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(124,58,237,0.18)]"
          >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              {desc}
            </p>
          </div>
        ))}
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-12">
        <h2 className="text-2xl font-semibold text-center">Ürünlerimiz</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-neutral-600 dark:text-neutral-300">
          Craftex ekibinin geliştirdiği çözümler.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl glass gradient-border p-6 flex flex-col">
            <h3 className="text-xl font-semibold">Studio AI</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Mobil uygulama: içerik üretimi, görsel düzenleme ve akıllı
              otomasyon.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="/products/studio-ai"
                className="rounded-xl bg-neutral-900 px-5 py-3 text-white dark:bg-white dark:text-neutral-900 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              >
                Ayrıntılar
              </a>
              <a
                href="mailto:info@craftex.com.tr"
                className="rounded-xl glass px-5 py-3 transition hover:bg-white/20 dark:hover:bg-neutral-900/40"
              >
                Destek Maili
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Destek için bize{" "}
          <a
            className="underline decoration-dotted"
            href="mailto:info@craftex.com.tr"
          >
            info@craftex.com.tr
          </a>{" "}
          adresinden yazabilirsiniz.
        </p>
      </section>

      {/* CTA + CONTACT */}
      <section
        id="contact"
        className="my-16 rounded-2xl glass p-8 bg-gradient-card"
      >
        <h2 className="text-2xl font-semibold">Bizimle iletişime geç</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Kısa bir mesaj bırak, sana dönüş yapalım.
        </p>
        <form
          className="mt-6 grid gap-4 sm:max-w-md"
          action="/api/contact"
          method="post"
        >
          <input
            name="name"
            placeholder="Adın"
            className="rounded-xl  px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            required
          />
          <input
            name="email"
            placeholder="E-posta"
            type="email"
            className="rounded-xl gradient-border px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            required
          />
          <textarea
            name="message"
            placeholder="Mesajın"
            className="rounded-xl gradient-border px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            rows={4}
            required
          />
          <button
            className="rounded-xl bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500 px-5 py-3 text-white shadow-lg shadow-violet-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            type="submit"
          >
            Gönder
          </button>
        </form>
      </section>

      <footer className="mb-10 mt-16 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Craftex.
      </footer>
    </main>
  );
}
