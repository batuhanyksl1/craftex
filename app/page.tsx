import Link from "next/link";

export default function Home() {
  return (
    <main className="py-16">
      {/* HERO */}
      <section className="py-16 text-center">
        <span className="inline-block rounded-full border px-3 py-1 text-sm">
          Craftex v1 · Next.js + TS
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Hızlı, güvenli ve ölçeklenebilir web
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          Cloudflare + Nginx + PM2 ile üretimde sorunsuz çalışan modern Next.js
          siteleri.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="#contact"
            className="rounded-xl bg-black px-5 py-3 text-white dark:bg-white dark:text-black"
          >
            Teklif Al
          </Link>
          <Link href="#features" className="rounded-xl border px-5 py-3">
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
          <div key={title} className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              {desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA + CONTACT */}
      <section id="contact" className="my-16 rounded-2xl border p-8">
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
            className="rounded-xl border px-4 py-3 bg-transparent"
            required
          />
          <input
            name="email"
            placeholder="E-posta"
            type="email"
            className="rounded-xl border px-4 py-3 bg-transparent"
            required
          />
          <textarea
            name="message"
            placeholder="Mesajın"
            className="rounded-xl border px-4 py-3 bg-transparent"
            rows={4}
            required
          />
          <button
            className="rounded-xl bg-black px-5 py-3 text-white dark:bg-white dark:text-black"
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
