# plan.md — Unyona Landing

> Plan de trabajo vivo (Spec-Driven Development). Contexto y metodología en [spec.md](./spec.md).
> Reglas: nada se implementa sin su punto aquí · al terminar se marca `[x]` con fecha ·
> las tareas grandes se desglosan en fases antes de empezar.
> El detalle punto por punto de lo completado vive en el historial de git.

## Estado actual (2026-07-20)

| Fase / hito | Estado |
|---|---|
| FASE 0 — Landing y validación | ✅ Completada |
| FASE 1 — Métricas, conversión y calidad | ✅ Completada |
| Captación Early Adopters | ⏳ En curso |
| FASE 2 — Contenido SEO y autoridad | ⏳ Pendiente |

**Pendiente inmediato:**
- **Confirmar un envío del newsletter en verde** (workflow *Enviar Cápsula Informativa*) tras la rotación de la API key de Resend.
  Si falla, los logs del paso `send` ya muestran el `HTTP status + cuerpo` exacto de Resend.
- Reiniciar la sesión de Claude Code para que cargue `.mcp.json` y se activen las tools MCP del grafo.

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

### Acciones de captación (fuera del código)
- [x] **Espacio `marketing/` creado** (2026-07-21): guiones, posts, outreach, calendario
      editorial y carpeta `assets/` para binarios (gitignorados; opción Git LFS). Todo el
      material vive versionado ahí. Ver [`marketing/README.md`](./marketing/README.md).
- [ ] Vídeo corto del problema (30-45 s) para TikTok/Reels · *3 guiones listos en `marketing/guiones/`*
- [ ] Primer post "construyendo en público" en LinkedIn/Instagram · *listos en `marketing/posts/`*
- [ ] Outreach personal a 50-80 personas de la red del fundador · *plantillas en `marketing/outreach/red-personal.md`*
- [ ] Presencia orgánica en comunidades (r/AskSpain, grupos Facebook, Meetup Madrid) · *guía en `marketing/outreach/comunidades.md`*

### Señal de éxito → activar Beta pública
- [ ] ≥ 50 usuarios activos con sesiones recurrentes (≥ 2 visitas/semana)
- [ ] ≥ 5 entrevistas de usuario con aprendizajes documentados
- [ ] Al menos una ciudad con ≥ 20 usuarios (masa crítica del feed)

> Nota: el histórico `docs/early-adopters.md` que referenciaba el ROADMAP se ha materializado
> como el espacio [`marketing/`](./marketing/) (guiones, copys, outreach y assets), no en `docs/`.

## FASE 2 — Contenido SEO y autoridad ⏳ PENDIENTE

- [ ] Sección `/blog` (comunidad local, quedadas, conexiones reales)
- [ ] Artículos para keywords objetivo (red social local, quedadas, comunidad barrio)
- [ ] Páginas de funcionalidades con detalle (`/funcionalidades/quedadas`, `/funcionalidades/grupos`)
- [ ] Testimonios y casos de uso reales (cuando haya primeros usuarios)
- [ ] FAQ expandida con rich snippets
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
