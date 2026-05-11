"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";

const planes = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Para quien quiere descubrir Unyona y conectar localmente.",
    features: [
      "1 perfil activo",
      "Radar local básico",
      "Unirse a grupos existentes",
      "Chat 1 a 1",
      "Hasta 3 quedadas al mes",
    ],
    cta: "Empezar gratis",
    highlight: false,
  },
  {
    name: "Plus",
    price: { monthly: 4.99, yearly: 3.99 },
    description: "Para quien quiere sacarle todo el partido a la comunidad.",
    features: [
      "Hasta 3 perfiles activos",
      "Radar local ampliado",
      "Crear grupos de interés",
      "Quedadas ilimitadas",
      "Chat de evento",
      "Mensajes efímeros post-quedada",
    ],
    cta: "Probar 30 días gratis",
    highlight: true,
  },
  {
    name: "Organización",
    price: { monthly: null, yearly: null },
    description: "Para clubs, colectivos, asociaciones y marcas locales.",
    features: [
      "Página de organización verificada",
      "Eventos públicos ilimitados",
      "Estadísticas de comunidad",
      "Campañas y comunicaciones",
      "Soporte prioritario",
      "Gestión de equipo",
    ],
    cta: "Hablar con nosotros",
    highlight: false,
  },
];

export default function Suscripcion() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="precios"
      className="relative py-28 px-6 bg-[#F7F9FA] dark:bg-[#2B2B2B] overflow-hidden"
    >
      {/* Glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#61DBD6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            Precios
          </span>
          <h2 className="font-poppins text-5xl md:text-6xl font-black text-[#263238] dark:text-white mb-4">
            Simple y transparente
          </h2>
          <p className="text-xl text-[#607D8B] dark:text-[#9BA6AD] max-w-2xl mx-auto">
            Empieza gratis. Mejora cuando Unyona forme parte de tu día a día.
          </p>

          {/* Toggle mensual/anual */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!yearly ? "text-[#263238] dark:text-white" : "text-[#607D8B] dark:text-[#9BA6AD]"}`}>
              Mensual
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                yearly ? "bg-[#61DBD6]" : "bg-gray-200 dark:bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                  yearly ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${yearly ? "text-[#263238] dark:text-white" : "text-[#607D8B] dark:text-[#9BA6AD]"}`}>
              Anual{" "}
              <span className="text-[#61DBD6] font-bold">-20%</span>
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planes.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-br from-[#61DBD6] to-[#46D4D0] border-transparent text-white shadow-2xl shadow-[#61DBD6]/25 md:scale-105"
                  : "bg-white dark:bg-[#1a1a1a] border-gray-100 dark:border-white/8 shadow-sm hover:shadow-lg"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-white text-[#46D4D0] text-xs font-bold rounded-full shadow">
                    ⭐ Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-poppins text-2xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-[#263238] dark:text-white"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? "text-white/75" : "text-[#607D8B] dark:text-[#9BA6AD]"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                {plan.price.monthly !== null ? (
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black">
                      {plan.price.monthly === 0
                        ? "0€"
                        : `${yearly ? plan.price.yearly : plan.price.monthly}€`}
                    </span>
                    {plan.price.monthly !== 0 && (
                      <span className={`mb-2 text-sm ${plan.highlight ? "text-white/70" : "text-[#607D8B] dark:text-[#9BA6AD]"}`}>
                        /mes
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-3xl font-black text-[#263238] dark:text-white">A medida</span>
                )}
              </div>

              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlight ? "text-white" : "text-[#61DBD6]"
                      }`}
                    />
                    <span className={plan.highlight ? "text-white/90" : "text-[#607D8B] dark:text-[#9BA6AD]"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`block text-center px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                  plan.highlight
                    ? "bg-white text-[#46D4D0] hover:shadow-lg"
                    : "bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white hover:shadow-md hover:shadow-[#61DBD6]/30"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#607D8B] dark:text-[#9BA6AD] mt-10"
        >
          Sin tarjeta de crédito para empezar. Cancela cuando quieras.
        </motion.p>
      </div>
    </section>
  );
}