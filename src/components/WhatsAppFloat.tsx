import { getWhatsAppUrl } from '@/config/site'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl('Hola, quiero más información sobre sus planchas de acrílico y ABS.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-4 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_rgba(0,0,0,.25)] transition-all duration-200 hover:scale-105 hover:bg-[#1EBE5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-[calc(20px+env(safe-area-inset-bottom))] sm:right-5 sm:size-[60px]"
    >
      <WhatsAppIcon className="size-8" />
    </a>
  )
}
