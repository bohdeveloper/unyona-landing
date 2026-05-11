"use client";

import { motion } from "motion/react";
import { useState } from "react";
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

export default function Modulos() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const categories = [...new Set(features.map((f) => f.category))];
  const filtered = activeFilter ? features.filter((f) => f.category === activeFilter) : features;

  return (
    <section
      id="funcionalidades"
      className="relative py-28 px-6 bg-gradient-to-br from-[#263238] via-[#37474F] to-[#263238] overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold tracking-widest uppercase mb-6">
            Funcionalidades
          </span>
          <h2 className="font-poppins text-5xl md:text-7xl font-black text-white mb-4">
            Todo lo que necesitas
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Desde tu primer perfil hasta organizar quedadas con tu comunidad local.
            Cada funcionalidad diseñada para llevar lo digital a lo real.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeFilter === null
                ? "bg-[#61DBD6] text-white shadow-lg shadow-[#61DBD6]/30"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat === activeFilter ? null : cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-[#61DBD6] text-white shadow-lg shadow-[#61DBD6]/30"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((feat, i) => {
            const Icon = feat.icon;
            const accent = CATEGORY_COLORS[feat.category];
            return (
              <motion.div
                key={feat.label}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.06, y: -4 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/8 hover:bg-white/14 border border-white/8 hover:border-white/20 cursor-pointer transition-all backdrop-blur-sm"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: `${accent}22` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <span className="text-white font-semibold text-xs text-center leading-tight">
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
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-white/50 text-sm mb-5">
            Estamos en beta activa. Nuevas funcionalidades cada sprint.
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold rounded-full hover:scale-105 hover:shadow-xl hover:shadow-[#61DBD6]/30 transition-all"
          >
            Quiero acceso anticipado
          </a>
        </motion.div>
      </div>
    </section>
  );
}
