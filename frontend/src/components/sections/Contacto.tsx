"use client";

import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Send, Mail, MessageSquare, AlertTriangle, ChevronDown, Loader2 } from "lucide-react";

type Tab = "beta" | "contacto" | "newsletter";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#263238] dark:text-white placeholder-[#607D8B] dark:placeholder-[#9BA6AD] focus:border-[#61DBD6] focus:outline-none text-sm transition";
const labelCls = "block text-sm font-semibold text-[#263238] dark:text-[#E1E5E8] mb-1.5";

const INTERESTS = [
  "Deportes", "Cultura", "Tecnología", "Gastronomía",
  "Arte", "Naturaleza", "Música", "Fotografía", "Lectura", "Viajes",
];

export default function Contacto() {
  const [tab, setTab]     = useState<Tab>("contacto");
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [asunto, setAsunto]         = useState("");
  const [asuntoOpen, setAsuntoOpen]   = useState(false);
  const [betaOpen, setBetaOpen]       = useState(false);

  const [contactoNombre, setContactoNombre] = useState("");
  const [contactoEmail, setContactoEmail]   = useState("");
  const [contactoMensaje, setContactoMensaje] = useState("");

  const [newsletterNombre, setNewsletterNombre] = useState("");
  const [newsletterEmail, setNewsletterEmail]   = useState("");

  const [honeypot, setHoneypot] = useState("");

  const asuntoRef = useRef<HTMLDivElement>(null);
  const betaRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (asuntoRef.current && !asuntoRef.current.contains(e.target as Node))
        setAsuntoOpen(false);
      if (betaRef.current && !betaRef.current.contains(e.target as Node))
        setBetaOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (tab === "contacto") {
        const res = await fetch("/api/contacto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: contactoNombre,
            email: contactoEmail,
            asunto,
            mensaje: contactoMensaje,
            website: honeypot,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({})) as { error?: string };
          throw new Error(data.error ?? "Error al enviar el mensaje");
        }
      } else if (tab === "newsletter") {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: newsletterNombre, email: newsletterEmail, website: honeypot }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({})) as { error?: string };
          throw new Error(data.error ?? "Error al suscribirte");
        }
      }

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setContactoNombre(""); setContactoEmail(""); setContactoMensaje(""); setAsunto("");
        setNewsletterNombre(""); setNewsletterEmail("");
      }, 4500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "beta",        label: "Únete a la beta", icon: <Send className="w-4 h-4" /> },
    { key: "contacto",    label: "Contacto",        icon: <MessageSquare className="w-4 h-4" /> },
    { key: "newsletter",  label: "Newsletter",      icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <section
      id="contacto"
      className="relative py-28 px-6 overflow-hidden bg-white dark:bg-[#1a1a1a]"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #61DBD6 1.5px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Pulse rings */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.04, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-2 border-[#61DBD6]/20 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.3, 1.7, 1.3], opacity: [0.07, 0.02, 0.07] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-[#FF8781]/15 pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-sm font-semibold tracking-widest uppercase mb-6">
            Contacto
          </span>
          <h2 className="font-poppins text-5xl md:text-6xl font-black text-[#263238] dark:text-white mb-4">
            Sé de los primeros
          </h2>
          <p className="text-lg text-[#607D8B] dark:text-[#9BA6AD]">
            Estamos trabajando en la beta privada, atrévete a compartir tu opinión.<br /> Te avisaremos cuando Unyona sea real y
            <span className="text-xl text-[#263238] dark:text-white font-semibold"> tendrás ventajas adicionales.</span>
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-white/8">
            {tabs.map((t) => {
              if (t.key === "beta") {
                return (
                  <div key="beta" className="relative flex-1 group cursor-not-allowed" ref={betaRef} onClick={() => setBetaOpen((o) => !o)}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold text-[#607D8B]/40 dark:text-[#9BA6AD]/40 pointer-events-none"
                    >
                      {t.icon}
                      <span className="hidden sm:inline">{t.label}</span>
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B6B] ml-0.5 flex-shrink-0" />
                    </button>
                    <div className={`absolute top-16 left-0 w-[300%] mt-1 px-3 py-2.5 border-2 border-[#FF6B6B] bg-[#ffc7c4] dark:text-black text-md rounded-xl text-center leading-snug transition-opacity duration-200 pointer-events-none z-20 shadow-xl ${betaOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      <div className="absolute bottom-full left-[16.67%] border-[5px] border-transparent border-b-[#FF6B6B]" />
                      Todavía no se encuentra disponible.
                    </div>
                  </div>
                );
              }
              return (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key as Tab); setSent(false); setError(null); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all ${
                    tab === t.key
                      ? "text-[#46D4D0] border-b-2 border-[#61DBD6] bg-[#61DBD6]/5"
                      : "text-[#607D8B] dark:text-[#9BA6AD] hover:text-[#263238] dark:hover:text-white"
                  }`}
                >
                  {t.icon}
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form body */}
          <div className="p-10 mt-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#61DBD6] to-[#46D4D0] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#61DBD6]/30">
                  <Send className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-poppins text-xl font-bold text-[#263238] dark:text-white mb-2">
                  {tab === "newsletter" ? "¡Apuntado!" : "¡Enviado!"}
                </h3>
                <p className="text-[#607D8B] dark:text-[#9BA6AD]">
                  {tab === "contacto" && "Mensaje recibido. Revisa tu correo, te hemos enviado una confirmación."}
                  {tab === "newsletter" && "Revisa tu email, te hemos enviado un enlace de confirmación."}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot anti-bot: campo invisible para humanos, los bots lo rellenan */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                />

                {/* ── BETA TAB ── */}
                {tab === "beta" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Nombre</label>
                        <input required className={inputCls} placeholder="Tu nombre" />
                      </div>
                      <div>
                        <label className={labelCls}>Ciudad</label>
                        <input required className={inputCls} placeholder="¿Dónde estás?" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input required type="email" className={inputCls} placeholder="tu@email.com" />
                    </div>
                    <div>
                      <label className={labelCls}>¿Qué te interesa? (elige los que quieras)</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {INTERESTS.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                              selectedInterests.includes(interest)
                                ? "bg-[#61DBD6] text-white shadow-sm shadow-[#61DBD6]/30"
                                : "bg-gray-100 dark:bg-white/8 text-[#607D8B] dark:text-[#9BA6AD] hover:bg-gray-200 dark:hover:bg-white/15"
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8">
                      <input type="checkbox" id="org" className="w-4 h-4 accent-[#61DBD6]" />
                      <label htmlFor="org" className="text-sm text-[#607D8B] dark:text-[#9BA6AD] cursor-pointer">
                        Represento una organización, club o colectivo
                      </label>
                    </div>
                  </>
                )}

                {/* ── CONTACTO TAB ── */}
                {tab === "contacto" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Nombre</label>
                        <input
                          required
                          className={inputCls}
                          placeholder="Tu nombre"
                          value={contactoNombre}
                          onChange={(e) => setContactoNombre(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Email</label>
                        <input
                          required
                          type="email"
                          className={inputCls}
                          placeholder="tu@email.com"
                          value={contactoEmail}
                          onChange={(e) => setContactoEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Asunto</label>
                      <div className="relative" ref={asuntoRef}>
                        <button
                          type="button"
                          onClick={() => setAsuntoOpen((o) => !o)}
                          className={`${inputCls} flex items-center justify-between`}
                        >
                          <span className={asunto ? "" : "text-[#607D8B] dark:text-[#9BA6AD]"}>
                            {asunto || "Selecciona un tema..."}
                          </span>
                          <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${asuntoOpen ? "rotate-180" : ""}`} />
                        </button>
                        {asuntoOpen && (
                          <ul className="absolute z-20 w-full mt-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2a2a2a] shadow-xl overflow-hidden">
                            {["Acceso a la beta", "Propuesta de colaboración", "Prensa / medios", "Feedback o sugerencia", "Otro"].map((opt) => (
                              <li
                                key={opt}
                                onClick={() => { setAsunto(opt); setAsuntoOpen(false); }}
                                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                                  asunto === opt
                                    ? "bg-[#61DBD6]/15 text-[#46D4D0]"
                                    : "text-[#263238] dark:text-white hover:bg-gray-100 dark:hover:!bg-[#3a3a3a] dark:hover:!text-white"
                                }`}
                              >
                                {opt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Mensaje</label>
                      <textarea
                        required
                        rows={7}
                        className={inputCls + " resize-none"}
                        placeholder="Cuéntanos..."
                        value={contactoMensaje}
                        onChange={(e) => setContactoMensaje(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* ── NEWSLETTER TAB ── */}
                {tab === "newsletter" && (
                  <>
                    <div className="text-center py-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#61DBD6] to-[#46D4D0] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-[#607D8B] dark:text-[#9BA6AD] text-sm">
                        Recibe novedades del producto, nuevas funcionalidades y noticias de la comunidad Unyona.
                      </p>
                    </div>
                    <div>
                      <label className={labelCls}>Nombre</label>
                      <input
                        required
                        className={inputCls}
                        placeholder="Tu nombre"
                        value={newsletterNombre}
                        onChange={(e) => setNewsletterNombre(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input
                        required
                        type="email"
                        className={inputCls}
                        placeholder="tu@email.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400 text-center -mt-1">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02, boxShadow: "0 12px 30px rgba(97,219,214,0.35)" }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold rounded-xl mt-4 mb-6 transition-shadow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
                  ) : (
                    tab === "beta"       ? "Quiero acceso a la beta" :
                    tab === "newsletter" ? "Suscribirme"             :
                    "Enviar mensaje"
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
