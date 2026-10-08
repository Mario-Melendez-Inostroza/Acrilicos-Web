import { categories, products, type Product, type Variant } from '@/data/products'

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category)
}

export function getCategories() {
  return categories
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q))
}

/** Variante por defecto: la primera (más delgada para espesores). Nunca queda sin variante. */
export function getDefaultVariant(product: Product): Variant | undefined {
  return product.variants[0]
}

export function getPrice(product: Product, variant?: Variant): number {
  return variant?.price ?? product.basePrice ?? 0
}

export function getMinPrice(product: Product): number {
  return product.variants.length ? Math.min(...product.variants.map((v) => v.price)) : (product.basePrice ?? 0)
}
