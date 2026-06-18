# 🗺️ ROADMAP — EVOLUCIÓN DE UNYONA

> Unyona es una red social local que conecta personas con intereses comunes y facilita quedadas reales.
> Este roadmap refleja la evolución del producto desde la landing de validación hasta una plataforma social madura.

---

## FASE 0 — Landing y validación ✅ COMPLETADA

**Objetivo:** explicar el concepto, captar early adopters y validar el interés real antes de construir.

### Diseño y UI
- [x] Landing desplegada en `unyona.com` (Next.js + Tailwind CSS)
- [x] Identidad visual: paleta teal/coral, tipografía Poppins + Manrope
- [x] Modo oscuro / claro con `ThemeToggle`
- [x] Diseño responsive (mobile-first, navbar móvil a pantalla completa)
- [x] Animaciones fade-in al hacer scroll (`useFadeInOnScroll`)
- [x] Panel de redes sociales (`SocialPanel`)

### Secciones y contenido
- [x] Hero, Producto, Módulos, Cómo funciona, Quiénes somos, Suscripción, Contacto
- [x] Sección de precios preparada (Free / Plus / Organización)
- [x] Footer rediseñado con columnas de navegación y enlaces legales

### SEO y rendimiento
- [x] Metadata completa (OG, Twitter Cards, JSON-LD, canonical)
- [x] Sitemap dinámico (`sitemap.ts`)
- [x] Corrección de problemas de indexación SEO

### Email y captación
- [x] Formulario de contacto con respuestas automáticas (Resend)
- [x] Formulario de suscripción al newsletter con doble opt-in y cumplimiento RGPD
- [x] Endpoint de baja del newsletter (`/api/newsletter`)
- [x] Gestión de re-suscripciones: email informativo al usuario ya registrado
- [x] Integración con Resend Audiences para gestión de contactos

### Newsletter
- [x] 12 cápsulas de contenido HTML diseñadas (`capsulas/`)
- [x] Cápsula de bienvenida enviada automáticamente al suscribirse
- [x] Script de envío de newsletter (`send-newsletter.mjs`) con cápsula aleatoria
- [x] Envío programado los martes a las 09:00h (hora española) vía GitHub Actions
- [x] Estilo visual de cápsulas unificado con logo creativo de Unyona

### Legal y privacidad
- [x] Página de Aviso legal (`/aviso-legal`)
- [x] Política de privacidad (`/privacidad`)
- [x] Política de cookies (`/cookies`)
- [x] Banner de consentimiento de cookies (CookieBanner)

### Seguridad
- [x] API keys protegidas en variables de entorno (corrección de exposición en git)
- [x] Cabeceras de seguridad reforzadas (CSP, X-Frame-Options en `/api/*`)
- [x] Rate limiting por IP vía KV de Cloudflare (contacto: 5 req/15min · newsletter/lista-espera: 3 req/hora)
- [x] HMAC obligatorio en `confirm`, `unsubscribe` y `delete-data` (error explícito si falta `BROADCAST_SECRET`)
- [x] Validación de formato de email en parámetros URL antes de procesar
- [x] Comparación de token en tiempo constante en `broadcast` (timing-safe)
- [x] Límites de longitud en inputs del formulario de contacto

**Resultado:** landing operativa con captación de emails, newsletter automatizado y base legal completa.

---

## FASE 1 — Landing: métricas, conversión y calidad ✅ COMPLETADA

**Objetivo:** medir qué funciona, mejorar la conversión y dejar la landing lista de forma definitiva.

### Analytics y métricas
- [x] Analytics de privacidad sin cookies (Umami — `8aea7b44-5ed7-4b5f-9709-97321c0b901d`)
- [x] Tracking de eventos clave: `cta-hero-lista-espera`, `cta-hero-como-funciona`, `lista-espera-submit` (con dato `ciudad`) vía `data-umami-event` y `window.umami.track`
- [ ] Estrategia de precios revisada → sección de pricing definitiva *(pospuesto a alpha)*

### Páginas y flujos
- [x] Página de confirmación de suscripción con CTA claro (`/confirmar`)
- [x] Página de baja confirmada con opción de reactivar (`/baja`)
- [x] Páginas de error personalizadas (`/404`, `/500`)

### Captación anticipada
- [x] Sección de lista de espera con formulario (`#lista-espera`)
- [x] Endpoint `/api/lista-espera` con email de confirmación y alta en Resend Audiences
- [x] Bug fix: emails enviados con `await` (Cloudflare Workers mata promesas sin await)

### Calidad y tests
- [ ] Tests automatizados de handlers críticos *(pospuesto a alpha)*
- [ ] Revisión de accesibilidad *(pospuesto a alpha)*

---

## Captación Early Adopters — paralelo a FASE 5 de la app ⏳ EN CURSO

**Objetivo:** 30–100 personas genuinamente interesadas antes del lanzamiento Beta.  
**Referencia detallada:** [`docs/early-adopters.md`](./docs/early-adopters.md)

### Landing optimizada para conversión
- [x] Formulario lista de espera: campos reducidos a `email + ciudad` (estrategia: fricción mínima)
- [x] Hero: badge actualizado a "Lista de espera abierta · Acceso anticipado"
- [x] Hero: CTA principal → `#lista-espera` ("Unirse a la lista de espera"), subtítulo con propuesta de valor en < 6 seg
- [x] Hero: CTAs con `data-umami-event` para medir ratio clic vs. conversión
- [x] Lista de espera: prueba social (avatares + "sé el siguiente") y copy orientado a ciudad
- [x] API `/api/lista-espera`: acepta `ciudad`, email de confirmación menciona la ciudad, notificación admin incluye ciudad
- [x] Sección "Así se ve Unyona por dentro" (`#app-real`): 4 phone frames con sistema de placeholder
- [x] Screenshots reales integrados: `screen-feed.png` (Descubrir) y `screen-perfil.png` (Perfil) activos en producción
- [x] Configuración de imágenes corregida para static export (`images.unoptimized: true` en `next.config.js`)
- [x] Phone frame ajustado: `object-fill` + franja blanca con cámara frontal para que el navbar sea visible
- [x] Aviso de contenido generado con IA en el footer (Reglamento UE 2024/1689, Art. 50)

### Acciones de captación (fuera del código)
- [ ] Vídeo corto del problema (30-45 s) para TikTok/Reels — guión redactado en `docs/early-adopters.md`
- [ ] Primer post "construyendo en público" en LinkedIn/Instagram — borrador disponible
- [ ] Outreach personal a 50-80 personas de la red del fundador
- [ ] Presencia orgánica en comunidades: r/AskSpain, grupos Facebook senderismo/running, Meetup idiomas Madrid
- [x] Screenshots reales de la app en `public/images/app/` para la sección AppReal *(feed + perfil completados)*
- [ ] Screenshots pendientes: `screen-quedada.png` y `screen-chat.png`

### Señal de éxito → activar Beta pública
- [ ] ≥ 50 usuarios activos con sesiones recurrentes (≥ 2 visitas/semana)
- [ ] ≥ 5 entrevistas de usuario realizadas con aprendizajes documentados
- [ ] Al menos una ciudad con ≥ 20 usuarios (masa crítica mínima para que el feed funcione)

---

## FASE 2 — Landing: contenido SEO y autoridad ⏳ PENDIENTE

**Objetivo:** posicionamiento orgánico y captación de tráfico cualificado.

- [ ] Sección `/blog` con artículos sobre comunidad local, quedadas y conexiones reales
- [ ] Artículos para palabras clave objetivo (red social local, quedadas, comunidad barrio)
- [ ] Páginas de funcionalidades con detalle (`/funcionalidades/quedadas`, `/funcionalidades/grupos`)
- [ ] Testimonios y casos de uso reales (cuando haya primeros usuarios)
- [ ] FAQ expandida con rich snippets
- [ ] **Internacionalización de la landing** *(solo si se expande a mercados no hispanohablantes)* — i18n con `next-intl`, rutas `/en`, `/eu`, `/ca` para indexación SEO en esos idiomas. Mientras tanto, la traducción automática del navegador (Chrome/Edge/Safari) cubre la necesidad del usuario sin coste de desarrollo.

---

## Principios que guían cada fase

> **Sin algoritmo de engagement.** No se optimiza para tiempo de pantalla.
>
> **Del online al offline.** El KPI que importa es la quedada que ocurre.
>
> **Privacidad por diseño.** El usuario controla su identidad en todo momento.
>
> **Local first.** La cercanía geográfica es el filtro más poderoso.
