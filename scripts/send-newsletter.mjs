import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const RESEND_API_KEY    = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const RESEND_FROM       = process.env.RESEND_FROM ?? "Unyona <hello@unyona.com>";
const CAPSULA           = process.env.CAPSULA;

if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
  console.error("Faltan variables de entorno: RESEND_API_KEY, RESEND_AUDIENCE_ID");
  process.exit(1);
}

console.log(`API key: ${RESEND_API_KEY.slice(0, 8)}...`);
console.log(`Audience ID configurado: ${RESEND_AUDIENCE_ID}`);

// Listar audiences disponibles para debug
const listRes = await fetch("https://api.resend.com/audiences", {
  headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
});
const listData = await listRes.json();
console.log("Audiences disponibles:", JSON.stringify(listData, null, 2));

// Buscar la cápsula a enviar
const capsulaDir = "capsulas";
let archivo;

if (CAPSULA) {
  archivo = join(capsulaDir, CAPSULA.endsWith(".html") ? CAPSULA : `${CAPSULA}.html`);
} else {
  // Elegir una cápsula aleatoria (excluye las que empiezan por _)
  const archivos = readdirSync(capsulaDir)
    .filter((f) => f.endsWith(".html") && !f.startsWith("_"))
    .sort();

  if (!archivos.length) {
    console.log("No hay cápsulas para enviar en capsulas/");
    process.exit(0);
  }
  const idx = Math.floor(Math.random() * archivos.length);
  archivo = join(capsulaDir, archivos[idx]);
  console.log(`Seleccionada aleatoriamente (${idx + 1}/${archivos.length}): ${archivos[idx]}`);
}

console.log(`Enviando cápsula: ${archivo}`);

const html = readFileSync(archivo, "utf8");

// Extraer el asunto del comentario <!-- SUBJECT: ... -->
const subjectMatch = html.match(/<!--\s*SUBJECT:\s*(.+?)\s*-->/);
if (!subjectMatch) {
  console.error("El archivo no tiene la línea <!-- SUBJECT: ... --> al inicio");
  process.exit(1);
}
const subject = subjectMatch[1].trim();
console.log(`Asunto: ${subject}`);

// Crear el broadcast en Resend
const createRes = await fetch("https://api.resend.com/broadcasts", {
  method: "POST",
  headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ audience_id: RESEND_AUDIENCE_ID, from: RESEND_FROM, subject, html }),
});

if (!createRes.ok) {
  const err = await createRes.json().catch(() => ({}));
  console.error("Error al crear el broadcast:", err);
  process.exit(1);
}

const { id } = await createRes.json();
console.log(`Broadcast creado: ${id}`);

// Enviar el broadcast
const sendRes = await fetch(`https://api.resend.com/broadcasts/${id}/send`, {
  method: "POST",
  headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

if (!sendRes.ok) {
  const err = await sendRes.json().catch(() => ({}));
  console.error("Error al enviar el broadcast:", err);
  process.exit(1);
}

console.log("Cápsula enviada correctamente — broadcast id:", id);
