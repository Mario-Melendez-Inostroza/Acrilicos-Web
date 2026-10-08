import { Mail, MapPin, Phone } from 'lucide-react'

const Instagram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
)
const Facebook = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M14 8V6.5c0-.8.2-1.5 1.5-1.5H17V2h-2.5C11.6 2 11 4 11 6v2H9v3h2v11h3V11h2.6l.4-3z" /></svg>
)
const Youtube = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.6 12l-5.8 3.1z" /></svg>
)
import { site } from '@/config/site'
import { getProductsByCategory } from '@/services/productService'
import { go, goSection } from '@/lib/nav'

export default function Footer() {
  const link = 'text-[12.5px] text-white/80 transition-colors hover:text-gold'
  const toCat = (c: 'transparente' | 'colores') => { const p = getProductsByCategory(c)[0]; if (p) go(`#/producto/${p.id}`) }
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_1fr_1.2fr_auto]">
        <div>
          <img src="/logo.png" alt="Visionary Enterprises" className="h-14 w-auto max-w-[200px] object-contain" />
          <p className="mt-4 max-w-[260px] text-[12.5px] leading-relaxed text-white/80">{site.tagline}</p>
        </div>
        <nav aria-label="Enlaces rápidos">
          <h3 className="text-[12.5px] font-bold">Enlaces rápidos</h3>
          <ul className="mt-3 space-y-2">
            {[['inicio', 'Inicio'], ['productos', 'Productos'], ['nosotros', 'Nosotros'], ['contacto', 'Contacto']].map(([id, l]) => (
              <li key={id}><button onClick={() => goSection(id)} className={link}>{l}</button></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-[12.5px] font-bold">Productos</h3>
          <ul className="mt-3 space-y-2">
            <li><button onClick={() => goSection('productos')} className={link}>Lamicoid (ABS)</button></li>
            <li><button onClick={() => toCat('transparente')} className={link}>Acrílico Transparente</button></li>
            <li><button onClick={() => toCat('colores')} className={link}>Acrílicos de Colores</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[12.5px] font-bold">Contacto</h3>
          <ul className="mt-3 space-y-2.5 text-[12.5px] text-white/80">
            <li className="flex items-center gap-3"><Phone className="size-4" aria-hidden="true" /><a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-gold">{site.phone}</a></li>
            <li className="flex items-center gap-3"><Mail className="size-4" aria-hidden="true" /><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
            <li className="flex items-center gap-3"><MapPin className="size-4" aria-hidden="true" />{site.location}</li>
          </ul>
        </div>
        <div className="flex gap-4 lg:pt-8">
          <a href={site.social.instagram} aria-label="Instagram" className="hover:text-gold"><Instagram className="size-5" /></a>
          <a href={site.social.facebook} aria-label="Facebook" className="hover:text-gold"><Facebook className="size-5" /></a>
          <a href={site.social.youtube} aria-label="YouTube" className="hover:text-gold"><Youtube className="size-5" /></a>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-white/10 py-4 text-[11px] text-white/60 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Visionary Enterprises. Todos los derechos reservados.</p>
        <p className="flex gap-3"><a href="#" className="hover:text-gold">Términos y condiciones</a><span aria-hidden="true">|</span><a href="#" className="hover:text-gold">Política de privacidad</a></p>
      </div>
    </footer>
  )
}
