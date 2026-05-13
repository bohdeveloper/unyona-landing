"use client";

import { motion } from "motion/react";
import { UserCircle, Building2, AlertCircle } from "lucide-react";

const profiles = [
  {
    icon: UserCircle,
    title: "Personas que quieren conexiones reales",
    description:
      "Cansado del scroll infinito y los likes vacíos. Si quieres conversaciones reales con personas que comparten tus pasiones, Unyona es para ti.",
    accent: "#61DBD6",
    tags: ["Intereses comunes", "Sin algoritmos", "Quedadas reales"],
  },
  {
    icon: Building2,
    title: "Organizaciones y colectivos",
    description:
      "Clubs deportivos, asociaciones culturales, marcas locales. Crea comunidad real alrededor de tu proyecto, organiza eventos y conecta con tu audiencia.",
    accent: "#FF8781",
    tags: ["Eventos públicos", "Comunidad local", "Campañas"],
  },
];

const valores = [
  {
    value: "Sin algoritmo de engagement",
    detail: "No vendemos tu atención al mejor postor. Tu decides con quién conectar.",
  },
  {
    value: "Del online al offline",
    detail: "Nuestro objetivo real es la experiencia que se produce. No el tiempo de pantalla.",
  },
  {
    value: "Privacidad completa",
    detail: "Múltiples perfiles, contextos separados. Tú controlas qué compartes y con quién.",
  },
];

export default function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="relative py-28 px-6 bg-white dark:bg-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
        {[...Array(20)].map((_, i) => (
          <line key={`v-${i}`} x1={`${i * 5.5}%`} y1="0" x2={`${i * 5.5}%`} y2="100%"
            stroke="#61DBD6" strokeWidth="1" />
        ))}
        {[...Array(12)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={`${i * 9}%`} x2="100%" y2={`${i * 9}%`}
            stroke="#61DBD6" strokeWidth="1" />
        ))}
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            Para quién es
          </span>
          <h2 className="font-poppins text-5xl md:text-6xl font-black text-[#263238] dark:text-white mb-4 leading-tight">
            Construido para <br></br>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#FF8781]">
              personas reales
            </span>
          </h2>
          <p className="text-xl text-[#607D8B] dark:text-[#9BA6AD] max-w-2xl mx-auto">
            Unyona no es para todo el mundo. <br></br> Es para quien quiere vivir
            algo real más allá de la pantalla.
          </p>
        </motion.div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {profiles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl border border-gray-100 dark:border-white/8 bg-[#F7F9FA] dark:bg-[#2B2B2B] hover:shadow-lg transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)` }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-poppins text-xl font-bold text-[#263238] dark:text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-5">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${p.accent}15`, color: p.accent }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-gray-100 dark:border-white/8 bg-[#F7F9FA] dark:bg-[#2B2B2B] p-8 md:p-12"
        >
          <div className="flex items-center gap-2 mb-8">
            <AlertCircle className="w-5 h-5 text-[#61DBD6]" />
            <span className="font-poppins font-bold text-[#263238] dark:text-white text-lg">
              Nuestros principios
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valores.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="text-xl font-bold text-[#263238] dark:text-white mb-2 leading-tight">
                  {v.value}
                </div>
                <div className="text-sm text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed">
                  {v.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}