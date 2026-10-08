import { ArrowRight, Check } from 'lucide-react'
import { getProductsByCategory } from '@/services/productService'
import { go } from '@/lib/nav'

const BANNERS = [
  {
    category: 'transparente' as const,
    title: ['Acrílico', 'Transparente'],
    points: ['Desde 2mm a 10mm', 'Tamaño 2440 x 1220 mm'],
    cta: 'Ver acrílicos',
    image: '/img/categoria-acrilico-transparente.png',
    alt: 'Planchas de acrílico transparente de distintos espesores',
    imgLeft: true,
  },
  {
    category: 'colores' as const,
    title: ['Acrílicos', 'de colores'],
    points: ['Gran variedad de colores', 'Tamaño 2440 x 1220 x 3 mm'],
    cta: 'Ver colores',
    image: '/img/categoria-acrilicos-colores.png',
    alt: 'Planchas de acrílico de colores translúcidos',
    imgLeft: false,
  },
]

export default function PromoBanners() {
  return (
    <section aria-label="Líneas de acrílico" className="grid gap-1.5 bg-white lg:grid-cols-2">
      {BANNERS.map((b) => (
        <div key={b.category} className="group relative isolate flex min-h-[210px] overflow-hidden bg-graphite text-white">
          <img src={b.image} alt={b.alt} loading="lazy"
            className={`absolute inset-y-0 -z-10 h-full w-[62%] object-cover transition-transform duration-[1.2s] group-hover:scale-105 ${b.imgLeft ? 'left-0' : 'right-0'}`} />
          <div className={`absolute inset-0 -z-10 ${b.imgLeft ? 'bg-gradient-to-l from-graphite from-45% via-graphite/80 via-60% to-graphite/10' : 'bg-gradient-to-r from-graphite from-45% via-graphite/80 via-60% to-graphite/10'}`} />
          <div className={`flex flex-col justify-center px-6 py-7 sm:px-8 ${b.imgLeft ? 'ml-auto w-[62%] lg:w-[50%]' : 'w-[62%] lg:w-[55%]'}`}>
            <h2 className="text-[22px] font-extrabold uppercase leading-[1.05] sm:text-[26px] lg:text-[22px] xl:text-[26px]">{b.title[0]}<br />{b.title[1]}</h2>
            <ul className="mt-3 space-y-1">
              {b.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] text-white/90"><Check className="size-4 shrink-0 text-white" strokeWidth={3} />{p}</li>
              ))}
            </ul>
            <button onClick={() => { const p = getProductsByCategory(b.category)[0]; if (p) go(`#/producto/${p.id}`) }}
              className="btn-gold group/b mt-4 h-10 w-fit rounded-full px-7 text-[12px]">
              {b.cta} <ArrowRight className="size-4 transition-transform group-hover/b:translate-x-1" strokeWidth={2.6} />
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}
