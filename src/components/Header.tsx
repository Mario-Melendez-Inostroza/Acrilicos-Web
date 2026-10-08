import { useEffect, useRef, useState } from 'react'
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { searchProducts } from '@/services/productService'
import { formatCLP } from '@/lib/format'
import { getMinPrice } from '@/services/productService'
import { go, goSection } from '@/lib/nav'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
]

function SearchBox({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState(false)
  const results = searchProducts(q)
  const ref = useRef<HTMLFormElement>(null)
  return (
    <form
      ref={ref}
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault()
        if (results[0]) {
          go(`#/producto/${results[0].id}`)
          setQ('')
          onDone?.()
        }
      }}
    >
      <label htmlFor="search" className="sr-only">Buscar productos</label>
      <input
        id="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 150)}
        placeholder="Buscar productos..."
        className="h-[clamp(40px,3vw,56px)] w-full rounded-full bg-white pl-5 pr-11 text-[13px] text-ink placeholder:text-neutral-400 outline-none ring-gold/60 focus:ring-2"
      />
      <Search className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2 text-ink" strokeWidth={2.4} />
      {focus && q && (
        <ul className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl bg-white py-1 shadow-2xl ring-1 ring-black/5">
          {results.length === 0 && <li className="px-4 py-3 text-sm text-neutral-500">Sin resultados</li>}
          {results.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onMouseDown={() => {
                  go(`#/producto/${p.id}`)
                  setQ('')
                  onDone?.()
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-mist"
              >
                <span className="font-semibold">{p.name}</span>
                <span className="text-xs font-bold text-gold-deep">{formatCLP(getMinPrice(p))}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default function Header() {
  const { count, open } = useCart()
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  })

  const nav = (id: string) => {
    setMenu(false)
    goSection(id)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="container-x flex h-[clamp(72px,6vw,120px)] items-center gap-6">
        <button className="-ml-2 grid size-11 place-items-center lg:hidden" aria-label="Abrir menú" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
          {menu ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
        <a href="#/" onClick={(e) => { e.preventDefault(); nav('inicio') }} className="shrink-0" aria-label="Visionary Enterprises, inicio">
          <img src="/logo.png" alt="Visionary Enterprises" className="h-[clamp(56px,5vw,96px)] w-auto object-contain" />
        </a>
        <nav aria-label="Principal" className="ml-auto hidden h-full items-center gap-10 lg:flex xl:ml-24">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); nav(l.id) }}
              className={`relative flex h-full items-center text-[clamp(13px,0.8vw,16px)] font-semibold transition-colors hover:text-gold ${active === l.id ? 'text-gold' : ''}`}
            >
              {l.label}
              <span className={`absolute inset-x-0 bottom-0 h-[2px] bg-gold transition-transform duration-300 ${active === l.id ? 'scale-x-100' : 'scale-x-0'}`} />
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden w-[200px] md:block lg:ml-auto xl:w-[240px]"><SearchBox /></div>
        <div className="ml-auto flex items-center gap-5 md:ml-0">
          <button aria-label="Mi cuenta" className="hidden size-11 place-items-center transition-colors hover:text-gold sm:grid"><User className="size-6" strokeWidth={2.2} /></button>
          <button aria-label={`Abrir carrito, ${count} productos`} onClick={open} className="relative grid size-11 place-items-center transition-colors hover:text-gold">
            <ShoppingCart className="size-6" strokeWidth={2.2} />
            <span className="absolute -right-2 -top-2 grid size-[18px] place-items-center rounded-full bg-gold text-[10px] font-extrabold text-ink">{count}</span>
          </button>
        </div>
      </div>
      {menu && (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            <div className="mb-3 md:hidden"><SearchBox onDone={() => setMenu(false)} /></div>
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); nav(l.id) }}
                className={`rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-white/5 ${active === l.id ? 'text-gold' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
