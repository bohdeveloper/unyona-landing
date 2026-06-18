"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, MapPin } from "lucide-react";

const CIUDADES_ES = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza",
  "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao",
  "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón",
  "Granada", "Vitoria-Gasteiz", "A Coruña", "Elche", "Oviedo",
  "Badalona", "Hospitalet", "Terrassa", "Sabadell", "Cartagena",
  "Santa Cruz de Tenerife", "Pamplona", "Almería", "Fuenlabrada",
];

export default function ListaEspera() {
  const [email, setEmail]     = useState("");
  const [ciudad, setCiudad]   = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ciudad, website: honeypot }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? "Error al procesar tu solicitud");
      }
      setSent(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).umami?.track("lista-espera-submit", { ciudad: ciudad || "no especificada" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="lista-espera"
      className="relative py-24 px-6 bg-gradient-to-br from-[#0d2b2a] via-[#163332] to-[#0d2b2a] overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-[#61DBD6]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/15 text-[#61DBD6] text-xs font-bold tracking-widest uppercase mb-6">
            Lista de espera
          </span>
          <h2 className="font-poppins text-4xl md:text-5xl font-black text-white mb-4">
            Sé de los primeros en tu ciudad
          </h2>
          <p className="text-lg text-[#9BA6AD] mb-6 max-w-lg mx-auto leading-relaxed">
            Apúntate ahora. Cuando la beta esté lista, te enviamos tu invitación directamente — sin spam, sin precio todavía.
          </p>

          {/* Prueba social */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="flex -space-x-2">
              {["#61DBD6", "#FF8781", "#61DBD6", "#FF8781"].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#0d2b2a] flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: color }}
                >
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <span className="text-sm text-[#9BA6AD]">
              Varias personas ya apuntadas — <span className="text-[#61DBD6] font-semibold">sé el siguiente</span>
            </span>
          </div>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="w-16 h-16 rounded-full bg-[#61DBD6]/20 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#61DBD6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p className="text-white font-bold text-lg mb-1">¡Ya estás en la lista!</p>
            <p className="text-[#9BA6AD] text-sm">
              Revisa tu email — te hemos enviado una confirmación.{ciudad ? ` Cuando haya masa crítica en ${ciudad}, serás de los primeros en saberlo.` : " Te avisaremos cuando la beta esté lista."}
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-[#6B8B8A] focus:border-[#61DBD6] focus:outline-none text-sm transition"
            />

            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B8B8A] pointer-events-none" />
              <input
                type="text"
                list="ciudades-es"
                placeholder="Tu ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
                maxLength={80}
                className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-[#6B8B8A] focus:border-[#61DBD6] focus:outline-none text-sm transition"
              />
              <datalist id="ciudades-es">
                {CIUDADES_ES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-[#0d2b2a] font-bold px-7 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#61DBD6]/30 transition-all disabled:opacity-60 text-sm whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apuntarme"}
            </button>
          </motion.form>
        )}

        {error && (
          <p className="mt-3 text-sm text-orange-400">{error}</p>
        )}

        <p className="mt-4 text-xs text-[#546E7A]">
          Sin spam. Solo te contactaremos cuando la beta esté lista.
        </p>
      </div>
    </section>
  );
}
