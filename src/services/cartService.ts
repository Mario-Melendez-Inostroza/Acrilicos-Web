// Lógica del carrito. Hoy persiste en localStorage; reemplazable por una API más adelante.
import type { Product, Variant } from '@/data/products'

export interface CartLine {
  lineId: string
  productId: string
  variantId?: string
  name: string
  unitPrice: number
  quantity: number
  image: string
}

const KEY = 'visionary-cart-v1'

export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

export function saveCart(lines: CartLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines))
  } catch {
    /* almacenamiento no disponible */
  }
}

export function buildLine(product: Product, variant: Variant | undefined, quantity: number): CartLine {
  return {
    lineId: variant ? `${product.id}-${variant.id}` : product.id,
    productId: product.id,
    variantId: variant?.id,
    name: variant ? `${product.name} - ${variant.label}` : product.name,
    unitPrice: variant?.price ?? product.basePrice ?? 0,
    quantity,
    image: product.image,
  }
}

export function addLine(lines: CartLine[], line: CartLine): CartLine[] {
  const existing = lines.find((l) => l.lineId === line.lineId)
  if (existing) {
    return lines.map((l) => (l.lineId === line.lineId ? { ...l, quantity: l.quantity + line.quantity } : l))
  }
  return [...lines, line]
}

export function updateQuantity(lines: CartLine[], lineId: string, quantity: number): CartLine[] {
  if (quantity <= 0) return removeLine(lines, lineId)
  return lines.map((l) => (l.lineId === lineId ? { ...l, quantity } : l))
}

export function removeLine(lines: CartLine[], lineId: string): CartLine[] {
  return lines.filter((l) => l.lineId !== lineId)
}

export const getSubtotal = (lines: CartLine[]) => lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0)
export const getCount = (lines: CartLine[]) => lines.reduce((s, l) => s + l.quantity, 0)
