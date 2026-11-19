# Visionary Enterprises — Tienda de acrílicos

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

> Tienda online de planchas de acrílico, ABS y Lamicoid con carrito de compras y checkout.

**Sitio en vivo:** [acrilicos-web.vercel.app/](https://acrilicos-web.vercel.app/)

## Sobre el proyecto

Sitio de comercio electrónico para una empresa que vende planchas de acrílico, ABS y Lamicoid para proyectos profesionales, señalética y decoración. Es un frontend en React con catálogo, carrito y checkout; los datos de productos viven en el propio repositorio.

## Funcionalidades

- Catálogo por categorías con tarjetas de producto y detalle con selector de variantes
- Carrito lateral con control de cantidades (estado global con React Context)
- Checkout con datos del comprador y elección entre retiro y despacho
- Botón flotante de WhatsApp y banners promocionales
- Diseño responsive

## Stack

| Capa | Tecnología |
| --- | --- |
| Interfaz | React, TypeScript, lucide-react |
| Estado | React Context (carrito) |
| Estilos | Tailwind CSS |
| Build | Vite |
| Hosting | Vercel |

## Estructura del proyecto

```text
src/
├── components/   Header, Hero, ProductCard, CartDrawer, Checkout...
├── config/       configuración del sitio
├── context/      estado del carrito
├── data/         catálogo de productos
├── lib/          utilidades
└── services/     cartService, checkoutService, productService
public/images/    imágenes de productos
docs/ia/          contexto y reglas para trabajar con IA
```

## Cómo ejecutarlo

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # vista previa del build
```

Variables de entorno (ver `.env.example`):

| Variable | Uso |
| --- | --- |
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp de la tienda, solo dígitos con código de país |
| `VITE_SITE_URL` | URL pública del sitio |

> **Estado del pago:** `checkoutService` simula por ahora la creación del pago de Mercado Pago. Para producción falta conectar un backend real (hay un `TODO` en el servicio).

## Despliegue

El sitio se despliega en **Vercel**: cada push a la rama `main` genera un nuevo despliegue de producción.

## Documentación para trabajo con IA

El repositorio incluye el contexto que necesita un asistente de programación (o un nuevo desarrollador) para trabajar con criterio:

- [`AGENTS.md`](AGENTS.md): reglas y comandos para agentes de IA
- [`docs/ia/CONTEXTO.md`](docs/ia/CONTEXTO.md): objetivo, público y alcance del sitio
- [`docs/ia/REGLAS.md`](docs/ia/REGLAS.md): convenciones de código y de contenido
- [`docs/ia/DECISIONES.md`](docs/ia/DECISIONES.md): decisiones técnicas y su motivo
- [`docs/ia/ROADMAP.md`](docs/ia/ROADMAP.md): próximos pasos
- [`docs/ia/FLUJO-DE-TRABAJO.md`](docs/ia/FLUJO-DE-TRABAJO.md) y [`docs/ia/PROMPTS.md`](docs/ia/PROMPTS.md): flujo de trabajo con IA y plantillas de instrucciones

## Autor

**Mario Meléndez** — Estudiante de Ingeniería en Informática (Duoc UC) · Desarrollo web para pymes con **MM Digital Solutions**.
[Perfil de GitHub](https://github.com/Mario-Melendez-Inostroza)
