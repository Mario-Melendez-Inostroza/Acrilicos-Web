# Contexto — Visionary Enterprises

## Resumen
Sitio web de Visionary Enterprises, empresa que comercializa planchas de acrílico, ABS y Lamicoid para proyectos profesionales, señalética y decoración.
Sitio en vivo: https://acrilicos-web.vercel.app/

## Objetivo del sitio
Mostrar el catálogo de planchas por categoría y facilitar la cotización por WhatsApp.

## Público
Empresas, diseñadores y personas que necesitan planchas de acrílico, ABS o Lamicoid para señalética, decoración y proyectos.

## Secciones
- Categorías: acrílico transparente, acrílicos de colores y Lamicoid
- Catálogo de productos
- Nosotros
- Contacto por WhatsApp

## Contenido y datos
- Los textos, precios, teléfonos y certificaciones los entrega el cliente. La IA no inventa información del negocio: si falta un dato, se deja marcado como "por confirmar".
- El número de WhatsApp y la URL del sitio se configuran por variables de entorno.
- La carpeta scripts/ contiene herramientas de QA (capturas y prueba del enlace de WhatsApp).

## Restricciones
- Este repositorio contiene solo el frontend (sin backend propio).
- No se suben secretos ni datos personales. Las variables de entorno van en .env (no versionado) y solo se usan variables públicas VITE_*.
- Variables usadas: VITE_WHATSAPP_NUMBER, VITE_SITE_URL (ver .env.example).
- El dominio y el despliegue los gestiona una persona, no la IA.
