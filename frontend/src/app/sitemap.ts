// El import debe ir al inicio — estaba colocado al final, lo que es un error de TypeScript
import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

// Forzar generación estática del sitemap durante el build (`output: "export"`)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://unyona.com"; // URL canónica sin www (consistente con _redirects)

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly", // más frecuente durante la beta activa
      priority: 1,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly", // se actualiza al publicar cada artículo nuevo
      priority: 0.7,
    },
    // Un artículo por entrada de `data/blog-posts.ts` — añadir aquí cada uno nuevo.
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },

    // Páginas futuras — descomentar cuando estén publicadas:
    // {
    //   url: `${baseUrl}/features`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];
}
