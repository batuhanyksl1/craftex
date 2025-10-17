const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@craftex.com.tr";

export default function StudioAI() {
  return (
    <main className="py-16">
      <section className="text-center">
        <span className="inline-block rounded-full c-glass px-3 py-1 text-sm">
          Studio AI
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl c-text-gradient-animated">
          Mobil içerik üretimi için akıllı stüdyo
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          Soru, destek veya işbirliği için bize e-posta gönderin.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Studio%20AI%20%2D%20Iletisim&body=Merhaba%2C%20Studio%20AI%20hakkinda%20...`}
            className="rounded-xl bg-neutral-900 px-5 py-3 text-white dark:bg-white dark:text-neutral-900 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
            E-posta Gönder
          </a>
        </div>
      </section>

      <section className="mt-12">
        <p className="text-center text-neutral-600 dark:text-neutral-300">
          Ya da doğrudan{" "}
          <a
            className="underline decoration-dotted"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>{" "}
          adresine yazın.
        </p>
      </section>
    </main>
  );
}
