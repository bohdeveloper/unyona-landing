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
- **App real:** repositorio **separado** (`app.unyona.com`), stack React + Vite · Express.js · PostgreSQL · Prisma.
  La landing **no depende** de la app ni viceversa. *(El README histórico mencionaba Spring Boot/Angular: obsoleto.)*

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
4. **Local first.** La cercanía geográfica es el filtro principal.
5. **Dos tipos de usuario:** personas (perfiles múltiples por cuenta) y organizaciones (eventos/comunidad).
6. **Landing = captación + validación + marca.** Estática, sin auth; nada de lógica de la app aquí.
7. **Newsletter con doble opt-in y RGPD.** Confirmación explícita; baja y borrado de datos disponibles.
8. **HMAC obligatorio** en `confirm`, `unsubscribe` y `delete-data` (error explícito si falta `BROADCAST_SECRET`);
   comparación de tokens en tiempo constante en `broadcast`.
9. **Lista de espera de fricción mínima:** solo `email + ciudad`.
10. **Cumplimiento IA (Reglamento UE 2024/1689, Art. 50):** aviso de contenido generado con IA en el footer.

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
- Secciones con ancla: `#inicio`, `#producto`, `#funcionalidades`, `#como-funciona`, `#quienes-somos`,
  `#lista-espera`, `#contacto`, `#app-real`, `#precios` *(inactivo)*.

## 5. Entorno de desarrollo y producción

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → /out  (typecheck desactivado: NEXT_DISABLE_TYPECHECK=1)
```

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

## 6. Metodología de desarrollo (Spec-Driven Development)

### Antes de desarrollar
1. Leer `spec.md` (§3 invariantes, §6 metodología) y `plan.md`; confirmar que la tarea está en el plan (si no, añadirla primero).
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
