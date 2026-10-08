import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, onChange, label, size = 'md' }: { value: number; onChange: (n: number) => void; label: string; size?: 'sm' | 'md' }) {
  const h = size === 'sm' ? 'h-11 lg:h-8' : 'h-11 lg:h-10'
  return (
    <div className={`inline-flex ${h} items-center rounded-lg border border-line bg-white`} role="group" aria-label={`Cantidad de ${label}`}>
      <button type="button" aria-label="Disminuir cantidad" onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-full w-10 place-items-center lg:w-8 text-neutral-500 transition-colors hover:text-ink disabled:opacity-30" disabled={value <= 1}>
        <Minus className="size-3.5" strokeWidth={2.6} />
      </button>
      <span className="w-7 text-center text-[13px] font-bold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label="Aumentar cantidad" onClick={() => onChange(value + 1)}
        className="grid h-full w-10 place-items-center lg:w-8 text-neutral-500 transition-colors hover:text-ink">
        <Plus className="size-3.5" strokeWidth={2.6} />
      </button>
    </div>
  )
}
