# plan.md — Unyona Landing

> Plan de trabajo vivo (Spec-Driven Development). Contexto y metodología en [spec.md](./spec.md).
> Reglas: nada se implementa sin su punto aquí · al terminar se marca `[x]` con fecha ·
> las tareas grandes se desglosan en fases antes de empezar.
> El detalle punto por punto de lo completado vive en el historial de git.

## Estado actual (2026-08-27)

| Fase / hito | Estado |
|---|---|
| FASE 0 — Landing y validación | ✅ Completada |
| FASE 1 — Métricas, conversión y calidad | ✅ Completada |
| **Bloque legal de la landing** | 🔴 **BLOQUEANTE DE BETA** — ver "Backlog importado del media lab" |
| Captación Early Adopters | ⏳ En curso |
| FASE 2 — Contenido SEO y autoridad | ⏳ Pendiente |

**Pendiente inmediato:**
- **Confirmar un envío del newsletter en verde** (workflow *Enviar Cápsula Informativa*) tras la rotación de la API key de Resend.
  Si falla, los logs del paso `send` ya muestran el `HTTP status + cuerpo` exacto de Resend.
- Reiniciar la sesión de Claude Code para que cargue `.mcp.json` y se activen las tools MCP del grafo.

---

## 📥 Contexto del media lab

El proyecto hermano [`unyona_media_lab`](../unyona_media_lab) (`C:\aplic\unyona_media_lab`) concentra la
estrategia, la investigación y el trabajo legal de Unyona. Deposita sus conclusiones para esta landing en
**`unyona_media_lab/landing/mejoras-landing.md`**, que este repo lee y decide (backlog en la sección de abajo).

> **Regla del canal: el media lab propone, la landing decide.** Nada se implementa leyéndolo directamente:
> se traslada primero aquí como punto de trabajo. Al trasladar o descartar algo, se marca en el documento de
> origen con la fecha y, si se descarta, **con el motivo escrito**.
> El canal **se revisa al empezar cada desarrollo**, no solo la primera vez (`CLAUDE.md`): un encargo ya
> trasladado puede quedar superado por un documento `CORRECCION-*.md` posterior — como pasó el 27-ago con la
> fecha de la beta y con la figura de organizador.

### Decisiones del media lab que condicionan esta landing

| Decisión | Consecuencia aquí |
|---|---|
| **Ciudad única de arranque: VALENCIA** | La landing debe decir que **empezamos por Valencia**. Un alta fuera vale casi nada y genera una expectativa que la app no puede cumplir |
| **Beta pública: mayo de 2027**, gratuita | *(Fundador, 2026-08-27. Antes feb–mar 2027, antes 1-nov-2026 — bajó el ritmo a 3–4 h/semana al tener empleo: sostenibilidad, no retraso sufrido.)* La landing **no debe mencionar ninguna fecha concreta** de apertura — hoy no lo hace, mantenerlo así |
| **Presupuesto: ≤300 €/mes**, orgánico primero | Nada de campañas de pago sobre ganchos no probados |
| **Cualquier usuario crea quedadas; quien la crea es su ORGANIZADOR** | El copy nunca describe una quedada como "organizada por Unyona"; Unyona no selecciona/acredita/verifica (`spec.md §3.11`) |
| **Organizaciones = "Próximamente"** | Se construyen por ingresos, después de la Puerta 2. No cambiar la landing hasta que existan |
| **Un perfil por cuenta** | Nunca prometer multiperfil |

## Saneamiento técnico (2026-08-14) 🔧
Chequeo de salud tras un tiempo sin abrir el proyecto (git limpio y sincronizado, prod HTTP 200).
- [x] `tsconfig.json`: `ignoreDeprecations` `"6.0"` (inválido en TS 5.9) → `"5.0"`. `tsc --noEmit` vuelve a pasar limpio.
- [x] Dependencias: Next 15.1.6 → **15.5.24** + `npm audit fix`. Vulnerabilidades **7 (1 crítica) → 2**
      (ambas en el `postcss` que empaqueta Next, solo build-time; sin fix no-breaking, se aceptan).
- [x] **Backend único = Pages Functions.** Eliminados `src/app/api/{contacto,newsletter}` y `src/lib/{emails,utils}.ts`
      (plantillas de email viejas divergentes, `utils` sin usar, y `new Resend()` a nivel de módulo que rompía
      `npm run build` sin `RESEND_API_KEY`). Ahora el export es 100% estático y el build no necesita la key.
      `spec.md §5` documenta el testeo local vía `npx wrangler pages dev out`.

## Captación Early Adopters ⏳ EN CURSO

**Objetivo:** 30–100 personas genuinamente interesadas antes del lanzamiento Beta.

### Landing optimizada para conversión
- [x] Formulario lista de espera reducido a `email + ciudad` (fricción mínima)
- [x] Hero: badge "Lista de espera abierta", CTA principal → `#lista-espera`, subtítulo con propuesta de valor
- [x] CTAs con `data-umami-event` (ratio clic vs. conversión)
- [x] Prueba social en lista de espera (avatares + copy por ciudad)
- [x] API `/api/lista-espera` acepta `ciudad` (email + notificación admin la mencionan)
- [x] `images.unoptimized: true` para static export; phone frame con cámara frontal
- [x] Aviso de contenido generado con IA en el footer (Reglamento UE 2024/1689, Art. 50)
- [x] Sección `#app-real` con las **4 capturas reales** activas: `screen-feed`, `screen-perfil`,
      `screen-quedada` y `screen-chat` (2026-07-20). El badge pasa automáticamente a "Capturas reales de la app"
- [x] **Landing alineada con la app real** (2026-08-14): **un solo perfil por cuenta** (eliminado el
      multiperfil / "múltiples identidades" en Hero, Producto, Módulos, Cómo funciona y precios);
      **Organizaciones marcadas como "Próximamente"** en toda la landing (Producto, Módulos, Contacto,
      precios); el **Inicio** ahora comunica conexiones por **edad / etapa vital**. Invariante 5 de
      `spec.md` actualizado. `npm run build` en verde.

### Acciones de captación (fuera del código) → viven en el media lab
- [x] **Carpeta `marketing/` eliminada** (2026-08-27): su función la asume el repo hermano
      **`unyona_media_lab`** (produccion/·captacion/·calendario/·estrategia/), más completo y con fuentes.
      Los guiones, posts, outreach y calendario editorial están **allí**. Vídeo: **enfoque mixto**
      (fundador con cara / problema sin cara). Ver `spec.md §7` y las notas de sesión.
- Las tareas de vídeo, posts, outreach y comunidades se gestionan y priorizan en `unyona_media_lab/plan.md`.

### Señal de éxito → activar Beta pública
- [ ] ≥ 50 usuarios activos con sesiones recurrentes (≥ 2 visitas/semana)
- [ ] ≥ 5 entrevistas de usuario con aprendizajes documentados
- [ ] Al menos una ciudad (**Valencia**) con ≥ 20 usuarios (masa crítica del feed)

## Backlog importado del media lab (2026-08-27)
> Origen: `unyona_media_lab/landing/mejoras-landing.md` (2026-08-17). El media lab propone, la landing decide.
> Estados: 🔴 Bloqueante legal · 🟠 Crítico conversión · 🟡 Propuesto · ✅ Hecho.

### Ya aplicado en esta sesión (2026-08-27)
- [x] ✅ **C1 — Landing arranca en Valencia.** Hero (badge + copy) y lista de espera comunican Valencia; a otras
      ciudades, alta honesta ("te avisamos cuando lleguemos"). Invariante 4 de `spec.md` actualizado.
- [x] ✅ **C3 (parcial) — territorios de copy quemados.** "sin swipe infinito" → "sin scroll infinito" en AppReal;
      ángulos propios inyectados. Territorios quemados y ángulos registrados en `spec.md §3.14`.
- [x] ✅ **B5 — regla de copy de seguridad** (invariante `spec.md §3.11`). Auditada la landing: no había promesas
      prohibidas ("gente verificada", "quedadas seguras"…). Regla activa para todo copy futuro.
- [x] ✅ **B3 (parcial) — punto de contacto DSA** `legal@unyona.com` añadido al pie (arts. 11-12 DSA).
- [x] ✅ **P2 — prueba social honesta.** Retirada la afirmación no verificable "Varias personas ya apuntadas"
      (invariante `spec.md §3.15`). La prueba social real llega con las primeras quedadas.
- [x] ✅ **B4 — sin píxeles sin banner** e **invariante 18+** registrados (`spec.md §3.12` y `§3.13`).
- [x] ✅ **Neutralidad de la plataforma** (revisión del media lab, `CORRECCION-organizador-y-neutralidad.md`,
      2026-08-27): reforzado el invariante `spec.md §3.11` (Unyona no selecciona/acredita/verifica/forma/supervisa
      organizadores; nunca "nuestros organizadores"; Airbnb vs Uber). Auditada la landing: sin "monitor", sin
      "nuestros organizadores", sin "organizada por Unyona". La sección `#organizadores` ya cumple.
- [x] ✅ **Costumbre registrada**: revisar el media lab (`mejoras-landing.md` + `CORRECCION-*.md`) al empezar
      cualquier desarrollo nuevo. En `CLAUDE.md` y `spec.md §6`.

### Pendiente — legal (🔴 bloqueante para la beta, requiere datos del fundador + abogado)
- [ ] 🔴 **B1/B3 — bloque legal completo.** Reescribir `/privacidad`, `/aviso-legal` y crear **Condiciones
      Generales de Uso** que definan a Unyona como *intermediario, no organizador*. Necesita: **NIF real**,
      dirección (coworking sirve), lista de encargados reales (Resend, Stripe, hosting, Twilio) y sus
      transferencias internacionales, y **revisión de abogado (300-800 €)**. La Política de Cookies actual puede
      reducirse a un párrafo informativo (Umami no usa cookies; sin banner).
- [ ] B2 — condiciones de contratación y desistimiento 14 días: **diferido** hasta que se cobre.

### Pendiente — conversión y contenido
- [x] ✅ **C2 — bloque de organizadores** (2026-08-27). Promesa del §3.4 del media lab ("nunca pagarás por
      organizar · tus datos son tuyos · detrás hay una persona · cero exclusividad") + honestidad ("lo que no te
      vamos a decir: sin asistentes prometidos, sin dinero, el fundador no va") + CTA `mailto:hello@unyona.com`.
      Sin promesas de seguridad (invariante B5). **Va como sección del home** (`#organizadores`, entre Lista de
      espera y Contacto) con enlace en Navbar y Footer — no como página aparte *(decisión del usuario: más visible
      en el home; se descartó la ruta `/organizadores` propia, recuperable en git)*.
- [ ] 🟠 **C4 — explicar la microfianza** como compromiso, no precio (se devuelve al asistir; sube asistencia del
      40-50 % al 70-85 %). Encaja con el ángulo "Si dices que vas, vas".
- [x] ✅ **Navbar/Footer desalineados + blog invisible en el home** (2026-08-30, detectado por el usuario;
      ronda 1). Corregido: mismas etiquetas en Navbar y Footer; nueva sección **`#blog`** (`BlogDestacado.tsx`)
      al final del home, tras Contacto.
- [x] ✅ **Ronda 2 — orden definitivo + enlaces del blog + choque visual** (2026-08-30, feedback del
      usuario sobre la ronda 1). Cambios:
      - **Blog movido**: de "al final tras Contacto" a **justo después del FAQ, antes de Lista de espera**
        (mismo sitio en Navbar, Footer y `page.tsx`).
      - **Orden único y obligatorio** en Navbar + Footer + home: La app · Funcionalidades · Cómo funciona ·
        Organizadores · FAQ · **Blog** · Lista de espera · Contacto — los 8, en los 3 sitios, sin excepciones
        (antes el Navbar omitía Lista de espera y Contacto "por no ser redundante"; el usuario prefiere
        consistencia total).
      - **"Blog" del Navbar/Footer ahora apunta a `#blog`** (sección del home), no a `/blog` (antes llevaba
        a "una pantalla solitaria" — la página sigue existiendo, solo que ya no es el destino directo de la
        navegación principal).
      - Navbar pasa de romper a móvil en `md` (768px) a `lg` (1024px): con 8 enlaces + CTA se apretaban en
        tablet.
      - **Bug de layout**: el link "Volver al blog"/"Volver al inicio" (icono+texto) iba `inline-flex` y
        quedaba en la misma línea que el badge de categoría de debajo, amontonados — corregido a `flex w-fit`
        (bloque, fuerza salto de línea) en `/blog` y en el artículo. Aplicado también en `/blog` aunque el
        usuario solo vio el bug en el artículo, por ser el mismo patrón de código.
      - "Volver a inicio" en `/blog` → ahora "Volver al inicio", `href="/#blog"` (antes `href="/"`, cargaba
        el home entero desde arriba en vez de volver a la sección).
      Detalle completo en `spec.md §4`.
- [x] ✅ **P1 (parcial) — SEO local Valencia** (2026-08-30). Auditoría on-page de todas las páginas
      (home/layout, `/privacidad`, `/aviso-legal`, `/cookies`, `/confirmar`, `/baja`) — ver detalle abajo.
      Aplicado en esta tanda: metadata global (`layout.tsx`) reorientada a intención local Valencia + aficiones
      verticales (senderismo, fotografía, running, club de lectura); `areaServed: Valencia` honesto en el
      JSON-LD de `Organization`; fix de CSP que bloqueaba silenciosamente Umami (medición rota). El resto — H1
      de Hero, contenido nuevo de página, `/blog`, páginas de funcionalidades — queda desglosado como checklist
      en **FASE 2** más abajo. Es inversión a medio plazo, pero con la beta ahora en **mayo de 2027** hay tiempo
      de sobra para que rinda antes de abrir.
- [ ] 🟡 **P4 — revisión CRO** del hero/formulario antes del primer tráfico frío de TikTok/Reels.
- [ ] 🟡 **P3 — cobro anual visible** en precios *(solo si se adopta el ciclo anual; hoy `#precios` inactivo)*.

## FASE 2 — Contenido SEO y autoridad ⏳ PENDIENTE

> Plan de contenido propuesto en la auditoría P1 (2026-08-30, ver histórico). Prioridad por intención de
> búsqueda real (media lab: senderismo, fotografía, club de lectura, running = verticales con demanda
> verificada en Meetup Valencia) y coste de producir sin inventar contenido/prueba social (invariante `spec.md
> §3.15`). Cada página nueva se añade a `frontend/src/app/sitemap.ts` al publicarse. Naming de rutas en
> minúsculas y con guiones, siguiendo la convención ya usada (`/aviso-legal`).

### Quick wins de contenido on-page (sin `/blog`, bajo riesgo, alto valor local)
- [x] ✅ **FAQ en el home** (2026-08-30). Sección `#faq` (`frontend/src/components/sections/Faq.tsx`),
      acordeón accesible con las 8 preguntas del copy final (contenido redactado y revisado línea a línea
      por el orquestador, `spec.md §3.15`), entre `#organizadores` y `#lista-espera` (resuelve dudas justo
      antes del CTA de conversión — decisión de UX). `FAQPage` JSON-LD en `frontend/src/app/page.tsx`
      importando **el mismo array** `frontend/src/data/faq.ts` que usa el render visual, para que pregunta y
      respuesta sean idénticas por construcción (`spec.md §3.15`/§3.16). Enlace en Navbar (desktop + móvil)
      y Footer. Detalle de decisiones en `spec.md §4`.
- [ ] **`BreadcrumbList` JSON-LD** en `/privacidad`, `/aviso-legal`, `/cookies` una vez exista `/blog` o más de
      un nivel de profundidad (hoy son rutas de primer nivel, breadcrumbs no aportan). Prioridad **baja**.

### Páginas de funcionalidades (intención navegacional/comercial, sin inventar contenido)
- [ ] `/funcionalidades/quedadas` — keyword objetivo: *"organizar quedadas Valencia"* / *"quedar con gente
      Valencia"*. Prioridad **alta**: es la función núcleo del producto, ya tiene contenido real en `ComoFunciona`
      y `AppReal` que se puede ampliar sin inventar nada.
- [ ] `/funcionalidades/perfil-aficiones` — keyword objetivo: *"app para conocer gente con mis aficiones"*.
      Prioridad **media**.
- [ ] `/organizadores` como página propia — **ya existe el copy** (sección `#organizadores` del home, ver
      commit `9bd282e`, luego movida a sección en `17c1a04`). Si se decide recuperar como página SEO
      independiente (keyword: *"organizar quedadas gratis Valencia"*), es trabajo de **routing**, no de copy
      nuevo. Prioridad **media** — decisión de producto, no puramente SEO.

### `/blog` — pilar de contenido local (inversión a medio plazo)
- [x] ✅ **Infraestructura de `/blog` + página pilar** (2026-08-30). `frontend/src/app/blog/page.tsx`
      (listado, recorre `frontend/src/data/blog-posts.ts`) y primer artículo en
      `frontend/src/app/blog/conocer-gente-en-valencia/page.tsx` — keyword objetivo *"conocer gente en
      Valencia"* / *"hacer amigos en Valencia"*, contenido redactado y revisado línea a línea por el
      orquestador (fuentes SoledadES + eldiario.es citadas al final, sin cifras/testimonios inventados,
      sin fecha de beta, `spec.md §3.15`). Metadata SEO completa (title/description/canonical/OG/Article
      JSON-LD) y ambas rutas en `frontend/src/app/sitemap.ts`. Enlace desde el Footer (`Navegación`) y
      CTA final a `/#lista-espera`. Estructura preparada para los 4 artículos de aficiones de abajo sin
      refactor — ver la nota de 3 pasos en la cabecera de `data/blog-posts.ts` y la decisión de arquitectura
      en `spec.md §4`.
- [ ] Artículo — **senderismo en Valencia**: keyword objetivo *"grupos de senderismo Valencia"* /
      *"quedadas senderismo Valencia"*. Prioridad **alta** (vertical con demanda verificada, media lab).
- [ ] Artículo — **fotografía en Valencia**: keyword objetivo *"quedadas de fotografía Valencia"* /
      *"grupo fotografía urbana Valencia"*. Prioridad **alta**.
- [ ] Artículo — **club de lectura en Valencia**: keyword objetivo *"club de lectura Valencia"* /
      *"grupos de lectura Valencia"*. Prioridad **alta**.
- [ ] Artículo — **running en Valencia**: keyword objetivo *"grupos de running Valencia"* /
      *"quedadas para correr Valencia"*. Prioridad **alta**.
- [ ] Artículo — **hacer amigos de adulto** (ángulo nacional, sin depender de Valencia): keyword objetivo
      *"cómo hacer amigos de adulto"* / *"hacer amigos siendo adulto"*. Intención informacional, volumen alto,
      capta tráfico fuera de Valencia para la lista de espera nacional. Prioridad **media**.
  > Antes de escribir cualquier artículo: pasa por `/code-review` de contenido (evitar territorios de copy
  > quemados `spec.md §3.14`, cero cifras/testimonios inventados `spec.md §3.15`, sin prometer fecha de beta).
  > Un artículo por keyword — evitar canibalización (una intención, una URL).

### Otros
- [ ] Testimonios y casos de uso reales (cuando haya primeras quedadas celebradas — no antes, `spec.md §3.15`)
- [ ] Internacionalización *(solo si se expande a mercados no hispanohablantes)*: `next-intl`, rutas `/en`, `/eu`, `/ca`

## Pendientes pospuestos a alpha
- [ ] Estrategia de precios revisada → sección de pricing definitiva
- [ ] Tests automatizados de handlers críticos
- [ ] Revisión de accesibilidad
- [ ] Analytics de conversión afinado (Umami ya integrado)
- [ ] Imagen OG real (`/images/unyona-og.png`)

## Histórico de fases completadas

<details>
<summary><strong>FASE 0 — Landing y validación</strong> ✅</summary>

Landing desplegada en `unyona.com` (Next.js + Tailwind), identidad visual (paleta teal/coral, Poppins + Manrope),
modo oscuro/claro, responsive mobile-first, animaciones al scroll. Secciones Hero/Producto/Módulos/Cómo funciona/
Quiénes somos/Suscripción/Contacto + precios preparados. SEO técnico completo (metadata, OG, Twitter, JSON-LD,
sitemap dinámico, canonical). Email y captación con Resend: contacto con auto-respuesta, newsletter con doble opt-in
y RGPD, endpoint de baja, re-suscripciones, Resend Audiences. Newsletter: 12 cápsulas HTML, cápsula de bienvenida
automática, `send-newsletter.mjs` (cápsula aleatoria), envío programado martes 09:00 ES vía GitHub Actions.
Legal: aviso legal, privacidad, cookies + banner de consentimiento. Seguridad: API keys en env, cabeceras (CSP,
X-Frame-Options), rate limiting por IP vía KV, HMAC obligatorio en confirm/unsubscribe/delete-data, validación de
email en URL, comparación timing-safe en broadcast, límites de longitud en contacto.
</details>

<details>
<summary><strong>FASE 1 — Métricas, conversión y calidad</strong> ✅</summary>

Analytics de privacidad sin cookies (Umami) con tracking de eventos clave (`cta-hero-*`, `lista-espera-submit` con
`ciudad`). Páginas de confirmación (`/confirmar`), baja confirmada con reactivar (`/baja`) y errores (`/404`, `/500`).
Captación anticipada: sección lista de espera (`#lista-espera`), endpoint `/api/lista-espera` con email de confirmación
y alta en Resend Audiences. Bug fix: emails con `await` (Workers mata promesas sin await).
</details>

<details>
<summary><strong>Mantenimiento — Metodología y tooling (2026-07-20)</strong> ✅</summary>

Adoptado Spec-Driven Development (`spec.md` + `plan.md`, `ROADMAP.md` fusionado y eliminado). Migración del grafo de
código a codebase-memory-mcp (`.mcp.json` versionado; índice local gitignorado), retirando la herramienta
anterior por completo. Documentados en `CLAUDE.md` los agentes **ux-ui-designer** (trabajo visual/UX, antes de maquetar
UI nueva) y **git-master** (operaciones git no triviales). Commit `5cf3d1e`.
</details>

<details>
<summary><strong>Mantenimiento — Newsletter (2026-07)</strong> ✅</summary>

Rotación de la API key de Resend (estaba revocada, rompía broadcasts y formularios). Endurecido `send-newsletter.mjs`:
log de `HTTP status + cuerpo` real de Resend, guarda contra `id` vacío, y `RESEND_ID_FIELD` configurable para la
migración Audiences→Segments. Commit `128ff97` en `master`.
</details>
