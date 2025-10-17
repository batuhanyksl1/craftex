import Link from "next/link";

export default function Home() {
  return (
    <main
      className={[
        // Page vertical spacing
        "py-0",
      ].join(" ")}
    >
      {/* HERO */}
      <section
        className={[
          // Vertical padding for hero
          "py-20",
          // Center text in hero
          "text-center",
        ].join(" ")}
      >
        <span
          className={[
            // Make it behave like text with box properties
            "inline-block",
            // Fully rounded pill shape
            "rounded-full",
            // Custom glass style (backdrop blur + transparency from your CSS)
            "glass",
            // Horizontal / vertical padding
            "px-3",
            "py-1",
            // Small text
            "text-sm",
          ].join(" ")}
        >
          Craftex v1 · Next.js + TS
        </span>
        <h1
          className={[
            // Top margin
            "mt-6",
            // Base font size
            "text-4xl",
            // Bold weight
            "font-bold",
            // Tight letter spacing for headlines
            "tracking-tight",
            // On small screens and up, bump font size
            "sm:text-6xl",
            // Custom animated gradient text (from your CSS)
            "text-gradient-animated",
          ].join(" ")}
        >
          Hızlı, güvenli ve ölçeklenebilir web
        </h1>
        <p
          className={[
            // Center horizontally
            "mx-auto",
            // Spacing from heading
            "my-4",
            // Restrict line length
            "max-w-2xl",
            // Comfortable paragraph size
            "text-lg",
            // Light/dark mode text colors
            "text-neutral-600",
            "dark:text-neutral-300",
          ].join(" ")}
        >
          Cloudflare + Nginx + PM2 ile üretimde sorunsuz çalışan modern Next.js
          siteleri.
        </p>

        <div
          className={[
            // Spacing from paragraph
            "mt-8",
            // Horizontal layout
            "flex",
            // Align items vertically centered
            "items-center",
            // Center the group
            "justify-center",
            // Space between buttons
            "gap-3",
          ].join(" ")}
        >
          <Link
            href="#contact"
            className={[
              // Rounded corners
              "rounded-xl",
              // Kenarlık gradyan + gri dolgu
              "gradient-border-with-fill",
              "gradient-fill-gray",
              // Button padding
              "px-5",
              "py-3",
              // Metin rengi (dolguya göre kontrast)
              "text-neutral-900",
              "dark:text-white",
              // Default shadow
              "shadow-lg",
              // Colored shadow tint
              "shadow-violet-500/20",
              // Hover shadow tint
              "hover:shadow-cyan-500/30",
              // Slight lift on hover
              "hover:-translate-y-0.5",
              // Only transition transform for smoother perf
              "transition-transform",
              // Focus ring accessibility
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-cyan-400/40",
            ].join(" ")}
          >
            Teklif Al
          </Link>
          <Link
            href="#features"
            className={[
              // Rounded corners
              "rounded-xl",
              // Frosted glass style
              "glass",
              // Padding
              "px-5",
              "py-3",
              // Smooth transitions on state changes
              "transition",
              // Subtle hover fill (light)
              "hover:bg-white/20",
              // Subtle hover fill (dark)
              "dark:hover:bg-neutral-900/40",
            ].join(" ")}
          >
            Özellikler
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className={[
          // Grid layout for features
          "grid",
          // Gap between cards
          "gap-6",
          // Vertical padding
          "py-10",
          // 2 columns on small screens and up
          "sm:grid-cols-2",
          // 3 columns on large screens and up
          "lg:grid-cols-3",
        ].join(" ")}
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
            className={[
              // Large rounded card
              "rounded-2xl",
              // Glass style card
              "glass",
              // Custom gradient border (from your CSS)
              "gradient-border",
              // Inner padding
              "p-6",
              // Smooth hover transitions
              "transition",
              // Slight lift on hover
              "hover:-translate-y-0.5",
              // Fancy violet glow on hover
              "hover:shadow-[0_0_24px_rgba(124,58,237,0.18)]",
            ].join(" ")}
          >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p
              className={[
                // Spacing from title
                "mt-2",
                // Light/dark mode colors
                "text-neutral-600",
                "dark:text-neutral-300",
              ].join(" ")}
            >
              {desc}
            </p>
          </div>
        ))}
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className={[
          // Section vertical padding
          "py-12",
        ].join(" ")}
      >
        <h2 className="text-2xl font-semibold text-center">Ürünlerimiz</h2>
        <p
          className={[
            // Center and limit width
            "mx-auto",
            "max-w-2xl",
            // Spacing from heading
            "mt-2",
            // Center text
            "text-center",
            // Colors light/dark
            "text-neutral-600",
            "dark:text-neutral-300",
          ].join(" ")}
        >
          Craftex ekibinin geliştirdiği çözümler.
        </p>

        <div
          className={[
            // Spacing from subtitle
            "mt-8",
            // Grid container
            "grid",
            // Gap between cards
            "gap-6",
            // Responsive columns
            "sm:grid-cols-2",
            "lg:grid-cols-3",
          ].join(" ")}
        >
          <div
            className={[
              // Card visuals
              "rounded-2xl",
              "glass",
              "gradient-border",
              // Spacing
              "p-6",
              // Layout
              "flex",
              "flex-col",
            ].join(" ")}
          >
            <h3 className="text-xl font-semibold">Studio AI</h3>
            <p
              className={[
                "mt-2",
                "text-neutral-600",
                "dark:text-neutral-300",
              ].join(" ")}
            >
              Mobil uygulama: içerik üretimi, görsel düzenleme ve akıllı
              otomasyon.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="/products/studio-ai"
                className={[
                  // Shape
                  "rounded-xl",
                  // Background (light) / (dark)
                  "bg-neutral-900",
                  "dark:bg-white",
                  // Text color inverted in dark
                  "text-white",
                  "dark:text-neutral-900",
                  // Padding
                  "px-5",
                  "py-3",
                  // Depth
                  "shadow-lg",
                  "hover:shadow-xl",
                  // Motion
                  "hover:-translate-y-0.5",
                  "transition-transform",
                  // Focus-visible ring
                  "focus:outline-none",
                  "focus:ring-2",
                  "focus:ring-cyan-400/40",
                ].join(" ")}
              >
                Ayrıntılar
              </a>
              <a
                href="mailto:info@craftex.com.tr"
                className={[
                  "rounded-xl",
                  "glass",
                  "px-5",
                  "py-3",
                  "transition",
                  "hover:bg-white/20",
                  "dark:hover:bg-neutral-900/40",
                ].join(" ")}
              >
                Destek Maili
              </a>
            </div>
          </div>
        </div>

        <p
          className={[
            "mt-6",
            "text-center",
            "text-sm",
            "text-neutral-500",
          ].join(" ")}
        >
          Destek için bize{" "}
          <a
            className={[
              // Underline with dotted decoration
              "underline",
              "decoration-dotted",
            ].join(" ")}
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
        className={[
          // Vertical margins
          "my-16",
          // Card visuals
          "rounded-2xl",
          "glass",
          // Inner padding
          "p-8",
          // Custom gradient card background
          "bg-gradient-card",
        ].join(" ")}
      >
        <h2 className="text-2xl font-semibold">Bizimle iletişime geç</h2>
        <p
          className={[
            // Spacing from heading
            "mt-2",
            // Light/dark mode colors
            "text-neutral-600",
            "dark:text-neutral-300",
          ].join(" ")}
        >
          Kısa bir mesaj bırak, sana dönüş yapalım.
        </p>
        <form
          className={[
            // Spacing from title
            "mt-6",
            // Grid layout for fields
            "grid",
            // Gap between fields
            "gap-4",
            // Limit width on small screens and up
            "sm:max-w-md",
          ].join(" ")}
          action="/api/contact"
          method="post"
          suppressHydrationWarning
        >
          <input
            name="name"
            placeholder="Adın"
            className={[
              // Shape
              "rounded-xl",
              // Padding
              "px-4",
              "py-3",
              // Transparent background to let glass show through
              "bg-transparent",
              // Focus ring
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-violet-500/30",
            ].join(" ")}
            required
          />
          <input
            name="email"
            placeholder="E-posta"
            type="email"
            className={[
              "rounded-xl",
              // Custom border from your CSS
              "gradient-border",
              "px-4",
              "py-3",
              "bg-transparent",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-violet-500/30",
            ].join(" ")}
            required
          />
          <textarea
            name="message"
            placeholder="Mesajın"
            className={[
              "rounded-xl",
              "gradient-border",
              "px-4",
              "py-3",
              "bg-transparent",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-violet-500/30",
            ].join(" ")}
            rows={4}
            required
          />
          <button
            className={[
              // Shape
              "rounded-xl",
              // Gradient fill
              "bg-gradient-to-r",
              "from-violet-600",
              "via-cyan-500",
              "to-emerald-500",
              // Padding
              "px-5",
              "py-3",
              // Text
              "text-white",
              // Depth & glow
              "shadow-lg",
              "shadow-violet-500/20",
              "hover:shadow-cyan-500/30",
              // Motion
              "hover:-translate-y-0.5",
              "transition-transform",
              // Focus ring
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-cyan-400/40",
            ].join(" ")}
            type="submit"
          >
            Gönder
          </button>
        </form>
      </section>

      <footer
        className={[
          // Bottom and top margins
          "mb-10",
          "mt-16",
          // Centered small gray text
          "text-center",
          "text-sm",
          "text-neutral-500",
        ].join(" ")}
      >
        © {new Date().getFullYear()} Craftex.
      </footer>
    </main>
  );
}
