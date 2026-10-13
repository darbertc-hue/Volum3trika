import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
try { process.loadEnvFile('.env.local'); } catch {}
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;const token=process.env.SANITY_WRITE_TOKEN;
if(!projectId||!token)throw new Error('Configura NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_WRITE_TOKEN en .env.local.');
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2026-10-01',useCdn:false,token});
const source=JSON.parse(readFileSync('content/initial.json','utf8'));
await client.createIfNotExists({_id:'site-settings',_type:'siteSettings',...source.settings,team:source.settings.team.map((p,i)=>({_key:`person-${i}`,_type:'object',...p}))});
for(const [type,items] of [['service',source.services],['project',source.projects]]){
  for(const [i,item] of items.entries()){
    const id=`${type}-${item.slug}`;
    if(await client.getDocument(id))continue;
    const asset=await client.assets.upload('image',readFileSync(resolve('public'+item.image)),{filename:item.image.split('/').pop()});
    await client.createIfNotExists({...item,_id:id,_type:type,slug:{_type:'slug',current:item.slug},order:i,fallbackImage:item.image,image:{_type:'image',asset:{_type:'reference',_ref:asset._id}}});
  }
}
console.log('Carga inicial completada. Se conservaron los documentos existentes.');
