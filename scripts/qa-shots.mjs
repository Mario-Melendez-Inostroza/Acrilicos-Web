// Uso: node scripts/qa-shots.mjs <prefijo> [url]
import { chromium } from 'playwright'

const prefix = process.argv[2] || 'despues'
const url = process.argv[3] || 'http://localhost:5199/'
const sizes = [[1920, 1080], [1440, 900], [1024, 768], [768, 1024], [375, 812]]

const browser = await chromium.launch()
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  const m = await page.evaluate(() => {
    const q = (s) => document.querySelector(s)
    const r = (el) => el && el.getBoundingClientRect()
    const h1 = q('h1')
    const range = document.createRange()
    const lines = new Set()
    h1.querySelectorAll('*').forEach(() => {})
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) {
      for (let i = 0; i < n.length; i++) {
        range.setStart(n, i); range.setEnd(n, i + 1)
        const rc = range.getBoundingClientRect()
        if (rc.width) lines.add(Math.round(rc.top))
      }
    }
    const btns = [...document.querySelectorAll('#inicio a, #inicio button')].map((b) => Math.round(r(b).bottom))
    const cs = (el, p) => getComputedStyle(el)[p]
    return {
      rootFont: cs(document.documentElement, 'fontSize'),
      zoom: cs(document.body, 'zoom'),
      header: Math.round(r(q('header')).height),
      hero: Math.round(r(q('#inicio')).height),
      container: Math.round(r(q('.container-x')).width),
      containerPad: cs(q('.container-x'), 'paddingLeft'),
      h1Font: cs(h1, 'fontSize'),
      h1Lines: lines.size,
      h1Width: Math.round(r(h1).width),
      btnBottoms: btns,
      scrollW: document.documentElement.scrollWidth,
    }
  })
  console.log(`${w}x${h}`, JSON.stringify(m))
  await page.screenshot({ path: `reference/qa/${prefix}-${w}-hero.png` })
  await page.screenshot({ path: `reference/qa/${prefix}-${w}-full.png`, fullPage: true })
  await page.close()
}
await browser.close()
