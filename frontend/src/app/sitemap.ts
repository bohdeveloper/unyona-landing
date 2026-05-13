// El import debe ir al inicio — estaba colocado al final, lo que es un error de TypeScript
import { MetadataRoute } from "next";

// Forzar generación estática del sitemap durante el build (`output: "export"`)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://unyona.com"; // URL canónica sin www (consistente con _redirects)

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly", // más frecuente durante la beta activa
      priority: 1,
    },

    // Páginas futuras — descomentar cuando estén publicadas:
    // {
    //   url: `${baseUrl}/features`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/pricing`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.5,
    // },
  ];
}
