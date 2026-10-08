import { useEffect } from 'react'
import { ShoppingCart, Trash2, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getProductById } from '@/services/productService'
import { formatCLP } from '@/lib/format'
import { go } from '@/lib/nav'
import ProductImage from './ProductImage'
import QuantityStepper from './QuantityStepper'

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [isOpen, close])

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div onClick={close} className={`absolute inset-0 bg-ink/60 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      <aside role="dialog" aria-modal="true" aria-label="Carrito de compras"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between bg-ink px-6 py-5 text-white">
          <h2 className="text-lg font-extrabold uppercase">Tu carrito <span className="text-gold">({count})</span></h2>
          <button onClick={close} aria-label="Cerrar carrito" className="hover:text-gold"><X className="size-6" /></button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-mist"><ShoppingCart className="size-7 text-neutral-400" /></div>
            <p className="font-semibold">Tu carrito está vacío</p>
            <p className="text-sm text-neutral-500">Agrega planchas para comenzar tu proyecto.</p>
            <button onClick={close} className="btn-gold mt-2 h-11 px-6 text-sm">Continuar comprando</button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => {
                const p = getProductById(l.productId)
                return (
                  <li key={l.lineId} className="flex gap-4 py-5">
                    <div className="grid w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-mist p-1">
                      {p && <ProductImage product={p} className={'aspect-square rounded-md bg-white'} />}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[13px] font-bold leading-snug">{l.name}</h3>
                        <button onClick={() => remove(l.lineId)} aria-label={`Eliminar ${l.name}`} className="text-neutral-400 transition-colors hover:text-red-600"><Trash2 className="size-4" /></button>
                      </div>
                      <p className="mt-0.5 text-xs text-neutral-500">{formatCLP(l.unitPrice)} c/u</p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <QuantityStepper size="sm" value={l.quantity} onChange={(n) => setQty(l.lineId, n)} label={l.name} />
                        <span className="text-[15px] font-extrabold">{formatCLP(l.unitPrice * l.quantity)}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-line bg-mist px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-neutral-600">Subtotal</span>
                <span className="text-2xl font-extrabold tracking-tight">{formatCLP(subtotal)}</span>
              </div>
              <button onClick={() => { close(); go('#/checkout') }} className="btn-gold mt-4 h-12 w-full text-sm">Ir al checkout</button>
              <button onClick={close} className="mt-2 h-11 w-full rounded-lg border border-ink/15 text-sm font-semibold transition-colors hover:border-ink">Continuar comprando</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
