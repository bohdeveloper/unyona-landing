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

## FASE 1 — Núcleo de la aplicación 🔜 SIGUIENTE

**Objetivo:** construir las bases técnicas sin presión de features. Arquitectura sólida desde el inicio.

**Stack:** React (Vite) · Express.js · PostgreSQL · Prisma ORM

### Backend (Express + PostgreSQL)
- Estructura de proyecto por dominios: `users`, `profiles`, `interests`, `locations`
- Modelo de usuario: email, contraseña hasheada (bcrypt), rol `PERSONAL` / `ORGANIZATION`
- Modelo de perfil: nombre, avatar, bio, zona geográfica, intereses
- Relación usuario → múltiples perfiles
- Auth con JWT (access token) + refresh token en cookie httpOnly
- Middleware de autenticación y autorización por rol
- Validación de entradas con Zod
- Tests de integración con Jest + Supertest

### Frontend (React + Vite)
- Configuración del proyecto: Vite + React + TypeScript + Tailwind CSS
- React Router v6: rutas públicas y protegidas
- Context de autenticación + hook `useAuth`
- Pantalla de registro y login
- Pantalla de creación del primer perfil
- Selección de intereses al crear el perfil
- Cliente HTTP centralizado (Axios o fetch con interceptores)

### Infraestructura
- Base de datos PostgreSQL local (Docker Compose para desarrollo)
- Variables de entorno separadas por entorno (`.env.development`, `.env.production`)
- CI básico con GitHub Actions (lint + tests en cada PR)

**Dominio:** `app.unyona.com`

---

## FASE 2 — Alpha privada

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

## FASE 3 — Descubrimiento y conexión

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

## FASE 4 — Motor de quedadas

**Objetivo:** que el valor diferencial de Unyona — la quedada real — sea una experiencia de primera clase.

### Gestión de quedadas
- Crear quedada: título, descripción, lugar (coordenadas + nombre), fecha/hora, aforo máximo
- Unirse / abandonar quedada
- Confirmaciones automáticas por email (Resend) y notificación push
- Recordatorio 24h antes del evento

### Chat de evento
- Canal de chat temporal ligado a cada quedada (Socket.io)
- **Mensajes efímeros:** se purgan automáticamente 24h después del evento (job programado)

### Post-evento
- Formulario de feedback tras asistir
- Compartir fotos del evento (almacenamiento R2/S3)
- Sugerencia automática de conectar con otros asistentes

### Perfil enriquecido
- Historial de quedadas asistidas visible en el perfil
- Moderación por el creador: aprobar/rechazar solicitudes, gestionar lista de asistentes

---

## FASE 5 — Organizaciones y eventos públicos

**Objetivo:** que clubs, colectivos y marcas locales puedan crear comunidad y organizar eventos de mayor escala.

### Cuenta de organización
- Registro con rol `ORGANIZATION` (flujo diferenciado)
- Página de organización: logo, descripción, zona geográfica, redes sociales
- Badge de organización verificada (revisión manual)

### Eventos públicos
- Publicación de eventos sin aforo máximo fijo
- Página pública del evento (indexable por buscadores)
- Inscripción pública sin necesidad de seguir a la organización

### Comunicaciones
- Campañas de difusión a seguidores de la organización (Resend Broadcasts)
- Actividades con posibilidad de precio de entrada (integración Stripe)

### Analytics para organizaciones
- Panel de estadísticas: asistentes, interacciones, alcance geográfico
- Exportación de datos de asistentes (CSV, cumplimiento RGPD)

---

## FASE 6 — Estabilidad y producto real

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

### Soporte
- Canal de ayuda in-app (Crisp o similar)
- FAQ pública en `unyona.com/ayuda`

---

## FASE 7 — Escala y monetización

**Objetivo:** convertir la tracción real en un modelo sostenible.

### Planes de pago (Stripe)
- Activación del plan **Plus** (4,99€/mes): perfiles múltiples, quedadas ilimitadas, mensajes efímeros, sin anuncios
- Activación del plan **Organización** (precio a medida): eventos públicos, estadísticas, campañas, Stripe para entradas
- Gestión de suscripciones: upgrade, downgrade, cancelación y webhooks de Stripe

### Crecimiento
- Feature flags (LaunchDarkly o propio) para rollout gradual
- Analytics de comportamiento propio (sin terceros): conversión, retención, churn
- Programa de referidos

### Internacionalización
- Soporte multiidioma: ES, EN, EU, CA (i18next)
- Adaptación de contenidos por región

### Apertura
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