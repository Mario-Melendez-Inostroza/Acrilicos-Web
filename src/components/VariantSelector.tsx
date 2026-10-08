import type { Product, Variant } from '@/data/products'

export default function VariantSelector({ product, value, onChange, compact }: { product: Product; value?: Variant; onChange: (v: Variant) => void; compact?: boolean }) {
  if (product.variantType === 'none') return null
  const label = product.variantType === 'thickness' ? 'Espesor' : 'Color'
  return (
    <fieldset>
      <legend className={`font-semibold text-neutral-600 ${compact ? 'text-[11px]' : 'text-xs uppercase tracking-wider'}`}>
        {label}: <span className="text-ink">{value?.label}</span>
      </legend>
      <div className={`flex flex-wrap ${compact ? 'mt-1.5 gap-1.5' : 'mt-3 gap-2'}`}>
        {product.variants.map((v) => {
          const on = v.id === value?.id
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(v)}
              className={`inline-flex items-center gap-1.5 rounded-md border font-semibold transition-all ${compact ? 'h-7 px-2 text-[11px]' : 'h-10 px-3.5 text-[13px]'} ${on ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-gold'}`}
            >
              {v.swatch && <span className="size-3 rounded-full ring-1 ring-black/15" style={{ background: v.swatch }} />}
              {v.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
