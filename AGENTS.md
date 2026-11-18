# AGENTS.md — Visionary Enterprises

Guía de entrada para agentes de IA (Claude Code u otros) y para cualquier persona que abra este repositorio. Es corta a propósito: el detalle está en docs/ia/.

## Qué es
Sitio web de Visionary Enterprises, empresa que comercializa planchas de acrílico, ABS y Lamicoid para proyectos profesionales, señalética y decoración.
Sitio en vivo: https://acrilicos-web.vercel.app/

## Stack
React + TypeScript + Vite + Tailwind CSS. Despliegue en Vercel. Solo frontend: no hay backend propio en este repositorio.

## Comandos
    npm install
    npm run dev       # servidor de desarrollo
    npm run build     # build de producción
    npm run preview   # previsualizar el build

## Estructura
- src/ : código fuente (componentes, páginas, estilos)
- public/ : archivos estáticos (public/images con productos, categorías y logo)
- docs/ia/ : contexto, reglas, roadmap y decisiones para trabajar con IA

## Antes de empezar una tarea, leer
1. docs/ia/CONTEXTO.md (el negocio y sus límites)
2. docs/ia/REGLAS.md (qué se puede y qué no)
3. docs/ia/ROADMAP.md (estado real y lo pendiente)
4. docs/ia/DECISIONES.md (por qué está hecho así)

## Antes de dar algo por terminado
- npm run build termina sin errores
- Se revisó en móvil y en escritorio
- No hay secretos ni datos reales de personas en el código
- Se actualizó ROADMAP.md o DECISIONES.md si algo cambió
