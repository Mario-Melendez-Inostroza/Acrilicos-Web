import { ArrowRight } from 'lucide-react'
import type { CategoryInfo } from '@/data/products'

export default function CategoryCard({ category, onSelect }: { category: CategoryInfo; onSelect: () => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_14px_-4px_rgb(0_0_0/0.12)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_40px_-18px_rgb(0_0_0/0.35)]">
      <div className="aspect-[2.15/1] overflow-hidden">
        <img src={category.image} alt={category.alt} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
      </div>
      <div className="flex flex-1 flex-col p-4 pt-4 sm:p-5">
        <h3 className="text-[15px] font-bold">{category.name}</h3>
        <p className="mt-1 text-xs text-neutral-600">{category.description}</p>
        <button onClick={onSelect} className="btn-gold group/b mt-5 h-11 w-full text-[13px]">
          Ver productos <ArrowRight className="size-4 transition-transform group-hover/b:translate-x-1" strokeWidth={2.6} />
        </button>
      </div>
    </article>
  )
}
