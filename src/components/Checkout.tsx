import { useState, type ReactNode } from 'react'
import { ArrowLeft, CheckCircle2, Loader2, Lock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { createPayment, type Buyer, type PaymentResponse } from '@/services/checkoutService'
import { formatCLP } from '@/lib/format'
import { go } from '@/lib/nav'

const input = 'h-11 w-full rounded-lg border border-line bg-white px-3.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30'

function Field({ label, children, optional }: { label: string; children: ReactNode; optional?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-neutral-700">{label}{optional && <span className="font-normal text-neutral-400"> (opcional)</span>}</span>
      {children}
    </label>
  )
}

function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <h2 className="flex items-center gap-3 text-[15px] font-extrabold uppercase">
        <span className="grid size-7 place-items-center rounded-full bg-ink text-xs text-gold">{n}</span>{title}
      </h2>
      <div className="mt-5">{children}</div>
    </fieldset>
  )
}

export default function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const [buyer, setBuyer] = useState<Buyer>({ name: '', rut: '', email: '', phone: '', deliveryMethod: 'retiro', address: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PaymentResponse | null>(null)
  const set = (k: keyof Buyer) => (e: { target: { value: string } }) => setBuyer((b) => ({ ...b, [k]: e.target.value }))

  if (result) {
    return (
      <div className="container-x py-24 text-center">
        <CheckCircle2 className="mx-auto size-14 text-gold" />
        <h1 className="mt-4 text-3xl font-black uppercase">Pedido recibido</h1>
        <p className="mt-3 text-neutral-600">Orden <strong>{result.orderId}</strong> · Total {formatCLP(result.total)}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">Te contactaremos para coordinar la entrega o retiro.</p>
        <button onClick={() => go('#/')} className="btn-gold mt-8 h-12 px-8 text-sm">Volver a la tienda</button>
      </div>
    )
  }

  return (
    <div className="bg-mist">
      <div className="container-x py-8 sm:py-12">
        <button onClick={() => go('#/')} className="inline-flex items-center gap-2 text-[13px] font-semibold text-neutral-600 hover:text-ink"><ArrowLeft className="size-4" /> Seguir comprando</button>
        <h1 className="mt-4 text-[32px] font-black uppercase sm:text-[40px]">Finalizar <span className="text-gold">compra</span></h1>
        {lines.length === 0 ? (
          <p className="mt-8 text-neutral-600">Tu carrito está vacío.</p>
        ) : (
          <form
            className="mt-8 grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start"
            onSubmit={async (e) => {
              e.preventDefault()
              setLoading(true)
              const res = await createPayment(lines, buyer)
              setLoading(false)
              if (res.ok) {
                if (res.initPoint) window.location.href = res.initPoint
                else { setResult(res); clear() }
              }
            }}
          >
            <div className="space-y-6">
              <Block n={1} title="Datos del comprador">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre completo"><input required className={input} value={buyer.name} onChange={set('name')} autoComplete="name" /></Field>
                  <Field label="RUT" optional><input className={input} value={buyer.rut} onChange={set('rut')} /></Field>
                </div>
              </Block>
              <Block n={2} title="Contacto">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Correo electrónico"><input required type="email" className={input} value={buyer.email} onChange={set('email')} autoComplete="email" /></Field>
                  <Field label="Teléfono / WhatsApp"><input required type="tel" className={input} value={buyer.phone} onChange={set('phone')} autoComplete="tel" /></Field>
                </div>
              </Block>
              <Block n={3} title="Entrega">
                <div className="grid gap-3 sm:grid-cols-2">
                  {([['retiro', 'Retiro', 'Coordinamos el retiro contigo'], ['despacho', 'Envío', 'Costo a coordinar por separado']] as const).map(([v, t, d]) => (
                    <label key={v} className={`cursor-pointer rounded-xl border-2 p-4 transition ${buyer.deliveryMethod === v ? 'border-gold bg-gold/5' : 'border-line hover:border-neutral-300'}`}>
                      <input type="radio" name="delivery" className="sr-only" checked={buyer.deliveryMethod === v} onChange={() => setBuyer((b) => ({ ...b, deliveryMethod: v }))} />
                      <span className="block text-sm font-bold">{t}</span>
                      <span className="mt-0.5 block text-xs text-neutral-500">{d}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 grid gap-4">
                  <Field label="Dirección o punto de retiro" optional><input className={input} value={buyer.address} onChange={set('address')} autoComplete="street-address" /></Field>
                  <Field label="Notas del pedido" optional><textarea rows={3} className={`${input} h-auto py-3`} value={buyer.notes} onChange={set('notes')} /></Field>
                </div>
              </Block>
              <Block n={4} title="Método de pago">
                <label className="flex items-center gap-4 rounded-xl border-2 border-gold bg-gold/5 p-4">
                  <input type="radio" checked readOnly className="accent-[#d4a537]" />
                  <span className="grid h-9 w-14 place-items-center rounded-md bg-[#009ee3] text-[10px] font-extrabold leading-none text-white">Mercado<br />Pago</span>
                  <span>
                    <span className="block text-sm font-bold">Mercado Pago</span>
                    <span className="block text-xs text-neutral-500">Tarjetas de crédito, débito y otros medios</span>
                  </span>
                </label>
              </Block>
            </div>
            <aside className="rounded-2xl bg-ink p-6 text-white lg:sticky lg:top-24">
              <h2 className="text-[15px] font-extrabold uppercase">Resumen del pedido</h2>
              <ul className="mt-5 divide-y divide-white/10">
                {lines.map((l) => (
                  <li key={l.lineId} className="flex justify-between gap-4 py-3 text-[13px]">
                    <span className="text-white/85">{l.name} <span className="text-white/50">× {l.quantity}</span></span>
                    <span className="font-bold">{formatCLP(l.unitPrice * l.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-baseline justify-between border-t border-white/15 pt-4">
                <span className="text-sm text-white/70">Total</span>
                <span className="text-3xl font-extrabold tracking-tight text-gold">{formatCLP(subtotal)}</span>
              </div>
              <button type="submit" disabled={loading} className="btn-gold mt-6 h-13 w-full py-3.5 text-sm disabled:opacity-70">
                {loading ? <Loader2 className="size-5 animate-spin" /> : <Lock className="size-4" />} {loading ? 'Procesando…' : 'Pagar con Mercado Pago'}
              </button>
            </aside>
          </form>
        )}
      </div>
    </div>
  )
}
