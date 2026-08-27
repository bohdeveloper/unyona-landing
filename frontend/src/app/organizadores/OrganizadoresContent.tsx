"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Ban, Download, MessageCircle, Unlock,
  ArrowLeft, Check,
} from "lucide-react";

const promesa = [
  {
    icon: Ban,
    title: "Nunca pagarás por organizar",
    body: "Cero peaje por crear tu grupo y publicar quedadas. Es un compromiso por escrito y público, no una promesa en un correo. Pase lo que pase con el modelo de negocio.",
    accent: "#61DBD6",
  },
  {
    icon: Download,
    title: "Tus datos son tuyos",
    body: "Puedes exportar tus participantes y tus quedadas en CSV cuando quieras, sin pedir permiso. Justo lo contrario de lo que hace hoy la plataforma que te cobra.",
    accent: "#FF8781",
  },
  {
    icon: MessageCircle,
    title: "Detrás hay una persona",
    body: "No un soporte automático. Escribes y te responde el fundador, con una llamada al mes entre los organizadores para decidir qué se construye.",
    accent: "#61DBD6",
  },
  {
    icon: Unlock,
    title: "Cero exclusividad",
    body: "Sigue en Meetup, Telegram o donde estés. Unyona es un canal más, no un reemplazo. No te pedimos que muevas tu comunidad ni que dejes tu casa de años.",
    accent: "#FF8781",
  },
];

const noPrometemos = [
  "No te prometemos asistentes. Aún somos pocos y puede que a tu primera quedada venga poca gente. No te vamos a dar una cifra porque nos la estaríamos inventando.",
  "No vas a ganar dinero con esto. Unyona no tiene cobros. Si algún día los tiene, tú seguirás sin pagar por organizar.",
  "El fundador no va a ir a tus quedadas. No es su sitio: la quedada es tuya y la llevas tú. Lo decimos desde el minuto uno, no que lo descubras el día del evento.",
];

const pedimos = [
  "Una quedada. La que ya tenías pensada, publicada también en Unyona. La montamos nosotros por ti.",
  "Que la anuncies a tu gente por tu canal, con tus palabras.",
  "Quince minutos después para contarnos qué ha fallado. Eso es lo más valioso que nos das.",
];

export default function OrganizadoresContent() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden bg-gradient-to-br from-[#e8faf9] via-white to-white dark:from-[#0d2b2a] dark:via-[#1a1a1a] dark:to-[#1a1a1a]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#61DBD6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#61DBD6] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#61DBD6]/30 bg-[#61DBD6]/8 text-[#46D4D0] dark:text-[#61DBD6] text-xs font-semibold tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#61DBD6] animate-pulse" />
            Para organizadores · Valencia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-poppins text-4xl md:text-6xl font-black leading-[1.08] text-[#263238] dark:text-white mb-6"
          >
            Organiza sin peaje.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#FF8781]">
              Sin dueño que lo estropee.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed max-w-2xl mx-auto"
          >
            Unyona no te cobrará nunca por organizar, tus datos son tuyos y te los puedes llevar cuando quieras,
            y detrás hay una persona a la que puedes escribir — a cambio de que pruebes una quedada,
            <span className="text-[#263238] dark:text-white font-semibold"> sabiendo que aún somos pocos.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9"
          >
            <a
              href="mailto:hello@unyona.com?subject=Organizar%20en%20Unyona%20(Valencia)"
              data-umami-event="cta-organizadores-escribir"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-[#0d2b2a] font-bold text-base rounded-2xl shadow-lg shadow-[#61DBD6]/20 hover:scale-[1.03] transition-transform"
            >
              Escríbeme y lo hablamos
            </a>
            <p className="mt-3 text-xs text-[#607D8B] dark:text-[#546E7A]">
              Sin formularios ni compromisos. Un correo a una persona.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── La promesa ── */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-4">
              Lo que te damos
            </span>
            <h2 className="font-poppins text-3xl md:text-5xl font-black text-[#263238] dark:text-white">
              La palanca no es el precio. Es la propiedad.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promesa.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-gray-100 dark:border-white/8 bg-[#F7F9FA] dark:bg-[#2B2B2B]"
                >
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
                    {item.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lo que NO prometemos (honestidad = diferencial) ── */}
      <section className="py-20 px-6 bg-[#F7F9FA] dark:bg-[#2B2B2B]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF8781]/10 text-[#FF8781] text-sm font-semibold tracking-widest uppercase mb-4">
              Lo que no te vamos a decir
            </span>
            <h2 className="font-poppins text-3xl md:text-4xl font-black text-[#263238] dark:text-white">
              Preferimos un no ahora que un sí de compromiso.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {noPrometemos.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/8"
              >
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#FF8781]/15 flex items-center justify-center">
                  <Ban className="w-3.5 h-3.5 text-[#FF8781]" />
                </span>
                <p className="text-[#455A64] dark:text-[#9BA6AD] leading-relaxed text-sm">{t}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Qué te pedimos ── */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-4">
              Lo que te pedimos
            </span>
            <h2 className="font-poppins text-3xl md:text-4xl font-black text-[#263238] dark:text-white">
              Poco, y con fecha. Sin exclusividad ni contratos.
            </h2>
          </div>

          <div className="flex flex-col gap-4 mb-12">
            {pedimos.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#61DBD6]/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#46D4D0]" />
                </span>
                <p className="text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">{t}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="mailto:hello@unyona.com?subject=Organizar%20en%20Unyona%20(Valencia)"
              data-umami-event="cta-organizadores-escribir-final"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-[#0d2b2a] font-bold text-base rounded-2xl shadow-lg shadow-[#61DBD6]/20 hover:scale-[1.03] transition-transform"
            >
              Escríbeme y lo hablamos
            </a>
            <p className="mt-4 text-sm text-[#607D8B] dark:text-[#9BA6AD]">
              O vuelve a{" "}
              <Link href="/" className="text-[#61DBD6] font-semibold hover:underline">
                la página principal
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
