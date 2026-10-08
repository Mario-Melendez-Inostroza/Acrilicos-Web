import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import type { Product, Variant } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { getDefaultVariant, getPrice } from '@/services/productService'
import { formatCLP } from '@/lib/format'
import { go } from '@/lib/nav'
import ProductImage from './ProductImage'
import QuantityStepper from './QuantityStepper'
import VariantSelector from './VariantSelector'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [variant, setVariant] = useState<Variant | undefined>(() => getDefaultVariant(product))
  const [touched, setTouched] = useState(false)
  const [qty, setQty] = useState(1)
  const price = getPrice(product, variant)
  const showFrom = product.variants.length > 1 && !touched

  return (
    <article className="group flex h-full flex-col rounded-xl bg-white p-3 shadow-[0_2px_14px_-4px_rgb(0_0_0/0.12)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_40px_-18px_rgb(0_0_0/0.3)]">
      <button onClick={() => go(`#/producto/${product.id}`)} className="block overflow-hidden rounded-lg bg-white" aria-label={`Ver detalle de ${product.name}`}>
        <div className="flex aspect-[1.45/1] items-center justify-center px-1 transition-transform duration-700 group-hover:scale-[1.05]">
          <ProductImage product={product} className={product.crop ? '' : 'h-full rounded-md'} />
        </div>
      </button>
      <div className="flex flex-1 flex-col px-1 pt-3">
        <h3 className="min-h-[2.5em] text-[13px] font-bold leading-[1.25]">
          <button onClick={() => go(`#/producto/${product.id}`)} className="text-left hover:text-gold-deep">{product.name}</button>
        </h3>
        <p className="mt-1.5 text-[11.5px] text-neutral-600">{product.dimensions}</p>
        {product.color && <span className="mt-2 block size-4 rounded-full ring-1 ring-black/15" style={{ background: product.color }} aria-label={`Color ${product.name.replace('Lamicoid ', '')}`} role="img" />}
        {product.variantType !== 'none' && (
          <div className="mt-2">
            <VariantSelector compact product={product} value={variant} onChange={(v) => { setVariant(v); setTouched(true) }} />
          </div>
        )}
        <p className="mt-auto pt-3 text-[19px] font-extrabold tracking-tight">
          {showFrom && <span className="mr-1 text-[12px] font-semibold text-neutral-500">Desde</span>}
          {formatCLP(price)}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <QuantityStepper size="sm" value={qty} onChange={setQty} label={product.name} />
          <button
            onClick={() => { add(product, variant, qty); setQty(1) }}
            className="btn-gold group/b h-8 flex-1 whitespace-nowrap px-2 text-[11.5px]"
          >
            <ShoppingCart className="size-4 transition-transform group-hover/b:-rotate-12" strokeWidth={2.4} /> Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  )
}
