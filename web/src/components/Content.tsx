import Image from 'next/image';
import Link from 'next/link';
import type { Project, Service, Settings } from '@/lib/content';
import { whatsappUrl } from '@/lib/content';
import { TrackedWhatsApp } from './Analytics';

export function Actions({ settings, service }: { settings: Settings; service?: Service }) {
  return (
    <div className="actions">
      <Link className="button" href={service ? `/contacto?servicio=${service.slug}` : '/contacto'}>
        Solicitar cotización ↗
      </Link>
      <TrackedWhatsApp href={whatsappUrl(settings, service?.title)}>
        Cotizar por WhatsApp ↗
      </TrackedWhatsApp>
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <p className="eyebrow">{service.number} / {service.verb}</p>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul>
        {service.items.slice(0, 3).map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href={`/servicios/${service.slug}`} className="text-link">
        Explorar solución ↗
      </Link>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link href={`/proyectos/${project.slug}`}>
        <div className="project-image">
          <Image
            src={project.image}
            alt={`${project.imageIsReference ? 'Referencia visual' : 'Proyecto'}: ${project.title}`}
            width={900}
            height={600}
            sizes="(max-width: 650px) 100vw, 50vw"
          />
          {project.imageIsReference && <span className="image-label">Imagen de referencia</span>}
        </div>
        <div className="project-body">
          <p className="eyebrow">{project.sector}{project.location ? ` · ${project.location}` : ''}</p>
          <h3>{project.title} <span aria-hidden="true">↗</span></h3>
          <p>{project.summary}</p>
          {project.impact && (
            <p className="project-impact">
              <strong>Impacto:</strong> {project.impact}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

export function QuoteCTA({ settings }: { settings: Settings }) {
  return (
    <section className="quote-cta section">
      <div>
        <p className="eyebrow">Hablemos de tu proyecto</p>
        <h2>Construyamos el futuro<br />de tu infraestructura.</h2>
      </div>
      <div className="actions">
        <Link className="button" href="/contacto">Iniciar cotización ↗</Link>
        <TrackedWhatsApp href={whatsappUrl(settings)}>Cotizar por WhatsApp ↗</TrackedWhatsApp>
      </div>
    </section>
  );
}
