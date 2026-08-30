"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative py-28 px-6 bg-[#F7F9FA] dark:bg-[#2B2B2B] overflow-hidden"
    >
      <div className="absolute top-10 -right-24 w-72 h-72 bg-[#FF8781]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-72 h-72 bg-[#61DBD6]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            FAQ
          </span>
          <h2 className="font-poppins text-4xl md:text-5xl font-black text-[#263238] dark:text-white mb-4 leading-tight">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-[#607D8B] dark:text-[#9BA6AD] max-w-xl mx-auto">
            Lo que la gente nos pregunta antes de apuntarse.
          </p>
        </motion.div>

        {/* Acordeón */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            const buttonId = `${baseId}-faq-button-${i}`;
            const panelId = `${baseId}-faq-panel-${i}`;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : i * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-100 dark:border-white/8 bg-white dark:bg-[#1a1a1a] overflow-hidden"
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#61DBD6]"
                  >
                    <span className="font-poppins font-bold text-[#263238] dark:text-white text-base md:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 shrink-0 text-[#61DBD6] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                {/* Panel animado con CSS grid-template-rows: evita medir alturas en JS
                    y solo anima una propiedad de layout puntual en una interacción
                    discreta (no continua). Respeta prefers-reduced-motion vía
                    `motion-reduce:transition-none`. `inert` saca el contenido
                    (incluido el enlace a /privacidad de la pregunta 7) del orden de
                    tabulación y del árbol de accesibilidad mientras está colapsado. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-6 pb-5 text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed text-sm md:text-[15px] [&_a]:text-[#61DBD6] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
                      dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
