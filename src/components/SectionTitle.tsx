export default function SectionTitle({ a, b, sub, id }: { a: string; b: string; sub: string; id?: string }) {
  return (
    <div>
      <h2 id={id} className="text-[28px] font-extrabold uppercase leading-none sm:text-[34px]">
        {a} <span className="text-gold">{b}</span>
      </h2>
      <p className="mt-2.5 text-sm text-neutral-700">{sub}</p>
    </div>
  )
}
