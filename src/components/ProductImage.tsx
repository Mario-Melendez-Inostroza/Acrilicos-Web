import type { Product } from '@/data/products'

/** Foto del producto, completa y sin recortes. */
export default function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  const alt = `Plancha ${product.name}, ${product.dimensions}`
  return <img src={product.image} alt={alt} className={`w-full ${product.category === 'lamicoid' ? 'object-contain' : 'object-cover'} ${className}`} loading="lazy" />
}
