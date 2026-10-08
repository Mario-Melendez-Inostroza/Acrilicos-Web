import { CreditCard, Headset, ShieldCheck } from 'lucide-react'

const ITEMS = [
  { icon: ShieldCheck, title: 'Materiales de alta calidad', text: 'Para uso profesional' },
  { icon: CreditCard, title: 'Pago seguro', text: 'Con Mercado Pago' },
  { icon: Headset, title: 'Asesoría personalizada', text: 'Te ayudamos en tu proyecto' },
]

export default function Benefits() {
  return (
    <section aria-label="Beneficios" className="border-b border-line bg-mist">
      <ul className="container-x grid gap-5 py-6 sm:grid-cols-3 sm:gap-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-4 sm:justify-center">
            <Icon className="size-9 shrink-0 text-ink" strokeWidth={1.8} aria-hidden="true" />
            <div>
              <h3 className="text-[13px] font-bold">{title}</h3>
              <p className="mt-0.5 text-xs font-medium text-neutral-600">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
