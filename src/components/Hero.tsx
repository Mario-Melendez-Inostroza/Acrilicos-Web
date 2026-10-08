import { ArrowRight } from 'lucide-react'
import { whatsappLink } from '@/config/site'
import { goSection } from '@/lib/nav'
import WhatsAppIcon from './WhatsAppIcon'

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-ink text-white">
      <img
        src="/img/hero-fondo.png"
        alt="Planchas de acrílico y ABS de colores apiladas sobre una superficie oscura"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/0 max-md:via-ink/80 max-md:to-ink/40" />
      <div className="container-x py-16 sm:py-20 lg:py-[72px]">
        <div className="max-w-[560px]">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold sm:text-[15px]">Planchas de acrílico y ABS</p>
          <h1 className="mt-4 text-[40px] font-black uppercase leading-[1.02] sm:text-[54px] lg:text-[60px]">
            Materiales<br />
            <span className="text-gold">Que dan vida</span><br />
            A tus proyectos
          </h1>
          <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-white/90 sm:text-base">
            Planchas de acrílico y ABS de alta calidad para señalética, decoración, publicidad, corte láser CNC y múltiples aplicaciones.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => goSection('productos')} className="btn-gold group h-12 rounded-xl px-7 text-sm">
              Ver productos <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.6} />
            </button>
            <a href={whatsappLink()} target="_blank" rel="noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-xl border-[1.5px] border-white/80 px-6 text-sm font-bold transition-colors hover:border-gold hover:text-gold">
              <WhatsAppIcon /> Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
