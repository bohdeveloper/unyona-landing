# marketing/ — Sala de captación de Unyona

Espacio para **todo lo que se cree con herramientas de marketing y cinematografía**
para enseñarle al mundo qué es Unyona. Da soporte a la fase
**"Captación Early Adopters → Acciones de captación"** de [`plan.md`](../plan.md).

> Regla de oro (del posicionamiento de Unyona, ver [`spec.md §3`](../spec.md)):
> **del online al offline, sin algoritmo de enganche, local y humano.**
> El contenido de marketing debe *sonar* a eso. Nada de "growth hacks" agresivos,
> emojis de cohete ni promesas de app milagro. Honestidad de fundador.

## Estructura

| Carpeta / archivo | Qué contiene |
|---|---|
| [`estrategia.md`](./estrategia.md) | Posicionamiento, público, mensaje maestro, ganchos y pilares de contenido |
| [`calendario-editorial.md`](./calendario-editorial.md) | Qué publicar y cuándo (plan de las 2 primeras semanas + plantilla semanal) |
| [`guiones/`](./guiones/) | Guiones de vídeo corto (TikTok/Reels/Shorts) listos para grabar |
| [`posts/`](./posts/) | Copys de RRSS (LinkedIn, Instagram) listos para publicar |
| [`outreach/`](./outreach/) | Plantillas de mensaje directo (red personal) y guía de comunidades |
| [`assets/`](./assets/) | Binarios: vídeos exportados, imágenes, audio y material de marca |

## Flujo de trabajo (de la idea a la publicación)

```
1. Idea/ángulo      → estrategia.md (ganchos, pilares)
2. Guion            → guiones/NN-*.md   (copiar _plantilla-guion.md)
3. Grabar + montar  → CapCut / móvil → exportar a assets/video/
4. Copy del post    → posts/*.md
5. Programar         → calendario-editorial.md (fecha + hora)
6. Publicar + medir → apuntar resultados al pie del propio guion/post
```

## Reglas de binarios (IMPORTANTE)

Este repo es un **static export** que se despliega en Cloudflare Pages. Los vídeos
`.mp4` y las imágenes pesadas **no deben entrar en git** (inflan el repo y ralentizan
cada `clone`/deploy). Por eso:

- Los formatos pesados dentro de `assets/` están **gitignorados** por defecto
  (ver [`assets/.gitignore`](./assets/.gitignore)).
- Sí se versiona lo **ligero y de texto**: guiones, copys, calendario, briefs y
  ficheros de marca pequeños (SVG, paletas).
- ¿Quieres versionar también los vídeos finales? Actívalos con **Git LFS**
  (instrucciones en [`assets/README.md`](./assets/README.md)).
- El "maestro" de cada pieza es su **archivo de texto** (guion/copy). El binario es
  un derivado reproducible.

## Convención de nombres

`AAAA-MM-DD_canal_tema_vN.ext` — ejemplos:
- `2026-07-27_reels_el-recreo_v1.mp4`
- `2026-07-28_linkedin_construyendo-en-publico.md`
