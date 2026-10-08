# Recorta las 9 planchas del catálogo Lamicoid (grilla 3x3) sin el círculo de detalle ni el texto.
import sys
from PIL import Image, ImageDraw, ImageChops

src, outdir = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
COLS, ROWS = [30, 537, 1044], [12, 352, 692]
NAMES = [
    ['negro-sobre-blanco', 'amarillo-sobre-negro', 'rojo-sobre-blanco'],
    ['azul-sobre-blanco', 'blanco-sobre-negro', 'verde-sobre-blanco'],
    ['dorado-brush', 'plateado-brush', 'cobre-sobre-negro'],
]
W, H = 480, 205   # alto: antes del título "LAMICOID"
for r in range(3):
    for c in range(3):
        crop = im.crop((COLS[c] - 8, ROWS[r], COLS[c] - 8 + W, ROWS[r] + H)).copy()
        # tapa el círculo de detalle (esquina inferior derecha) con el fondo blanco
        ImageDraw.Draw(crop).ellipse((326, 128, 540, 320), fill=(255, 255, 255))
        # recorta el margen blanco sobrante
        diff = ImageChops.difference(crop, Image.new('RGB', crop.size, (255, 255, 255))).convert('L').point(lambda v: 255 if v > 14 else 0)
        l, t, rr, b = diff.getbbox()
        pad = 6
        crop = crop.crop((max(l - pad, 0), max(t - pad, 0), min(rr + pad, W), min(b + pad, H)))
        crop.save(f'{outdir}/lamicoid-{NAMES[r][c]}.png')
        print(NAMES[r][c], crop.size)
