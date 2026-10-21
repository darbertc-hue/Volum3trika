import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/content';
import { Actions, ServiceCard, ProjectCard, QuoteCTA } from '@/components/Content';
import Estimator from '@/components/Estimator';

export default async function Home() {
  const { settings, services, projects } = await getContent();

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Ingeniería · Construcción · Mantenimiento</p>
          <h1>{settings.heroTitle}</h1>
          <p className="lead">{settings.heroDescription}</p>
          <Actions settings={settings} />
          <Link className="hero-more" href="/proyectos">Explora nuestra huella ↓</Link>
        </div>
        <div className="hero-media">
          <Image
            src="/images/hero.webp"
            alt="Referencia industrial del portafolio corporativo"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span className="image-label">Imagen de referencia del portafolio</span>
          <div className="hero-caption">
            <span>VOLUM3TRIKA²</span>
            <strong>Visión técnica.<br />Atención al detalle.</strong>
          </div>
        </div>
      </section>

      {/* FRANJA DE INDICADORES / KPIS (Slide 2 y 4 del Portafolio) */}
      <div className="kpi-strip" aria-label="Indicadores de capacidad y trayectoria">
        <div className="kpi-item">
          <strong>+15 Años</strong>
          <span>Trayectoria Directiva Colegiada</span>
        </div>
        <div className="kpi-item">
          <strong>2,400+ m²</strong>
          <span>Naves Industriales y Logísticas</span>
        </div>
        <div className="kpi-item">
          <strong>14 Niveles</strong>
          <span>Torres Corporativas con Sismo-Resistencia</span>
        </div>
        <div className="kpi-item">
          <strong>33+ Unidades</strong>
          <span>Villas y Residencias de Alta Gama</span>
        </div>
      </div>

      {/* SECTORES Y AUDIENCIAS ESTRATÉGICAS (Slide 2 del Portafolio) */}
      <div className="sectors">
        <strong>Soluciones para cada entorno</strong>
        <span>Empresas e Industrias</span>
        <span>Desarrolladores Inmobiliarios</span>
        <span>Instituciones Públicas</span>
        <span>Clientes Particulares</span>
      </div>

      {/* CATÁLOGO DE INGENIERÍA (Slide 5 del Portafolio) */}
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Qué hacemos</p>
            <h2>La solución completa.<br />El detalle que hace la diferencia.</h2>
          </div>
          <p>Integramos las disciplinas que necesita tu proyecto, desde la estructura hasta las terminaciones.</p>
        </div>
        <div className="service-grid">
          {services.map(s => (
            <ServiceCard service={s} key={s.slug} />
          ))}
        </div>
      </section>

      {/* ESPECIALIDAD LOGÍSTICA & RETAIL (Slide 6 del Portafolio) */}
      {settings.retailLogistics && (
        <section className="section bg-[#10191d] text-white border-y border-[#213137]">
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ color: '#00afc1' }}>ESPECIALIDAD DEL PORTAFOLIO</p>
              <h2>{settings.retailLogistics.title}</h2>
            </div>
            <p style={{ color: '#8ca0a7' }}>{settings.retailLogistics.description}</p>
          </div>
          <div className="service-grid" style={{ marginTop: '25px' }}>
            {settings.retailLogistics.pillars.map((pillar, idx) => (
              <div key={pillar.name} className="service-card" style={{ borderColor: '#00afc1' }}>
                <p className="eyebrow" style={{ color: '#00afc1' }}>0{idx + 1} / PILAR LOGÍSTICO</p>
                <h3 style={{ color: '#ffffff' }}>{pillar.name}</h3>
                <p style={{ color: '#9cb0b6' }}>{pillar.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ESTIMADOR INTERACTIVO 2.0 */}
      <Estimator whatsappNumber={settings.whatsapp} />

      {/* CASOS DOCUMENTADOS / PORTAFOLIO (Slides 7 a 11) */}
      <section className="section soft">
        <div className="section-head">
          <div>
            <p className="eyebrow">Nuestra huella</p>
            <h2>Del plano a la realidad.</h2>
          </div>
          <Link className="text-link" href="/proyectos">Explorar todos los proyectos ↗</Link>
        </div>
        <div className="project-grid">
          {projects.filter(p => p.featured).slice(0, 4).map(p => (
            <ProjectCard project={p} key={p.slug} />
          ))}
        </div>
      </section>

      {/* SINERGIA DIRECTIVA (Slide 4 del Portafolio) */}
      <section className="section about-strip">
        <div>
          <p className="eyebrow">Ingeniería con propósito</p>
          <h2>Un equipo que integra<br />visión y ejecución.</h2>
          <p className="copy">{settings.about}</p>
          <Link className="text-link" href="/nosotros">Conoce nuestra dirección técnica ↗</Link>
        </div>
        <div className="blueprint" aria-hidden="true">
          <div />
          <span>V²</span>
        </div>
      </section>

      <QuoteCTA settings={settings} />
    </>
  );
}
