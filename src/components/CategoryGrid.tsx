import { getCategories, getProductsByCategory } from '@/services/productService'
import { go, goSection } from '@/lib/nav'
import CategoryCard from './CategoryCard'
import SectionTitle from './SectionTitle'

export default function CategoryGrid() {
  return (
    <section aria-labelledby="cat-title" className="container-x pt-12 sm:pt-14">
      <SectionTitle id="cat-title" a="Nuestras" b="Categorías" sub="Encuentra el material ideal para tu proyecto" />
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {getCategories().map((c) => (
          <CategoryCard
            key={c.id}
            category={c}
            onSelect={() => {
              if (c.id === 'lamicoid') return goSection('productos')
              const p = getProductsByCategory(c.id)[0]
              if (p) go(`#/producto/${p.id}`)
            }}
          />
        ))}
      </div>
    </section>
  )
}
