"use client";

import { motion } from "motion/react";
import { Ban, Download, MessageCircle, Unlock } from "lucide-react";

const promesa = [
  {
    icon: Ban,
    title: "Nunca pagarás por organizar",
    body: "Cero peaje por crear tu grupo y publicar quedadas. Por escrito y público, pase lo que pase con el modelo de negocio.",
    accent: "#61DBD6",
  },
  {
    icon: Download,
    title: "Tus datos son tuyos",
    body: "Exporta tus participantes y tus quedadas en CSV cuando quieras, sin pedir permiso. Lo contrario de lo que hace hoy la plataforma que te cobra.",
    accent: "#FF8781",
  },
  {
    icon: MessageCircle,
    title: "Detrás hay una persona",
    body: "No un soporte automático. Escribes y te responde el fundador, con una llamada al mes entre los organizadores.",
    accent: "#61DBD6",
  },
  {
    icon: Unlock,
    title: "Cero exclusividad",
    body: "Sigue en Meetup, Telegram o donde estés. Unyona es un canal más, no un reemplazo. No te pedimos que muevas tu comunidad.",
    accent: "#FF8781",
  },
];

export default function Organizadores() {
  return (
    <section
      id="organizadores"
      className="relative py-28 px-6 bg-white dark:bg-[#1a1a1a] overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#61DBD6]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            ¿Organizas quedadas? · Valencia
          </span>
          <h2 className="font-poppins text-4xl md:text-6xl font-black text-[#263238] dark:text-white mb-5 leading-tight">
            Organiza sin peaje.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#FF8781]">
              Sin dueño que lo estropee.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed max-w-2xl mx-auto">
            No te cobraremos nunca por organizar, tus datos son tuyos y te los llevas cuando quieras, y detrás
            hay una persona a la que escribir — a cambio de que pruebes una quedada,
            <span className="text-[#263238] dark:text-white font-semibold"> sabiendo que aún somos pocos.</span>
          </p>
        </motion.div>

        {/* Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {promesa.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 p-6 rounded-2xl border border-gray-100 dark:border-white/8 bg-[#F7F9FA] dark:bg-[#2B2B2B]"
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent}bb)` }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins text-lg font-bold text-[#263238] dark:text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed text-sm">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Honestidad + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD] max-w-2xl mx-auto mb-7 leading-relaxed">
            Lo que <span className="font-semibold text-[#263238] dark:text-white">no</span> te vamos a decir:
            no te prometemos asistentes (aún somos pocos), no vas a ganar dinero (no hay cobros), y el fundador
            no va a ir a tus quedadas — la quedada es tuya y la llevas tú.
          </p>
          <a
            href="mailto:hello@unyona.com?subject=Organizar%20en%20Unyona%20(Valencia)"
            data-umami-event="cta-organizadores"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold text-base rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-[#61DBD6]/30 transition-all"
          >
            Escríbeme y lo hablamos
          </a>
          <p className="mt-3 text-xs text-[#607D8B] dark:text-[#546E7A]">
            Sin formularios ni compromisos. Un correo a una persona.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
