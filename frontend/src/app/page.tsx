import Hero from "@/components/sections/Hero";
import Producto from "@/components/sections/Producto";
import AppReal from "@/components/sections/AppReal";
import Modulos from "@/components/sections/Modulos";
import ComoFunciona from "@/components/sections/ComoFunciona";
import ListaEspera from "@/components/sections/ListaEspera";
import Organizadores from "@/components/sections/Organizadores";
import Faq from "@/components/sections/Faq";
import Contacto from "@/components/sections/Contacto";
import BlogDestacado from "@/components/sections/BlogDestacado";
import { faqItems } from "@/data/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Producto />
      <AppReal />
      <Modulos />
      <ComoFunciona />
      <Organizadores />
      <Faq />
      {/* Blog justo después del FAQ: cierra el bloque de contenido/confianza
          antes del CTA de conversión (Lista de espera). Orden fijado por el
          usuario, 2026-08-30 — debe coincidir con Navbar y Footer. */}
      <BlogDestacado />
      <ListaEspera />
      <Contacto />

      {/* ============================
         JSON-LD: FAQPage
         Texto EXACTO al mostrado en pantalla (mismo array `faqItems` que
         importa Faq.tsx) — si divergieran sería un dato inventado
         (spec.md §3.15). Solo se declara porque la sección #faq existe de
         verdad en esta página (spec.md §3.16).
      ============================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answerHtml,
              },
            })),
          }),
        }}
      />
    </>
  );
}
