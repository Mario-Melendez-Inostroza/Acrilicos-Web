import { getSubtotal, type CartLine } from './cartService'

export interface Buyer {
  name: string
  rut?: string
  email: string
  phone: string
  deliveryMethod: 'retiro' | 'despacho'
  address?: string
  notes?: string
}

export interface PaymentResponse {
  ok: boolean
  orderId: string
  total: number
  /** URL de pago de Mercado Pago (simulada por ahora) */
  initPoint: string | null
  simulated: boolean
}

export async function createPayment(cart: CartLine[], buyer: Buyer): Promise<PaymentResponse> {
  // TODO: Reemplazar esta simulación por una llamada real al backend:
  //   const res = await fetch('/api/crear-pago', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cart, buyer }) })
  //   return res.json()  // el backend crea la preferencia en Mercado Pago y devuelve init_point
  void buyer
  await new Promise((r) => setTimeout(r, 900))
  return {
    ok: true,
    orderId: `SIM-${Date.now().toString(36).toUpperCase()}`,
    total: getSubtotal(cart),
    initPoint: null,
    simulated: true,
  }
}
