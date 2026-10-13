import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { QuoteCTA } from '@/components/Content';
type Props={params:Promise<{slug:string}>};
export async function generateStaticParams(){return (await getContent()).projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=(await getContent()).projects.find(p=>p.slug===slug);return {title:p?.title||'Proyecto',description:p?.summary};}
export default async function Project({params}:Props){const {slug}=await params;const {projects,services,settings}=await getContent();const p=projects.find(p=>p.slug===slug);if(!p)notFound();return <><section className="section"><Link className="breadcrumb" href="/proyectos">← Todos los proyectos</Link><p className="eyebrow">{p.sector}{p.location?` · ${p.location}`:''}</p><h1>{p.title}</h1><p className="copy">{p.summary}</p><figure className="case-image"><Image src={p.image} alt={`${p.imageIsReference?'Referencia visual':'Proyecto'}: ${p.title}`} width={1200} height={700} sizes="100vw" priority/>{p.imageIsReference&&<figcaption>Imagen de referencia incluida en el portafolio corporativo; pendiente de validar la fotografía original de la obra.</figcaption>}</figure><div className="detail-content"><div><p className="eyebrow">Qué se realizó</p><h2>Alcance de la intervención</h2><p className="copy">Descripción basada en el portafolio corporativo de VOLUM3TRIKA².</p></div><ul className="scope">{p.scope.map(i=><li key={i}>{i}</li>)}</ul></div><div className="related-links">{services.filter(s=>p.serviceSlugs.includes(s.slug)).map(s=><Link className="text-link" key={s.slug} href={`/servicios/${s.slug}`}>{s.title} ↗</Link>)}</div></section><QuoteCTA settings={settings}/></>;}
