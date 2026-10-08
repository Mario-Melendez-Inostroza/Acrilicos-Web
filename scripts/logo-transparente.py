# Genera un logo con fondo transparente: alfa = luminancia máxima del píxel sobre negro,
# color des-premultiplicado (el dibujo y los colores se conservan). Recorta el margen vacío.
import sys
import numpy as np
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
rgb = np.asarray(Image.open(src).convert('RGB')).astype(np.float64)
alpha = rgb.max(axis=2)
alpha = np.where(alpha < 6, 0, alpha)  # ruido de compresión JPEG
safe = np.maximum(alpha, 1)[..., None]
color = np.clip(rgb / safe * 255, 0, 255)
out = np.dstack([color, alpha]).astype(np.uint8)
img = Image.fromarray(out, 'RGBA')
box = img.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox()
pad = 8
box = (max(box[0]-pad,0), max(box[1]-pad,0), min(box[2]+pad,img.width), min(box[3]+pad,img.height))
img.crop(box).save(dst)
print(img.size, '->', img.crop(box).size)
