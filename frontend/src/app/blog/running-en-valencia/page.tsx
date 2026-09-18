import Link from "next/link";
import { blogPosts, formatPostDate } from "@/data/blog-posts";

const post = blogPosts.find((p) => p.slug === "running-en-valencia")!;

export const metadata = {
  title: "Running en Valencia: por qué correr en grupo depende tanto de encontrar tu ritmo real | Unyona",
  description:
    "Correr no necesita a nadie más, así que la mayoría corre sola — no por gusto, sino porque coordinar un ritmo real con alguien es más difícil de lo que parece. Qué dice quien estudia esto, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
  alternates: { canonical: "https://unyona.com/blog/running-en-valencia" },
  openGraph: {
    title: "Running en Valencia: por qué correr en grupo depende tanto de encontrar tu ritmo real",
    description:
      "Correr no necesita a nadie más, así que la mayoría corre sola — no por gusto, sino porque coordinar un ritmo real con alguien es más difícil de lo que parece. Qué dice quien estudia esto, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
    url: "https://unyona.com/blog/running-en-valencia",
    siteName: "Unyona",
    locale: "es_ES",
    type: "article",
    publishedTime: post.date,
    images: [
      {
        url: "/images/logo_unyona.png",
        width: 1200,
        height: 630,
        alt: "Running en Valencia — Unyona",
      },
    ],
  },
};

const fuentes = [
  {
    label: "Universidad de Valencia (DUEMOSLI) — “10 motivos para salir a correr en grupo”",
    href: "https://duemosli.blogs.uv.es/10-motivos-para-salir-a-correr-en-grupo/",
  },
  {
    label: "CorrerJuntos — “12 beneficios de correr en grupo”",
    href: "https://www.correrjuntos.com/blog/beneficios-correr-en-grupo",
  },
];

const proseP = "text-[#455A64] dark:text-[#9BA6AD] leading-[1.85] text-[16px] md:text-[17px] mb-6";
const proseH2 = "font-poppins text-2xl md:text-[28px] font-bold text-[#263238] dark:text-white mt-14 mb-5 leading-snug";
const strong = "text-[#263238] dark:text-white font-bold";

export default function RunningEnValenciaPage() {
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
              "@id": "https://unyona.com/blog/running-en-valencia",
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
            Running · Valencia
          </span>
          <h1 className="font-poppins text-3xl md:text-4xl font-black text-[#263238] dark:text-white mb-5 leading-tight">
            Running en Valencia: por qué correr en grupo depende tanto de encontrar tu ritmo real
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
              Salir a correr no necesita a nadie más: te atas las zapatillas y sales. Es
              probablemente la afición más fácil de practicar en solitario que hay — y por eso la
              mayoría corre sola, no siempre porque lo prefiera.
            </p>

            <p className={proseP}>
              Lo difícil no es encontrar a alguien a quien le guste correr — eso es fácil en una
              ciudad como Valencia. Lo difícil es encontrar a alguien cuyo ritmo <em>real</em>, no
              el aspiracional, encaje con el tuyo y con tu horario. Sin eso, un grupo de running se
              rompe casi solo: quien va más rápido acaba tirando y desmotivando, quien va más
              lento acaba forzando y lesionándose por seguir el paso.
            </p>

            <h2 className={proseH2}>Por qué correr en grupo depende tanto del ritmo</h2>

            <p className={proseP}>
              En un club de lectura o una ruta de senderismo el grupo se reagrupa en las paradas;
              en running, el desajuste de ritmo se siente en cada zancada. Eso hace que el
              obstáculo real no sea &ldquo;encontrar compañía para
              correr&rdquo; en abstracto, sino encontrar a alguien con quien de verdad puedas
              mantener la conversación sin ahogarte ni tener que frenar constantemente por él.
            </p>

            <h2 className={proseH2}>Lo que dice la investigación sobre correr en grupo</h2>

            <p className={proseP}>
              La{" "}
              <a
                href="https://duemosli.blogs.uv.es/10-motivos-para-salir-a-correr-en-grupo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                Universidad de Valencia
              </a>{" "}
              recoge en su blog de hábitos saludables que{" "}
              <strong className={strong}>&ldquo;correr en grupo te ayudará a sociabilizar&rdquo;</strong>{" "}
              y que, para quien tiene más dificultad para relacionarse,{" "}
              <strong className={strong}>
                &ldquo;conseguirás sociabilizar mejor. Es decir, no te aislarás del mundo con
                tanta facilidad&rdquo;
              </strong>
              .
            </p>

            <p className={proseP}>
              En la misma línea, el blog{" "}
              <a
                href="https://www.correrjuntos.com/blog/beneficios-correr-en-grupo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                CorrerJuntos
              </a>{" "}
              explica por qué cuesta menos mantener la costumbre cuando hay alguien más
              implicado:{" "}
              <strong className={strong}>
                &ldquo;cuando alguien te espera, sales. El compromiso social es el motor más
                potente de la consistencia&rdquo;
              </strong>
              .
            </p>

            <h2 className={proseH2}>Lo que ya existe en Valencia (y por qué no siempre alcanza)</h2>

            <p className={proseP}>
              Valencia no tiene ningún problema de oferta: hay grupos de running con cientos de
              socios, gratuitos, con salidas semanales por el Jardín del Túria y comunidades
              activas en Facebook y Meetup.
            </p>

            <p className={proseP}>
              Lo que falla no es la cantidad de grupos, es el formato: la mayoría organiza una
              salida grande a un ritmo y un horario fijos —normalmente pensados para un perfil
              medio— y si tu ritmo real o tu disponibilidad no encajan en esa única franja, la
              alternativa vuelve a ser correr solo. Encontrar un grupo pequeño, a tu ritmo
              concreto y en tu horario, sigue siendo, muchas veces, cuestión de suerte.
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
                  <strong className={strong}>Tu afición, no tu marca personal.</strong> No hay
                  tiempos que enseñar ni ranking que defender. Lo que importa es tu ritmo real y
                  con quién quieres compartir la salida — no un cronómetro.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Si dices que vas, vas.</strong> Alguien que confirma
                  una salida a las siete de la mañana y no aparece te deja exactamente donde
                  estabas antes de quedar: corriendo solo. Diseñamos alrededor de eso, no lo
                  ignoramos.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Sin feed. Sin peaje. Sin dueño que la estropee.</strong>{" "}
                  No hay scroll infinito que compita con salir a correr de verdad, no cobramos a
                  quien organiza una quedada, y no vendemos tu atención a nadie.
                </span>
              </li>
            </ul>

            <p className={proseP}>
              Y una regla que aplicamos a nosotros mismos: en Unyona{" "}
              <strong className={strong}>cualquiera puede organizar una quedada</strong>, no solo
              cuentas de empresa. La salida es de quien la crea, bajo su responsabilidad — Unyona
              es el canal por el que os encontráis, no quien decide qué pasa en ella.
            </p>

            <h2 className={proseH2}>Por dónde empieza esto en Valencia</h2>

            <p className={proseP}>
              Arrancamos por el eje <strong className={strong}>Ruzafa – Ciutat Vella – Cabanyal</strong>:
              es, casi literalmente, la salida natural al Jardín del Túria, el corredor verde de
              referencia para correr en la ciudad. No es una elección al azar — es donde ya está
              pasando la vida social que queremos ayudar a sostener, no sustituir.
            </p>

            <h2 className={proseH2}>Lo que no te vamos a prometer</h2>

            <p className={proseP}>
              Nada de esto funciona si te mentimos desde el principio, así que dos cosas claras:
            </p>

            <p className={proseP}>
              Aún somos pocos. Si te apuntas hoy, no vas a encontrar un mapa lleno de corredores
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
                data-umami-event="cta-blog-running-valencia"
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
