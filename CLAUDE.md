# Reglas de trabajo — Unyona Landing

## Spec-Driven Development (OBLIGATORIO)

- Al empezar cualquier tarea, lee `spec.md` (§3 invariantes, §6 metodología) y `plan.md`.
- Nada se implementa sin su punto en `plan.md`; si no está, añádelo primero.
- Contrasta la tarea con los invariantes de `spec.md §3`; avisa si algo choca.
- Al terminar: marca `plan.md` con fecha, registra decisiones nuevas en `spec.md`,
  y actualiza `README.md` si cambia el alcance o el stack.
- Ciclo de cierre de feature: `npm run build` → `/code-review` (obligatorio) →
  `/security-review` si toca auth/HMAC/privacidad → verificar en real (`/run`).
- Reutiliza los helpers de `functions/_shared/` (ver `spec.md §2`) antes de crear nada nuevo.
- Commit solo cuando el usuario lo pida (Conventional Commits en español, estilo del git log).

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
