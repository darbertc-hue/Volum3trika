import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import ProjectFilter from '@/components/ProjectFilter';
import { QuoteCTA } from '@/components/Content';
export const metadata: Metadata = {title:'Proyectos',description:'Conoce el alcance de proyectos industriales, residenciales, corporativos y comerciales de VOLUM3TRIKA².'};
export default async function Projects(){const {projects,settings}=await getContent();return <><section className="section"><p className="eyebrow">Portafolio</p><h1>Espacios distintos.<br/>La misma atención al detalle.</h1><p className="copy">Explora los casos documentados en nuestro portafolio y conoce el alcance de cada intervención.</p><ProjectFilter projects={projects}/></section><QuoteCTA settings={settings}/></>;}
