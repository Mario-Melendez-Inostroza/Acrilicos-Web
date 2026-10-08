// PRECIOS DE PRUEBA - reemplazar por precios reales de la clienta antes de publicar
// Todos los precios están en CLP (enteros, sin decimales).

export type Category = 'lamicoid' | 'transparente' | 'colores'
export type VariantType = 'none' | 'thickness' | 'color'

export interface Variant {
  id: string
  label: string
  price: number
  isTestPrice: boolean
  /** Solo para variantes de color: color del punto */
  swatch?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  description: string
  dimensions: string
  image: string
  /** Recorte dentro de la imagen de catálogo (px sobre 1536x1024) */
  crop?: { x: number; y: number }
  /** Color representativo (punto de color) */
  color?: string
  variantType: VariantType
  variants: Variant[]
  /** Solo para productos sin variantes */
  basePrice?: number
  isTestPrice: boolean
}

export interface CategoryInfo {
  id: Category
  name: string
  description: string
  image: string
  alt: string
}

export const categories: CategoryInfo[] = [
  {
    id: 'lamicoid',
    name: 'Lamicoid (ABS Doble Color)',
    description: '9 variedades disponibles',
    image: '/img/lamicoid.png',
    alt: 'Pila de planchas de Lamicoid ABS doble color en negro, amarillo, rojo, azul, verde, dorado, plateado y cobre',
  },
  {
    id: 'transparente',
    name: 'Acrílico Transparente',
    description: 'Desde 2mm a 10mm',
    image: '/img/transparente.png',
    alt: 'Planchas de acrílico transparente apiladas de distintos espesores',
  },
  {
    id: 'colores',
    name: 'Acrílicos de Colores',
    description: 'Gran variedad de colores',
    image: '/img/colores.png',
    alt: 'Planchas de acrílico de colores translúcidos apiladas en degradé',
  },
]

const LAMICOID_DESC =
  'Plancha de ABS doble color (Lamicoid), ideal para señalética, placas, credenciales y grabado.'
const CATALOG = '/img/catalog.png'
const COLS = [30, 537, 1044]
const ROWS = [12, 352, 692]

const lamicoid = (
  slug: string,
  name: string,
  color: string,
  price: number,
  col: number,
  row: number,
): Product => ({
  id: `lamicoid-${slug}`,
  slug: `lamicoid-${slug}`,
  name: `Lamicoid ${name}`,
  category: 'lamicoid',
  description: LAMICOID_DESC,
  dimensions: '1200 x 600 x 1,3 mm',
  image: CATALOG,
  crop: { x: COLS[col], y: ROWS[row] },
  color,
  variantType: 'none',
  variants: [],
  basePrice: price,
  isTestPrice: true,
})

export const products: Product[] = [
  lamicoid('negro-sobre-blanco', 'Negro sobre Blanco', '#111111', 1500, 0, 0),
  lamicoid('amarillo-sobre-negro', 'Amarillo sobre Negro', '#F7D400', 1500, 1, 0),
  lamicoid('rojo-sobre-blanco', 'Rojo sobre Blanco', '#E30613', 1500, 2, 0),
  lamicoid('azul-sobre-blanco', 'Azul sobre Blanco', '#0A3CC8', 1500, 0, 1),
  lamicoid('blanco-sobre-negro', 'Blanco sobre Negro', '#FFFFFF', 1500, 1, 1),
  lamicoid('verde-sobre-blanco', 'Verde sobre Blanco', '#00976A', 1500, 2, 1),
  lamicoid('dorado-brush', 'Dorado Brush', '#C9A13B', 2000, 0, 2),
  lamicoid('plateado-brush', 'Plateado Brush', '#B8BCC2', 2000, 1, 2),
  lamicoid('cobre-sobre-negro', 'Cobre sobre Negro', '#C47A55', 2000, 2, 2),
  {
    id: 'acrilico-transparente',
    slug: 'acrilico-transparente',
    name: 'Acrílico Transparente',
    category: 'transparente',
    description: 'Plancha de acrílico transparente de alta claridad. Elige el espesor que necesita tu proyecto.',
    dimensions: '2440 x 1220 mm',
    image: '/img/transparente.png',
    variantType: 'thickness',
    variants: [
      { id: '2mm', label: '2 mm', price: 3000, isTestPrice: true },
      { id: '3mm', label: '3 mm', price: 3500, isTestPrice: true },
      { id: '4mm', label: '4 mm', price: 4000, isTestPrice: true },
      { id: '5mm', label: '5 mm', price: 4500, isTestPrice: true },
      { id: '6mm', label: '6 mm', price: 5000, isTestPrice: true },
      { id: '8mm', label: '8 mm', price: 6000, isTestPrice: true },
      { id: '10mm', label: '10 mm', price: 7000, isTestPrice: true },
    ],
    isTestPrice: true,
  },
  {
    id: 'acrilico-colores',
    slug: 'acrilico-colores',
    name: 'Acrílico de Color',
    category: 'colores',
    description: 'Plancha de acrílico de color de 3 mm. Elige el color para tu proyecto.',
    dimensions: '2440 x 1220 x 3 mm',
    image: '/img/colores.png',
    variantType: 'color',
    // PLACEHOLDER: reemplazar por los colores reales disponibles
    variants: [
      { id: 'color-1', label: 'Color 1', price: 4500, isTestPrice: true, swatch: '#9CA3AF' },
      { id: 'color-2', label: 'Color 2', price: 4500, isTestPrice: true, swatch: '#6B7280' },
      { id: 'color-3', label: 'Color 3', price: 4500, isTestPrice: true, swatch: '#374151' },
    ],
    isTestPrice: true,
  },
]
