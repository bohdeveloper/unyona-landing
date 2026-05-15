import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const BROADCAST_URL = process.env.BROADCAST_URL;
const BROADCAST_SECRET = process.env.BROADCAST_SECRET;
const CAPSULA = process.env.CAPSULA; // opcional: nombre de archivo concreto

if (!BROADCAST_URL || !BROADCAST_SECRET) {
  console.error("Faltan variables de entorno: BROADCAST_URL, BROADCAST_SECRET");
  process.exit(1);
}

// Buscar la cápsula a enviar
const capsulaDir = "capsulas";
let archivo;

if (CAPSULA) {
  archivo = join(capsulaDir, CAPSULA.endsWith(".html") ? CAPSULA : `${CAPSULA}.html`);
} else {
  // La más reciente por nombre (orden alfabético descendente)
  const archivos = readdirSync(capsulaDir)
    .filter((f) => f.endsWith(".html") && !f.startsWith("_"))
    .sort()
    .reverse();

  if (!archivos.length) {
    console.log("No hay cápsulas para enviar en capsulas/");
    process.exit(0);
  }
  archivo = join(capsulaDir, archivos[0]);
}

console.log(`Enviando cápsula: ${archivo}`);

const html = readFileSync(archivo, "utf8");

// Extraer el asunto del comentario <!-- SUBJECT: ... -->
const subjectMatch = html.match(/<!--\s*SUBJECT:\s*(.+?)\s*-->/);
if (!subjectMatch) {
  console.error('El archivo no tiene la línea <!-- SUBJECT: ... --> al inicio');
  process.exit(1);
}
const subject = subjectMatch[1].trim();

console.log(`Asunto: ${subject}`);

const res = await fetch(BROADCAST_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${BROADCAST_SECRET}`,
  },
  body: JSON.stringify({ subject, html }),
});

const data = await res.json();

if (!res.ok) {
  console.error("Error al enviar:", data);
  process.exit(1);
}

console.log("Cápsula enviada correctamente:", data);
