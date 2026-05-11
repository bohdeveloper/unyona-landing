# Unyona – Landing oficial

🌐 **Dominio:** https://unyona.com
🚀 **Despliegue:** Cloudflare Pages

---

## ¿Qué es Unyona?

**Unyona** es una red social local centrada en conexiones reales. No va de likes ni de scroll infinito — va de conocer personas con tus mismos intereses en tu zona y **quedar en persona**.

El modelo se apoya en tres ejes:

- **Perfiles múltiples** — una cuenta, varias identidades (personal, profesional, hobby, anónimo parcial). Cada perfil vive en su propio contexto.
- **Local first** — la proximidad geográfica es el filtro principal. El radar local muestra quién comparte tus intereses hoy, cerca de ti.
- **Del online al offline** — el objetivo final no es el tiempo en pantalla sino la quedada real. El motor de quedadas, los grupos por interés y el chat son medios, no fines.

Los dos grandes tipos de usuarios son **personas** (que crean perfiles e interactúan) y **organizaciones** (clubs, colectivos, marcas locales que crean eventos y comunidad).

---

## Objetivos de esta landing

1. Explicar de forma clara qué es Unyona y qué problema resuelve.
2. Captar emails de la lista de espera beta.
3. Validar el interés real antes de construir la aplicación completa.
4. Establecer identidad visual y de marca desde el inicio.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (static export) |
| UI | React 18 + TypeScript |
| Estilos | TailwindCSS 3 + CSS Variables |
| Animaciones | Framer Motion (motion/react) |
| Iconos | Lucide React |
| Tipografía | Poppins + Manrope (Google Fonts) |
| Despliegue | Cloudflare Pages |

> El sitio se genera como **static export** (`output: "export"`), priorizando SEO, velocidad de carga y coste cero de hosting.

---

## Arquitectura

```
unyona-landing/
├── frontend/          # Next.js static site (este repo)
│   ├── src/
│   │   ├── app/       # Layout, metadata, globals
│   │   └── components/
│   │       ├── layout/    # Navbar, Footer, ThemeToggle
│   │       └── sections/  # Hero, Producto, Modulos, ComoFunciona,
│   │                      # QuienesSomos, Contacto, Suscripcion
│   └── public/        # Assets estáticos
└── ...
```

**Flujo de build:**
```
next build  →  /out  →  Cloudflare Pages
```

- Sin backend propio en la landing
- Formularios de contacto/beta: integración futura vía API externa (Resend, Formspree, etc.)
- Redirects gestionados con `_redirects` (Cloudflare)

---

## Relación con la aplicación real

Unyona está dividido en **dos capas independientes**:

### Landing (este repo)
- Dominio: `unyona.com`
- Objetivo: captación, validación y marca
- Tecnología: Next.js + Cloudflare Pages
- Estado: estático, sin auth

### Aplicación (repositorio separado)
- Dominio: `app.unyona.com`
- Backend: Spring Boot + PostgreSQL
- Frontend: Angular (standalone + routing modular)
- Auth, perfiles, mensajería, quedadas, radar local
- Hosting independiente (VPS / PaaS)

La landing **no depende de la app** y la app **no depende de la landing**.

---

## Paleta de color y tipografía

| Token | Claro | Oscuro |
|---|---|---|
| Primary | `#61DBD6` | `#46D4D0` |
| Secondary | `#FF8781` | `#FF6B6B` |
| Texto principal | `#263238` | `#E1E5E8` |
| Texto secundario | `#607D8B` | `#9BA6AD` |
| Fondo | `#F7F9FA` | `#2B2B2B` |

Tipografía: **Poppins** (headings) + **Manrope** (body)

---

## Estructura de secciones

| Sección | ID | Descripción |
|---|---|---|
| Hero | `#inicio` | Headline, grafo de conexiones animado, CTA beta |
| Producto | `#producto` | 6 pilares diferenciales de Unyona |
| Funcionalidades | `#funcionalidades` | 20 features agrupadas por categoría |
| Cómo funciona | `#como-funciona` | 4 pasos: perfil → intereses → radar → quedada |
| Para quién es | `#quienes-somos` | Personas + organizaciones + principios |
| Beta / Contacto | `#contacto` | Formulario de acceso anticipado |
| Precios *(inactivo)* | `#precios` | Free / Plus / Organización |

---

## Instalación y desarrollo

```bash
# Desde la raíz del proyecto
cd frontend
npm install
```

```bash
npm run dev      # Servidor de desarrollo en http://localhost:3000
npm run build    # Build estático → /out
npm run start    # Servir el build
npm run lint     # Linter
```

---

## Estado actual

- [x] Landing funcional con identidad Unyona
- [x] SEO técnico (metadata, OG, Twitter cards, JSON-LD, sitemap, robots)
- [x] Modo oscuro / claro con persistencia
- [x] Animaciones con Framer Motion
- [x] Diseño responsive (mobile-first)
- [x] Configuración estable en Cloudflare Pages
- [ ] Integración formulario beta con backend de email
- [ ] Analytics (Cloudflare Web Analytics / Plausible)
- [ ] Imagen OG real (`/images/unyona-og.png`)