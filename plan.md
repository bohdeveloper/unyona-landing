# plan.md — Unyona Landing

> Plan de trabajo vivo (Spec-Driven Development). Contexto y metodología en [spec.md](./spec.md).
> Reglas: nada se implementa sin su punto aquí · al terminar se marca `[x]` con fecha ·
> las tareas grandes se desglosan en fases antes de empezar.
> El detalle punto por punto de lo completado vive en el historial de git.

---

# 🧭 ORDEN MAESTRO DE UNYONA

> **Copia sincronizada. La fuente canónica es [`unyona_media_lab/plan.md`](../unyona_media_lab/plan.md)**, que es
> el cerebro de Unyona: recoge la información y lleva el plan de los tres proyectos. La otra copia vive en
> [`unyona/plan.md`](../unyona/plan.md). Las tres son **idénticas a propósito** — este repo ve el plan completo,
> no solo su trozo, para que las dependencias cruzadas sean visibles sin abrir los otros dos.
>
> 🔄 **Regla de sincronización (obligatoria):** si cambia una prioridad, un estado o una fila, se actualizan
> **las tres copias en la misma sesión**. Una copia desactualizada es peor que no tenerla.
> Al cerrar un punto: marcarlo aquí, en el media lab **y** en su sección de más abajo, con fecha.
>
> 📌 **Las filas de este repo son las 🌐 `LAND-xx`.** Son 12 de las 57.
> 📅 **Última sincronización: 2026-08-30**

**Cómo se lee.** El orden va de **más a menos importante** y se ejecuta de arriba abajo. Un punto no sube por ser
fácil ni baja por ser aburrido: manda el impacto en la **North Star** *(quedadas reales completadas)* y en la
**Puerta 1** *(abrir la beta — mayo 2027, en Valencia)*.

**Repos:** 🧭 `unyona_media_lab` (estrategia) · 📱 `unyona` (app real) · 🌐 `unyona-landing` (web pública — **este**)
**Estados:** 🔴 bloqueante · 🟠 necesario · 🟡 mejora · ⚪ diferido por decisión escrita · 🔵 bloqueado por decisión previa · ✅ hecho

---

## 🎯 Si solo hay tiempo para una cosa esta semana

> ### ML-01 — Contactar a los organizadores de Meetup en Valencia *(no es de este repo)*
>
> Es **lo único marcado explícitamente como "no se ralentiza"**. Es una **ventana temporal**: los organizadores
> descontentos con la subida de precios de Bending Spoons están decidiendo **ahora mismo** a dónde llevarse su
> comunidad. **No depende de que la web esté lista.** Cero hecho todavía.
>
> **Por qué le importa a este repo:** **LAND-02** (los 4 artículos de blog) va **en paralelo** a ML-01, porque son
> las aficiones exactas de los grupos que se contactan. Es la contribución de mayor apalancamiento de la landing.

---

## 📊 Estado general de los tres proyectos *(2026-08-30)*

### 🧭 Media Lab — estrategia y cerebro

| Bloque | Estado |
|---|---|
| **Fase 0 — Inteligencia y fundamentos** | ⏳ En curso. Ciudad decidida (Valencia), estudio de zonas y competencia hechos. Faltan `posicionamiento.md`, `embudo.md`, `metricas.md` |
| **Fase 1 — Captación de organizadores** | 🔴 **Ruta crítica, sin empezar.** Ver el recuadro de arriba |
| **Vía paralela legal** | Documentos base ya escritos (~60 fuentes). Falta **redactar** CGU / Privacidad / Aviso Legal / Acuerdo de Organizador |
| **Fase de contenido** *(antes Fase 1, hoy Fase 4)* | ✅ **Deliberadamente en pausa.** No se graba nada hasta cerrar organizadores |

**Restricción que gobierna todo:** **3–4 h/semana**, **~145 h** de presupuesto hasta mayo 2027.
Todo lo de este documento compite por ese mismo margen.

### 📱 Unyona (app real)

| Bloque | Estado |
|---|---|
| **FASE 6M — Cumplimiento legal** 🔴 | Puntos **1, 2 y 2ter hechos** (retención legal, barrera 18+ real, bloqueo de perfiles familiares en quedadas). **Pendientes 2bis→12**: consentimientos, notificación y acción DSA, derechos del interesado, geo revocable, transparencia del cifrado, art. 18 DSA |
| **FASE 6N — Figura de Organizador** 🟠 | **Sin empezar.** "Sin organizadores no hay beta": sin esta figura no hay dónde apuntar a la gente que capte ML-01 |
| **Deploy (BETA.5)** | DNS/Resend **sin verificar = nadie puede registrarse**. Uploads en disco efímero: las fotos se pierden en cada redeploy |
| ⚠️ **Hallazgo de confianza** | Solo **~6 de ~15** beneficios Pro anunciados existen — incluido **KYC, anunciado en el copy y no implementado**. Implementarlo o retirarlo del anuncio antes de cobrar |

**Prioridad real allí:** los **puntos 3–8 de la FASE 6M** son el único bloque que su plan marca como
*"no admite versión reducida"*.

### 🌐 Unyona-landing (web pública) — **este repo**

| Bloque | Estado |
|---|---|
| **Bloque legal (B1/B3)** 🔴 | **Bloqueado** esperando los mismos documentos que se preparan en el media lab (CGU, Privacidad, Aviso Legal) |
| **SEO y conversión** | ✅ Buen ritmo reciente: FAQ, blog (infraestructura + primer artículo de Valencia), navbar/footer corregidos, SEO local on-page |
| **Artículos de blog pendientes** | Senderismo · fotografía · club de lectura · running **en Valencia** |
| **C4 — microfianza** | Pendiente, prioridad media |

> 💡 **Coincidencia que vale la pena explotar.** Los 4 artículos pendientes son **exactamente** las aficiones de
> los 4 grupos de Meetup prioritarios que ML-01 va a contactar *(Valenfoto · Valencia Runner Club · Slow Valencia
> Book Club · Hiking Valencia)*. Como el outreach va a **5 contactos/semana durante varias semanas**, publicar los
> artículos **en paralelo** hace que las tandas 2–4 lleguen a un organizador que, si busca "Unyona", encuentra
> contenido real **de su propio tema** en vez de una landing genérica.

---

## 🔴 TIER 1 — Ruta crítica hacia la Puerta 1 *(abrir la beta, mayo 2027)*

| # | ID | Repo | Qué | Estado | Por qué está aquí · de qué depende |
|---|---|---|---|---|---|
| 1 | **ML-01** | 🧭 | Contactar a los 5 organizadores prioritarios de Meetup Valencia y **cerrar 3 comprometidos** | 🔴 | **Ventana temporal** que se cierra sola. No depende de nada. ~15 h · máx. 5/semana (art. 21 LSSI) |
| 2 | **ML-02** | 🧭 | Redactar los borradores legales: **CGU** · Política de Privacidad · Aviso Legal · Normas de la Comunidad · Acuerdo de Organizador · Cesión de imagen | 🔴 | Desbloquea **a la vez** APP-01…APP-07 y LAND-01. Redactarlos aquí abarata la revisión a la mitad |
| 3 | **LAND-02** | 🌐 | 4 artículos de blog: **senderismo · fotografía · club de lectura · running** en Valencia | 🟠 | **Va en paralelo a ML-01**, no después: son las aficiones exactas de los grupos que se contactan |
| 4 | **ML-03** | 🧭 | **Revisión por abogado de las CGU** (300–500 €) | 🔴 | Único gasto legal ineludible. Decide si Unyona es **intermediario u organizador** ante un daño |
| 5 | **APP-01** | 📱 | 6M·2bis — Alinear `Terminos.tsx` con la barrera 18+ real | 🔴 | **~1 h.** Hoy los Términos publicados prometen algo que el código ya no hace |
| 6 | **APP-02** | 📱 | 6M·3 — Registro de consentimientos (*append-only* + SHA-256) | 🔴 | Sin esto el consentimiento es indemostrable = inexistente. 1,5 d |
| 7 | **APP-03** | 📱 | 6M·4 — Notificación y acción del DSA (arts. 16–17) | 🔴 | Sin esto **se pierde el escudo del art. 16 LSSI** → responsabilidad solidaria. 3 d |
| 8 | **APP-04** | 📱 | 6M·5 — Derechos del interesado: exportar y borrar de verdad | 🔴 | La denuncia del usuario desatendido es la **vía nº1** por la que se acaba ante la AEPD. 2,5 d |
| 9 | **APP-05** | 📱 | 6M·6 — Consentimiento granular y revocable de geolocalización | 🔴 | La geo excesiva es lo que dispara las sanciones (caso Ares, 200.000 €). 2 d |
| 10 | **APP-06** | 📱 | 6M·7 — Transparencia sobre el cifrado del chat | 🔴 | 0,5 d. El chat **no** es E2E y hay que decirlo con todas las letras |
| 11 | **APP-07** | 📱 | 6M·8 — Procedimiento del art. 18 DSA (aviso a Fuerzas y Cuerpos de Seguridad) | 🔴 | 1 d + 1 h de redacción |
| 12 | **ML-04** | 🧭 | **EIPD** con la herramienta *Gestiona EIPD* de la AEPD | 🔴 | Obligatoria desde el día 1 (cumple 4–5 criterios; el umbral son 2). **0 €**, 1–2 días |
| 13 | **ML-05** | 🧭 | **Registro de Actividades de Tratamiento (RAT)** | 🔴 | **0 €**, 3 h. La excepción del art. 30.5 RGPD no aplica |
| 14 | **ML-06** | 🧭 | Archivar los **DPA** de Stripe, Resend, Twilio, hosting y Umami | 🔴 | **0 €**, 2 h. Art. 28.3 RGPD |
| 15 | **ML-07** | 🧭 | Procedimientos escritos: brecha 72 h · art. 16 DSA · art. 18 DSA | 🔴 | **0 €**. En caliente no hay 72 h para improvisar |
| 16 | **LAND-01** | 🌐 | B1/B3 — Reescribir `/privacidad` y `/aviso-legal`, publicar las **CGU** | 🔴 | Depende de ML-02 + ML-03. Necesita **NIF y dirección reales** del fundador |
| 17 | **APP-12** | 📱 | UI de admin de 6M·1 y 6M·2 (congelar datos · eliminar por menor) | 🟠 | El backend ya está hecho; sin UI no se puede usar |

## 🟠 TIER 2 — Necesario para abrir la beta

| # | ID | Repo | Qué | Estado | Por qué está aquí · de qué depende |
|---|---|---|---|---|---|
| 18 | **APP-13** | 📱 | 6N — **Figura de Organizador** (versión mínima) | 🟠 | ~15 h. Sin organizadores no hay beta. Se valida con los que cierre **ML-01** |
| 19 | **APP-14** | 📱 | 6N — **Registro de asistencia real** | 🟠 | **Sin este dato no existe la North Star.** El KPI del proyecto es la quedada real completada |
| 20 | **APP-20** | 📱 | Bloqueantes de latencia externa: Resend/DNS · `app.unyona.com` · uploads persistentes · handles sociales | 🟠 | **Sin Resend verificado nadie puede registrarse.** Se atacan pronto porque dependen de terceros |
| 21 | **APP-15** | 📱 | 6N — Confirmación activa 24 h antes (quien no confirma libera plaza) | 🟠 | La medida anti no-show de mayor efecto **sin dinero** (la microfianza está aplazada) |
| 22 | **APP-16** | 📱 | 6N — Onboarding que termina en una quedada (<3 min, <6 pantallas, sin subir foto) | 🟠 | |
| 23 | **APP-17** | 📱 | 6N — Honestidad de densidad local (nunca un feed o un mapa vacíos) | 🟠 | Fallo clásico del producto local en arranque: quema la primera impresión |
| 24 | **ML-09** | 🧭 | **Seguro de RC** antes de la primera quedada (100–350 €/año) | 🟠 | Lo que se compra de verdad son los **gastos de defensa jurídica**, no la indemnización |
| 25 | **ML-13** | 🧭 | Diseñar y celebrar las **3 quedadas semilla** | 🟠 | Criterio explícito de la Puerta 1 |
| 26 | **APP-21** | 📱 | BETA.5 — Despliegue web (Railway + Vercel) + smoke test end-to-end | 🟠 | ~20 h. No depende de lo legal: puede ir en paralelo |
| 27 | **ML-10** | 🧭 | `estrategia/posicionamiento.md` · `embudo.md` · `metricas.md` | 🟠 | Cierra la Fase 0 y da el mensaje con el que se habla a todo el mundo |
| 28 | **APP-24** | 📱 | Auditoría **promesa ↔ realidad** del plan Pro (retirar KYC y upscaling del copy) | 🟠 | Solo ~6 de ~15 beneficios existen. Cobrar por lo que no existe rompe la confianza |
| 29 | **APP-08** | 📱 | 6M·9 — Etiqueta de IA en avatares + gate en quedadas presenciales | 🟠 | Art. 50 Rgto. IA y, más fuerte, confianza de producto |
| 30 | **APP-09** | 📱 | 6M·10 — Retención por tratamiento + cron `aplicarRetencion()` | 🟠 | 1 d |
| 31 | **LAND-06** | 🌐 | Confirmar un envío del newsletter **en verde** tras la rotación de la API key de Resend | 🟠 | |
| 32 | **ML-17** | 🧭 | Pluriactividad: aclarar la relación laboral previa y **revisar el nuevo contrato antes de firmar** | 🟠 | Titularidad del software (art. 97.4 TRLPI): exclusividad, competencia, propiedad |
| 33 | **ML-18** | 🧭 | Contactar al organizador de **30ñeros** (Gipuzkoa) | 🟠 | Contacto templado de mayor valor. De ahí salen las **5 entrevistas de usuario** |

## 🟡 TIER 3 — Mejora incremental, o después de abrir

| # | ID | Repo | Qué | Estado |
|---|---|---|---|---|
| 34 | **APP-18** | 📱 | Resto de 6N: home por defecto · aforo mín./máx. · doble publicación · escalado anti no-show · cola de moderación priorizada · reportar tras la quedada · expulsar de la quedada · señales de seguridad · antifraude | 🟡 |
| 35 | **APP-22/23** | 📱 | BETA.1 motor de planes (backend) + BETA.2 gating y claridad de plan (frontend) | 🟡 |
| 36 | **APP-28** | 📱 | BETA.7 — Onboarding, página de planes y centro de ayuda | 🟡 |
| 37 | **APP-10** | 📱 | 6M·11 — Cadena de hashes en `AccionAdmin` | 🟡 |
| 38 | **LAND-03** | 🌐 | C4 — Explicar la **microfianza** como compromiso, no como precio | 🟡 |
| 39 | **LAND-04** | 🌐 | P4 — Revisión **CRO** del hero y el formulario antes del primer tráfico frío | 🟡 |
| 40 | **LAND-07** | 🌐 | Páginas de funcionalidades: `/quedadas` · `/perfil-aficiones` · `/organizadores` | 🟡 |
| 41 | **LAND-08** | 🌐 | Artículo "hacer amigos de adulto" (ángulo nacional, fuera de Valencia) | 🟡 |
| 42 | **ML-14** | 🧭 | `beta/`: onboarding · anti-no-show · guion de entrevistas · ritual semanal | 🟡 |
| 43 | **ML-11/12** | 🧭 | Verificar los eventos de Umami · inventario de perfiles sociales | 🟡 |
| 44 | **ML-16** | 🧭 | Revisar la partida de hosting (VPS ~10 €/mes frente a 25–50 €) antes de que la beta esté viva | 🟡 |
| 45 | **LAND-09** | 🌐 | `BreadcrumbList` JSON-LD (cuando haya más de un nivel de profundidad) | 🟡 |

## ⚪ TIER 4 — Diferido por decisión escrita *(no se reabre sin motivo nuevo)*

| # | ID | Repo | Qué | Estado | Motivo del diferimiento |
|---|---|---|---|---|---|
| 46 | **ML-15** | 🧭 | **Arsenal de contenido**: guiones, grabación en lote, calendario editorial | ⚪ | Fase 4 (`spec.md §3.19` del media lab). **No se graba un solo vídeo hasta cerrar organizadores** |
| 47 | **APP-11** | 📱 | 6M·12 — Intereses sensibles del art. 9 RGPD | ⚪ | Diferido **con condición no negociable**: ningún interés nuevo entra al catálogo hasta que exista el gate |
| 48 | **APP-25** | 📱 | BETA.4 — Stripe live y precio Fundador | ⚪ | Puerta 3 (**2028**). No se cobra antes |
| 49 | **APP-26** | 📱 | BETA.3 — Features Pro nuevas | ⚪ | Se eligen **con datos de uso**, no adivinando antes de tener usuarios |
| 50 | **APP-27** | 📱 | BETA.6 — Stores (iOS + Android) | ⚪ | Fuera del camino crítico: se lanza en **web + PWA** |
| 51 | **APP-29** | 📱 | FASE 7 — Organizaciones | ⚪ | Se construyen **por ingresos**, después de la Puerta 2. Hoy = "Próximamente" |
| 52 | **APP-30** | 📱 | FASE 8 — Estabilidad, calidad y seguridad | ⚪ | Lo crítico se adelanta dentro de la fase BETA |
| 53 | **LAND-05** | 🌐 | P3 — Cobro anual visible en precios | ⚪ | Solo si se adopta el ciclo anual (`#precios` hoy inactivo) |
| 54 | **LAND-10** | 🌐 | Testimonios y casos de uso reales | ⚪ | **Solo cuando haya quedadas celebradas.** Nada inventado (`spec.md §3.15`) |
| 55 | **LAND-11/12** | 🌐 | i18n · pricing definitivo · tests · accesibilidad · imagen OG real | ⚪ | Pospuestos a alpha |
| 56 | **ML-19** | 🧭 | Alpha cerrada en Gipuzkoa (Fase 1 bis) | ⚪ | Ventana ene–abr 2027 |
| 57 | **APP-19** | 📱 | 6N — Exportación de la comunidad por el organizador | 🔵 | **Bloqueado hasta resolver la base legal.** Es el diferenciador frente a Meetup, pero exportar datos de terceros sin base legal lo convierte en una sanción |

---

## Estado actual (2026-08-30)

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
- [x] ✅ **Ronda 3 — Navbar no redirigía desde fuera del home** (2026-08-30, bug detectado por el usuario en
      producción: `unyona.com/blog#lista-espera` no hacía nada). Causa: el `Navbar` es global (vive en
      `layout.tsx`, se renderiza en todas las páginas) pero sus 8 enlaces y los 2 botones "Apuntarme" usaban
      `href="#..."` a secas — se resuelve relativo a la página actual, así que desde `/blog` navegaba a
      `/blog#lista-espera` (nada, esa sección no existe ahí) en vez de volver al home. El Footer ya lo hacía
      bien (`/#...`); el Navbar no. Corregido: los 8 `links` + los 2 CTA "Apuntarme" (desktop y móvil) pasan
      a `href="/#..."`. Verificado en el HTML exportado real de `/`, `/blog` y `/blog/conocer-gente-en-valencia`.
      Detalle en `spec.md §4`.
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
