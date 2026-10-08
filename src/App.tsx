import { useEffect, useState } from 'react'
import { CartProvider } from '@/context/CartContext'
import { parseRoute, type Route } from '@/lib/nav'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import CategoryGrid from '@/components/CategoryGrid'
import ProductGrid from '@/components/ProductGrid'
import PromoBanners from '@/components/PromoBanners'
import About from '@/components/About'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import ProductDetail from '@/components/ProductDetail'
import Checkout from '@/components/Checkout'

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))
  useEffect(() => {
    const on = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  return (
    <CartProvider>
      <Header />
      <main className="bg-[#fafaf8]">
        {route.name === 'home' && (
          <>
            <Hero />
            <Benefits />
            <CategoryGrid />
            <ProductGrid />
            <PromoBanners />
            <About />
          </>
        )}
        {route.name === 'product' && <ProductDetail key={route.id} id={route.id} />}
        {route.name === 'checkout' && <Checkout />}
      </main>
      {route.name === 'home' && <ContactCTA />}
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
