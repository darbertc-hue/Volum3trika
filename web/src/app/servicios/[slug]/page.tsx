import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { Actions, ProjectCard, QuoteCTA } from '@/components/Content';
type Props={params:Promise<{slug:string}>};
export async function generateStaticParams() {return (await getContent()).services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const s=(await getContent()).services.find(s=>s.slug===slug);return {title:s?.title||'Solución',description:s?.description};}
export default async function ServiceDetail({params}:Props){
  const {slug}=await params;
  const {services,projects,settings}=await getContent();
  const s=services.find(s=>s.slug===slug);
  if(!s)notFound();
  const related=projects.filter(p=>p.serviceSlugs.includes(slug));
  return <>
    <section className="section detail-hero">
      <div>
        <Link href="/servicios" className="breadcrumb">← Todas las soluciones</Link>
        <p className="eyebrow">{s.number} / {s.verb}</p>
        <h1>{s.title}</h1>
        <p className="copy">{s.description}</p>
        <Actions settings={settings} service={s}/>
      </div>
      <figure className="detail-image">
        <Image
          src={s.image}
          alt={`${s.imageIsReference?'Referencia visual':'Servicio'}: ${s.title}`}
          width={900}
          height={600}
          sizes="(max-width:760px) 100vw, 50vw"
          priority
        />
        {s.imageIsReference&&<figcaption>Imagen de referencia del portafolio.</figcaption>}
      </figure>
    </section>
    <section className="section soft detail-content">
      <div>
        <p className="eyebrow">Alcance de la solución</p>
        <h2>Una intervención a la medida<br/>de tu necesidad.</h2>
        <p className="copy">{s.body}</p>
      </div>
      <ul className="scope">{s.items.map(i=><li key={i}>{i}</li>)}</ul>
    </section>
    {related.length>0&&<section className="section"><p className="eyebrow">Experiencia relacionada</p><h2>Proyectos del portafolio</h2><div className="project-grid">{related.map(p=><ProjectCard key={p.slug} project={p}/>)}</div></section>}
    <QuoteCTA settings={settings}/>
  </>;
}
