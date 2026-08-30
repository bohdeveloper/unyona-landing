/**
 * Fuente única de las preguntas frecuentes del home (sección `#faq`).
 *
 * IMPORTANTE (spec.md §3.15 — nada inventado / dato inventado si el JSON-LD
 * diverge del texto visible): tanto `Faq.tsx` (render visual) como el
 * `FAQPage` JSON-LD de `src/app/page.tsx` importan este mismo array, así que
 * pregunta y respuesta son EXACTAMENTE el mismo texto en ambos sitios por
 * construcción. No dupliques este contenido en otro archivo.
 *
 * `answerHtml` es texto plano salvo en la pregunta de datos, que incluye un
 * único enlace interno a /privacidad — Google admite HTML básico (<a>, <b>,
 * <strong>, <em>...) dentro de `acceptedAnswer.text` en FAQPage.
 */
export interface FaqItem {
  question: string;
  answerHtml: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "¿Qué es Unyona?",
    answerHtml:
      "Una red social local para conocer personas con tus mismas aficiones cerca de ti y quedar en el mundo real. Tu afición, no tu foto: encuentras un plan, no un perfil que valorar.",
  },
  {
    question: "¿Por qué solo en Valencia?",
    answerHtml:
      "Porque una app local vale por su densidad, no por su tamaño. Preferimos que en tu ciudad haya gente de verdad con quien quedar antes que abrir en todas partes y que veas un mapa vacío. Empezamos por Valencia y vamos ciudad a ciudad.",
  },
  {
    question: "¿Y si no vivo en Valencia?",
    answerHtml:
      "Apúntate igual a la lista de espera. Te avisamos en cuanto lleguemos a tu ciudad — sin spam, sin compromiso.",
  },
  {
    question: "¿Es gratis?",
    answerHtml:
      "Sí, la beta es gratuita. No hay coste por registrarte ni por participar en la lista de espera.",
  },
  {
    question: "¿Qué es un organizador en Unyona?",
    answerHtml:
      "Cualquier usuario puede crear una quedada y ser su organizador — no hace falta ser una empresa ni pedir permiso. La quedada es suya y va bajo su responsabilidad; Unyona es el canal, no quien la organiza.",
  },
  {
    question: "¿Hay perfiles múltiples o identidades distintas?",
    answerHtml: "No. Un perfil por cuenta: el tuyo, con tus aficiones, tu zona y tu edad.",
  },
  {
    question: "¿Qué pasa con mis datos?",
    answerHtml:
      'Puedes leer con detalle qué tratamos y por qué en nuestra <a href="/privacidad">Política de Privacidad</a>. No vendemos tus datos ni los usamos para publicidad de terceros.',
  },
  {
    question: "¿Cuándo puedo empezar a usarla?",
    answerHtml:
      "Aún estamos en fase de lista de espera. Apúntate con tu email y tu ciudad y te avisamos por correo en cuanto puedas entrar — sin fecha exacta que prometerte todavía, pero serás de los primeros en saberlo.",
  },
];
