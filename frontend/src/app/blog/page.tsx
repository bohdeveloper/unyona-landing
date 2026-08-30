import Link from "next/link";
import { blogPosts, formatPostDate } from "@/data/blog-posts";

export const metadata = {
  title: "Blog | Unyona — Conocer gente y quedar en Valencia",
  description:
    "Guías y artículos de Unyona sobre cómo conocer gente, aficiones y vida social en Valencia.",
  alternates: { canonical: "https://unyona.com/blog" },
  openGraph: {
    title: "Blog | Unyona — Conocer gente y quedar en Valencia",
    description:
      "Guías y artículos de Unyona sobre cómo conocer gente, aficiones y vida social en Valencia.",
    url: "https://unyona.com/blog",
    siteName: "Unyona",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/logo_unyona.png",
        width: 1200,
        height: 630,
        alt: "Blog de Unyona",
      },
    ],
  },
};

export default function BlogIndexPage() {
  return (
    <div>
      {/* Cabecera */}
      <section className="pt-24 pb-14 bg-gradient-to-br from-[#e8faf9] via-white to-white dark:from-[#0d2b2a] dark:via-[#1a1a1a] dark:to-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#61DBD6] hover:underline mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a inicio
          </Link>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-5">
            Blog
          </span>
          <h1 className="font-poppins text-4xl md:text-5xl font-black text-[#263238] dark:text-white mb-4 leading-tight">
            Guías para conocer gente en Valencia
          </h1>
          <p className="text-lg text-[#607D8B] dark:text-[#9BA6AD] max-w-2xl leading-relaxed">
            Reflexiones honestas sobre aficiones, vida social y quedadas reales — sin fórmulas
            mágicas ni promesas que no podamos cumplir.
          </p>
        </div>
      </section>

      {/* Listado */}
      <section className="py-14 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-2xl border border-gray-100 dark:border-white/8 bg-[#F7F9FA] dark:bg-[#2B2B2B] p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-xs font-semibold text-[#607D8B] dark:text-[#9BA6AD] mb-3 uppercase tracking-wide">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min de lectura</span>
                </div>
                <h2 className="font-poppins text-xl font-bold text-[#263238] dark:text-white mb-3 leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0 hover:text-[#61DBD6] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-5">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#61DBD6] group-hover:gap-2.5 transition-all">
                  Leer artículo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
