// Configuración del sitio.
// TODO: Reemplazar todos los valores marcados como PLACEHOLDER por los datos reales de la clienta.
export const site = {
  name: 'Visionary Enterprises',
  tagline: 'Planchas de acrílico y ABS para tus ideas. Materiales de calidad, soporte profesional.',
  // REEMPLAZAR por el número real de la clienta (definir VITE_WHATSAPP_NUMBER en .env)
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || '56900000000',
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) || '',
  phone: '+56 9 0000 0000', // PLACEHOLDER
  email: 'correo@placeholder.cl', // PLACEHOLDER
  location: 'Ubicación por definir', // PLACEHOLDER
  social: {
    instagram: '#', // PLACEHOLDER
    facebook: '#', // PLACEHOLDER
    youtube: '#', // PLACEHOLDER
  },
}

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}
