"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { MapPin, Users, Calendar } from "lucide-react";

const NODES = [
  { id: 0,  initial: "A", color: "#61DBD6", x: 12, y: 6,  z: 0.4 },
  { id: 1,  initial: "B", color: "#FF8781", x: 50, y: 4,  z: 0.5 },
  { id: 2,  initial: "C", color: "#61DBD6", x: 86, y: 8,  z: 0.3 },
  { id: 3,  initial: "D", color: "#FF8781", x: 5,  y: 28, z: 0.7 },
  { id: 4,  initial: "E", color: "#61DBD6", x: 30, y: 24, z: 0.6 },
  { id: 5,  initial: "F", color: "#FF8781", x: 64, y: 20, z: 0.7 },
  { id: 6,  initial: "G", color: "#61DBD6", x: 92, y: 33, z: 0.5 },
  { id: 7,  initial: "H", color: "#FF8781", x: 14, y: 48, z: 0.9 },
  { id: 8,  initial: "I", color: "#61DBD6", x: 40, y: 46, z: 0.8 },
  { id: 9,  initial: "J", color: "#FF8781", x: 68, y: 50, z: 0.9 },
  { id: 10, initial: "K", color: "#61DBD6", x: 93, y: 54, z: 0.6 },
  { id: 11, initial: "L", color: "#FF8781", x: 6,  y: 68, z: 0.6 },
  { id: 12, initial: "M", color: "#61DBD6", x: 32, y: 72, z: 0.8 },
  { id: 13, initial: "N", color: "#FF8781", x: 60, y: 68, z: 0.7 },
  { id: 14, initial: "O", color: "#61DBD6", x: 88, y: 74, z: 0.5 },
  { id: 15, initial: "P", color: "#FF8781", x: 20, y: 88, z: 0.7 },
  { id: 16, initial: "Q", color: "#61DBD6", x: 52, y: 92, z: 0.9 },
  { id: 17, initial: "R", color: "#FF8781", x: 80, y: 88, z: 0.6 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2],
  [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
  [3, 4], [5, 6],
  [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [6, 10],
  [7, 8], [8, 9], [9, 10],
  [7, 11], [7, 12], [8, 12], [8, 13], [9, 13], [9, 14], [10, 14],
  [11, 12], [12, 13], [13, 14],
  [11, 15], [12, 15], [12, 16], [13, 16], [13, 17], [14, 17],
  [15, 16], [16, 17],
  [0, 7], [2, 9], [4, 12], [5, 13], [8, 15], [10, 17],
  [3, 11], [6, 14],
];


function NeuralGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 80, damping: 25,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 80, damping: 25,
  });

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setActiveNode(tick % NODES.length);
    const t = setTimeout(() => setActiveNode(null), 1100);
    return () => clearTimeout(t);
  }, [tick]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[500px]"
      style={{ perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Chincheta de lugar — grande, sutil, detrás de la red */}
          <motion.path
            d="M50,6 C24,6 4,26 4,48 C4,72 50,94 50,94 C50,94 96,72 96,48 C96,26 76,6 50,6 Z"
            fill="rgba(97,219,214,0.028)"
            stroke="rgba(97,219,214,0.13)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
          />
          {CONNECTIONS.map(([fromId, toId], i) => {
            const f = NODES[fromId];
            const t = NODES[toId];
            const isActive = activeNode === fromId || activeNode === toId;
            const avgZ = (f.z + t.z) / 2;
            const activeColor = activeNode === fromId ? f.color : t.color;
            const inactiveOpacity = (avgZ * 0.18).toFixed(2);
            return (
              <motion.line
                key={i}
                x1={f.x} y1={f.y}
                x2={t.x} y2={t.y}
                stroke={isActive ? activeColor : `rgba(97,219,214,${inactiveOpacity})`}
                strokeWidth={isActive ? 0.6 : 0.28}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.02 }}
              />
            );
          })}
        </svg>

        {NODES.map((node, i) => {
          const isActive = activeNode === node.id;
          const size = Math.round(28 + node.z * 14);
          const floatAmp = node.z * 5;
          const floatDur = 3.5 + (1 - node.z) * 2;
          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                x: "-50%",
                y: "-50%",
                zIndex: Math.round(node.z * 10),
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <motion.div
                animate={{
                  y: [0, -floatAmp, 0, floatAmp, 0],
                  scale: isActive ? 1.28 : 1,
                }}
                transition={{
                  y: { duration: floatDur, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                  scale: { duration: 0.2 },
                }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${node.color}, ${node.color}cc)`,
                  boxShadow: isActive
                    ? `0 0 0 3px ${node.color}55, 0 8px 24px ${node.color}44`
                    : `0 ${Math.round(node.z * 6)}px ${Math.round(node.z * 16)}px ${node.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: size < 34 ? "10px" : "13px",
                }}
              >
                {node.initial}
              </motion.div>
            </motion.div>
          );
        })}

      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#F7F9FA] dark:bg-[#2B2B2B]"
      style={{ minHeight: "100dvh" }}
    >
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #61DBD6 1.5px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#61DBD6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#FF8781]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-screen">
        <motion.div
          className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#61DBD6]/30 bg-[#61DBD6]/8 text-[#46D4D0] dark:text-[#61DBD6] text-xs font-semibold tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#61DBD6] animate-pulse" />
            Beta privada · Plazas limitadas
          </motion.div>

          <motion.h1
            className="font-poppins text-[3.2rem] sm:text-[4.2rem] md:text-[5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.05] text-[#263238] dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8781] to-[#FF6B6B]">
              Queda.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#46D4D0]">
              Conecta.
            </span>
            <br />
              Comparte.
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-[#607D8B] dark:text-[#9BA6AD] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <span className="text-3xl text-[#263238] dark:text-white font-semibold">Más natural, más conexión.</span><br></br> Descubre gente con tus mismos intereses en tu zona para{" "}
            <span className="text-2xl text-[#263238] dark:text-white font-semibold">quedar en persona</span>.
          </motion.p>

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

          <motion.div
            className="flex gap-6 sm:gap-10 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { icon: Users,    value: "Real, en tu zona",   label: "Estamos en tu entorno" },
              { icon: Calendar, value: "Mas natural",  label: "Del chat a la experiencia" },
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

        <motion.div
          className="flex-1 w-full max-w-lg mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <NeuralGraph />
        </motion.div>
      </div>

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
