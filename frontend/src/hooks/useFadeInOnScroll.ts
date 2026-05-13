"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Hook que detecta si un elemento entra en el viewport y expone un booleano
 * `visible` para activar animaciones de aparición (fade-in).
 *
 * Se reinicia cuando el elemento sale de vista, permitiendo que la animación
 * se reproduzca de nuevo si el usuario hace scroll hacia arriba.
 */
export function useFadeInOnScroll() {
  // BUG CORREGIDO: era HTMLImageElement (demasiado restrictivo),
  // se usa HTMLElement para que pueda referenciarse cualquier elemento del DOM.
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // IntersectionObserver dispara callbacks cuando el elemento cruza
    // los umbrales de visibilidad definidos en `threshold`.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setVisible(true);
          } else {
            // Reinicia al salir de vista para que la animación vuelva a ejecutarse
            setVisible(false);
          }
        });
      },
      // Se dispara al 0%, 40% y 100% de visibilidad del elemento
      { threshold: [0, 0.4, 1] }
    );

    observer.observe(ref.current);

    // Limpieza: desconecta el observer al desmontar el componente
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
