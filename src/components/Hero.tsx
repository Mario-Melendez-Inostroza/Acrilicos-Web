import { ArrowRight } from 'lucide-react'
import { whatsappLink } from '@/config/site'
import { goSection } from '@/lib/nav'
import WhatsAppIcon from './WhatsAppIcon'

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[clamp(480px,33vw,680px)] items-center overflow-hidden bg-[#0b0b0c] text-white">
      <img
        src="/img/hero-fondo.png"
        alt="Planchas de acrílico y ABS de colores apiladas sobre una superficie oscura"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0b0b0c_0%,#0b0b0c_30%,transparent_55%)] max-lg:bg-[linear-gradient(to_right,rgb(11_11_12/.94),rgb(11_11_12/.7)_60%,rgb(11_11_12/.35))]" />
      <div className="container-x py-12 lg:py-[3vw]">
        <div className="lg:w-[52vw]">
          <p className="text-[clamp(0.8rem,1.4vw,1.75rem)] font-medium uppercase tracking-[0.15em] text-gold">Planchas de acrílico y ABS</p>
          <h1 className="mt-[0.8vw] text-[clamp(2rem,4vw,5rem)] font-black uppercase leading-[1.08] tracking-[-0.02em] lg:[&>*]:whitespace-nowrap">
            <span className="block">Materiales</span>
            <span className="block text-gold">Que dan vida</span>
            <span className="block">A tus proyectos</span>
          </h1>
          <p className="mt-[1.4vw] max-w-[34em] lg:max-w-[38vw] text-[clamp(0.95rem,1.4vw,1.75rem)] leading-[1.35] text-white/90">
            Planchas de acrílico y ABS de alta calidad para señalética, decoración, publicidad, corte láser CNC y múltiples aplicaciones.
          </p>
          <div className="mt-[2vw] flex flex-wrap gap-4">
            <button onClick={() => goSection('productos')} className="btn-gold group h-[clamp(48px,3.5vw,72px)] rounded-full px-[2.2vw] text-[clamp(0.875rem,1.1vw,1.375rem)] max-lg:px-7">
              Ver productos <ArrowRight className="size-[1.2em] transition-transform group-hover:translate-x-1" strokeWidth={2.6} />
            </button>
            <a href={whatsappLink()} target="_blank" rel="noreferrer"
              className="inline-flex h-[clamp(48px,3.5vw,72px)] items-center gap-2.5 rounded-full border-[1.5px] border-white/80 px-[2vw] text-[clamp(0.875rem,1.1vw,1.375rem)] font-bold transition-colors hover:border-gold hover:text-gold max-lg:px-6">
              <WhatsAppIcon /> Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
