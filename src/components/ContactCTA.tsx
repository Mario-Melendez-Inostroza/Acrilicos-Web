import { whatsappLink } from '@/config/site'
import WhatsAppIcon from './WhatsAppIcon'

export default function ContactCTA() {
  return (
    <section id="contacto" aria-labelledby="cta-title" className="scroll-mt-20 bg-ink text-white">
      <div className="container-x flex flex-col items-start justify-between gap-5 border-b border-white/10 py-7 md:flex-row md:items-center lg:px-20">
        <div>
          <h2 id="cta-title" className="text-[20px] font-extrabold uppercase sm:text-[22px]">¿Tienes un proyecto?</h2>
          <p className="mt-1 text-[13px] text-white/85">Te ayudamos a encontrar el material ideal. Escríbenos y recibe asesoría personalizada.</p>
        </div>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-gold h-12 shrink-0 rounded-full px-8 text-[13px]">
          <WhatsAppIcon /> Contactar por WhatsApp
        </a>
      </div>
    </section>
  )
}
