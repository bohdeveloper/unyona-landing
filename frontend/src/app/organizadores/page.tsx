import OrganizadoresContent from "./OrganizadoresContent";

export const metadata = {
  title: "Organiza sin peaje · Unyona para organizadores en Valencia",
  description:
    "¿Organizas quedadas en Valencia? En Unyona no pagarás nunca por organizar, tus datos son tuyos y te los llevas cuando quieras, y detrás hay una persona a la que escribir. Beta 1 nov 2026.",
  alternates: { canonical: "https://unyona.com/organizadores" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Organiza sin peaje · Unyona para organizadores",
    description:
      "Sin peaje por organizar, tus datos son tuyos, y detrás hay una persona a la que escribir. Empezamos en Valencia.",
    url: "https://unyona.com/organizadores",
    type: "website",
  },
};

export default function OrganizadoresPage() {
  return <OrganizadoresContent />;
}
