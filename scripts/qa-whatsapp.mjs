// Capturas y mediciones de los botones de WhatsApp (header y flotante).
import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:5199/'
const sizes = [[1920, 1080], [1440, 900], [1280, 720], [1024, 768], [768, 1024], [375, 812]]
const browser = await chromium.launch()
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  const m = await page.evaluate(() => {
    const vis = (el) => el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0
    const r = (el) => { const b = el.getBoundingClientRect(); return { l: Math.round(b.left), r: Math.round(b.right), t: Math.round(b.top), b: Math.round(b.bottom), w: Math.round(b.width), h: Math.round(b.height) } }
    const hd = document.querySelector('header .container-x')
    const items = [...hd.querySelectorAll(':scope > a, :scope > nav, :scope > div, :scope > button')].filter(vis)
    const rects = items.map((el) => ({ n: el.tagName + (el.getAttribute('aria-label') || '').slice(0, 14), ...r(el) }))
    let overlap = false
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) if (rects[i].l < rects[j].r - 0.5 && rects[j].l < rects[i].r - 0.5) overlap = true
    const hw = document.querySelector('header a[aria-label^="¿Tienes"]')
    const fl = document.querySelector('a[aria-label="Escribir por WhatsApp"]')
    const cs = (el) => { const s = getComputedStyle(el); return { bg: s.backgroundColor, shadow: s.boxShadow, anim: s.animationName } }
    return {
      headerWA: vis(hw) ? { ...r(hw), ...cs(hw), text: hw.innerText.trim() } : 'oculto',
      float: { ...r(fl), ...cs(fl) },
      headerOverlap: overlap,
      headerOverflow: hd.scrollWidth > hd.clientWidth,
      pageOverflow: document.documentElement.scrollWidth > innerWidth,
      rects: rects.map((x) => `${x.n}:${x.l}-${x.r}`).join(' '),
    }
  })
  console.log(`${w}x${h}`, JSON.stringify(m))
  await page.screenshot({ path: `reference/qa/wa-${w}-top.png` })
  await page.evaluate(() => window.scrollTo(0, 1400))
  await page.waitForTimeout(300)
  await page.screenshot({ path: `reference/qa/wa-${w}-scroll.png` })
  if (w === 375) {
    await page.goto(url + '#/checkout'); await page.waitForTimeout(300)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)
    await page.screenshot({ path: 'reference/qa/wa-375-checkout.png' })
  }
  await page.close()
}
await browser.close()
