"use client";

import { motion } from "motion/react";
import { Users, MapPin, Hash, Calendar, MessageCircle, Building2 } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Múltiples perfiles",
    description:
      "Una cuenta, varias identidades. Personal, profesional, hobby o anónimo parcial. Sé tú mismo en cada contexto sin mezclar mundos.",
    accent: "#61DBD6",
  },
  {
    icon: MapPin,
    title: "Local first",
    description:
      "Tu radio, tu mundo. Conecta con personas en tu barrio, ciudad o zona. La distancia importa — la proximidad lo cambia todo.",
    accent: "#FF8781",
  },
  {
    icon: Hash,
    title: "Por intereses",
    description:
      "De fotografía a trail, de código a gastronomía. Encuentra tu tribu y únete a grupos que comparten lo que te apasiona.",
    accent: "#61DBD6",
  },
  {
    icon: Calendar,
    title: "Motor de quedadas",
    description:
      "Crea o únete a planes reales. Con aforo, confirmaciones y recordatorios. Porque nuestro KPI no son los likes — es la quedada.",
    accent: "#FF8781",
  },
  {
    icon: MessageCircle,
    title: "Chat natural",
    description:
      "Uno a uno, en grupo o ligado a un evento. Mensajes efímeros post-quedada para que el foco esté en vivir, no en archivar.",
    accent: "#61DBD6",
  },
  {
    icon: Building2,
    title: "Organizaciones",
    description:
      "Para clubs, colectivos, marcas y asociaciones. Crea páginas, eventos públicos y campañas. Conecta con tu comunidad real.",
    accent: "#FF8781",
  },
];

export default function Producto() {
  return (
    <section
      id="producto"
      className="relative py-28 px-6 bg-white dark:bg-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #61DBD6 1.5px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Accent blobs */}
      <div className="absolute top-20 -left-32 w-80 h-80 bg-[#61DBD6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-[#FF8781]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">

        {/* Header */}
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
            No otro scroll.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#FF8781]">
              Algo real.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-[#607D8B] dark:text-[#9BA6AD] max-w-3xl mx-auto leading-relaxed">
            Unyona no va de likes infinitos. Va de conocer gente, compartir intereses
            y pasar del online al offline. Así de simple.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* Hover glow */}
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

                {/* Corner accent */}
                <div
                  className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
                  style={{ background: item.accent }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[#607D8B] dark:text-[#9BA6AD] text-lg">
            Sin algoritmo de engagement. Sin métricas de atención.
            <span className="font-semibold text-[#263238] dark:text-white"> Solo personas reales.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
