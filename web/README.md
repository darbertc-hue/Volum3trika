# VOLUM3TRIKA² · Primera versión

Sitio en Next.js, TypeScript y Tailwind CSS. Páginas de servicios, portafolio filtrable, fichas de proyectos, nosotros, contacto y privacidad. WhatsApp confirmado: **+1 809-389-8022**. El prototipo HTML publicado en Sites se conserva por separado y no se ha reemplazado.

## Ejecutar

Requiere Node.js 22.12 o superior (se recomienda Node 24 LTS).

```sh
npm install
cp .env.example .env.local
npm run dev
```

Abre http://localhost:3000. Sin credenciales de Sanity se utiliza `content/initial.json`. El formulario avisa que no está activo y ofrece WhatsApp; no muestra recepciones falsas ni guarda datos en disco.

En este equipo, el npm global está incompleto. Las dependencias ya se instalaron utilizando Node 24 del runtime de Codex. Para iniciar sin depender del npm global, ejecuta `./start-local.ps1` en PowerShell. El script elige el Node del runtime cuando está disponible; no modifica la instalación global.

## Contenido administrable

1. Crea un proyecto Sanity y el dataset `production`. Debe permitir lectura pública del contenido publicado; no almacenes cotizaciones ni datos sensibles en ese dataset.
2. Define `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET` para Next.js; usa los mismos valores en `SANITY_STUDIO_PROJECT_ID` y `SANITY_STUDIO_DATASET` para Studio.
3. Agrega los orígenes de desarrollo y producción en la configuración CORS de Sanity según necesites para Studio. Mantén escritura limitada a usuarios autorizados.
4. Para la carga inicial, configura temporalmente `SANITY_WRITE_TOKEN` con permisos de escritura y ejecuta `npm run seed`. No sobrescribe documentos existentes. Elimina el token cuando termine la carga.
5. Ejecuta `npm run studio` y abre http://localhost:3333. La administración utiliza la autenticación de Sanity. Publica cada cambio; el sitio vuelve a consultar el contenido cada 60 segundos.

Editables: título y descripción de portada, contacto, misión, equipo, servicios, fotografías, sectores, alcances y proyectos destacados. Las fotografías iniciales son **referencias del PDF**, no fotografías verificadas de obras. Al subir una imagen real autorizada, desactiva su indicador de referencia. No se inventan resultados, fechas, clientes ni métricas.

## Cotizaciones reales

Configura `RESEND_API_KEY`, `QUOTE_FROM_EMAIL` (dominio verificado) y `QUOTE_TO_EMAIL`. Define ambas claves Turnstile y registra el dominio del sitio. En producción el servidor exige Turnstile: validación solo en el navegador no basta. Verifica que correo y datos comerciales coincidan con el responsable de recepción.

La API valida origen, tipo y tamaño de solicitud, datos y consentimiento. Usa texto plano para el correo, un campo trampa y una clave de idempotencia para reintentos. No registra datos personales en logs ni crea una base de datos. El éxito significa que Resend aceptó el envío; no garantiza lectura o entrega final del correo. Antes del lanzamiento, probar una recepción en el buzón real y definir conservación de solicitudes y política de privacidad.

## Medición

Los eventos `whatsapp_click` y `quote_submitted` se emiten en el navegador. Para enviarlos a Google Analytics configura `NEXT_PUBLIC_GA_ID`; solo se carga después del consentimiento. No se incluyen datos de contacto ni la descripción del proyecto. Sin esa variable no se instala analítica. La medición y la recepción de correos requieren configuración externa.

## Validar

```sh
npm run typecheck
npm run build
npm test
```

Las pruebas cubren navegación, filtros, preselección de servicios, el enlace de WhatsApp confirmado, accesibilidad básica de formulario, rechazos de la API y adaptación a móvil. El envío real no se prueba sin cuentas configuradas; no se crean solicitudes externas durante las pruebas.

## Publicar en Vercel

Importa este directorio `web` como raíz del proyecto y configura las variables de `.env.example` para producción. Define `NEXT_PUBLIC_SITE_URL` con el dominio definitivo antes de construir. Next.js se ejecuta directamente; el sitio no depende del iframe del prototipo. Comprueba sitemap, enlaces, captación y recepción del correo antes de activar el lanzamiento comercial.

La publicación de esta versión requiere una cuenta/proyecto Vercel y las credenciales de los servicios. No se han creado cuentas ni configurado dominios externos automáticamente. El PDF no se publica como descarga y los originales permanecen intactos.
