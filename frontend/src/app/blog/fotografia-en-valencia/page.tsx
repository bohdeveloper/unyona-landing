import Link from "next/link";
import { blogPosts, formatPostDate } from "@/data/blog-posts";

const post = blogPosts.find((p) => p.slug === "fotografia-en-valencia")!;

export const metadata = {
  title: "Quedadas de fotografía en Valencia: por qué cuesta tanto encontrar con quién salir a hacer fotos | Unyona",
  description:
    "La fotografía es una afición que se practica sola casi por defecto. Qué dice la propia comunidad fotográfica sobre salir en grupo, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
  alternates: { canonical: "https://unyona.com/blog/fotografia-en-valencia" },
  openGraph: {
    title: "Quedadas de fotografía en Valencia: por qué cuesta tanto encontrar con quién salir a hacer fotos",
    description:
      "La fotografía es una afición que se practica sola casi por defecto. Qué dice la propia comunidad fotográfica sobre salir en grupo, qué ya existe en Valencia y cómo lo estamos planteando en Unyona.",
    url: "https://unyona.com/blog/fotografia-en-valencia",
    siteName: "Unyona",
    locale: "es_ES",
    type: "article",
    publishedTime: post.date,
    images: [
      {
        url: "/images/logo_unyona.png",
        width: 1200,
        height: 630,
        alt: "Quedadas de fotografía en Valencia — Unyona",
      },
    ],
  },
};

const fuentes = [
  {
    label: "Jorge Císcar Photography — “La importancia de las quedadas fotográficas”",
    href: "https://www.jorgeciscar.com/importancia-quedadas-fotograficas/",
  },
  {
    label: "APFONA — “¿Qué aporta la fotografía al proceso de la socialización?”",
    href: "https://apfona.org/blog/crecimiento-fotografico/aporta-la-fotografia-al-proceso-de-la-socializacion/",
  },
];

const proseP = "text-[#455A64] dark:text-[#9BA6AD] leading-[1.85] text-[16px] md:text-[17px] mb-6";
const proseH2 = "font-poppins text-2xl md:text-[28px] font-bold text-[#263238] dark:text-white mt-14 mb-5 leading-snug";
const strong = "text-[#263238] dark:text-white font-bold";

export default function FotografiaEnValenciaPage() {
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
              "@id": "https://unyona.com/blog/fotografia-en-valencia",
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
            Fotografía · Valencia
          </span>
          <h1 className="font-poppins text-3xl md:text-4xl font-black text-[#263238] dark:text-white mb-5 leading-tight">
            Quedadas de fotografía en Valencia: por qué cuesta tanto encontrar con quién salir a hacer fotos
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
              Coges la cámara, sales, disparas, vuelves a casa y editas solo. Otra vez.
            </p>

            <p className={proseP}>
              De todas las aficiones, la fotografía es de las que más fácil se vuelven solitarias
              por diseño: no hace falta nadie más para salir a hacer fotos, así que casi nunca sale
              nadie más contigo. El resultado es una afición que, sostenida en el tiempo, puede
              acabar pareciéndose más a una tarea que a un plan.
            </p>

            <h2 className={proseH2}>Por qué la fotografía es una afición tan solitaria</h2>

            <p className={proseP}>
              No es que a los fotógrafos no les guste la compañía — es que encontrarla es más
              difícil de lo que parece. Hace falta alguien con horarios compatibles, un nivel
              parecido (o con ganas de aprender juntos, no de competir) y el mismo interés
              concreto: no es lo mismo buscar compañía para fotografía nocturna que para retrato
              callejero o paisaje. Cuando esa combinación no aparece en tu grupo de amigos —lo más
              habitual—, la alternativa por defecto es salir solo o no salir.
            </p>

            <h2 className={proseH2}>Lo que dice la propia comunidad fotográfica</h2>

            <p className={proseP}>
              No hace falta especular sobre esto: la comunidad fotográfica lleva años
              escribiendo sobre ello. El fotógrafo{" "}
              <a
                href="https://www.jorgeciscar.com/importancia-quedadas-fotograficas/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                Jorge Císcar
              </a>{" "}
              enumera, tras años evitando quedadas por obligaciones personales, los motivos por
              los que acabó arrepintiéndose de no haber salido antes en grupo: conocer gente que
              comparte la misma pasión, aprender de otros y enseñar lo propio, conseguir tomas que
              serían imposibles en solitario (como el light painting), tener compañía en
              situaciones de riesgo —fotografía nocturna, paisaje en zonas apartadas— y poder
              probar equipo que no es tuyo. Su conclusión resume bien el ambiente que describe:{" "}
              <strong className={strong}>
                &ldquo;a la mayoría de fotógrafos no les importa compartir sus
                conocimientos&rdquo;
              </strong>
              .
            </p>

            <p className={proseP}>
              En la misma línea, el análisis de{" "}
              <a
                href="https://apfona.org/blog/crecimiento-fotografico/aporta-la-fotografia-al-proceso-de-la-socializacion/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#61DBD6] font-semibold hover:underline"
              >
                APFONA
              </a>{" "}
              sobre fotografía y socialización señala que la experiencia de practicarla{" "}
              <strong className={strong}>
                &ldquo;enriquece el proceso de socialización entre individuos que comparten su
                pasión&rdquo;
              </strong>
              , y que las salidas en grupo permiten conectar con otros y construir vínculos de
              comunidad, además de aprender de perspectivas distintas a la propia.
            </p>

            <h2 className={proseH2}>Lo que ya existe en Valencia (y por qué no siempre alcanza)</h2>

            <p className={proseP}>
              Valencia tiene comunidad fotográfica activa: desde asociaciones con años de
              recorrido como el Foto Club Valencia, que organiza quedadas de fotografía callejera,
              nocturna y de paisaje seguidas de sesiones de análisis conjunto, hasta grupos más
              informales montados por aficionados —de WhatsApp, de Facebook— centrados en salidas
              y rutas fotográficas puntuales.
            </p>

            <p className={proseP}>
              Lo que falla no es que no exista comunidad, es lo de siempre: coordinar una quedada
              nueva cada vez que te apetece salir, o depender de que un grupo concreto tenga
              actividad programada justo cuando a ti te viene bien. Si tu interés es muy
              específico —fotografía analógica, retrato urbano, larga exposición— encontrar a
              alguien con quien coincidir de verdad sigue siendo, muchas veces, cuestión de suerte.
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
                  valorar ni feed que alimentar. Lo que importa es qué tipo de fotografía te
                  interesa y con quién quieres salir a practicarla — no un portfolio que enseñar.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Si dices que vas, vas.</strong> Una quedada de
                  fotografía nocturna con una sola persona que confirma y no aparece deja de ser
                  segura. Diseñamos alrededor de eso, no lo ignoramos.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#61DBD6] mt-1.5 shrink-0" aria-hidden="true">&bull;</span>
                <span className={proseP + " mb-0"}>
                  <strong className={strong}>Sin feed. Sin peaje. Sin dueño que la estropee.</strong>{" "}
                  No hay scroll infinito que compita con salir a hacer fotos de verdad, no
                  cobramos a quien organiza una quedada, y no vendemos tu atención a nadie.
                </span>
              </li>
            </ul>

            <p className={proseP}>
              Y una regla que aplicamos a nosotros mismos: en Unyona{" "}
              <strong className={strong}>cualquiera puede organizar una quedada</strong>, no solo
              cuentas de empresa. La salida fotográfica es de quien la crea, bajo su
              responsabilidad — Unyona es el canal por el que os encontráis, no quien decide qué
              pasa en ella.
            </p>

            <h2 className={proseH2}>Por dónde empieza esto en Valencia</h2>

            <p className={proseP}>
              Arrancamos por el eje <strong className={strong}>Ruzafa – Ciutat Vella – Cabanyal</strong>:
              la zona con más vida de calle y variedad visual de la ciudad —arquitectura, luz,
              gente— y donde más fácil es que una quedada fotográfica reúna a gente con ganas de
              verdad, no solo de mirar el móvil mientras espera. No es una elección al azar — es
              donde ya está pasando la vida social que queremos ayudar a sostener, no sustituir.
            </p>

            <h2 className={proseH2}>Lo que no te vamos a prometer</h2>

            <p className={proseP}>
              Nada de esto funciona si te mentimos desde el principio, así que dos cosas claras:
            </p>

            <p className={proseP}>
              Aún somos pocos. Si te apuntas hoy, no vas a encontrar un mapa lleno de fotógrafos
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
                data-umami-event="cta-blog-fotografia-valencia"
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
