# assets/ — binarios de marketing

Aquí van los archivos **pesados y binarios** que se generan con herramientas de
marketing y cinematografía: vídeos exportados, imágenes, audio y material de marca.

## Estructura

| Carpeta | Contenido |
|---|---|
| `video/` | Vídeos exportados (`.mp4`, `.mov`) para RRSS |
| `imagenes/` | Portadas, slides de carrusel, gráficos, imagen OG |
| `audio/` | Voces en off, música, pistas |
| `brand/` | Material de marca para producción: logo, paleta, tipografías |

## ⚠️ Binarios y git

Este repo se despliega como **static export en Cloudflare Pages**. Meter vídeos en git
infla el repositorio y ralentiza cada `clone` y cada deploy. Por eso, **por defecto los
formatos pesados de esta carpeta están gitignorados** (ver [`.gitignore`](./.gitignore)).

Se versiona lo ligero: SVG de marca, paletas, `.md` de briefs, thumbnails pequeños.

### ¿Quieres versionar también los vídeos finales?

Usa **Git LFS** (Large File Storage), que guarda los binarios fuera del historial normal:

```bash
git lfs install
git lfs track "marketing/assets/video/**"
git lfs track "marketing/assets/audio/**"
# quita esas rutas de marketing/assets/.gitignore y haz commit de .gitattributes
```

### Alternativa recomendada al principio

No versiones los vídeos. Guárdalos en tu **Drive/carpeta local** y deja aquí solo el
**guion** (el maestro real) y, si quieres, un thumbnail ligero. El vídeo siempre se
puede reexportar desde el proyecto de CapCut.

## Nombres

`AAAA-MM-DD_canal_tema_vN.ext` — ej. `2026-07-29_reels_la-pregunta_v1.mp4`.
