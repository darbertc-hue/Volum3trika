import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { ServiceCard, QuoteCTA } from '@/components/Content';
export const metadata: Metadata = { title: 'Soluciones integrales', description: 'Obra civil, arquitectura y terminaciones, instalaciones y mantenimiento para cada tipo de proyecto.' };
export default async function Services() { const {services,settings}=await getContent();return <><section className="section"><p className="eyebrow">Nuestras soluciones</p><h1>Tres líneas de trabajo.<br/>Una visión integral.</h1><p className="copy">Identifica la solución que necesita tu espacio. Podemos coordinar varias disciplinas dentro del mismo proyecto.</p><div className="service-grid">{services.map(s=><ServiceCard key={s.slug} service={s}/>)}</div></section><QuoteCTA settings={settings}/></>; }
