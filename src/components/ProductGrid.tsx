import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductsByCategory } from '@/services/productService'
import ProductCard from './ProductCard'
import SectionTitle from './SectionTitle'

export default function ProductGrid() {
  const track = useRef<HTMLDivElement>(null)
  const products = getProductsByCategory('lamicoid')
  const scroll = (dir: number) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  return (
    <section id="productos" aria-labelledby="prod-title" className="scroll-mt-20 pb-4 pt-10 sm:pt-12">
      <div className="container-x flex items-end justify-between gap-4">
        <SectionTitle id="prod-title" a="Productos" b="Destacados" sub="Los materiales ideales para tus proyectos" />
        <div className="hidden gap-3 sm:flex">
          {[-1, 1].map((d) => (
            <button key={d} onClick={() => scroll(d)} aria-label={d < 0 ? 'Productos anteriores' : 'Productos siguientes'}
              className="grid size-9 place-items-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition-colors hover:bg-gold">
              {d < 0 ? <ChevronLeft className="size-4" strokeWidth={2.6} /> : <ChevronRight className="size-4" strokeWidth={2.6} />}
            </button>
          ))}
        </div>
      </div>
      <div className="container-x">
        <div ref={track} className="no-scrollbar -mx-2 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-6 pt-1">
          {products.map((p) => (
            <div key={p.id} className="w-[78%] shrink-0 snap-start min-[480px]:w-[46%] md:w-[31.5%] lg:w-[calc((100%-4rem)/5)]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
