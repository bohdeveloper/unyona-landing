"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookies-accepted")) {
        setVisible(true);
      }
    } catch {
      // localStorage no disponible (modo privado estricto)
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem("cookies-accepted", "1");
    } catch { /* noop */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-white dark:bg-[#1a2428]
                 border-t border-gray-200 dark:border-[#61DBD6]/15
                 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">

        {/* Icono + texto */}
        <div className="flex gap-4 items-start">
          <span className="mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-[#61DBD6]/10 dark:bg-[#61DBD6]/15 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#61DBD6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="8"  cy="9"  r="1" fill="#61DBD6" stroke="none"/>
              <circle cx="15" cy="8"  r="1.5" fill="#61DBD6" stroke="none"/>
              <circle cx="14" cy="15" r="1" fill="#61DBD6" stroke="none"/>
              <circle cx="9"  cy="15" r="1.5" fill="#61DBD6" stroke="none"/>
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-[#263238] dark:text-white mb-1">
              Uso de cookies
            </p>
            <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed">
              Unyona usa solo cookies técnicas esenciales para el funcionamiento del sitio. No hay seguimiento ni publicidad.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <a
            href="/cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-white/20
                       text-sm text-[#607D8B] dark:text-[#9BA6AD]
                       hover:border-[#61DBD6] hover:text-[#61DBD6] dark:hover:border-[#61DBD6] dark:hover:text-[#61DBD6]
                       transition-colors whitespace-nowrap"
          >
            Más información
          </a>
          <button
            onClick={accept}
            className="px-5 py-2 bg-[#61DBD6] hover:bg-[#46D4D0]
                       text-[#1a1a1a] text-sm font-bold rounded-full
                       transition-colors whitespace-nowrap"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
