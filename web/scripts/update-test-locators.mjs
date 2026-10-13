import { readFileSync,writeFileSync } from 'node:fs';
const file='tests/site.spec.ts';
let text=readFileSync(file,'utf8');
text=text.replace("await expect.poll(()=>page.evaluate(()=>Array.from(document.images).every(img=>img.complete&&img.naturalWidth>0))).toBe(true);", "for(const image of await page.getByRole('img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(el=>(el as HTMLImageElement).complete&&(el as HTMLImageElement).naturalWidth>0)).toBe(true);}await page.evaluate(()=>window.scrollTo(0,0));");
text=text.replace("page.getByLabel('Servicio',{exact:true})", "page.getByRole('combobox',{name:'Servicio',exact:true})");
text=text.replace("window.scrollTo(0,0)", "window.scrollTo({top:0,behavior:'instant'})");
writeFileSync(file,text);
