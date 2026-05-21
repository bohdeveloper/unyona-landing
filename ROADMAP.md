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
- [x] 11 cápsulas de contenido HTML diseñadas (`capsulas/`)
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
- [x] Cabeceras de seguridad reforzadas

**Resultado:** landing operativa con captación de emails, newsletter automatizado y base legal completa.

---

## FASE 1 — Landing: métricas, conversión y calidad ⏳ PENDIENTE

**Objetivo:** medir qué funciona, mejorar la conversión y dejar la landing lista de forma definitiva.

### Analytics y métricas
- [ ] Analytics de privacidad sin cookies (Plausible o Umami)
- [ ] Tracking de eventos clave: clic en CTA, envíos de formulario, scroll depth
- [ ] Estrategia de precios revisada → sección de pricing definitiva

### Páginas y flujos
- [ ] Página de confirmación de suscripción con CTA claro (`/confirmar`)
- [ ] Página de baja confirmada con opción de reactivar (`/baja`)
- [ ] Páginas de error personalizadas (`/404`, `/500`)

### Calidad y tests
- [ ] Tests automatizados de handlers críticos: formulario de contacto, suscripción, baja
- [ ] Revisión de accesibilidad (contraste, aria-labels, navegación por teclado)

---

## FASE 2 — Landing: contenido SEO y autoridad ⏳ PENDIENTE

**Objetivo:** posicionamiento orgánico y captación de tráfico cualificado.

- [ ] Sección `/blog` con artículos sobre comunidad local, quedadas y conexiones reales
- [ ] Artículos para palabras clave objetivo (red social local, quedadas, comunidad barrio)
- [ ] Páginas de funcionalidades con detalle (`/funcionalidades/quedadas`, `/funcionalidades/grupos`)
- [ ] Testimonios y casos de uso reales (cuando haya primeros usuarios)
- [ ] FAQ expandida con rich snippets

---

## FASE 3 — Landing → App: transición y conexión ⏳ PENDIENTE

**Objetivo:** enlazar la landing con `app.unyona.com` y gestionar el acceso a la alpha.

- [ ] CTA principal apunta a `app.unyona.com` (registro / lista de espera)
- [ ] Sistema de lista de espera con invitaciones por correo
- [ ] Login / registro desde la landing redirige a la app
- [ ] Estado del sistema visible (uptime, versión actual)
- [ ] Notas de versión / changelog público
- [ ] Documentación básica de usuario (`/ayuda`)

---

## FASE 4 — App: núcleo técnico 🚧 EN CURSO

**Objetivo:** construir las bases técnicas sin presión de features. Arquitectura sólida desde el inicio.

**Stack:** React (Vite) · Express.js · PostgreSQL · Prisma ORM · TypeScript

### Backend (Express + PostgreSQL)
- [x] Proyecto Express + TypeScript + Prisma configurado
- [x] Modelo `Usuario`: email, contraseña (bcrypt), nombre, apellidos, fecha de nacimiento, rol, país, idioma
- [x] Modelo `Perfil`: nombre de perfil, avatar, perfil infantil — relación N:1 con Usuario
- [x] Auth: `POST /auth/registro`, `POST /auth/login`, `GET /auth/me`
- [x] JWT firmado con `JWT_SECRET`, expiración 1d (usuario) / 7d (perfil seleccionado)
- [x] `authMiddleware`: valida token y adjunta `usuarioId` al request
- [x] CRUD completo de perfiles: obtener, crear, actualizar, eliminar, seleccionar
- [x] Subida de avatar con Multer (`/uploads/avatars/`) y limpieza del archivo anterior al editar
- [x] Archivos estáticos servidos en `/uploads`
- [ ] Limpiar schema: eliminar modelos Nitflex (`Favorito`, `Historial`, `Preferencia`)
- [ ] Ampliar `Perfil`: añadir `bio`, `ciudad`, `latitud`, `longitud`, `radioActividad`
- [ ] Añadir modelo `Interes`: catálogo de intereses + relación M:N con `Perfil`
- [ ] Proteger endpoint `/uploads` con `authMiddleware`
- [ ] Interceptor de errores centralizado (401/403 → respuesta coherente)
- [ ] Validación de entradas con Zod en rutas críticas

### Frontend (React + Vite)
- [x] Proyecto Vite + React + TypeScript + Tailwind CSS configurado
- [x] `AuthContext`: token, `perfilActivo`, `isReady`, `login`, `logout`, `seleccionarPerfil`, `actualizarPerfilActivo`, `limpiarPerfil`
- [x] Persistencia de sesión en `localStorage` con restauración al recargar
- [x] `ProtectedRoute`: bloqueo de rutas privadas sin token, redirect a login
- [ ] Integración visual del perfil activo: mostrar avatar y nombre en sidebar/header
- [ ] Interceptor HTTP: Axios con header `Authorization` automático + manejo de 401/403
- [ ] Pantalla de selección de intereses al crear perfil
- [ ] Pantalla de edición de perfil (bio, ciudad, radio)
- [ ] Selector de ciudad con autocompletado

### Infraestructura
- [ ] Docker Compose para desarrollo local (PostgreSQL en contenedor)
- [ ] Variables de entorno separadas: `.env.development` / `.env.production`
- [ ] CI básico con GitHub Actions (lint + build en cada PR)

**Dominio objetivo:** `app.unyona.com`

---

## FASE 5 — App: alpha privada

**Objetivo:** primeros usuarios reales interactuando con perfiles e intereses.

### Perfiles
- Gestión completa de perfiles (crear, editar, eliminar, cambiar de contexto activo)
- Subida y gestión de avatar (almacenamiento en S3 o Cloudflare R2)
- Configuración de zona geográfica y radio de actividad (PostGIS o coordenadas lat/lng)
- Selección y edición de intereses por perfil

### Descubrimiento básico
- Feed de perfiles cercanos filtrado por interés y radio
- Seguir / dejar de seguir perfiles
- Verificación ligera de perfil (email verificado)

### Moderación y seguridad
- Sistema de bloqueo entre perfiles
- Reporte de contenido inapropiado
- Panel de administración mínimo (revisar reportes)

### UX
- Feedback interno (bug reports y sugerencias desde la app)
- Notificaciones in-app básicas (nuevos seguidores, interacciones)

---

## FASE 6 — App: descubrimiento, grupos y chat

**Objetivo:** que las personas puedan encontrarse y comunicarse de forma natural.

### Radar local
- "Personas cerca hoy": query geoespacial por radio + interés activo
- Filtros combinables: interés, distancia, disponibilidad

### Grupos de interés
- Crear, unirse y abandonar grupos
- Gestión de miembros (admin del grupo puede expulsar)
- Feed de actividad del grupo

### Chat (Socket.io)
- Chat 1 a 1 entre perfiles conectados
- Chat de grupo ligado a cada grupo de interés
- Persistencia de mensajes en PostgreSQL
- Indicador de lectura y escritura en tiempo real

### Notificaciones
- Notificaciones push (Web Push / FCM): nuevas conexiones, mensajes, quedadas
- Preferencias de notificación por usuario

### Privacidad
- Control granular: quién puede ver mi perfil, quién puede escribirme
- Historial de conexiones y reputación suave (señales implícitas de fiabilidad)

---

## FASE 7 — App: motor de quedadas

**Objetivo:** que el valor diferencial de Unyona — la quedada real — sea una experiencia de primera clase.

### Gestión de quedadas
- Crear quedada: título, descripción, lugar (coordenadas + nombre), fecha/hora, aforo máximo
- Unirse / abandonar quedada
- Confirmaciones automáticas por email (Resend) y notificación push
- Recordatorio 24h antes del evento

### Chat de evento
- Canal de chat temporal ligado a cada quedada (Socket.io)
- Mensajes efímeros: se purgan automáticamente 24h después del evento (job programado)

### Post-evento
- Formulario de feedback tras asistir
- Compartir fotos del evento (almacenamiento R2/S3)
- Sugerencia automática de conectar con otros asistentes

### Perfil enriquecido
- Historial de quedadas asistidas visible en el perfil
- Moderación por el creador: aprobar/rechazar solicitudes, gestionar lista de asistentes

---

## FASE 8 — App: estabilidad, calidad y seguridad

**Objetivo:** que Unyona sea algo confiable que la gente use a diario sin fricciones.

### Seguridad
- Harden OWASP: protección XSS, CSRF, SQL injection, validación estricta
- Rate limiting por IP y por usuario (express-rate-limit)
- 2FA opcional (TOTP con authenticator app)
- Auditoría de sesiones activas + revocación de tokens

### Calidad y tests
- Tests end-to-end con Playwright sobre flujos críticos (registro, quedada, chat)
- Cobertura de tests de integración > 80% en rutas de API críticas

### Observabilidad
- Logs estructurados (Winston) con niveles por entorno
- Métricas de latencia, errores y disponibilidad (integración con Grafana o similar)
- Alertas automáticas ante errores 5xx o caídas

### Deployment
- Dockerización completa: Express API + PostgreSQL + worker de jobs
- Pipeline CI/CD completo: lint → test → build → deploy automático
- Migraciones de base de datos controladas con Prisma Migrate

### Rendimiento
- Auditoría Core Web Vitals del frontend React
- Caché de respuestas frecuentes (Redis o in-memory)
- Lazy loading de componentes pesados y code splitting

---

## FASE 9 — App: organizaciones, escala y monetización

**Objetivo:** que clubs, colectivos y marcas locales puedan crear comunidad, y convertir la tracción en un modelo sostenible.

### Cuenta de organización
- Registro con rol `ORGANIZATION` (flujo diferenciado)
- Página de organización: logo, descripción, zona geográfica, redes sociales
- Badge de organización verificada (revisión manual)

### Eventos públicos
- Publicación de eventos sin aforo máximo fijo
- Página pública del evento (indexable por buscadores)
- Inscripción pública sin necesidad de seguir a la organización

### Planes de pago (Stripe)
- Activación del plan **Plus** (4,99€/mes): perfiles múltiples, quedadas ilimitadas, mensajes efímeros, sin anuncios
- Activación del plan **Organización** (precio a medida): eventos públicos, estadísticas, campañas, Stripe para entradas
- Gestión de suscripciones: upgrade, downgrade, cancelación y webhooks de Stripe

### Crecimiento
- Feature flags para rollout gradual
- Analytics de comportamiento propio (sin terceros): conversión, retención, churn
- Programa de referidos

### Internacionalización
- Soporte multiidioma: ES, EN, EU, CA (i18next)
- API pública documentada (OpenAPI/Swagger) para integraciones de terceros

---

## Principios que guían cada fase

> **Sin algoritmo de engagement.** No se optimiza para tiempo de pantalla.
>
> **Del online al offline.** El KPI que importa es la quedada que ocurre.
>
> **Privacidad por diseño.** El usuario controla su identidad en todo momento.
>
> **Local first.** La cercanía geográfica es el filtro más poderoso.
