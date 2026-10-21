import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { QuoteCTA } from '@/components/Content';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce a VOLUM3TRIKA² Ingeniería y Servicios, su misión, visión y dirección técnica colegiada.'
};

function getInitials(name: string) {
  const parts = name.replace(/^(Ing\.|Lic\.|Arq\.|Dr\.)\s+/i, '').trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.[0] || 'V').toUpperCase();
}

export default async function About() {
  const { settings } = await getContent();

  return (
    <>
      <section className="section">
        <p className="eyebrow">VOLUM3TRIKA² Ingeniería y Servicios</p>
        <h1>Visión técnica.<br />Responsabilidad en cada obra.</h1>
        <p className="copy large">{settings.about}</p>

        {/* MISIÓN & VISIÓN (Slide 3 del Portafolio) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', margin: '45px 0' }}>
          <div className="mission" style={{ margin: 0 }}>
            <p className="eyebrow">Nuestra misión</p>
            <h2 style={{ fontSize: '24px' }}>{settings.mission}</h2>
          </div>
          {settings.vision && (
            <div className="mission" style={{ margin: 0, background: '#eaf4f3' }}>
              <p className="eyebrow">Nuestra visión</p>
              <h2 style={{ fontSize: '24px' }}>{settings.vision}</h2>
            </div>
          )}
        </div>

        {/* SECTORES / AUDIENCIAS (Slide 2 del Portafolio) */}
        {settings.targetAudiences && (
          <div style={{ marginBottom: '50px' }}>
            <p className="eyebrow">La base de nuestra excelencia</p>
            <h2>Adaptabilidad a cada escala</h2>
            <div className="service-grid" style={{ marginTop: '20px' }}>
              {settings.targetAudiences.map(aud => (
                <div key={aud} className="service-card" style={{ paddingTop: '15px' }}>
                  <p className="eyebrow" style={{ color: '#00afc1', marginBottom: '8px' }}>SEGMENTO CLAVE</p>
                  <h3 style={{ fontSize: '18px' }}>{aud}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* METODOLOGÍA DE EJECUCIÓN TÉCNICA */}
        <div style={{ marginBottom: '50px' }}>
          <p className="eyebrow">Garantía de calidad</p>
          <h2>Metodología de ejecución rigurosa</h2>
          <div className="service-grid" style={{ marginTop: '25px' }}>
            <div className="service-card">
              <p className="eyebrow">01 / FASE INICIAL</p>
              <h3>Planificación & BIM</h3>
              <p>Modelado 3D, coordinación interdisciplinaria y detección temprana de interferencias antes de colar el primer metro de hormigón.</p>
            </div>
            <div className="service-card">
              <p className="eyebrow">02 / ESTIMACIÓN</p>
              <h3>Ingeniería de Costos</h3>
              <p>Presupuesto cerrado desglosado por partidas, análisis de precios unitarios y cronograma de compras críticas.</p>
            </div>
            <div className="service-card">
              <p className="eyebrow">03 / CAMPO</p>
              <h3>Supervisión en Obra</h3>
              <p>Ensayos de laboratorio (resistencia de hormigón y soldadura), control diario de bitácora y normativas CODIA / MOPC.</p>
            </div>
            <div className="service-card">
              <p className="eyebrow">04 / ENTREGA</p>
              <h3>Cierre & As-Built</h3>
              <p>Pruebas hidrosanitarias/eléctricas, manual de mantenimiento de acabados, entrega de planos conforme a obra y garantía contractual.</p>
            </div>
          </div>
        </div>

        {/* SINERGIA DIRECTIVA (Slide 4 del Portafolio) */}
        <p className="eyebrow">Dirección técnica</p>
        <h2>El motor de la ejecución: Sinergia directiva.</h2>
        <div className="team-grid">
          {settings.team.map(person => (
            <article className="team-member" key={person.name}>
              <span className="team-initials" aria-hidden="true">
                {getInitials(person.name)}
              </span>
              <p className="eyebrow">{person.role}</p>
              <h3>{person.name}</h3>
              <p>{person.description}</p>
            </article>
          ))}
        </div>
      </section>

      <QuoteCTA settings={settings} />
    </>
  );
}
