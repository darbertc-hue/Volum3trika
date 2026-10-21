'use client';

import { useState } from 'react';
import { ProjectCard } from './Content';
import { sectors, type Project } from '@/lib/content';

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [sector, setSector] = useState('Todos');
  const visible = projects.filter(p => sector === 'Todos' || p.sector === sector);

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrar proyectos por sector">
        {['Todos', ...sectors].map(item => {
          const count = item === 'Todos' ? projects.length : projects.filter(p => p.sector === item).length;
          return (
            <button
              key={item}
              aria-label={item}
              aria-pressed={sector === item}
              onClick={() => setSector(item)}
            >
              {item} <span className="filter-count" aria-hidden="true">({count})</span>
            </button>
          );
        })}
      </div>
      <p className="results" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'proyecto documentado' : 'proyectos documentados'}
      </p>
      <div className="project-grid">
        {visible.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {!visible.length && (
        <p className="empty">Todavía no hay proyectos publicados en este sector.</p>
      )}
    </>
  );
}
