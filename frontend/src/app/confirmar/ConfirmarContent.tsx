"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ConfirmarContent() {
  const params = useSearchParams();
  const ok = params.get("ok");
  const error = params.get("error");

  if (ok === "1") {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 pt-28 pb-16 bg-gradient-to-br from-[#e8faf9] via-white to-white dark:from-[#0d2b2a] dark:via-[#1a1a1a] dark:to-[#1a1a1a] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-[#61DBD6]/15 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#61DBD6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-xs font-bold tracking-widest uppercase mb-4">
              Suscripción confirmada
            </span>
            <h1 className="font-poppins text-3xl font-black text-[#263238] dark:text-white mb-4">
              ¡Ya formas parte de Unyona!
            </h1>
            <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-8">
              Tu suscripción está confirmada. Recibirás las próximas cápsulas y novedades directamente en tu bandeja de entrada. Cada martes a las 9:00h.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-[#61DBD6]/30 transition-all"
            >
              Volver a Unyona
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (error === "1") {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 pt-28 pb-16 bg-gradient-to-br from-[#fff8f1] via-white to-white dark:from-[#2b1a0d] dark:via-[#1a1a1a] dark:to-[#1a1a1a] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
              Enlace inválido
            </span>
            <h1 className="font-poppins text-3xl font-black text-[#263238] dark:text-white mb-4">
              Este enlace ha expirado
            </h1>
            <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-8">
              El enlace de confirmación no es válido o ha caducado (tiene una validez de 48 horas). Vuelve a la web y suscríbete de nuevo para recibir un enlace nuevo.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg transition-all"
            >
              Suscribirme de nuevo
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 pt-28 pb-16 bg-gradient-to-br from-[#e8faf9] via-white to-white dark:from-[#0d2b2a] dark:via-[#1a1a1a] dark:to-[#1a1a1a] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#61DBD6]/15 flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#61DBD6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#61DBD6]/10 text-[#46D4D0] text-xs font-bold tracking-widest uppercase mb-4">
            Revisa tu email
          </span>
          <h1 className="font-poppins text-3xl font-black text-[#263238] dark:text-white mb-4">
            ¡Casi listo!
          </h1>
          <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-3">
            Te hemos enviado un email de confirmación. Haz clic en el enlace para activar tu suscripción.
          </p>
          <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD] mb-8">
            Si no lo ves en unos minutos, revisa tu carpeta de spam.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#61DBD6] hover:underline font-medium text-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
