"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { MapPin, Users, Calendar } from "lucide-react";

const NODES = [
  { id: 0,  initial: "A", color: "#61DBD6", x: 12, y: 6,  z: 0.4, name: "Alejandra", hobby: "Vamos a la playa, quién se apunta?" },
  { id: 1,  initial: "B", color: "#FF8781", x: 50, y: 4,  z: 0.5, name: "Bruno",     hobby: "Practico el senderismo, también abrazo árboles." },
  { id: 2,  initial: "C", color: "#61DBD6", x: 86, y: 8,  z: 0.3, name: "Carmen",    hobby: "Soy fan del café, quién más?" },
  { id: 3,  initial: "D", color: "#FF8781", x: 5,  y: 28, z: 0.7, name: "David",     hobby: "Reservamos pista de pádel los findes." },
  { id: 4,  initial: "E", color: "#61DBD6", x: 30, y: 24, z: 0.6, name: "Elena",     hobby: "Me gusta el cine y las series." },
  { id: 5,  initial: "F", color: "#FF8781", x: 64, y: 20, z: 0.7, name: "Felipe",    hobby: "¿Algún plan para ir a un concierto?" },
  { id: 6,  initial: "G", color: "#61DBD6", x: 92, y: 33, z: 0.5, name: "Gloria",    hobby: "¿Alguién para correr?" },
  { id: 7,  initial: "H", color: "#FF8781", x: 14, y: 48, z: 0.9, name: "Hugo",      hobby: "Me bajo a dar una vuelta, algién por el centro?" },
  { id: 8,  initial: "I", color: "#61DBD6", x: 40, y: 46, z: 0.8, name: "Irene",     hobby: "Soy viajera, organizamos un viaje?" },
  { id: 9,  initial: "J", color: "#FF8781", x: 68, y: 50, z: 0.9, name: "Javier",    hobby: "Soy fotógrafo urbano, algun@ le apetece cazar?" },
  { id: 10, initial: "K", color: "#61DBD6", x: 93, y: 54, z: 0.6, name: "Karen",     hobby: "He encontrado este curso de cocina, quién se apunta?" },
  { id: 11, initial: "L", color: "#FF8781", x: 6,  y: 68, z: 0.6, name: "Laura",     hobby: "A alguien le apetece bucear?" },
  { id: 12, initial: "M", color: "#61DBD6", x: 32, y: 72, z: 0.8, name: "Marcos",    hobby: "Organizamos una sesión de gaming" },
  { id: 13, initial: "N", color: "#FF8781", x: 60, y: 68, z: 0.7, name: "Nora",      hobby: "Teatro y danza. Tu?" },
  { id: 14, initial: "O", color: "#61DBD6", x: 88, y: 74, z: 0.5, name: "Óscar",     hobby: "Eres mas de snowboard, o esquí?" },
  { id: 15, initial: "P", color: "#FF8781", x: 20, y: 88, z: 0.7, name: "Paula",     hobby: "Lectora voraz" },
  { id: 16, initial: "J", color: "#61DBD6", x: 52, y: 92, z: 0.9, name: "Josu",      hobby: "Soy DJ, organizamos un evento?" },
  { id: 17, initial: "R", color: "#FF8781", x: 80, y: 88, z: 0.6, name: "Rosa",      hobby: "Soy Analista jefe, alguien en algún coworking?" },
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

const MAX_FEED = 5;

function NeuralGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [feed, setFeed] = useState<Array<{ key: number; nodeId: number }>>([]);
  const feedKey = useRef(0);

  // Valores de movimiento del ratón normalizados a [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transforma el movimiento del ratón en rotaciones 3D suavizadas con un muelle (spring).
  // rotateY: mover el ratón a la derecha inclina la red hacia la derecha.
  // rotateX: mover el ratón hacia abajo inclina la red hacia el frente.
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 80, damping: 25,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 80, damping: 25,
  });

  // Tick global: se incrementa cada 1600ms para avanzar al siguiente nodo activo
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Selecciona el nodo activo de forma secuencial usando módulo (ciclo infinito)
    const nodeId = tick % NODES.length;
    setActiveNode(nodeId);

    // feedKey es un contador incremental que asegura que cada entrada del feed
    // tenga una key única, aunque el mismo nodo se active varias veces.
    feedKey.current += 1;
    const k = feedKey.current;

    // Añade la nueva entrada al feed y descarta las más antiguas,
    // manteniendo siempre un máximo de MAX_FEED elementos visibles.
    setFeed((prev) => [...prev, { key: k, nodeId }].slice(-MAX_FEED));

    // Apaga el nodo activo 1.1s después de encenderlo (destello temporal)
    const t = setTimeout(() => setActiveNode(null), 1100);
    return () => clearTimeout(t);
  }, [tick]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normaliza la posición del cursor a un rango [-0.5, 0.5] relativo al contenedor.
    // 0 = centro, -0.5 = borde izquierdo/superior, 0.5 = borde derecho/inferior.
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Red neuronal */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-[420px] sm:h-[500px]"
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
              // Profundidad media de la conexión: nodos más "al fondo" (z alto)
              // tienen conexiones más visibles para simular perspectiva.
              const avgZ = (f.z + t.z) / 2;
              // La conexión toma el color del nodo activo que la inicia
              const activeColor = activeNode === fromId ? f.color : t.color;
              // Opacidad proporcional a la profundidad (z): conexiones más cercanas son más visibles
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
            // Nodos más cercanos (z alto) son más grandes: simula profundidad de campo
            const size = Math.round(28 + node.z * 14);
            // Amplitud de flotación: nodos cercanos se mueven más (mayor presencia visual)
            const floatAmp = node.z * 5;
            // Duración: nodos lejanos (z bajo) flotan más lentamente, como en perspectiva
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

      {/* Feed de chat: los mensajes nuevos aparecen abajo y empujan los anteriores hacia arriba.
          El gradiente de máscara (`maskImage`) hace que los mensajes más antiguos (parte superior)
          se desvanezcan progresivamente fundiéndose con la red neuronal que hay encima. */}
      <div
        className="flex flex-col justify-end gap-2 overflow-hidden h-[180px] sm:h-[220px] px-2 pb-3 -mt-10"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.6) 55%, black 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.6) 55%, black 75%)",
        }}
      >
        <AnimatePresence initial={false}>
          {feed.map((entry) => {
            const node = NODES[entry.nodeId];
            return (
              <motion.div
                key={entry.key}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
                style={{ borderBottom: `0.5px solid ${node.color}bb` }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-2"
                  style={{
                    background: `${node.color}1e`,
                    borderLeft: `2px solid ${node.color}aa`,
                  }}
                >
                  <span style={{ color: node.color, fontSize: "13px", fontWeight: 700, lineHeight: 1 }}>
                    {node.name}
                  </span>
                  <span style={{ color: node.color, fontSize: "11px", opacity: 0.78, fontStyle: "italic", lineHeight: 1 }}>
                    · {node.hobby}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
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
              Comparte.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DBD6] to-[#46D4D0]">
              Conecta.
            </span>
            <br />
              Queda.
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-[#607D8B] dark:text-[#9BA6AD] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <span className="text-3xl text-[#263238] dark:text-white font-semibold">Más natural, más conexión.</span><br></br> Descubre gente con tus mismos intereses en tu zona para{" "}
            <span className="text-2xl text-[#263238] dark:text-white font-semibold">realizar quedadas.</span>
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
              { icon: Calendar, value: "Comunícate",  label: "Del chat a la experiencia" },
              { icon: MapPin,   value: "Multiperfiles", label: "Una cuenta, muchas identidades" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center lg:text-left">
                  <div className="flex items-center gap-1.5 justify-center lg:justify-start mb-0.5">
                    <Icon className="w-3.5 h-3.5 text-[#61DBD6]" />
                    <span className="text-[7px] sm:text-sm font-bold text-[#263238] dark:text-white">{stat.value}</span>
                  </div>
                  <div className="text-[6px] sm:text-[10px] text-[#607D8B] dark:text-[#9BA6AD] leading-tight">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 w-full max-w-xl mx-auto"
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
