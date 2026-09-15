import Link from "next/link";
import { blogPosts, formatPostDate } from "@/data/blog-posts";

const post = blogPosts.find((p) => p.slug === "senderismo-en-valencia")!;

export const metadata = {
  title: "Grupos de senderismo en Valencia: por qué las rutas en compañía cuestan más de sostener de lo que parece | Unyona",
  description:
    "Encontrar gente con quien repetir ruta cada fin de semana no es tan fácil como apuntarse una vez. Qué dice la ciencia sobre el senderismo en grupo, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
  alternates: { canonical: "https://unyona.com/blog/senderismo-en-valencia" },
  openGraph: {
    title: "Grupos de senderismo en Valencia: por qué las rutas en compañía cuestan más de sostener de lo que parece",
    description:
      "Encontrar gente con quien repetir ruta cada fin de semana no es tan fácil como apuntarse una vez. Qué dice la ciencia sobre el senderismo en grupo, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
    url: "https://unyona.com/blog/senderismo-en-valencia",
    siteName: "Unyona",
    locale: "es_ES",
    type: "article",
    publishedTime: post.date,
    images: [
      {
        url: "/images/logo_unyona.png",
        width: 1200,
        height: 630,
        alt: "Grupos de senderismo en Valencia — Unyona",
      },
    ],
  },
};

const fuentes = [
  {
    label: "Chiruca — “Senderismo y salud mental”",
    href: "https://chiruca.com/2025/07/23/senderismo-y-salud-mental/",
  },
  {
    label: "La Cumbre Cotidiana — “Senderismo y salud mental: cómo beneficia”",
    href: "https://www.lacumbrecotidiana.org/educacion/senderismo-y-salud-mental-como-beneficia",
  },
];

const proseP = "text-[#455A64] dark:text-[#9BA6AD] leading-[1.85] text-[16px] md:text-[17px] mb-6";
const proseH2 = "font-poppins text-2xl md:text-[28px] font-bold text-[#263238] dark:text-white mt-14 mb-5 leading-snug";
const strong = "text-[#263238] dark:text-white font-bold";

export default function SenderismoEnValenciaPage() {
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
              "@id": "https://unyona.com/blog/senderismo-en-valencia",
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
            Senderismo · Valencia
          </span>
          <h1 className="font-poppins text-3xl md:text-4xl font-black text-[#263238] dark:text-white mb-5 leading-tight">
            Grupos de senderismo en Valencia: por qué las rutas en compañía cuestan más de sostener de lo que parece
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
              La primera ruta con gente nueva sale casi siempre bien. La cuarta, la que hace que
              dejéis de ser desconocidos que coincidieron un sábado, es la que casi nunca llega a
              pasar.
            </p>

            <p className={proseP}>
              El senderismo tiene una paradoja curiosa: es de las aficiones más fáciles de probar
              una vez —te apuntas a una ruta suelta de un grupo grande y ya está— y de las más
              difíciles de convertir en una costumbre con las mismas caras. Entre ruta y ruta pasan
              semanas, el grupo cambia cada vez, y acabas siendo alguien que &ldquo;hace senderismo
              de vez en cuando&rdquo; en vez de alguien con quien contar para el sábado que viene.
            </p>

            <h2 className={proseH2}>Por qué cuesta sostener el hábito, no empezarlo</h2>

            <p className={proseP}>
              Encontrar una ruta el primer sábado es fácil: hay decenas de grupos grandes en
              Valencia con salidas casi todas las semanas. Lo difícil es lo segundo: que ese grupo
              de desconocidos se convierta en un plan que se repite con las mismas personas,
              compatible con tu ritmo real —de nivel, de horario, de frecuencia— y no en un evento
              masivo distinto cada vez del que te vas como llegaste, sin conocer a nadie.
            </p>

            <h2 className={proseH2}>Lo que dice la evidencia sobre hacerlo en grupo</h2>

            <p className={proseP}>
              No es solo una sensación. El análisis de{" "}
              <a
                href="https://chiruca.com/2025/07/23/senderismo-y-salud-mental/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                Chiruca
              </a>{" "}
              sobre senderismo y salud mental señala que{" "}
              <strong className={strong}>
                &ldquo;caminar en grupo por el monte fortalece los lazos sociales&rdquo;
              </strong>
              , y que las caminatas compartidas fomentan la conversación, el apoyo mutuo y el
              sentido de pertenencia —beneficios distintos a los de caminar en solitario, que el
              mismo análisis reconoce como una buena forma de desconectar, pero no de construir
              vínculo.
            </p>

            <p className={proseP}>
              En la misma línea, el artículo de{" "}
              <a
                href="https://www.lacumbrecotidiana.org/educacion/senderismo-y-salud-mental-como-beneficia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                La Cumbre Cotidiana
              </a>{" "}
              apunta que al hacer una ruta en grupo{" "}
              <strong className={strong}>
                &ldquo;también creas una relación fuerte con el grupo de personas con las que
                vives esta experiencia&rdquo;
              </strong>
              : completar juntos un recorrido exigente genera un sentido de logro compartido que
              reduce el estrés más que la misma ruta hecha solo.
            </p>

            <h2 className={proseH2}>Lo que ya existe en Valencia (y por qué no siempre alcanza)</h2>

            <p className={proseP}>
              Valencia no tiene ningún problema de oferta: hay grupos de senderismo sin ánimo de
              lucro con cientos de personas, comunidades de miles en Facebook y salidas casi todos
              los fines de semana, con un ambiente pensado para ser colaborativo, no competitivo.
            </p>

            <p className={proseP}>
              Lo que falla no es la cantidad de rutas disponibles: es que la mayoría son eventos
              grandes y puntuales, no un grupo estable con el que repetir. Si buscas un ritmo
              concreto —rutas más exigentes, un horario fijo entre semana, un grupo pequeño donde
              de verdad se llegue a conocer gente— encontrarlo entre la oferta masiva sigue siendo,
              muchas veces, cuestión de suerte.
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
                  valorar ni currículum de rutas que enseñar. Lo que importa es qué nivel y qué
                  ritmo buscas, y con quién quieres repetir — no un evento masivo de una vez.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Si dices que vas, vas.</strong> Una ruta con gente que
                  confirma y no aparece no es solo una decepción: en el monte puede ser un
                  problema de verdad. Diseñamos alrededor de eso, no lo ignoramos.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Sin feed. Sin peaje. Sin dueño que la estropee.</strong>{" "}
                  No hay scroll infinito que compita con salir de ruta de verdad, no cobramos a
                  quien organiza una quedada, y no vendemos tu atención a nadie.
                </span>
              </li>
            </ul>

            <p className={proseP}>
              Y una regla que aplicamos a nosotros mismos: en Unyona{" "}
              <strong className={strong}>cualquiera puede organizar una quedada</strong>, no solo
              cuentas de empresa. La ruta es de quien la crea, bajo su responsabilidad — Unyona es
              el canal por el que os encontráis, no quien decide qué pasa en ella.
            </p>

            <h2 className={proseH2}>Por dónde empieza esto en Valencia</h2>

            <p className={proseP}>
              Arrancamos por el eje <strong className={strong}>Ruzafa – Ciutat Vella – Cabanyal</strong>:
              no porque sea zona de monte, sino porque es donde vive la gente con más ganas de
              organizar y sumarse a planes nuevos — el punto de partida real de cualquier ruta que
              salga de la ciudad. No es una elección al azar — es donde ya está pasando la vida
              social que queremos ayudar a sostener, no sustituir.
            </p>

            <h2 className={proseH2}>Lo que no te vamos a prometer</h2>

            <p className={proseP}>
              Nada de esto funciona si te mentimos desde el principio, así que dos cosas claras:
            </p>

            <p className={proseP}>
              Aún somos pocos. Si te apuntas hoy, no vas a encontrar un mapa lleno de grupos de
              senderismo esperándote mañana — vas a ser de los primeros en construirlo. Y no te
              vamos a decir una fecha de apertura que todavía no podemos garantizar: te avisamos
              por email en cuanto puedas entrar.
            </p>

            <p className={proseP + " mb-10"}>
              Si esto te suena a lo que llevas tiempo echando de menos, apúntate a la lista de
              espera. Cuesta un email y una ciudad, nada más.
            </p>

            <div className="text-center mb-14">
              <a
                href="/#lista-espera"
                data-umami-event="cta-blog-senderismo-valencia"
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
