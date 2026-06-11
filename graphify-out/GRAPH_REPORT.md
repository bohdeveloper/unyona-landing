# Graph Report - unyona-landing  (2026-06-11)

## Corpus Check
- 51 files · ~32,042 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 274 nodes · 304 edges · 33 communities (23 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fa51f4dd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 35|Community 35]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `🗺️ ROADMAP — EVOLUCIÓN DE UNYONA` - 12 edges
3. `Unyona – Landing oficial` - 10 edges
4. `onRequestGet()` - 8 edges
5. `onRequestPost()` - 8 edges
6. `FASE 0 — Landing y validación ✅ COMPLETADA` - 8 edges
7. `checkRateLimit()` - 7 edges
8. `onRequestPost()` - 7 edges
9. `esc()` - 6 edges
10. `FASE 6 — App: descubrimiento, grupos y chat` - 6 edges

## Surprising Connections (you probably didn't know these)
- `onRequestPost()` --calls--> `checkRateLimit()`  [EXTRACTED]
  frontend/functions/api/newsletter.ts → frontend/functions/_shared/rateLimit.ts
- `onRequestPost()` --calls--> `contactoEmailHtml()`  [EXTRACTED]
  frontend/functions/api/contacto.ts → frontend/functions/_shared/emails.ts
- `onRequestPost()` --calls--> `adminContactoEmailHtml()`  [EXTRACTED]
  frontend/functions/api/contacto.ts → frontend/functions/_shared/emails.ts
- `onRequestGet()` --calls--> `chispaHtml()`  [EXTRACTED]
  frontend/functions/api/confirm.ts → frontend/functions/_shared/emails.ts
- `onRequestPost()` --calls--> `yaSubscritoHtml()`  [EXTRACTED]
  frontend/functions/api/newsletter.ts → frontend/functions/_shared/emails.ts

## Import Cycles
- None detected.

## Communities (33 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (37): Analytics y métricas, Backend (Express + PostgreSQL), Calidad y tests, Calidad y tests, Captación anticipada, Chat de evento, Deployment, Descubrimiento básico (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (11): steps, INTERESTS, Tab, CONNECTIONS, NODES, categories, CATEGORY_COLORS, features (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, ignoreDeprecations, incremental, isolatedModules, jsx, lib (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (19): addToAudience(), Env, hmacHex(), isSubscribed(), onRequestGet(), sendEmail(), verifyHmac(), Env (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (6): manrope, metadata, poppins, viewport, links, SOCIALS

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (25): dependencies, lucide-react, motion, next, react, react-dom, resend, devDependencies (+17 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (12): Aplicación (repositorio separado), Arquitectura, Estado actual, Estructura de secciones, Instalación y desarrollo, Landing (este repo), Objetivos de esta landing, Paleta de color y tipografía (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.35
Nodes (9): POST(), resend, adminContactoEmailHtml(), adminNewsletterEmailHtml(), contactoEmailHtml(), esc(), newsletterEmailHtml(), POST() (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (6): Chat (Socket.io), FASE 6 — App: descubrimiento, grupos y chat, Grupos de interés, Notificaciones, Privacidad, Radar local

### Community 10 - "Community 10"
Cohesion: 0.39
Nodes (6): Env, hmacHex(), onRequestGet(), sendEmail(), verifyHmac(), bajaConfirmadaEmailHtml()

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (16): Env, isValidEmail(), KVNamespace, onRequestPost(), saveToAirtable(), sendEmail(), addToAudience(), Env (+8 more)

### Community 14 - "Community 14"
Cohesion: 0.60
Nodes (4): Env, onRequestGet(), page(), verifyHmac()

### Community 18 - "Community 18"
Cohesion: 0.50
Nodes (3): html, subject, subjectMatch

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (3): Env, onRequestPost(), timingSafeEqual()

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (6): Crecimiento, Cuenta de organización, Eventos públicos, FASE 9 — App: organizaciones, escala y monetización, Internacionalización, Planes de pago (Stripe)

## Knowledge Gaps
- **134 isolated node(s):** `eslintConfig`, `KVNamespace`, `Env`, `Env`, `KVNamespace` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `🗺️ ROADMAP — EVOLUCIÓN DE UNYONA` connect `Community 0` to `Community 8`, `Community 35`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `checkRateLimit()` connect `Community 12` to `Community 3`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `KVNamespace`, `Env` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._