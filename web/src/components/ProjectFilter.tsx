'use client';
import { useState } from 'react';
import { ProjectCard } from './Content';
import { sectors, type Project } from '@/lib/content';
export default function ProjectFilter({projects}: {projects: Project[]}) {
  const [sector,setSector]=useState('Todos'); const visible=projects.filter(p=>sector==='Todos'||p.sector===sector);
  return <><div className="filters" role="group" aria-label="Filtrar proyectos por sector">{['Todos',...sectors].map(item=><button key={item} aria-pressed={sector===item} onClick={()=>setSector(item)}>{item}</button>)}</div><p className="results" aria-live="polite">{visible.length} {visible.length===1?'proyecto':'proyectos'}</p><div className="project-grid">{visible.map(project=><ProjectCard key={project.slug} project={project}/>)}</div>{!visible.length&&<p className="empty">Todavía no hay proyectos publicados en este sector.</p>}</>;
}
