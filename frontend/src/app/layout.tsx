import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialPanel from "@/components/layout/SocialPanel";
import CookieBanner from "@/components/layout/CookieBanner";
import { Poppins, Manrope } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

/* ============================
   VIEWPORT
============================ */
export const viewport = {
  themeColor: "#61DBD6",
};

/* ============================
   METADATA SEO GLOBAL
   URL canónica sin www — el archivo _redirects redirige www → unyona.com (301)
   para evitar contenido duplicado en Google.
============================ */
export const metadata = {
  // Base para resolver rutas relativas en OG images y demás assets
  metadataBase: new URL("https://unyona.com"),

  // Título ~53 car.: marca + intención local (arranque en Valencia, único mercado activo hoy)
  title: "Unyona | Conoce gente y organiza quedadas en Valencia",

  // Descripción ~156 car.: intención local Valencia + aficiones verticales con demanda verificada
  // (senderismo, fotografía, running, club de lectura — media lab, Meetup Valencia) sin keyword stuffing
  description:
    "Unyona es la red social local que arranca en Valencia: conoce gente con tus mismas aficiones (senderismo, fotografía, running, lectura) y queda en persona.",

  // Keywords longtail: intención local Valencia + genérica España + aficiones verticales.
  // Nota SEO: la etiqueta <meta name="keywords"> no influye en el ranking de Google desde 2009 —
  // se mantiene por convención del proyecto y por si la usa algún buscador/agregador menor.
  keywords: [
    "conocer gente en Valencia",
    "hacer amigos en Valencia",
    "quedadas en Valencia",
    "red social local Valencia",
    "senderismo Valencia",
    "fotografía Valencia",
    "club de lectura Valencia",
    "running Valencia",
    "conocer gente cerca",
    "quedadas cerca de mí",
    "red social local",
    "organizar quedadas",
    "conectar con personas",
    "meetup España",
    "Unyona",
  ],

  authors: [{ name: "Unyona", url: "https://unyona.com" }],

  // Directivas explícitas para Googlebot y otros crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,        // sin límite de caracteres en el snippet
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // URL canónica declarada explícitamente para evitar duplicados www/no-www
  alternates: {
    canonical: "https://unyona.com",
  },

  icons: {
    icon: [
      { url: "/favicon.ico",               sizes: "any" },
      { url: "/favicon/genfavicon-32.png",  sizes: "32x32", type: "image/png" },
      { url: "/favicon/genfavicon-16.png",  sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png",       sizes: "180x180" },
      { url: "/favicon/apple-touch-icon-120x120.png", sizes: "120x120" },
    ],
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },

  /* ---------- OPEN GRAPH (Facebook, WhatsApp, LinkedIn preview) ---------- */
  openGraph: {
    title: "Unyona | Conoce gente y organiza quedadas en Valencia",
    description:
      "Descubre personas con tus mismas aficiones en Valencia: senderismo, fotografía, running, club de lectura y más. Del online al offline, sin algoritmos.",
    url: "https://unyona.com",
    siteName: "Unyona",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/logo_unyona.png",
        width: 1200,
        height: 630,
        alt: "Unyona - Conoce gente y organiza quedadas en Valencia",
      },
    ],
  },

  /* ---------- TWITTER / X CARD ---------- */
  twitter: {
    card: "summary_large_image",
    title: "Unyona | Conoce gente y queda en persona en Valencia",
    description:
      "Conecta con personas que comparten tus aficiones en Valencia. Organiza quedadas reales, sin algoritmos de engagement.",
    images: ["/images/logo_unyona.png"],
  },
};

/* ============================
   ROOT LAYOUT
============================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${manrope.variable} transition-colors duration-300`}>

        {/* ============================
           JSON-LD: ORGANIZACIÓN
           Ayuda a Google a entender quién es Unyona como entidad,
           lo que mejora el Knowledge Graph y las búsquedas de marca.
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Unyona",
              "url": "https://unyona.com",
              "logo": "https://unyona.com/images/logo.png",
              "description":
                "Red social local para conocer gente cerca, organizar quedadas y conectar con personas que comparten tus intereses.",
              "foundingDate": "2024",
              // Área servida real hoy: la beta arranca únicamente en Valencia (spec.md §3.4).
              // Honesto y verificable — no se declara cobertura nacional que aún no existe.
              "areaServed": {
                "@type": "City",
                "name": "Valencia",
                "containedInPlace": { "@type": "Country", "name": "España" },
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "availableLanguage": "Spanish",
              },
              "sameAs": [],
            }),
          }}
        />

        {/* ============================
           JSON-LD: APLICACIÓN WEB
           Indica a Google el tipo de producto (app de red social)
           y que es gratuita, lo que puede aparecer en rich results.
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Unyona",
              "url": "https://unyona.com",
              "applicationCategory": "SocialNetworkingApplication",
              "operatingSystem": "Web",
              "description":
                "Unyona es una red social local para conocer gente cerca, organizar quedadas y conectar con personas con intereses comunes en tu zona.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Unyona",
                "url": "https://unyona.com",
              },
            }),
          }}
        />

        {/* ============================
           JSON-LD: SITIO WEB
           Identifica el sitio como entidad. NO se declara "potentialAction"
           (SearchAction / sitelinks searchbox) porque la landing no tiene buscador
           interno real — declararlo sin que exista sería marcado falso (spec.md §3.15).
           Añadirlo el día que exista un buscador (p.ej. en /blog).
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Unyona",
              "url": "https://unyona.com",
              "description":
                "Landing oficial de Unyona, la red social que conecta personas localmente y facilita quedadas reales.",
              "publisher": {
                "@type": "Organization",
                "name": "Unyona",
                "url": "https://unyona.com",
              },
            }),
          }}
        />

        {/* ============================
           SCRIPT ANTI-FLICKER (THEME)
           Se ejecuta de forma síncrona ANTES del primer render para leer
           la preferencia de tema guardada en localStorage y aplicar la clase
           `dark` o `light` en el <html> sin esperar a que React hidrate.
           Esto evita el parpadeo de colores (flash of unstyled content).
        ============================ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* ============================
           UMAMI ANALYTICS
           Sin cookies · compatible RGPD · no requiere banner de consentimiento
        ============================ */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8aea7b44-5ed7-4b5f-9709-97321c0b901d"
        />

        <Navbar />
        <SocialPanel />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
