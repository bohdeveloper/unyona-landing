import Link from "next/link";
import { blogPosts, formatPostDate } from "@/data/blog-posts";

const post = blogPosts.find((p) => p.slug === "conocer-gente-en-valencia")!;

export const metadata = {
  title: "Conocer gente en Valencia: la guía honesta para hacer amigos de adulto | Unyona",
  description:
    "Por qué cuesta tanto hacer amigos después de los 25, qué hay ya en Valencia para conocer gente, y cómo lo estamos planteando en Unyona. Sin fórmulas mágicas.",
  alternates: { canonical: "https://unyona.com/blog/conocer-gente-en-valencia" },
  openGraph: {
    title: "Conocer gente en Valencia: la guía honesta para hacer amigos de adulto",
    description:
      "Por qué cuesta tanto hacer amigos después de los 25, qué hay ya en Valencia para conocer gente, y cómo lo estamos planteando en Unyona. Sin fórmulas mágicas.",
    url: "https://unyona.com/blog/conocer-gente-en-valencia",
    siteName: "Unyona",
    locale: "es_ES",
    type: "article",
    publishedTime: post.date,
    images: [
      {
        url: "/images/logo_unyona.png",
        width: 1200,
        height: 630,
        alt: "Conocer gente en Valencia — Unyona",
      },
    ],
  },
};

const fuentes = [
  {
    label: "SoledadES — Estudio sobre soledad no deseada y salud mental en España 2026",
    href: "https://www.soledades.es/estudios/estudio-sobre-soledad-no-deseada-y-salud-mental-en-espana-2026",
  },
  {
    label: "SoledadES — Estudio sobre juventud y soledad no deseada en España",
    href: "https://www.soledades.es/estudios/estudio-sobre-juventud-y-soledad-no-deseada-en-espana",
  },
  {
    label: "eldiario.es — “Hacer amigos más allá de los 30: ¿qué funciona a la hora de crear nuevos lazos?”",
    href: "https://www.eldiario.es/era/amigos-30-funciona-hora-crear-nuevos-lazos_1_12960029.html",
  },
];

const proseP = "text-[#455A64] dark:text-[#9BA6AD] leading-[1.85] text-[16px] md:text-[17px] mb-6";
const proseH2 = "font-poppins text-2xl md:text-[28px] font-bold text-[#263238] dark:text-white mt-14 mb-5 leading-snug";
const strong = "text-[#263238] dark:text-white font-bold";

export default function ConocerGenteEnValenciaPage() {
  return (
    <div>
      {/* ============================
         JSON-LD: Article
         Mismos datos que la metadata de arriba y el mismo `post` de
         `data/blog-posts.ts` — nada declarado que no exista en la página
         (spec.md §3.15/§3.16). Autoría a nivel de Organization: el artículo
         no lleva firma personal individual.
      ============================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "datePublished": post.date,
            "dateModified": post.date,
            "inLanguage": "es-ES",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://unyona.com/blog/conocer-gente-en-valencia",
            },
            "image": "https://unyona.com/images/logo_unyona.png",
            "author": { "@type": "Organization", "name": "Unyona", "url": "https://unyona.com" },
            "publisher": {
              "@type": "Organization",
              "name": "Unyona",
              "logo": { "@type": "ImageObject", "url": "https://unyona.com/images/logo.png" },
            },
          }),
        }}
      />

      {/* Cabecera */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-[#e8faf9] via-white to-white dark:from-[#0d2b2a] dark:via-[#1a1a1a] dark:to-[#1a1a1a]">
        <div className="max-w-2xl mx-auto px-6">
          <Link
            href="/blog"
            className="flex w-fit items-center gap-1.5 text-sm text-[#61DBD6] hover:underline mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al blog
          </Link>
          <span className="block w-fit px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-xs font-bold tracking-widest uppercase mb-5">
            Vida social · Valencia
          </span>
          <h1 className="font-poppins text-3xl md:text-4xl font-black text-[#263238] dark:text-white mb-5 leading-tight">
            Conocer gente en Valencia: la guía honesta para hacer amigos de adulto
          </h1>
          <div className="flex items-center gap-3 text-sm text-[#607D8B] dark:text-[#9BA6AD]">
            <span className="font-semibold text-[#263238] dark:text-white">Unyona</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min de lectura</span>
          </div>
        </div>
      </section>

      {/* Cuerpo del artículo */}
      <section className="py-12 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-2xl mx-auto px-6">
          <article>
            <p className={proseP}>
              De pequeño hacías amigos en el recreo. De adulto, nadie te presenta a nadie.
            </p>

            <p className={proseP}>
              No es una sensación tuya. El <strong className={strong}>Estudio sobre soledad no
              deseada y salud mental en España 2026</strong> (SoledadES) cifra en{" "}
              <strong className={strong}>20,2 % la población adulta española</strong> que sufre
              soledad no deseada, y de esas personas, el{" "}
              <strong className={strong}>81,1 % lleva dos años o más</strong> en esa situación. En
              la franja de 25 a 34 años, la prevalencia ya es del{" "}
              <strong className={strong}>16,5 %</strong> — y entre los jóvenes de 16 a 29, del{" "}
              <strong className={strong}>25,5 %</strong>.
            </p>

            <p className={proseP}>
              No es un problema raro ni vergonzoso. Es, con esos números, uno de los más comunes
              que hay.
            </p>

            <h2 className={proseH2}>Por qué cuesta tanto conocer gente después de los 25</h2>

            <blockquote className="border-l-4 border-[#61DBD6] bg-[#F7F9FA] dark:bg-white/5 rounded-r-xl pl-5 pr-5 py-4 my-7">
              <p className="italic text-[#263238] dark:text-[#E1E5E8] leading-relaxed text-[16px] md:text-[17px] mb-2">
                &ldquo;Trabajo-casa y casa-trabajo, gimnasio y poco más. Esperas al fin de semana
                para hacer algo con tus amigas y, lo típico, ya no es tan fácil quedar.&rdquo;
              </p>
              <footer className="text-sm text-[#607D8B] dark:text-[#9BA6AD]">
                — Irene, 35 años, en{" "}
                <a
                  href="https://www.eldiario.es/era/amigos-30-funciona-hora-crear-nuevos-lazos_1_12960029.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#61DBD6] font-semibold hover:underline"
                >
                  eldiario.es
                </a>
              </footer>
            </blockquote>

            <p className={proseP}>
              De adulto desaparecen los contextos automáticos que de niño o adolescente te
              presentaban gente sin esfuerzo: la clase, el recreo, la residencia de estudiantes.
              Lo que queda es el trabajo (con quien te toca, no con quien eliges) y poco más. Y si
              además tienes una afición muy concreta —fotografía, senderismo, un club de lectura,
              correr por las mañanas— encontrar a alguien cerca que la comparta y tenga ganas de
              quedar de verdad se vuelve, directamente, una lotería.
            </p>

            <h2 className={proseH2}>Lo que ya existe en Valencia (y por qué no siempre alcanza)</h2>

            <p className={proseP}>
              Valencia no parte de cero. Hay comunidades activas — grupos de senderismo, clubes de
              fotografía, quedadas de lectura, grupos de running — algunos con años de recorrido y
              cientos de personas detrás. Eso es bueno: significa que la gente de esta ciudad{" "}
              <strong className={strong}>sí quiere quedar</strong>, y que el hábito ya existe.
            </p>

            <p className={proseP}>
              Lo que falla no es la voluntad de la gente, es la forma en la que hoy se organiza:
              grupos que dependen enteramente de una sola persona sosteniéndolos año tras año,
              comunidades que viven repartidas entre cinco aplicaciones distintas, y un runrún
              constante de gente que dice que va y luego no aparece.
            </p>

            <h2 className={proseH2}>Qué plantea Unyona de otra forma</h2>

            <p className={proseP}>
              No partimos de &ldquo;así se hace mejor&rdquo;. Partimos de tres decisiones
              concretas:
            </p>

            <ul className="mb-6 space-y-4">
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Tu afición, no tu foto.</strong> No hay perfiles que
                  valorar ni fotos que juzgar. Lo que importa es qué te gusta hacer y con quién
                  quieres hacerlo — no un match.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Si dices que vas, vas.</strong> El problema real de
                  casi cualquier plan con gente nueva no es encontrar gente: es que aparezca.
                  Diseñamos alrededor de eso, no lo ignoramos.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Sin feed. Sin peaje. Sin dueño que la estropee.</strong>{" "}
                  No hay scroll infinito que te enganche, no cobramos a quien organiza una
                  quedada, y no vendemos tu atención a nadie.
                </span>
              </li>
            </ul>

            <p className={proseP}>
              Y una regla que aplicamos a nosotros mismos: en Unyona{" "}
              <strong className={strong}>cualquiera puede organizar una quedada</strong>, no solo
              cuentas de empresa. La quedada es de quien la crea, bajo su responsabilidad — Unyona
              es el canal por el que os encontráis, no quien decide qué pasa en ella.
            </p>

            <h2 className={proseH2}>Por dónde empieza esto en Valencia</h2>

            <p className={proseP}>
              Arrancamos por el eje <strong className={strong}>Ruzafa – Ciutat Vella – Cabanyal</strong>:
              la zona con más vida social de calle y mayor concentración de gente con ganas de
              conocer gente nueva, sea porque acaba de llegar a la ciudad o porque lleva toda la
              vida aquí y aun así le cuesta hacer planes nuevos. No es una elección al azar — es
              donde ya está pasando la vida social que queremos ayudar a sostener, no sustituir.
            </p>

            <h2 className={proseH2}>Lo que no te vamos a prometer</h2>

            <p className={proseP}>
              Nada de esto funciona si te mentimos desde el principio, así que dos cosas claras:
            </p>

            <p className={proseP}>
              Aún somos pocos. Si te apuntas hoy, no vas a encontrar un mapa lleno de gente
              esperándote mañana — vas a ser de los primeros en construirlo. Y no te vamos a decir
              una fecha de apertura que todavía no podemos garantizar: te avisamos por email en
              cuanto puedas entrar.
            </p>

            <p className={proseP + " mb-10"}>
              Si esto te suena a lo que llevas tiempo echando de menos, apúntate a la lista de
              espera. Cuesta un email y una ciudad, nada más.
            </p>

            <div className="text-center mb-14">
              <a
                href="/#lista-espera"
                data-umami-event="cta-blog-conocer-gente-valencia"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold text-base rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-[#61DBD6]/30 transition-all"
              >
                Apuntarme a la lista de espera
              </a>
            </div>

            {/* Fuentes citadas */}
            <footer className="border-t border-gray-100 dark:border-white/10 pt-8">
              <h2 className="font-poppins text-sm font-bold text-[#263238] dark:text-white uppercase tracking-widest mb-4">
                Fuentes
              </h2>
              <ol className="space-y-2.5">
                {fuentes.map((f) => (
                  <li key={f.href} className="text-sm text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed">
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#61DBD6] font-semibold hover:underline"
                    >
                      {f.label}
                    </a>
                  </li>
                ))}
              </ol>
            </footer>
          </article>

          <div className="border-t border-gray-100 dark:border-white/10 mt-10 pt-6 flex flex-wrap justify-between items-center gap-4 text-sm">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[#61DBD6] hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Volver al blog
            </Link>
            <Link href="/#faq" className="text-[#607D8B] dark:text-[#9BA6AD] hover:text-[#61DBD6] transition-colors">
              ¿Tienes dudas? Mira la FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
