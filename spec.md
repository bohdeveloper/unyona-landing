# spec.md — Unyona Landing

> Documento vivo de especificación (Spec-Driven Development).
> Memoria del proyecto: qué es, cómo está construido, decisiones y metodología.
> El trabajo pendiente vive en [plan.md](./plan.md) (que incluye el histórico resumido de lo completado).
> Regla: toda decisión nueva de producto/arquitectura se registra aquí en la misma sesión.

## 1. Qué es Unyona Landing

**Unyona** es una red social **local** centrada en conexiones reales: conocer personas con tus
mismos intereses cerca de ti y **quedar en persona** (no likes ni scroll infinito).

Este repo es la **landing oficial** (`https://unyona.com`), con tres objetivos:
1. Explicar el concepto y el problema que resuelve.
2. Captar emails de la **lista de espera** beta.
3. Validar el interés real antes de construir la app completa.

- **Dominio:** https://unyona.com · **Despliegue:** Cloudflare Pages · **Repo:** `bohdeveloper/unyona-landing` (rama `master`).
- **Fase actual:** Landing y validación completadas; **captación de early adopters en curso**.
- **Ciudad de arranque de la beta: VALENCIA** *(decisión del media lab, ago-2026)*. **Beta pública prevista para mayo de 2027**, gratuita *(decisión del fundador 2026-08-27 al bajar el ritmo a 3–4 h/semana; sustituye a feb–mar 2027, que sustituyó al 1-nov-2026)*.
  La landing capta a toda España, pero **comunica que se arranca en Valencia**; a quien es de otra ciudad se le
  ofrece un alta honesta ("te avisamos cuando lleguemos"). El fundador reside en Gipuzkoa (Errenteria) → la red
  de Gipuzkoa es para **entrevistas de usuario y alpha cerrada**, no mercado. Ver [[unyona-media-lab]].
- **App real:** repositorio **separado** (`app.unyona.com`), stack React + Vite · Express.js · PostgreSQL · Prisma.
  La landing **no depende** de la app ni viceversa. *(El README histórico mencionaba Spring Boot/Angular: obsoleto.)*
- **Tres proyectos de Unyona:** `unyona` (app real) · `unyona-landing` (este) · **`unyona_media_lab`**
  (`C:\aplic\unyona_media_lab`): estrategia, investigación, contenido, captación y legal. **El media lab propone,
  la landing decide:** su archivo `landing/mejoras-landing.md` es el backlog canónico hacia esta landing
  (importado a `plan.md`). Toda la producción de marketing/contenido vive **allí**, no aquí.

## 2. Stack y arquitectura

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 — **static export** (`output: "export"`, `images.unoptimized: true`) |
| UI | React 18 + TypeScript |
| Estilos | TailwindCSS 3 + CSS Variables |
| Animaciones | Framer Motion (`motion/react`) |
| Iconos | Lucide React |
| Tipografía | Poppins (headings) + Manrope (body) — Google Fonts |
| Email transaccional / broadcasts | Resend |
| Backend en el borde | Cloudflare **Pages Functions** (`frontend/functions/`) |
| Rate limiting | Cloudflare **KV** |
| Despliegue | Cloudflare Pages |

**Estructura del repo:**
```
unyona-landing/
├── frontend/
│   ├── src/app/          # Rutas Next (páginas, layout, metadata, sitemap)
│   ├── src/components/    # layout/ (Navbar, Footer, ThemeToggle) + sections/
│   ├── functions/api/     # Pages Functions: contacto, newsletter, lista-espera,
│   │                      #   confirm, unsubscribe, delete-data, broadcast
│   └── functions/_shared/ # emails.ts (plantillas HTML), rateLimit.ts
├── capsulas/              # Cápsulas HTML del newsletter (<!-- SUBJECT: … -->)
├── scripts/send-newsletter.mjs   # Envío de cápsula vía broadcast de Resend
├── .github/workflows/newsletter.yml   # Envío programado (martes 07:00 UTC)
├── .mcp.json + .codebase-memory/  # Grafo de código (codebase-memory-mcp)
```

**Abstracciones centrales — reutilizar, nunca duplicar** *(rescatado del grafo previo; sin ciclos de import, mantenerlo así):*
- `checkRateLimit()` — `functions/_shared/rateLimit.ts`, límite por IP vía KV. Aplicar en todo endpoint nuevo.
- `functions/_shared/emails.ts` — constructoras de HTML de email: `sendEmail()`, `contactoEmailHtml()`,
  `adminContactoEmailHtml()`, `newsletterEmailHtml()`, `chispaHtml()`, `yaSubscritoHtml()`, `bajaConfirmadaEmailHtml()`, `esc()` (escape HTML).
- Helpers HMAC: `hmacHex()`, `verifyHmac()`, `timingSafeEqual()` — firma/verificación de tokens de email.
- Handlers de Pages Functions: `onRequestPost()` / `onRequestGet()` por archivo en `functions/api/*`.

## 3. Decisiones de producto y reglas de negocio (invariantes)

1. **Sin algoritmo de engagement.** No se optimiza para tiempo de pantalla.
2. **Del online al offline.** El KPI que importa es la quedada real, no la sesión.
3. **Privacidad por diseño.** El usuario controla su identidad en todo momento.
4. **Local first — arranque en Valencia.** La cercanía geográfica es el filtro principal. La beta **arranca en
   Valencia** (densidad > tamaño de mercado: 40 usuarios en una ciudad valen más que 400 repartidos). La landing
   lo comunica sin disculparse; a quien no es de Valencia, alta válida pero honesta ("te avisamos cuando lleguemos").
5. **Perfil único por cuenta.** Cada persona tiene **un** perfil (aficiones, edad, zona) — no múltiples
   identidades por cuenta. Las **organizaciones/colectivos** (eventos/comunidad) son una línea **futura**,
   aún no desarrollada: en la landing se muestran siempre como **"Próximamente"**.
   *(Cambio 2026-08-14: se retiró el multiperfil que reflejaba el diseño anterior; el Inicio ahora
   comunica conexiones por edad/etapa vital.)*
6. **Landing = captación + validación + marca.** Estática, sin auth; nada de lógica de la app aquí.
7. **Newsletter con doble opt-in y RGPD.** Confirmación explícita; baja y borrado de datos disponibles.
8. **HMAC obligatorio** en `confirm`, `unsubscribe` y `delete-data` (error explícito si falta `BROADCAST_SECRET`);
   comparación de tokens en tiempo constante en `broadcast`.
9. **Lista de espera de fricción mínima:** solo `email + ciudad`.
10. **Cumplimiento IA (Reglamento UE 2024/1689, Art. 50):** aviso de contenido generado con IA en el footer.
11. **Copy honesto de seguridad + neutralidad (regla legal, no de marca).** Ningún texto —landing o RRSS— promete
    seguridad o verificación que no exista: crea una obligación de resultado que Unyona (persona física, sin límite
    de responsabilidad, art. 1911 CC) no puede cumplir.
    - ✅ Verificable: "Verificamos el teléfono de cada persona." · "Puedes bloquear y reportar en un toque."
    - ❌ Prohibido: "gente verificada" · "quedadas seguras" · "gente de fiar" · "sabemos quién viene".
    - **Neutralidad = protección; control = exposición** *(media lab, CORRECCION-organizador-y-neutralidad.md,
      2026-08-27; Airbnb C-390/18 = intermediario protegido vs Uber C-434/15 = responde por seleccionar)*.
      Cualquier usuario puede crear una quedada y es su **organizador** (rol por quedada, no una puerta de acceso).
      Unyona **no selecciona, no acredita, no verifica, no forma ni supervisa** a los organizadores. Por eso:
      **nunca "nuestros organizadores"**, ni distintivos que impliquen que Unyona ha comprobado algo, ni
      **"quedada organizada por Unyona"**. La quedada es del organizador y bajo su responsabilidad; Unyona es el canal.
      *(Ojo: "organizador" = usuario que crea una quedada; "organización" = tipo de cuenta, sigue "Próximamente" — §3.5.)*
12. **Sin píxeles de terceros sin banner.** Mientras la analítica sea **Umami** (sin cookies, sin IP), el art. 22.2
    LSSI no se activa y **no hay banner de cookies**. El día que se instale un píxel de Meta/TikTok/Google se activa
    banner con **bloqueo previo real**, política de cookies específica y una transferencia internacional más. Se
    retrasan los píxeles todo lo posible (Umami + UTM = 90 % de la medición al 0 % del coste de cumplimiento).
13. **Beta 18+.** Perfiles de menores = **"Próximamente"** (como organizaciones): no se implementan sin verificación
    de edad real, consentimiento parental y revisión jurídica. La landing no capta ni sugiere uso por menores.
14. **Territorios de copy quemados en España — no usar:** "sin swipes" (Timeleft), "volver a lo real" (POPULIT),
    "no es otra app para hacer amigos" (We Are Mussa), "conocer gente cara a cara" (genérico). **Ángulos propios:**
    "Tu afición, no tu foto" · "Si dices que vas, vas" · "Sin feed. Sin peaje. Sin dueño que la estropee".
15. **Nada inventado.** Sin cifras, testimonios ni prueba social falsos (RDL 7/2021, práctica desleal). Si aún no
    hay tracción, se dice. La prueba social real (fotos con consentimiento LO 1/1982, testimonios) llega con las
    primeras quedadas celebradas.
16. **SEO on-page orientado a intención local Valencia** *(auditoría 2026-08-30)*. `title`/`description`/OG/Twitter
    globales (`layout.tsx`) y el JSON-LD de `Organization` (`areaServed: Valencia`) reflejan que la beta arranca
    **solo en Valencia** — coherente con el invariante 4, no es una promesa nueva. Datos estructurados: solo se
    declara lo que existe de verdad en la página (p. ej. **no** hay `SearchAction` en el `WebSite` JSON-LD porque
    no hay buscador interno; **no** hay `FAQPage` porque no hay sección de FAQ en el home — se activan cuando el
    contenido real exista, nunca antes, invariante 15). El plan de contenido SEO (FASE 2: `/blog`, páginas de
    funcionalidades, FAQ) vive en `plan.md`, priorizado por intención de búsqueda, no por volumen de palabras.
17. **La landing es 100% estática (SSG), no una SPA client-side.** `output: "export"` genera HTML pre-renderizado
    por ruta en build time — indexabilidad completa desde el día uno, sin las limitaciones de una SPA CSR pura.
    Esta garantía **no** se extiende a la app real (`app.unyona.com`, React + Vite sin SSR): si algún día se
    decide dar SEO a rutas de la app, hace falta prerender o migrar a un framework con SSR — no basta con meta
    tags.

> **Textos legales pendientes antes de la beta** *(bloqueante, del media lab `negocio/cumplimiento-legal.md`)*:
> Política de Privacidad específica (art. 13 RGPD: nombrar encargados —Resend, Stripe, hosting, Twilio—,
> transferencias internacionales, geolocalización y su revocación, plazos), Condiciones Generales de Uso (definen
> a Unyona como intermediario + Normas de Comunidad + moderación DSA art. 14), Aviso Legal (art. 10 LSSI: nombre,
> **NIF real**, dirección —vale la de un coworking—, email) y **punto de contacto único `legal@unyona.com`** en el
> pie (DSA arts. 11-12). **Requieren datos del fundador + revisión de abogado (300-800 €).** No hay banner de
> cookies mientras solo haya Umami.

## 4. Sistema de diseño y convenciones UI

| Token | Claro | Oscuro |
|---|---|---|
| Primary | `#61DBD6` | `#46D4D0` |
| Secondary | `#FF8781` | `#FF6B6B` |
| Texto principal | `#263238` | `#E1E5E8` |
| Texto secundario | `#607D8B` | `#9BA6AD` |
| Fondo | `#F7F9FA` | `#2B2B2B` |

- Tipografía: **Poppins** (headings) + **Manrope** (body). Modo oscuro/claro con persistencia (`ThemeToggle`).
- Mobile-first; navbar móvil a pantalla completa. Animaciones fade-in al scroll (`useFadeInOnScroll`) con Framer Motion.
- Secciones con ancla, **en este orden fijo en el home** (usuario, 2026-08-30): `#inicio` → `#producto`
  → `#app-real` → `#funcionalidades` → `#como-funciona` → `#organizadores` → `#faq` → `#blog` →
  `#lista-espera` → `#contacto`. *(`#app-real` y `#quienes-somos`/`#precios` no están en Navbar/Footer:
  `#app-real` vive entre Producto y Funcionalidades sin enlace propio; `#quienes-somos` y `#precios`
  son secciones inactivas, no renderizadas.)*
- **Navbar y Footer usan exactamente los mismos 8 enlaces, en el mismo orden y con la misma etiqueta**
  (fijado por el usuario, 2026-08-30, tras detectar un desajuste): **La app · Funcionalidades · Cómo
  funciona · Organizadores · FAQ · Blog · Lista de espera · Contacto.** Ese mismo orden es también el de
  las secciones del home. **"Blog" apunta a la ancla `#blog` del home, no a la página `/blog`** — esa
  página sigue existiendo (listado completo, mejor para SEO) pero solo se llega a ella desde dentro de
  la propia sección (`BlogDestacado.tsx` → "Ver todos los artículos") o desde los enlaces "volver" del
  blog. Todos los enlaces de Navbar/Footer son anclas — pero **con `/` al inicio** (`<a href="/#...">`),
  **nunca `<a href="#...">` a secas**, porque `Navbar.tsx` y `Footer.tsx` son globales (viven en
  `layout.tsx`, se renderizan en TODAS las páginas). Un `href="#lista-espera"` se resuelve relativo a la
  URL actual: en el home funciona (hace scroll), pero en `/blog` navega a `/blog#lista-espera` — esa
  sección no existe ahí, así que no pasa nada. Bug real, 2026-08-30. Las secciones del home (`Hero.tsx`,
  `ComoFunciona.tsx`, etc.) sí pueden usar `#...` a secas sin el `/`, porque **solo se renderizan en `/`**.
  Ninguno de los dos usa `next/link`, solo `<a>`. Al añadir o renombrar una sección, tocar `Navbar.tsx`,
  `Footer.tsx` y el orden en `page.tsx` a la vez — y recordar el `/` si el enlace va en Navbar o Footer.
  Con 8 enlaces + CTA, el Navbar cambia de menú móvil a horizontal en `lg` (1024px), no en `md` (768px)
  — a `md` se apretarían.
- **Enlaces "volver" en `/blog` y en cada artículo:** el `<Link>` de "volver" (icono + texto) debe ser
  `flex w-fit`, nunca `inline-flex` — si es `inline-flex` (inline-level) queda en la misma línea que el
  badge de categoría que va justo debajo (ambos inline), y se amontonan. `flex w-fit` lo hace bloque
  (fuerza salto de línea) sin perder el ancho ajustado al contenido. El badge en sí lleva `block w-fit`
  por el mismo motivo, aunque el salto ya lo fuerce el link. Bug real detectado por el usuario, 2026-08-30.
- `prefers-reduced-motion: reduce`: salvaguarda global en `globals.css` (neutraliza duración de toda
  animación/transición CSS pura del sitio) + `useReducedMotion()` de Framer Motion por componente donde
  se anima con `whileInView` (2026-08-30, primero aplicado en `Faq.tsx`; el resto de secciones existentes
  no lo tenían y queda como deuda menor si se retocan).
- **FAQ del home** (`#faq`, `frontend/src/components/sections/Faq.tsx`, 2026-08-30): acordeón de un solo
  panel abierto a la vez, `aria-expanded`/`aria-controls`/`role="region"` + `inert` en el panel colapsado
  (saca del tabulador y del árbol de accesibilidad el enlace a `/privacidad` de la pregunta de datos
  mientras está cerrado). El panel se anima con **CSS `grid-template-rows` 0fr→1fr** (no con `height`
  animado por Framer Motion): evita medir alturas en JS y es una interacción discreta, no continua,
  guardada además con `motion-reduce:transition-none`. Contenido en `frontend/src/data/faq.ts`, importado
  tanto por `Faq.tsx` (render) como por el `FAQPage` JSON-LD de `page.tsx`, para que pregunta/respuesta
  sean el mismo texto por construcción (invariante 15) — nunca dupliques este array en otro sitio.
  Posición: entre `#organizadores` y `#lista-espera` (resuelve objeciones justo antes del CTA de
  conversión).
- **`/blog`** (2026-08-30): rutas estáticas explícitas (`frontend/src/app/blog/page.tsx` +
  `frontend/src/app/blog/<slug>/page.tsx` por artículo — sin `generateStaticParams`, sigue el patrón de
  `/aviso-legal`). Metadatos de listado (`title`, `description`, `date`, `readingMinutes`) centralizados en
  `frontend/src/data/blog-posts.ts`; el listado (`/blog`) recorre ese array, así que añadir un artículo
  nuevo no toca `blog/page.tsx` — solo (1) añadir la entrada al array, (2) crear la carpeta+`page.tsx` del
  artículo con su propia `metadata`, (3) añadir la ruta a `sitemap.ts`. Ancho de lectura `max-w-2xl`
  (más estrecho que el `max-w-3xl` de las páginas legales, mejor longitud de línea para prosa larga).
  Artículos como componente **servidor puro** (sin `"use client"`, sin Framer Motion): no hay
  interactividad real en un artículo de solo lectura, y evita JS innecesario en la página con más texto
  del sitio (Core Web Vitals). `Article` JSON-LD con autoría a nivel de `Organization` (no hay firma
  personal). Carpeta `src/data/` (no `src/lib/`) para no reabrir la ambigüedad con el `src/lib/` de
  backend eliminado en 2026-08-14 (invariante de arquitectura §5) — `src/data/` es contenido estático de
  frontend, sin relación con las Pages Functions.
- **Escaparate del blog en el home** (`#blog`, `frontend/src/components/sections/BlogDestacado.tsx`,
  2026-08-30): el blog no tenía ninguna visibilidad en el scroll principal, solo un enlace en el Footer —
  corregido. Sección al **final del home, tras `#contacto`**, deliberadamente fuera del embudo de
  conversión (Organizadores → FAQ → Lista de espera) para no competir con el CTA principal; funciona como
  cierre editorial / refuerzo de SEO y autoridad. Ordena `blogPosts` por fecha desc. y muestra hasta 3
  (el más reciente como card destacada, el resto en grid) — con 1 solo artículo hoy, se ve como una única
  card ancha; escala sola al añadir artículos, sin tocar el componente.

## 5. Entorno de desarrollo y producción

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000  (solo frontend estático; los /api/* NO se sirven aquí)
npm run build    # static export → /out  (typecheck desactivado: NEXT_DISABLE_TYPECHECK=1)
npx tsc --noEmit # typecheck manual (pasa limpio; el del build va desactivado)
```

- **Backend = Pages Functions (fuente única).** Los endpoints viven **solo** en `functions/api/*` con sus
  plantillas en `functions/_shared/emails.ts`. **No hay** rutas `src/app/api/*` ni `src/lib/*` (se eliminó
  ese andamiaje dev que había divergido de producción, 2026-08-14). Por eso `npm run build` ya **no** requiere
  `RESEND_API_KEY` y el export es 100% estático.
- **Probar los endpoints en local:** `npx wrangler pages dev out` tras `npm run build` (ejecuta las Functions
  reales contra `/out`). `next dev` solo sirve el frontend; los formularios fallarán ahí porque no hay `/api/*`.
- **Despliegue:** Cloudflare Pages (build `next build` → `/out`). Redirects vía `_redirects`.
- **Variables de entorno de las Pages Functions:** `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_FROM`,
  `BROADCAST_SECRET`, `CONTACT_NOTIFY_EMAIL`, binding **KV** para rate limiting. Réplica local en `frontend/.env.local` (gitignore).
- **GitHub Actions `newsletter.yml`** (martes 07:00 UTC): secrets `RESEND_API_KEY` + `RESEND_AUDIENCE_ID`.
  Opcional `RESEND_ID_FIELD=segment_id` si Resend rechaza `audience_id` tras la migración Audiences→Segments.
- **Newsletter:** cápsulas en `capsulas/*.html` con cabecera `<!-- SUBJECT: … -->`; `send-newsletter.mjs` elige una
  al azar (excluye las que empiezan por `_`), crea un broadcast en Resend y lo envía.
- **Grafo de código:** se versionan `.mcp.json` y `.codebase-memory/graph.html`. El índice
  (`artifact.json`, `graph.db.zst`) está **gitignorado**: es un artefacto derivado que el watcher regenera en cada
  cambio grabando el hash de HEAD, así que nunca queda limpio y ensuciaría todos los commits. Reconstruirlo en un
  equipo nuevo tarda segundos (`codebase-memory-mcp cli index_repository --repo-path . --persistence true`).
- **Deuda aceptada:** typecheck desactivado en build; imagen OG real y analytics de conversión pendientes (ver plan.md).
- **Fix 2026-08-30:** la CSP de `frontend/public/_headers` (`script-src`/`connect-src`) no incluía
  `https://cloud.umami.is` — bloqueaba silenciosamente la carga y el envío de eventos de Umami en producción
  (sin medición no hay SEO ni CRO fiables). Corregido añadiendo el dominio a ambas directivas.

## 6. Metodología de desarrollo (Spec-Driven Development)

### Antes de desarrollar
1. Leer `spec.md` (§3 invariantes, §6 metodología) y `plan.md`; confirmar que la tarea está en el plan (si no, añadirla primero).
   **Revisar también el media lab** (`C:\aplic\unyona_media_lab`): `landing/mejoras-landing.md` y cualquier
   `CORRECCION-*.md`; incorporar a `plan.md`/`spec.md` lo nuevo que afecte a la landing antes de desarrollar.
2. Contrastar con los invariantes de §3; avisar si algo choca.
3. Explorar el código con **codebase-memory-mcp** (`search_graph`, `trace_path`, `query_graph`, `get_architecture`,
   `search_code`, `get_code_snippet`) antes de grep/lectura masiva.
4. Buscar helper/plantilla existente en `_shared/` antes de crear uno nuevo (ver §2).
5. Usar el agente **ux-ui-designer** antes de maquetar UI nueva.
6. Desglosar tareas grandes en fases dentro de `plan.md`.

### Durante el desarrollo
Convenciones del proyecto; validación de inputs (formato email, límites de longitud) y `checkRateLimit()` +
guards HMAC en cada endpoint nuevo; reutilizar `sendEmail()` y las plantillas de `emails.ts`.
Recordar: en Cloudflare Workers, `await` los envíos de email (una promesa sin await se mata).

### Después de desarrollar
1. `npm run build` de lo tocado (el typecheck del build está desactivado; ejecutar `tsc --noEmit` si se tocan tipos).
2. `/code-review` sobre el diff — obligatorio antes de cerrar cualquier feature.
3. `/security-review` si se toca auth/HMAC/privacidad o se añade un endpoint.
4. Verificar end-to-end en la app real (`/run`), limpiando procesos propios.
5. Registrar: marcar `plan.md` con fecha; decisiones nuevas → `spec.md`; cambios de alcance/stack → `README.md`;
   regenerar `.codebase-memory/graph.html` al cerrar fase.
6. Commit solo cuando el usuario lo pida, en el estilo del git log (Conventional Commits en español).
7. `/simplify` opcional al cerrar una fase.

### Skills y agentes del proyecto
| Skill / Agente | Cuándo |
|---|---|
| **codebase-memory-mcp** (tools MCP) | Cualquier pregunta sobre el código antes de grep/lectura masiva |
| **ux-ui-designer** (agente) | Diseñar/rediseñar secciones, sistema de diseño, responsive, SEO on-page, animaciones |
| `/code-review` | Antes de cerrar toda feature (sobre el diff) |
| `/security-review` | Endpoints nuevos, auth/HMAC, privacidad/RGPD |
| `/web-perf` | Auditar Core Web Vitals / velocidad de la landing |
| `/run` | Arrancar la landing y verificar cambios en real |
| `/simplify` | Limpieza de reutilización/eficiencia al cerrar fase |
| **git-master** (agente) | Operaciones git no triviales (conflictos, rebase, rescates) |

## 7. Documentos del proyecto

| Documento | Rol |
|---|---|
| `spec.md` | Memoria: qué es, arquitectura, invariantes, metodología (este archivo) |
| `plan.md` | Trabajo vivo por fases + histórico resumido |
| `README.md` | Escaparate público en GitHub |
| `ROADMAP.md` | *(fusionado en `plan.md` y eliminado — recuperable en git)* |
| `CLAUDE.md` | Reglas de trabajo para Claude Code (enforcea SDD + codebase-memory-mcp) |
| `.codebase-memory/graph.html` | Grafo de código navegable (3D, committeable) |
| **`unyona_media_lab`** *(repo hermano, `C:\aplic\unyona_media_lab`)* | Estrategia, investigación (zonas, competencia, voz del usuario), contenido, captación y legal. Su `landing/mejoras-landing.md` es el **backlog canónico** hacia esta landing. **Es el hogar único de marketing/contenido** (la antigua carpeta `marketing/` de este repo se eliminó el 2026-08-27) |
