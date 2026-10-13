from pathlib import Path
from PIL import Image
import shutil

base=Path(__file__).resolve().parents[2]
dest=base/'web/public/images'
dest.mkdir(parents=True,exist_ok=True)
shutil.copyfile(base/'output/assets/volum3trika-logo.png',dest/'logo.png')
assets={'hero':('08',(460,35,1360,410)),'industrial':('08',(45,255,755,735)),'villa':('09',(750,98,1295,320)),'corporate':('10',(86,250,457,700)),'urban':('11',(740,60,1360,430))}
for name,(page,crop) in assets.items():
    image=Image.open(base/'tmp/portfolio'/f'page-{page}.png').crop(crop).convert('RGB')
    image.save(dest/f'{name}.webp',quality=88)
print('Logo e imágenes WebP preparados.')
