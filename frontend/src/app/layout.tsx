import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/* ============================
   VIEWPORT
============================ */
export const viewport = {
  themeColor: "#0d0d0d",
};

/* ============================
   METADATA SEO GLOBAL
============================ */
export const metadata = {
  metadataBase: new URL("https://www.unyona.com"),

  title: "Unyona | Software de gestión administrativa para pymes",
  description:
    "Unyona es una aplicación modular de gestión administrativa para pequeñas y medianas empresas. Centraliza clientes, facturación, proyectos y más desde un solo lugar.",

  keywords: [
    "Unyona",
    "software de gestión",
    "gestión administrativa",
    "ERP pymes",
    "facturación",
    "gestión de clientes",
    "aplicación empresarial",
    "SaaS",
    "Next.js",
  ],

  authors: [{ name: "Unyona" }],
  robots: "index, follow",

  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },

  /* ---------- OPEN GRAPH ---------- */
  openGraph: {
    title: "Unyona | Gestión administrativa sencilla y modular",
    description:
      "Software de gestión administrativa pensado para pymes y negocios modernos. Modular, rápido y fácil de usar.",
    url: "https://www.unyona.com",
    siteName: "Unyona",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/unyona-og.png",
        width: 1200,
        height: 630,
        alt: "Unyona - Software de gestión administrativa",
      },
    ],
  },

  /* ---------- TWITTER ---------- */
  twitter: {
    card: "summary_large_image",
    title: "Unyona | Software de gestión para pymes",
    description:
      "Centraliza la gestión administrativa de tu negocio con Unyona. Modular, moderno y enfocado a pymes.",
    images: ["/images/unyona-og.png"],
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
      <body className={`${inter.className} transition-colors duration-300`}>

        {/* ============================
           JSON-LD: SOFTWARE APPLICATION
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Unyona",
              "url": "https://www.unyona.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description":
                "Unyona es un software de gestión administrativa modular orientado a pequeñas y medianas empresas.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Unyona",
                "url": "https://www.unyona.com",
              },
            }),
          }}
        />

        {/* ============================
           JSON-LD: WEBSITE
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Unyona",
              "url": "https://www.unyona.com",
              "description":
                "Landing oficial de Unyona, software de gestión administrativa para pymes.",
              "publisher": {
                "@type": "Organization",
                "name": "Unyona",
              },
            }),
          }}
        />

        {/* ============================
           SCRIPT ANTI-FLICKER (THEME)
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

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}