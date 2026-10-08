import type { Product } from '@/data/products'

const W = 1536
const H = 1024
const CW = 460
const CH = 170

/** Muestra la foto del producto. Para Lamicoid recorta su plancha desde la imagen de catálogo. */
export default function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  const alt = `Plancha ${product.name}, ${product.dimensions}`
  if (product.crop) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full bg-no-repeat ${className}`}
        style={{
          aspectRatio: `${CW} / ${CH}`,
          backgroundImage: `url(${product.image})`,
          backgroundSize: `${(W / CW) * 100}% auto`,
          backgroundPosition: `${(product.crop.x / (W - CW)) * 100}% ${(product.crop.y / (H - CH)) * 100}%`,
        }}
      />
    )
  }
  return <img src={product.image} alt={alt} className={`w-full object-cover ${className}`} loading="lazy" />
}
