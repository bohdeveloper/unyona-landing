"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  User, MapPin, Users, Calendar, MessageCircle,
  Building2, ShieldCheck, Clock, Star, Radio,
  Zap, Heart,
} from "lucide-react";

const features = [
  { icon: User,          label: "Perfil personal",      category: "Perfiles" },
  { icon: Star,          label: "Perfil profesional",   category: "Perfiles" },
  { icon: Heart,         label: "Perfil hobby",         category: "Perfiles" },
  { icon: ShieldCheck,   label: "Verificación ligera",  category: "Perfiles" },
  { icon: Radio,         label: "Radar local",          category: "Descubrimiento" },
  { icon: Users,         label: "Grupos de interés",    category: "Descubrimiento" },
  { icon: MapPin,        label: "Personas cerca hoy",   category: "Descubrimiento" },
  { icon: Zap,           label: "Intereses en común",   category: "Descubrimiento" },
  { icon: Calendar,      label: "Crear quedada",        category: "Quedadas" },
  { icon: ShieldCheck,   label: "Aforo limitado",       category: "Quedadas" },
  { icon: Clock,         label: "Recordatorios",        category: "Quedadas" },
  { icon: Star,          label: "Feedback post-evento", category: "Quedadas" },
  { icon: MessageCircle, label: "Chat 1 a 1",           category: "Chat" },
  { icon: Users,         label: "Chat de grupo",        category: "Chat" },
  { icon: Calendar,      label: "Chat de evento",       category: "Chat" },
  { icon: Clock,         label: "Mensajes efímeros",    category: "Chat" },
  { icon: Building2,     label: "Página org.",          category: "Organizaciones" },
  { icon: Calendar,      label: "Eventos públicos",     category: "Organizaciones" },
  { icon: Users,         label: "Campañas",             category: "Organizaciones" },
  { icon: Star,          label: "Estadísticas",         category: "Organizaciones" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Perfiles":        "#61DBD6",
  "Descubrimiento":  "#FF8781",
  "Quedadas":        "#61DBD6",
  "Chat":            "#FF8781",
  "Organizaciones":  "#61DBD6",
};

const categories = [...new Set(features.map((f) => f.category))];

const CYCLE_INTERVAL = 5000;
const PAUSE_AFTER_CLICK = 30000;

export default function Modulos() {
  const [activeFilter, setActiveFilter] = useState<string>(categories[0]);

  // Se usa una ref en lugar de estado para controlar la pausa porque el callback
  // del setInterval captura el valor de las variables en su cierre (closure).
  // Si usáramos estado, el interval siempre leería el valor inicial (stale closure).
  // La ref siempre refleja el valor actual sin causar re-renders adicionales.
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Avanza a la siguiente categoría cada CYCLE_INTERVAL ms,
    // excepto si el usuario ha interactuado recientemente (isPausedRef.current).
    const id = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveFilter((prev) => {
        const idx = categories.indexOf(prev);
        return categories[(idx + 1) % categories.length]; // recorre en bucle
      });
    }, CYCLE_INTERVAL);

    // Limpieza al desmontar: evita memory leaks
    return () => {
      clearInterval(id);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleCategoryClick = (cat: string) => {
    setActiveFilter(cat);
    isPausedRef.current = true; // pausa el ciclo automático
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Reanuda el ciclo automático tras PAUSE_AFTER_CLICK ms sin interacción
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, PAUSE_AFTER_CLICK);
  };

  const filtered = features.filter((f) => f.category === activeFilter);

  return (
    <section
      id="funcionalidades"
      className="relative py-28 px-6 bg-[#F7F9FA] dark:bg-gradient-to-br dark:from-[#263238] dark:via-[#37474F] dark:to-[#263238] overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #61DBD6 1.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#61DBD6]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF8781]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            Funcionalidades
          </span>
          <h2 className="font-poppins text-5xl md:text-7xl font-black text-[#263238] dark:text-white mb-4">
            Todo lo que necesitas
          </h2>
          <p className="text-xl text-[#607D8B] dark:text-white/70 max-w-2xl mx-auto">
            Desde tu primer perfil hasta organizar quedadas con tu comunidad local.
            Cada funcionalidad diseñada para llevar lo digital a lo real.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            const isCycling = isActive && !isPausedRef.current;
            const color = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`relative overflow-hidden px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200${
                  !isActive ? " bg-[#263238]/8 text-[#607D8B] dark:bg-white/10 dark:text-white" : ""
                }`}
                style={
                  isActive
                    ? { background: color, color: "white", boxShadow: !isCycling ? `0 4px 20px ${color}44` : undefined }
                    : {}
                }
              >
                {isCycling && (
                  // Barra de progreso invertida: empieza llena (blanco semitransparente)
                  // y se encoge hacia la derecha durante CYCLE_INTERVAL ms.
                  // El efecto visual es que el botón "se llena de color" de izquierda a derecha,
                  // mientras el texto blanco siempre es legible sobre el fondo sólido de acento.
                  // `key={activeFilter}` fuerza el reinicio de la animación al cambiar de pestaña.
                  <motion.span
                    key={activeFilter}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(255,255,255,0.30)", transformOrigin: "right" }}
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: CYCLE_INTERVAL / 1000, ease: "linear" }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Feature grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filtered.map((feat, i) => {
              const Icon = feat.icon;
              const accent = CATEGORY_COLORS[feat.category];
              return (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl border cursor-pointer transition-all backdrop-blur-sm bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200 dark:bg-[#2E3F47] dark:hover:bg-[#364C55] dark:border-[#37474F] dark:hover:border-[#4A6470] hover:shadow-md dark:hover:shadow-none"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <span className="font-semibold text-xs text-center leading-tight" style={{ color: "var(--text-primary)" }}>
                    {feat.label}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${accent}18`, color: accent }}
                  >
                    {feat.category}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-[#607D8B] dark:text-white/50 text-sm mb-5">
            Estamos en beta activa. Nuevas funcionalidades en cada versión.
          </p>
          <a
            href="#lista-espera"
            data-umami-event="cta-funcionalidades"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold rounded-full hover:scale-105 hover:shadow-xl hover:shadow-[#61DBD6]/30 transition-all"
          >
            Apuntarme a la lista de espera
          </a>
        </motion.div>
      </div>
    </section>
  );
}
