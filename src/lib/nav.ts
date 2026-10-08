// Navegación mínima por hash: "#/" inicio, "#/producto/:id", "#/checkout".
export type Route = { name: 'home' } | { name: 'product'; id: string } | { name: 'checkout' }

export function parseRoute(hash: string): Route {
  const m = hash.match(/^#\/producto\/(.+)$/)
  if (m) return { name: 'product', id: decodeURIComponent(m[1]) }
  if (hash === '#/checkout') return { name: 'checkout' }
  return { name: 'home' }
}

export function go(path: string) {
  window.location.hash = path
  window.scrollTo({ top: 0 })
}

export function goSection(id: string) {
  if (parseRoute(window.location.hash).name !== 'home') window.location.hash = '#/'
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
}
