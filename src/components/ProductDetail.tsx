import { useState } from 'react'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import type { Variant } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { getDefaultVariant, getPrice, getProductById, getProductsByCategory } from '@/services/productService'
import { whatsappLink } from '@/config/site'
import { formatCLP } from '@/lib/format'
import { go, goSection } from '@/lib/nav'
import ProductImage from './ProductImage'
import ProductCard from './ProductCard'
import QuantityStepper from './QuantityStepper'
import VariantSelector from './VariantSelector'
import WhatsAppIcon from './WhatsAppIcon'

export default function ProductDetail({ id }: { id: string }) {
  const product = getProductById(id)
  const { add } = useCart()
  const [variant, setVariant] = useState<Variant | undefined>(() => (product ? getDefaultVariant(product) : undefined))
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">Producto no encontrado</h1>
        <button onClick={() => go('#/')} className="btn-gold mt-6 h-11 px-6 text-sm">Volver al inicio</button>
      </div>
    )
  }

  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="bg-mist">
      <div className="container-x py-8 sm:py-12">
        <button onClick={() => goSection('productos')} className="inline-flex items-center gap-2 text-[13px] font-semibold text-neutral-600 hover:text-ink">
          <ArrowLeft className="size-4" /> Volver a productos
        </button>
        <div className="mt-6 grid gap-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-white to-mist p-6">
            <ProductImage product={product} className={'aspect-[4/3] rounded-lg bg-white'} />
          </div>
          <div className="flex flex-col">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
              {product.category === 'lamicoid' ? 'Lamicoid · ABS doble color' : product.category === 'transparente' ? 'Acrílico transparente' : 'Acrílicos de colores'}
            </p>
            <h1 className="mt-2 text-[30px] font-black uppercase leading-[1.05] sm:text-[38px]">{product.name}</h1>
            <p className="mt-2 text-sm font-medium text-neutral-500">{product.dimensions}{variant && product.variantType === 'thickness' ? ` · ${variant.label}` : ''}</p>
            <p className="mt-6 text-[34px] font-extrabold tracking-tight" aria-live="polite">{formatCLP(getPrice(product, variant))}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-700">{product.description}</p>
            {product.color && (
              <p className="mt-4 flex items-center gap-2 text-[13px] font-semibold"><span className="size-4 rounded-full ring-1 ring-black/15" style={{ background: product.color }} />Color de la cara</p>
            )}
            <div className="mt-6"><VariantSelector product={product} value={variant} onChange={setVariant} /></div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} label={product.name} />
              <button onClick={() => { add(product, variant, qty); setQty(1) }} className="btn-gold h-12 flex-1 px-8 text-sm sm:flex-none">
                <ShoppingCart className="size-5" strokeWidth={2.4} /> Agregar al carrito
              </button>
            </div>
            <a href={whatsappLink(`Hola, quiero consultar por ${product.name}${variant ? ` (${variant.label})` : ''}.`)} target="_blank" rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-neutral-600 hover:text-gold-deep">
              <WhatsAppIcon className="size-4" /> Consultar por WhatsApp
            </a>
          </div>
        </div>
        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="rel-title">
            <h2 id="rel-title" className="text-[24px] font-extrabold uppercase">También te puede <span className="text-gold">interesar</span></h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
