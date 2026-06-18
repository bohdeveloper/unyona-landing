"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

/*
  CAPTURAS DE PANTALLA
  --------------------
  Coloca los screenshots reales en:
    frontend/public/images/app/screen-feed.png
    frontend/public/images/app/screen-perfil.png
    frontend/public/images/app/screen-quedada.png
    frontend/public/images/app/screen-chat.png

  Formato recomendado: PNG o WebP, recortado a 390×844 px (ratio iPhone standard).
  Mientras no existan los archivos, se muestra el placeholder de gradiente definido abajo.
*/

interface Screen {
  id: string;
  label: string;
  description: string;
  imageSrc: string | null;
  placeholderGradient: string;
  placeholderIcon: React.ReactNode;
  accentColor: string;
}

const SCREENS: Screen[] = [
  {
    id: "feed",
    label: "Descubre personas cercanas",
    description: "Personas con tus mismas aficiones a poca distancia, sin swipe infinito",
    imageSrc: "/images/app/screen-feed.png",
    placeholderGradient: "from-[#0d2b2a] via-[#163332] to-[#0d2b2a]",
    accentColor: "#61DBD6",
    placeholderIcon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#61DBD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    id: "perfil",
    label: "Tu perfil de aficiones",
    description: "Un perfil real: lo que te gusta, donde estás, cómo quieres quedar",
    imageSrc: "/images/app/screen-perfil.png",
    placeholderGradient: "from-[#2b0d1a] via-[#33162a] to-[#2b0d1a]",
    accentColor: "#FF8781",
    placeholderIcon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF8781" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: "quedada",
    label: "Organiza una quedada",
    description: "Propón un plan, pon aforo, confirma asistencia — del chat a la realidad",
    imageSrc: null, // → "/images/app/screen-quedada.png"
    placeholderGradient: "from-[#0d1a2b] via-[#163026] to-[#0d1a2b]",
    accentColor: "#61DBD6",
    placeholderIcon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#61DBD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Chat del evento",
    description: "Mensajes efímeros post-quedada: el momento se vive, no se archiva",
    imageSrc: null, // → "/images/app/screen-chat.png"
    placeholderGradient: "from-[#1a2b0d] via-[#263316] to-[#1a2b0d]",
    accentColor: "#FF8781",
    placeholderIcon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF8781" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

function PhoneFrame({ screen, index }: { screen: Screen; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4"
    >
      {/* Phone shell */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          width: 200,
          height: 433,
          background: "#1a1a1a",
          border: "8px solid #2a2a2a",
          boxShadow: `0 32px 64px ${screen.accentColor}22, 0 4px 24px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Status bar with camera — white stripe so navbar is visible below */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center bg-white" style={{ height: 22 }}>
          <div className="w-10 h-3 rounded-full bg-[#1a1a1a]" />
        </div>

        {/* Screen content */}
        {screen.imageSrc ? (
          <Image
            src={screen.imageSrc}
            alt={screen.label}
            fill
            className="object-fill"
            sizes="200px"
          />
        ) : (
          /* Placeholder: reemplazar por Image cuando tengas el screenshot */
          <div className={`w-full h-full bg-gradient-to-br ${screen.placeholderGradient} flex flex-col items-center justify-center gap-3`}>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${screen.accentColor}18`, border: `1px solid ${screen.accentColor}30` }}
            >
              {screen.placeholderIcon}
            </div>
            <p className="text-center text-[10px] px-4 leading-relaxed" style={{ color: `${screen.accentColor}80` }}>
              Captura pendiente
            </p>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="text-center max-w-[180px]">
        <p className="text-sm font-semibold text-[#263238] dark:text-white leading-tight mb-1">
          {screen.label}
        </p>
        <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] leading-snug">
          {screen.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AppReal() {
  const [allScreensReady] = useState(SCREENS.every((s) => s.imageSrc !== null));

  return (
    <section
      id="app-real"
      className="relative py-28 px-6 bg-[#F7F9FA] dark:bg-[#2B2B2B] overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#61DBD6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#61DBD6] animate-pulse" />
            {allScreensReady ? "Capturas reales de la app" : "La app en desarrollo"}
          </div>
          <h2 className="font-poppins text-4xl md:text-6xl font-black text-[#263238] dark:text-white mb-4 leading-tight">
            Así se ve Unyona<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#FF8781]">
              por dentro
            </span>
          </h2>
          <p className="text-lg text-[#607D8B] dark:text-[#9BA6AD] max-w-xl mx-auto leading-relaxed">
            No ilustraciones genéricas. Esto es la app real que se está construyendo — en desarrollo activo, lista para la beta.
          </p>
        </motion.div>

        {/* Phone frames grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {SCREENS.map((screen, i) => (
            <PhoneFrame key={screen.id} screen={screen} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD]">
            ¿Quieres verla funcionar antes del lanzamiento?{" "}
            <a
              href="#lista-espera"
              className="text-[#61DBD6] font-semibold hover:underline"
              data-umami-event="cta-appreal-lista-espera"
            >
              Únete a la lista de espera →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
