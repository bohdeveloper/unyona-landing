import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
============================ */
export const metadata = {
  metadataBase: new URL("https://www.unyona.com"),

  title: "Unyona | La red social que queda",
  description:
    "Unyona conecta personas con intereses comunes en tu zona. Crea tu perfil, descubre grupos locales y organiza quedadas reales. Del online al offline.",

  keywords: [
    "Unyona",
    "red social local",
    "quedadas",
    "conectar personas",
    "intereses comunes",
    "eventos locales",
    "comunidades",
    "meetup",
    "Next.js",
  ],

  authors: [{ name: "Unyona" }],
  robots: "index, follow",

  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },

  /* ---------- OPEN GRAPH ---------- */
  openGraph: {
    title: "Unyona | Conecta, comparte y queda",
    description:
      "Descubre personas con tus mismos intereses en tu zona. Crea grupos, organiza quedadas y vive experiencias reales.",
    url: "https://www.unyona.com",
    siteName: "Unyona",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/unyona-og.png",
        width: 1200,
        height: 630,
        alt: "Unyona - La red social que queda",
      },
    ],
  },

  /* ---------- TWITTER ---------- */
  twitter: {
    card: "summary_large_image",
    title: "Unyona | La red social que queda",
    description:
      "Del scroll infinito a las experiencias reales. Conecta con personas en tu zona y queda en persona.",
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
      <body className={`${poppins.variable} ${manrope.variable} transition-colors duration-300`}>

        {/* ============================
           JSON-LD: WEB APPLICATION
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Unyona",
              "url": "https://www.unyona.com",
              "applicationCategory": "SocialNetworkingApplication",
              "operatingSystem": "Web",
              "description":
                "Unyona es una red social local que conecta personas con intereses comunes y facilita quedadas reales.",
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
                "Landing oficial de Unyona, la red social que conecta personas localmente y facilita quedadas reales.",
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