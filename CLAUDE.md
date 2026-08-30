# Reglas de trabajo — Unyona Landing

## Spec-Driven Development (OBLIGATORIO)

- Al empezar cualquier tarea, lee `spec.md` (§3 invariantes, §6 metodología) y `plan.md`.
- **Al empezar CUALQUIER desarrollo nuevo, revisa el media lab** (`C:\aplic\unyona_media_lab`): su
  `landing/mejoras-landing.md` (backlog canónico hacia la landing) y cualquier `**/CORRECCION-*.md`.
  Si hay propuestas o correcciones nuevas que afecten a la landing, incorpóralas a `plan.md`/`spec.md`
  antes de desarrollar. El media lab propone, la landing decide. *(No es un repo git: compara por
  contenido/fecha de modificación.)*
- Nada se implementa sin su punto en `plan.md`; si no está, añádelo primero.
- Contrasta la tarea con los invariantes de `spec.md §3`; avisa si algo choca.
- Al terminar: marca `plan.md` con fecha, registra decisiones nuevas en `spec.md`,
  y actualiza `README.md` si cambia el alcance o el stack.
- Ciclo de cierre de feature: `npm run build` → `/code-review` (obligatorio) →
  `/security-review` si toca auth/HMAC/privacidad → verificar en real (`/run`).
- Reutiliza los helpers de `functions/_shared/` (ver `spec.md §2`) antes de crear nada nuevo.
- Commit solo cuando el usuario lo pida (Conventional Commits en español, estilo del git log).

## Rutina de Notion (obligatoria al terminar cualquier tarea)

> Regla canónica definida en `unyona_media_lab/CLAUDE.md` — aplica a los tres repos de Unyona. Si cambia
> allí, sincroniza esta copia.

Workspace **Centro de Mando** en Notion, vía las tools MCP (`notion-search`, `notion-fetch`,
`notion-query-data-sources`, `notion-update-page`, `notion-create-pages`):

- 🗂️ **Proyectos** (`collection://50478e16-ec4a-4026-a82f-e5f0e21a4f20`) — la fila de este repo es
  **`unyona-landing`**. No crear otra fila de proyecto.
- ✅ **Tareas** (`collection://1dbc95a4-ac0d-4032-8cce-d5f0df760834`) — `Tarea` (título), `Proyecto`
  (relación, límite 1 → fila `unyona-landing`), `Estado` (Por hacer / En curso / Bloqueado / Hecho),
  `Prioridad` (P1-P4), `Horas`, `Notas`, `Fecha objetivo`.

**Al terminar cualquier tarea:**

1. Busca en Tareas una fila con `Proyecto = unyona-landing` cuyo título encaje con lo hecho.
2. Si existe, actualiza `Estado` y `Notas` con el resultado real (y `Fecha objetivo` si cambia).
3. Si no existe, mira antes la fila de **Proyectos** `unyona-landing` (`Estado`, `Prioridad`,
   `Siguiente paso`) para dar contexto coherente, y crea la tarea con `Tarea`, `Proyecto` = esa fila,
   `Prioridad`/`Estado` acordes y `Notas` con lo hecho.
4. No inventes propiedades fuera de este esquema.

`plan.md` sigue siendo la fuente de verdad del trabajo; Notion es el tablero visible sin abrir el repo.

## Agentes especializados

Dos agentes (definidos a nivel usuario en `~/.claude/agents/`, disponibles en cualquier sesión):

- **ux-ui-designer** — úsalo cuando el resultado principal sea **visual o de experiencia de usuario**:
  diseñar/rediseñar secciones de la landing, evolucionar el sistema de diseño (`spec.md §4`),
  responsive, SEO on-page (metadatos, Open Graph, HTML semántico, Core Web Vitals), animaciones
  y accesibilidad. Lánzalo **antes de maquetar UI nueva**.
  No lo uses para lógica de las Pages Functions, email/Resend ni bugs sin componente visual.

- **git-master** — úsalo para operaciones git **no triviales**: conflictos (merge, rebase, cherry-pick),
  estrategia de ramas, sincronización con remoto, recuperar trabajo perdido (reflog), limpiar historia,
  stash, bisect, submódulos y hooks.
  No lo uses para un `git status` o un commit rutinario, que se hacen directamente.

## codebase-memory-mcp

Este proyecto tiene un grafo de conocimiento del código servido por **codebase-memory-mcp**
(config versionable en `.mcp.json`; el índice local vive en `.codebase-memory/`, **gitignorado**).

Reglas:
- Para preguntas sobre el código (arquitectura, relaciones entre archivos, dónde vive algo),
  usa primero las tools MCP antes de grep/lectura masiva: `search_graph` (buscar funciones/clases/rutas),
  `trace_path` (cadenas de llamadas / flujo de datos), `query_graph` (patrones tipo Cypher),
  `get_architecture` (estructura del proyecto), `search_code` (grep aumentado con grafo) y
  `get_code_snippet` (fuente exacta de un símbolo). Devuelven un subgrafo acotado, mucho menor que grep en crudo.
- Usa Grep/Glob/Read libremente para texto, configs, archivos no-código, y siempre lee un archivo antes de editarlo.
- El watcher incremental refresca el grafo automáticamente tras editar; solo hace falta reindexar
  manualmente (`codebase-memory-mcp cli index_repository --repo-path . --persistence true`) tras un `git pull` grande.
- Regenera el grafo visual `.codebase-memory/graph.html` al cerrar cada fase o tras cambios grandes.
