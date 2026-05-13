"use client";

import { motion } from "motion/react";
import { UserPlus, Hash, MapPin, Calendar } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Crea tu cuenta y añade perfiles",
    description:
      "En minutos y sin complicaciones. Elige tu perfil personal, profesional o anónima. Dales personalidad, muestra tu identidad, lo que te gusta y sabes hacer.",
    accent: "#61DBD6",
  },
  {
    icon: Hash,
    step: "02",
    title: "Define tus intereses y zona",
    description:
      "¿Fotografía, trail, código, cocina...? Cuéntanos qué te mueve y dónde estás. Si organizas campañas, eventos, etc. Dinos que quieres encontrar como profesional. El radar local empieza a trabajar.",
    accent: "#FF8781",
  },
  {
    icon: MapPin,
    step: "03",
    title: "Personas que están cerca",
    description:
      "El radar local te muestra quién comparte tus intereses en tu zona en tiempo real. Conecta, sigue perfiles y únete a grupos.",
    accent: "#61DBD6",
  },
  {
    icon: Calendar,
    step: "04",
    title: "Queda en persona",
    description:
      "Del chat a la realidad. Organiza o únete a una quedada, confirma tu asistencia y vive la experiencia. Eso es Unyona.",
    accent: "#FF8781",
  },
];

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="relative py-28 px-6 bg-[#F7F9FA] dark:bg-[#2B2B2B] overflow-hidden"
    >

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            Proceso
          </span>
          <h2 className="font-poppins text-5xl md:text-6xl font-black text-[#263238] dark:text-white mb-4">
            Cómo funciona
          </h2>
          <p className="text-xl text-[#607D8B] dark:text-[#9BA6AD] max-w-2xl mx-auto">
            Una red social humana y lo más natural posible.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            viewport={{ once: true }}
            style={{ transformOrigin: "top" }}
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#61DBD6] via-[#FF8781] to-[#61DBD6] opacity-30"
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/*
                    Truco de orden CSS:
                    - `order-first` sitúa el icono antes que la tarjeta en móvil (flex-col → aparece arriba, centrado).
                    - `sm:order-none` devuelve el orden al DOM en escritorio; el layout alternado
                      (flex-row / flex-row-reverse) ya posiciona el icono en el centro visualmente.
                  */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 self-center order-first sm:order-none"
                    style={{
                      background: `linear-gradient(135deg, ${step.accent}, ${step.accent}bb)`,
                      boxShadow: `0 8px 24px ${step.accent}33`,
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content card */}
                  <div className={`flex-1 ${isEven ? "sm:text-right" : "sm:text-left"}`}>
                    <div
                      className={`p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/8 shadow-sm hover:shadow-md transition-shadow w-full sm:max-w-sm ${
                        isEven ? "sm:ml-auto" : "sm:mr-auto"
                      }`}
                    >
                      <span
                        className="text-5xl font-black leading-none"
                        style={{ color: `${step.accent}22` }}
                      >
                        {step.step}
                      </span>
                      <h3 className="font-poppins text-xl font-bold text-[#263238] dark:text-white mt-1 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty spacer (desktop only) */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-[#607D8B] dark:text-[#9BA6AD] max-w-2xl mx-auto mb-6">
            Somos seres humanos, sociales, esta en nuestro ADN.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-[#61DBD6]/30 transition-all"
          >
            Empieza ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
}