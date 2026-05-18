# 🗺️ ROADMAP — EVOLUCIÓN DE UNYONA

> Unyona es una red social local que conecta personas con intereses comunes y facilita quedadas reales.
> Este roadmap refleja la evolución del producto desde la landing de validación hasta una plataforma social madura.

---

## FASE 0 — Landing y validación ✅ ACTUAL

**Objetivo:** explicar el concepto, captar early adopters y validar el interés real antes de construir.

- [x] Landing estática en `unyona.com`
- [x] Identidad visual: paleta teal/coral, tipografía Poppins + Manrope
- [x] Modo oscuro / claro
- [x] SEO técnico (metadata, OG, JSON-LD, sitemap)
- [x] Secciones: Hero, Producto, Funcionalidades, Cómo funciona, Para quién es
- [x] Formulario de acceso a beta (captura de emails + intereses + ciudad)
- [x] Sección de precios preparada (Free / Plus / Organización)
- [x] Integración formulario con servicio de email (Resend)
- [x] Configurar control de usuarios, Audiences, Broadcasts (Resend)

**Resultado esperado:** lista de espera con early adopters reales, feedback sobre el concepto y claridad de enfoque.

---

## FASE 1 — Núcleo de la aplicación

**Objetivo:** construir las bases técnicas sin presión de features. Arquitectura sólida desde el inicio.

**Backend (Spring Boot + PostgreSQL)**
- Modelo de usuario (email, contraseña, rol: PERSONAL / ORGANIZATION)
- Modelo de perfil (nombre, avatar, bio, zona geográfica, intereses)
- Relación usuario → múltiples perfiles
- Auth con JWT + refresh tokens
- Arquitectura por dominios (users, profiles, interests, locations)
- Tests de integración sobre la capa de dominio

**Frontend (Angular standalone)**
- Routing modular
- Auth guard
- Pantalla de registro + login
- Creación del primer perfil
- Selección de intereses

**Dominio:** `app.unyona.com`

---

## FASE 2 — Alpha privada

**Objetivo:** primeros usuarios reales interactuando con perfiles e intereses.

- Gestión completa de perfiles (crear, editar, cambiar contexto)
- Configuración de zona geográfica y radio de actividad
- Selección y edición de intereses por perfil
- Feed básico de perfiles cercanos por interés
- Seguir / dejar de seguir perfiles
- Verificación ligera de perfil
- Sistema de bloqueo y reporte básico
- Feedback interno (bug reports, sugerencias)

---

## FASE 3 — Descubrimiento y conexión

**Objetivo:** que las personas puedan encontrarse y comunicarse de forma natural.

- **Radar local:** "personas cerca hoy" filtrado por interés y radio
- **Grupos de interés:** crear, unirse, gestionar miembros
- **Chat 1 a 1:** mensajería directa entre perfiles
- **Chat de grupo:** conversación ligada al grupo
- **Notificaciones push** (nuevas conexiones, mensajes, quedadas)
- Historial de conexiones y reputación suave (señales implícitas)
- Privacidad granular: quién puede verte, quién puede escribirte

---

## FASE 4 — Motor de quedadas

**Objetivo:** que el valor diferencial de Unyona — la quedada real — sea una experiencia de primera clase.

- Crear quedada (título, descripción, lugar, fecha, aforo máximo)
- Unirse / abandonar quedada
- Confirmaciones y recordatorios automáticos
- **Chat de evento:** canal temporal ligado a la quedada
- **Mensajes efímeros:** se eliminan automáticamente tras el evento
- Post-evento: feedback, fotos compartidas, nuevo contacto entre asistentes
- Historial de asistencia en el perfil
- Moderación: el creador puede gestionar la lista de asistentes

---

## FASE 5 — Organizaciones y eventos públicos

**Objetivo:** que clubs, colectivos y marcas locales puedan crear comunidad y organizar eventos de mayor escala.

- Registro de cuenta tipo organización
- Página de organización verificada (logo, descripción, zona)
- Publicación de eventos públicos (sin aforo máximo fijo)
- Campañas y comunicaciones a seguidores
- Exposiciones y actividades con fines lucrativos
- Panel de estadísticas: asistentes, interacciones, alcance
- Distinción clara entre perfiles personales y entidades organizativas

---

## FASE 6 — Estabilidad y producto real

**Objetivo:** que Unyona sea algo confiable que la gente use a diario sin fricciones.

- Harden de seguridad (OWASP, rate limiting, 2FA opcional)
- Tests end-to-end sobre flujos críticos (registro, quedada, chat)
- Logs estructurados y monitorización (errores, latencia, disponibilidad)
- Deployment reproducible (Docker + CI/CD)
- Auditoría de rendimiento (Core Web Vitals, tiempo de carga)
- Política de privacidad y términos de uso reales
- Soporte al usuario (canal de ayuda, FAQ)

---

## FASE 7 — Escala y monetización

**Objetivo:** convertir la tracción real en un modelo sostenible.

- Activación del plan **Plus** (4,99€/mes): perfiles múltiples, quedadas ilimitadas, mensajes efímeros
- Activación del plan **Organización** (precio a medida): eventos públicos, estadísticas, campañas
- Feature flags para rollout gradual de nuevas funcionalidades
- Analytics propios (comportamiento de usuarios, conversión, retención)
- Programa de referidos
- Expansión geográfica: soporte multiidioma (ES, EN, EU, CA)
- API pública para integraciones de terceros (futuro)

---

## Principios que guían cada fase

> **Sin algoritmo de engagement.** No se optimiza para tiempo de pantalla.
>
> **Del online al offline.** El KPI que importa es la quedada que ocurre.
>
> **Privacidad por diseño.** El usuario controla su identidad en todo momento.
>
> **Local first.** La cercanía geográfica es el filtro más poderoso.