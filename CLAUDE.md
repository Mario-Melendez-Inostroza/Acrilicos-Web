@AGENTS.md


## Imágenes y despliegue en Vercel

**Convención:** las imágenes que muestra el sitio viven en `public/images/` (subcarpetas permitidas, p. ej. `products/`), con nombres en minúsculas, sin tildes ni espacios (kebab-case), y se referencian como `"/images/nombre.ext"`. Nunca `figma:asset`, nunca rutas relativas a `public/`. Imágenes de más de ~500 KB se convierten a `.webp`. Las fuentes originales y capturas de QA van en `reference/` (fuera de `public/`, no se despliegan).

**Por qué importa:** los proyectos exportados de Figma Make traen un `.gitattributes` que manda todo `*.png/*.jpg/*.webp` a **Git LFS**. En GitHub queda un puntero de texto (~130 bytes, `version https://git-lfs...`) y Vercel no descarga LFS: publica ese texto con `content-type: image/png` y el navegador muestra la imagen rota. El `.gitattributes` de este repo ya excluye `public/**` de LFS; no lo revierta.

**Checklist antes de subir a Vercel**
1. `grep -rn "figma:asset" src` no devuelve nada.
2. Todas las imágenes de `public/images/` tienen nombre en minúsculas, sin tildes ni espacios (Linux distingue mayúsculas): `find public -name "*[A-Z ]*" -o -name "*[áéíóúñ]*"` no devuelve nada.
3. Ninguna imagen de `public/` pasa por LFS: `git check-attr filter -- public/images/*` dice `unset` y `git lfs ls-files | grep public/` no devuelve nada.
4. Imágenes sin trackear o ignoradas: `git status --short` y `git ls-files --others --exclude-standard public` vacíos.
5. El blob commiteado es la imagen real y no un puntero: `git cat-file -s :public/images/logo.png` da cientos de KB, no ~130 bytes.
6. Build y preview limpios: `pnpm install --frozen-lockfile && pnpm build && pnpm preview`, y revisar en el navegador que carguen logo, hero, categorías, productos y banners (probar también a 375px).
7. Hacer push y esperar el deploy; verificar con curl que cada imagen clave responde `200` y `content-type: image/*` (no `text/html`, no ~130 bytes):
   `curl -sI https://acrilicos-web.vercel.app/images/logo.png | grep -iE "^HTTP|content-type|content-length"`
8. Confirmar que Vercel despliega la rama correcta (normalmente `main`): si el sitio muestra una versión vieja, falta hacer merge/push a esa rama.
