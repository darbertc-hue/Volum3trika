import type { Metadata } from 'next';
import { getContent, whatsappUrl } from '@/lib/content';
import { TrackedWhatsApp } from '@/components/Analytics';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Solicitar cotización',
  description: 'Cuéntanos sobre tu proyecto o conversa con VOLUM3TRIKA² por WhatsApp.'
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio } = await searchParams;
  const { settings, services } = await getContent();
  const initial = services.some(s => s.slug === servicio) ? servicio || '' : '';
  const ready = !!(
    process.env.RESEND_API_KEY &&
    process.env.QUOTE_FROM_EMAIL &&
    process.env.QUOTE_TO_EMAIL &&
    (process.env.NODE_ENV !== 'production' ||
      (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY))
  );

  const phoneDigits = settings.phone.replace(/\D/g, '');

  return (
    <section className="section">
      <p className="eyebrow">Hablemos de tu proyecto</p>
      <h1>La siguiente obra<br />comienza con una conversación.</h1>
      <p className="copy">
        Elige cómo prefieres contactarnos. Comparte el servicio, la ubicación y una descripción de lo que necesitas.
      </p>

      <div className="contact-grid">
        <div>
          <h2>Solicitar cotización</h2>
          <QuoteForm
            services={services.map(s => ({ slug: s.slug, title: s.title }))}
            initialService={initial}
            enabled={ready}
          />
        </div>

        <aside className="contact-side">
          <p className="eyebrow">Atención directa</p>
          <h2>¿Prefieres WhatsApp?</h2>
          <p>
            Abre una conversación con el equipo y cuéntanos sobre tu proyecto. El mensaje se prepara para que puedas revisarlo antes de enviarlo.
          </p>
          <TrackedWhatsApp className="button" href={whatsappUrl(settings)}>
            Conversar por WhatsApp ↗
          </TrackedWhatsApp>

          <dl>
            <dt>Líneas Telefónicas</dt>
            <dd>
              <a href={`tel:+${phoneDigits.length === 10 ? '1' : ''}${phoneDigits}`}>
                {settings.phone} (Principal / WhatsApp)
              </a>
            </dd>
            {settings.additionalPhones?.map(p => {
              const digits = p.replace(/\D/g, '');
              return (
                <dd key={p}>
                  <a href={`tel:+${digits.length === 10 ? '1' : ''}${digits}`}>
                    {p}
                  </a>
                </dd>
              );
            })}

            <dt>Correos de Proyectos</dt>
            <dd>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </dd>
            {settings.directorEmails?.map(m => (
              <dd key={m} style={{ fontSize: '12px', color: 'var(--muted)' }}>
                <a href={`mailto:${m}`}>{m}</a>
              </dd>
            ))}

            <dt>Oficina Técnica</dt>
            <dd>{settings.address}</dd>
          </dl>
        </aside>
      </div>
    </section>
  );
}
