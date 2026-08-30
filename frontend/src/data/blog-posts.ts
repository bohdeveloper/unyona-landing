/**
 * Fuente única de metadatos de los artículos del blog.
 *
 * `/blog/page.tsx` recorre este array para pintar el listado; cada artículo
 * vive además en su propia ruta estática `frontend/src/app/blog/<slug>/page.tsx`
 * (este repo no usa dynamic routing / generateStaticParams — spec.md §5,
 * mismo patrón que `/aviso-legal`, `/privacidad`...).
 *
 * Para publicar un artículo nuevo (senderismo, fotografía, club de lectura,
 * running — ya priorizados en plan.md FASE 2):
 *   1. Añade su entrada aquí (slug, title, description, date, readingMinutes).
 *   2. Crea `frontend/src/app/blog/<slug>/page.tsx` con su `metadata` propia
 *      (title/description/canonical/openGraph) y el contenido del artículo,
 *      siguiendo el patrón de `blog/conocer-gente-en-valencia/page.tsx`.
 *   3. Añade la ruta a `frontend/src/app/sitemap.ts`.
 * El listado (`/blog`) se actualiza solo al añadir la entrada al array — no
 * hace falta tocar `blog/page.tsx`.
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** Fecha de publicación del artículo (ISO), no confundir con fechas de la beta. */
  date: string;
  readingMinutes: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "conocer-gente-en-valencia",
    title: "Conocer gente en Valencia: la guía honesta para hacer amigos de adulto",
    description:
      "Por qué cuesta tanto hacer amigos después de los 25, qué hay ya en Valencia para conocer gente, y cómo lo estamos planteando en Unyona. Sin fórmulas mágicas.",
    date: "2026-08-30",
    readingMinutes: 5,
  },
];

/** Formatea la fecha ISO de un post en español largo, p. ej. "30 de agosto de 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
