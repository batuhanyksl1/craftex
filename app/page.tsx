const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@craftex.com.tr";

export default function Home() {
  return (
    <main className="py-0">
      <section className="py-20 text-center">
        <span className="inline-block rounded-full c-glass px-3 py-1 text-sm">
          Craftex.
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl c-text-gradient-animated">
          Yapay zeka destekli mobil uygulamalar!
        </h1>
        <p className="mx-auto my-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          Mobil içerik üretimi için akıllı stüdyo
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Studio%20AI%20%2D%20Iletisim&body=Merhaba%2C%20Studio%20AI%20hakkinda%20...`}
            className="rounded-xl c-gradient-border-with-fill c-gradient-fill-gray px-5 py-3 text-neutral-900 dark:text-white shadow-lg shadow-violet-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
            E-posta Gönder
          </a>
        </div>
      </section>

      <section id="products" className="py-12">
        <h2 className="text-2xl font-semibold text-center">Ürünlerimiz</h2>
        <p className="mx-auto max-w-2xl mt-2 text-center text-neutral-600 dark:text-neutral-300">
          Craftex&apos;in geliştirdiği yapay zeka destekli mobil uygulamalar.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl c-glass c-gradient-border p-6 flex flex-col">
            <h3 className="text-xl font-semibold">Studio AI</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Mobil içerik üretimi, görsel düzenleme ve akıllı otomasyon için
              akıllı stüdyo.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="/products/studio-ai"
                className="rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              >
                Ayrıntılar
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Studio%20AI%20%2D%20Iletisim`}
                className="rounded-xl c-glass px-5 py-3 transition hover:bg-white/20 dark:hover:bg-neutral-900/40"
              >
                Ürün Hakkında Sor
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <p className="mt-2 text-center text-neutral-600 dark:text-neutral-300">
          Doğrudan{" "}
          <a
            className="underline decoration-dotted"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>{" "}
          adresine de yazabilirsiniz.
        </p>
      </section>

      <footer className="mb-10 mt-16 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Craftex.
      </footer>
    </main>
  );
}
