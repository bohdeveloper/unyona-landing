"use client";

import { motion } from "motion/react";
import { Users, Calendar, Building2, UserCircle, AlertCircle } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Tú, sin filtros",
    description:
      "Una cuenta, múltiples identidades. Personal, profesional o anónimo. Sé tú mismo en cada contexto. Conecta por intereses, disfruta compartiéndolos en la vida real.",
    accent: "#61DBD6",
  },
  {
    icon: Calendar,
    title: "Queda cerca",
    description:
      "Tu entorno, tu zona, tu mundo. Crea o únete a planes reales en tu barrio o ciudad. Aforo, confirmaciones y recordatorios incluidos. Nuestro objetivo no es el like — es la experiencia real.",
    accent: "#FF8781",
  },
  {
    icon: Building2,
    title: "Comunidad real",
    description:
      "Chat uno a uno, en grupo o ligado a un evento. Mensajes efímeros post-quedada para vivir el momento, no archivarlo. Para clubs, colectivos y marcas que quieren conectar de verdad.",
    accent: "#61DBD6",
  },
];

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

const principios = [
  {
    value: "Sin algoritmo de engagement",
    detail: "No vendemos tu atención al mejor postor. Tú decides con quién conectar.",
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

export default function Producto() {
  return (
    <section
      id="producto"
      className="relative py-28 px-6 bg-white dark:bg-[#1a1a1a] overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #61DBD6 1.5px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-20 -left-32 w-80 h-80 bg-[#61DBD6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-[#FF8781]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">

        {/* ── BLOQUE 1: Qué es ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            La plataforma
          </span>
          <h2 className="font-poppins text-5xl md:text-7xl font-black text-[#263238] dark:text-white mb-6 leading-tight">
            No otra red social.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#FF8781]">
              Una red real.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-[#607D8B] dark:text-[#9BA6AD] max-w-3xl mx-auto leading-relaxed mb-2">
            Unyona no va de likes infinitos. Va de conocer gente, compartir intereses
            y pasar del online al offline.
          </p>
          <p className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] font-poppins text-xl md:text-2xl font-black dark:text-white mb-6 leading-tight">
            Más simple, más humana.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative p-8 rounded-2xl border border-gray-100 dark:border-white/8 bg-[#F7F9FA] dark:bg-[#2B2B2B] hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${item.accent}08, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 mb-5 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent}bb)` }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-poppins text-xl font-bold text-[#263238] dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
                <div
                  className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
                  style={{ background: item.accent }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── BLOQUE 2: Para quién ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF8781]/10 text-[#FF8781] text-sm font-semibold tracking-widest uppercase">
            Para quién
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {profiles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl border border-gray-100 dark:border-white/8 bg-[#F7F9FA] dark:bg-[#2B2B2B] hover:shadow-lg transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)` }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-poppins text-xl font-bold text-[#263238] dark:text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-5 text-sm">
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

        {/* ── BLOQUE 3: Principios ── */}
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
            {principios.map((v, i) => (
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
