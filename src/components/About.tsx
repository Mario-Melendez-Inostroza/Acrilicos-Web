import { CreditCard, Headset, ShieldCheck } from 'lucide-react'

export default function About() {
  return (
    <section id="nosotros" aria-labelledby="about-title" className="scroll-mt-20 bg-white py-10 sm:py-12">
      <div className="container-x grid items-center gap-8 md:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div className="overflow-hidden rounded-md shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)]">
          <img src="/img/nosotros.png" alt="Logo dorado de Visionary Enterprises instalado en una pared negra" loading="lazy"
            className="aspect-[2.5/1] w-full object-cover" />
        </div>
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-deep">Sobre nosotros</p>
          <h2 id="about-title" className="mt-1.5 text-[24px] font-extrabold uppercase leading-tight sm:text-[28px]">Visionary Enterprises</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-neutral-700">
            Somos una empresa dedicada a la comercialización de planchas de acrílico y ABS de alta calidad, para emprendedores, empresas y profesionales que buscan materiales confiables para dar vida a sus proyectos.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { icon: ShieldCheck, t: 'Materiales de calidad' },
              { icon: Headset, t: 'Asesoría personalizada' },
              { icon: CreditCard, t: 'Pago seguro' },
            ].map(({ icon: I, t }) => (
              <li key={t} className="flex items-center gap-2.5 text-[12px] font-bold"><I className="size-7" strokeWidth={1.8} aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
