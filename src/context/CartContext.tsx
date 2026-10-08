import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product, Variant } from '@/data/products'
import * as cart from '@/services/cartService'

interface CartCtx {
  lines: cart.CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: Product, variant: Variant | undefined, qty: number) => void
  setQty: (lineId: string, qty: number) => void
  remove: (lineId: string) => void
  clear: () => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<cart.CartLine[]>(() => cart.loadCart())
  const [isOpen, setOpen] = useState(false)

  useEffect(() => cart.saveCart(lines), [lines])

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count: cart.getCount(lines),
      subtotal: cart.getSubtotal(lines),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (p, v, q) => {
        setLines((l) => cart.addLine(l, cart.buildLine(p, v, q)))
        setOpen(true)
      },
      setQty: (id, q) => setLines((l) => cart.updateQuantity(l, id, q)),
      remove: (id) => setLines((l) => cart.removeLine(l, id)),
      clear: () => setLines([]),
    }),
    [lines, isOpen],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart debe usarse dentro de CartProvider')
  return c
}
