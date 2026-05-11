"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { MapPin, Users, Calendar } from "lucide-react";

/* ── Datos de perfiles simulados ── */
const PROFILES = [
  { id: 0, name: "Ana",    initial: "A", interest: "Fotografía",  color: "#61DBD6", x: 72,  y: 18  },
  { id: 1, name: "Martín", initial: "M", interest: "Trail",       color: "#FF8781", x: 88,  y: 46  },
  { id: 2, name: "Sofía",  initial: "S", interest: "Lectura",     color: "#61DBD6", x: 75,  y: 78  },
  { id: 3, name: "Rafa",   initial: "R", interest: "Fotografía",  color: "#FF8781", x: 28,  y: 82  },
  { id: 4, name: "Lola",   initial: "L", interest: "Cocina",      color: "#61DBD6", x: 12,  y: 48  },
  { id: 5, name: "Dani",   initial: "D", interest: "Música",      color: "#FF8781", x: 30,  y: 14  },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4],
];

const INTEREST_CHIPS = [
  "📸 Fotografía", "🏔️ Trail", "🎵 Música",
  "📚 Lectura", "🍳 Cocina", "🎮 Gaming",
  "🚴 Ciclismo", "🎨 Arte",
];

function ConnectionGraph() {
  const [activeProfile, setActiveProfile] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setActiveProfile(tick % PROFILES.length);
    const timeout = setTimeout(() => setActiveProfile(null), 1800);
    return () => clearTimeout(timeout);
  }, [tick]);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px]">
      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {CONNECTIONS.map(([from, to], i) => {
          const f = PROFILES[from];
          const t = PROFILES[to];
          const isActive = activeProfile === from || activeProfile === to;
          return (
            <motion.line
              key={i}
              x1={f.x} y1={f.y}
              x2={t.x} y2={t.y}
              stroke={isActive ? "#61DBD6" : "rgba(97,219,214,0.2)"}
              strokeWidth={isActive ? "0.6" : "0.35"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8 + i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Profile bubbles */}
      {PROFILES.map((p, i) => {
        const isActive = activeProfile === p.id;
        return (
          <motion.div
            key={p.id}
            className="absolute flex flex-col items-center gap-1 cursor-pointer"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isActive ? 1.2 : 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, scale: { duration: 0.3 } }}
            onMouseEnter={() => setActiveProfile(p.id)}
            onMouseLeave={() => setActiveProfile(null)}
          >
            {/* Avatar */}
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                boxShadow: isActive ? `0 0 0 3px ${p.color}55, 0 8px 24px ${p.color}44` : `0 4px 12px ${p.color}33`,
              }}
            >
              {p.initial}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  className="absolute -bottom-10 whitespace-nowrap bg-white dark:bg-[#2B2B2B] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-1.5 shadow-lg text-xs font-medium text-[#263238] dark:text-white z-10"
                >
                  <span className="text-[#61DBD6]">{p.name}</span> · {p.interest}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Center location pin */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="relative">
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(97,219,214,0.15)" }}
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#61DBD6] to-[#46D4D0] flex items-center justify-center shadow-xl shadow-[#61DBD6]/30">
            <MapPin className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Floating interest chips */}
      {INTEREST_CHIPS.slice(0, 4).map((chip, i) => {
        const positions = [
          { left: "5%",  top: "8%"  },
          { left: "58%", top: "4%"  },
          { left: "2%",  top: "72%" },
          { left: "62%", top: "88%" },
        ];
        return (
          <motion.div
            key={chip}
            className="absolute px-2.5 py-1 rounded-full bg-white dark:bg-[#2B2B2B] border border-gray-100 dark:border-white/10 text-xs font-medium text-[#263238] dark:text-[#E1E5E8] shadow-sm whitespace-nowrap"
            style={positions[i]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 1.2 + i * 0.15 },
              scale:   { duration: 0.5, delay: 1.2 + i * 0.15 },
              y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
          >
            {chip}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Hero exportado ── */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#F7F9FA] dark:bg-[#2B2B2B]"
      style={{ minHeight: "100dvh" }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #61DBD6 1.5px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Gradient blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#61DBD6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#FF8781]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-screen">

        {/* ── LEFT: Copy ── */}
        <motion.div
          className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#61DBD6]/30 bg-[#61DBD6]/8 text-[#46D4D0] dark:text-[#61DBD6] text-xs font-semibold tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#61DBD6] animate-pulse" />
            Beta privada · Plazas limitadas
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-poppins text-[3.2rem] sm:text-[4.2rem] md:text-[5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.05] text-[#263238] dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conecta.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#46D4D0]">
              Comparte.
            </span>
            <br />
            Queda.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl text-[#607D8B] dark:text-[#9BA6AD] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            La red social que va más allá del scroll. Descubre personas con tus mismos
            intereses en tu zona y{" "}
            <span className="text-[#263238] dark:text-white font-semibold">queda en persona</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(97,219,214,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#61DBD6]/20 cursor-pointer"
            >
              Únete a la beta
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>
            <motion.a
              href="#producto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 dark:border-white/15 text-[#263238] dark:text-white font-semibold text-base rounded-2xl hover:border-[#61DBD6] dark:hover:border-[#61DBD6] transition-colors cursor-pointer"
            >
              Ver cómo funciona
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-6 sm:gap-10 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { icon: Users,    value: "Local first",   label: "Tu radio, tu comunidad" },
              { icon: Calendar, value: "Real meetups",  label: "Del chat a la experiencia" },
              { icon: MapPin,   value: "Multiperfiles", label: "Una cuenta, muchas identidades" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center lg:text-left">
                  <div className="flex items-center gap-1.5 justify-center lg:justify-start mb-0.5">
                    <Icon className="w-3.5 h-3.5 text-[#61DBD6]" />
                    <span className="text-sm font-bold text-[#263238] dark:text-white">{stat.value}</span>
                  </div>
                  <div className="text-[10px] text-[#607D8B] dark:text-[#9BA6AD] leading-tight">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Connection graph ── */}
        <motion.div
          className="flex-1 w-full max-w-lg mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ConnectionGraph />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-[#61DBD6]/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#61DBD6]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}