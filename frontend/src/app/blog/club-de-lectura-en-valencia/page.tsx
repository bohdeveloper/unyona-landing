import Link from "next/link";
import { blogPosts, formatPostDate } from "@/data/blog-posts";

const post = blogPosts.find((p) => p.slug === "club-de-lectura-en-valencia")!;

export const metadata = {
  title: "Clubes de lectura en Valencia: por qué la mayoría no llega a la quinta reunión | Unyona",
  description:
    "Un club de lectura no falla por falta de ganas de leer, sino de sincronía: basta con que dos o tres personas se atrasen para que se apague. Qué dice quien estudia esto, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
  alternates: { canonical: "https://unyona.com/blog/club-de-lectura-en-valencia" },
  openGraph: {
    title: "Clubes de lectura en Valencia: por qué la mayoría no llega a la quinta reunión",
    description:
      "Un club de lectura no falla por falta de ganas de leer, sino de sincronía: basta con que dos o tres personas se atrasen para que se apague. Qué dice quien estudia esto, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
    url: "https://unyona.com/blog/club-de-lectura-en-valencia",
    siteName: "Unyona",
    locale: "es_ES",
    type: "article",
    publishedTime: post.date,
    images: [
      {
        url: "/images/logo_unyona.png",
        width: 1200,
        height: 630,
        alt: "Clubes de lectura en Valencia — Unyona",
      },
    ],
  },
};

const fuentes = [
  {
    label: "The Conversation — “Club de lectura, un placer privado convertido en acción social”",
    href: "https://theconversation.com/club-de-lectura-un-placer-privado-convertido-en-accion-social-133034",
  },
  {
    label: "Ethic — “Los beneficios de ir a un club de lectura”",
    href: "https://ethic.es/beneficios-club-de-lectura",
  },
];

const proseP = "text-[#455A64] dark:text-[#9BA6AD] leading-[1.85] text-[16px] md:text-[17px] mb-6";
const proseH2 = "font-poppins text-2xl md:text-[28px] font-bold text-[#263238] dark:text-white mt-14 mb-5 leading-snug";
const strong = "text-[#263238] dark:text-white font-bold";

export default function ClubDeLecturaEnValenciaPage() {
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
              "@id": "https://unyona.com/blog/club-de-lectura-en-valencia",
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
            Club de lectura · Valencia
          </span>
          <h1 className="font-poppins text-3xl md:text-4xl font-black text-[#263238] dark:text-white mb-5 leading-tight">
            Clubes de lectura en Valencia: por qué la mayoría no llega a la quinta reunión
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
              Montar un club de lectura es fácil: eliges un libro, agendas una fecha, y aparece
              gente. Lo difícil es que aparezca la misma gente la segunda vez, habiendo leído lo
              mismo que tú.
            </p>

            <p className={proseP}>
              Un club de lectura no suele apagarse por falta de ganas de leer — se apaga por falta
              de sincronía. Basta con que dos o tres personas se atrasen con el libro para que la
              reunión se quede floja, y si eso pasa dos veces seguidas, la tercera ya no se
              convoca.
            </p>

            <h2 className={proseH2}>Por qué un club de lectura es más frágil de lo que parece</h2>

            <p className={proseP}>
              Leer es una afición privada, a tu ritmo, que nadie más controla. Un club le impone
              justo lo contrario: un ritmo compartido con fecha límite. A diferencia de una
              quedada de running o de senderismo, donde basta con presentarte el día acordado, un
              club de lectura exige haber hecho el trabajo <em>antes</em> de llegar — y eso
              multiplica las ocasiones en las que algo se cruza: el trabajo, los hijos, un viaje,
              simplemente no haber tenido ganas esa semana. Cuando eso le pasa a la mitad del
              grupo, la reunión dejó de tener sentido antes incluso de empezar.
            </p>

            <h2 className={proseH2}>Lo que dice la investigación sobre leer en grupo</h2>

            <p className={proseP}>
              No es solo una impresión. El análisis de{" "}
              <a
                href="https://theconversation.com/club-de-lectura-un-placer-privado-convertido-en-accion-social-133034"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                The Conversation
              </a>{" "}
              sobre los clubes de lectura señala que{" "}
              <strong className={strong}>
                &ldquo;este modo de convertir el placer por la lectura, generalmente un placer
                privado, en una forma de vida social, lo convierte en una acción cultural&rdquo;
              </strong>
              , y que asistir de forma continuada &ldquo;crea una relación de inclusión o
              pertenencia al grupo, e, incluso, de empatía, por la influencia socializadora de la
              lectura&rdquo;.
            </p>

            <p className={proseP}>
              En la misma línea,{" "}
              <a
                href="https://ethic.es/beneficios-club-de-lectura"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                Ethic
              </a>{" "}
              recuerda que{" "}
              <strong className={strong}>
                &ldquo;los clubes de lectura se presentan como una herramienta para tejer vínculos
                sociales&rdquo;
              </strong>{" "}
              y que ofrecen &ldquo;un espacio seguro para sus asistentes, lo que contribuye a
              reducir la sensación de aislamiento&rdquo; — el beneficio no está solo en el libro,
              está en que alguien te espera para hablar de él.
            </p>

            <h2 className={proseH2}>Lo que ya existe en Valencia (y por qué no siempre alcanza)</h2>

            <p className={proseP}>
              Valencia tiene bastante oferta: bibliotecas municipales con club de lectura mensual,
              librerías independientes que organizan el suyo propio, y grupos informales nacidos
              de un grupo de WhatsApp o de Facebook.
            </p>

            <p className={proseP}>
              Lo que falla es más concreto: la mayoría de esos clubes tienen un libro, un horario
              y un ritmo fijados por quien lo organiza, sin margen para el tuyo. Si buscas un
              género muy específico —ensayo, ciencia ficción, poesía— o un grupo pequeño en el que
              de verdad se pueda hablar, en vez de una sala llena donde apenas te toca turno,
              encontrarlo entre la oferta existente sigue siendo, muchas veces, cuestión de suerte.
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
                  <strong className={strong}>Tu afición, no tu perfil.</strong> No hay lista de
                  libros leídos que enseñar ni valoración que defender. Lo que importa es qué
                  género y qué ritmo de lectura buscas, y con quién quieres compartirlo — no un
                  currículum lector.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Si dices que vas, vas.</strong> Una reunión con la
                  mitad del grupo sin haber abierto el libro deja de tener sentido para todos.
                  Diseñamos alrededor de eso, no lo ignoramos.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Sin feed. Sin peaje. Sin dueño que la estropee.</strong>{" "}
                  No hay scroll infinito que compita con quedar a hablar de un libro de verdad, no
                  cobramos a quien organiza una quedada, y no vendemos tu atención a nadie.
                </span>
              </li>
            </ul>

            <p className={proseP}>
              Y una regla que aplicamos a nosotros mismos: en Unyona{" "}
              <strong className={strong}>cualquiera puede organizar una quedada</strong>, no solo
              cuentas de empresa. El club es de quien lo crea, bajo su responsabilidad — Unyona es
              el canal por el que os encontráis, no quien decide qué pasa en él.
            </p>

            <h2 className={proseH2}>Por dónde empieza esto en Valencia</h2>

            <p className={proseP}>
              Arrancamos por el eje <strong className={strong}>Ruzafa – Ciutat Vella – Cabanyal</strong>:
              la zona con más librerías independientes, cafés y espacios culturales de la ciudad —
              el sitio natural para quedar a comentar un libro sin tener que reservar una sala. No
              es una elección al azar — es donde ya está pasando la vida social que queremos
              ayudar a sostener, no sustituir.
            </p>

            <h2 className={proseH2}>Lo que no te vamos a prometer</h2>

            <p className={proseP}>
              Nada de esto funciona si te mentimos desde el principio, así que dos cosas claras:
            </p>

            <p className={proseP}>
              Aún somos pocos. Si te apuntas hoy, no vas a encontrar un mapa lleno de clubes de
              lectura esperándote mañana — vas a ser de los primeros en construirlo. Y no te vamos
              a decir una fecha de apertura que todavía no podemos garantizar: te avisamos por
              email en cuanto puedas entrar.
            </p>

            <p className={proseP + " mb-10"}>
              Si esto te suena a lo que llevas tiempo echando de menos, apúntate a la lista de
              espera. Cuesta un email y una ciudad, nada más.
            </p>

            <div className="text-center mb-14">
              <a
                href="/#lista-espera"
                data-umami-event="cta-blog-club-lectura-valencia"
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
