"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import { blogPosts, formatPostDate } from "@/data/blog-posts";

/**
 * Escaparate del blog en el home. Muestra hasta 3 artículos, el más reciente
 * primero (orden por fecha, no por posición en el array — a prueba de que se
 * añadan artículos fuera de orden). Con 1 solo artículo (estado actual) se ve
 * como una única tarjeta destacada de ancho completo; al añadir más, el grid
 * se reparte solo sin tocar este componente (ver data/blog-posts.ts).
 */
export default function BlogDestacado() {
  const posts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section
      id="blog"
      className="relative py-28 px-6 bg-[#F7F9FA] dark:bg-[#2B2B2B] overflow-hidden"
    >
      <div className="absolute top-10 -left-24 w-72 h-72 bg-[#61DBD6]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-72 h-72 bg-[#FF8781]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
              Blog
            </span>
            <h2 className="font-poppins text-4xl md:text-5xl font-black text-[#263238] dark:text-white leading-tight">
              Ideas para conocer<br className="hidden sm:block" /> gente de verdad
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#61DBD6] hover:gap-2.5 transition-all shrink-0"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Artículo destacado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative flex flex-col md:flex-row items-stretch gap-0 rounded-3xl border border-gray-100 dark:border-white/8 bg-white dark:bg-[#1a1a1a] overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Visual decorativo — sin foto de stock, coherente con la identidad de marca */}
            <div className="relative shrink-0 w-full md:w-72 aspect-[16/9] md:aspect-auto flex items-center justify-center bg-gradient-to-br from-[#0d2b2a] via-[#163332] to-[#0d2b2a] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #61DBD6 1.5px, transparent 0)", backgroundSize: "28px 28px" }} />
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-[#61DBD6]/15 border border-[#61DBD6]/25">
                <BookOpen className="w-7 h-7 text-[#61DBD6]" aria-hidden="true" />
              </div>
            </div>

            <div className="flex-1 p-7 md:p-9 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#607D8B] dark:text-[#9BA6AD] uppercase tracking-wide mb-3">
                <time dateTime={featured.date}>{formatPostDate(featured.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {featured.readingMinutes} min de lectura
                </span>
              </div>
              <h3 className="font-poppins text-2xl md:text-[28px] font-bold text-[#263238] dark:text-white mb-3 leading-snug group-hover:text-[#61DBD6] transition-colors">
                {featured.title}
              </h3>
              <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-5 max-w-xl">
                {featured.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#61DBD6] group-hover:gap-2.5 transition-all">
                Leer artículo
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Resto de artículos (aparece automáticamente en cuanto haya más de 1) */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full rounded-2xl border border-gray-100 dark:border-white/8 bg-white dark:bg-[#1a1a1a] p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#607D8B] dark:text-[#9BA6AD] uppercase tracking-wide mb-2.5">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min</span>
                  </div>
                  <h3 className="font-poppins text-lg font-bold text-[#263238] dark:text-white mb-2 leading-snug group-hover:text-[#61DBD6] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
