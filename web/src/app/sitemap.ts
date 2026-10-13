import type { MetadataRoute } from 'next';
import { getContent, siteUrl } from '@/lib/content';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const {services,projects}=await getContent();return ['','/servicios','/proyectos','/nosotros','/contacto','/privacidad',...services.map(s=>`/servicios/${s.slug}`),...projects.map(p=>`/proyectos/${p.slug}`)].map(path=>({url:siteUrl()+path,changeFrequency:'monthly',priority:path===''?1:0.7}));}
