'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { track } from './Analytics';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}

export default function QuoteForm({
  services,
  initialService,
  enabled
}: {
  services: { slug: string; title: string }[];
  initialService: string;
  enabled: boolean;
}) {
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const captcha = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const requestId = useRef('');
  const [captchaReady, setCaptchaReady] = useState(false);

  useEffect(() => {
    requestId.current = crypto.randomUUID();
  }, []);

  useEffect(() => {
    if (!sitekey || !captchaReady || !window.turnstile || !captcha.current) return;
    widget.current = window.turnstile.render(captcha.current, {
      sitekey,
      callback: (t: string) => setToken(t),
      'expired-callback': () => setToken(''),
      'error-callback': () => {
        setToken('');
        setResult({
          ok: false,
          message: 'No se pudo completar la verificación. Recarga la página o usa WhatsApp.'
        });
      }
    });
    return () => {
      if (widget.current) {
        window.turnstile?.remove(widget.current);
        widget.current = null;
      }
    };
  }, [sitekey, captchaReady]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setResult(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken: token, requestId: requestId.current })
      });
      const payload = await response.json();
      setResult({ ok: response.ok, message: payload.message || 'No se pudo enviar la solicitud.' });
      if (response.ok) {
        track('quote_submitted', { service: String(data.servicio) });
        form.reset();
        requestId.current = crypto.randomUUID();
      }
    } catch {
      setResult({
        ok: false,
        message: 'No pudimos conectar. Intenta nuevamente o comunícate por WhatsApp.'
      });
    } finally {
      setBusy(false);
      setToken('');
      if (widget.current) window.turnstile?.reset(widget.current);
    }
  }

  function handleOpenWhatsApp() {
    const form = document.querySelector<HTMLFormElement>('.quote-form');
    if (!form) return;
    const formData = new FormData(form);
    const nombre = formData.get('nombre')?.toString() || 'Cliente';
    const servicio = formData.get('servicio')?.toString() || 'Solución integral';
    const ubicacion = formData.get('ubicacion')?.toString() || 'Por definir';
    const desc = formData.get('descripcion')?.toString() || 'Solicito cotización de obra.';

    const text = `Hola, VOLUM3TRIKA² SRL. Mi nombre es ${nombre}. Deseo cotizar: ${servicio} en ${ubicacion}.\n\nDetalle: ${desc}`;
    window.open(`https://wa.me/18093898022?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      className="quote-form"
      onSubmit={submit}
      onChange={() => {
        if (result) setResult(null);
      }}
    >
      {!enabled && (
        <p className="notice full">
          La recepción de solicitudes por formulario aún no está activa. Puedes contactarnos ahora por WhatsApp, teléfono o correo.
        </p>
      )}

      <label htmlFor="quote-nombre">
        Nombre <span aria-hidden="true">*</span>
        <input id="quote-nombre" name="nombre" aria-label="Nombre" required maxLength={100} autoComplete="name" disabled={!enabled} />
      </label>

      <label htmlFor="quote-correo">
        Correo electrónico <span aria-hidden="true">*</span>
        <input id="quote-correo" name="correo" type="email" aria-label="Correo electrónico" required maxLength={254} autoComplete="email" disabled={!enabled} />
      </label>

      <label htmlFor="quote-telefono">
        Teléfono <span aria-hidden="true">*</span>
        <input id="quote-telefono" name="telefono" type="tel" aria-label="Teléfono" required maxLength={30} autoComplete="tel" placeholder="809-000-0000" disabled={!enabled} />
      </label>

      <label htmlFor="quote-empresa">
        Empresa (opcional)
        <input id="quote-empresa" name="empresa" maxLength={120} autoComplete="organization" disabled={!enabled} />
      </label>

      <label htmlFor="quote-servicio" className="full">
        Servicio <span aria-hidden="true">*</span>
        <select id="quote-servicio" name="servicio" aria-label="Servicio" required defaultValue={initialService} disabled={!enabled}>
          <option value="">Selecciona una solución</option>
          {services.map(s => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="solucion-integral">Solución integral</option>
        </select>
      </label>

      <label htmlFor="quote-ubicacion" className="full">
        Ubicación del proyecto <span aria-hidden="true">*</span>
        <input id="quote-ubicacion" name="ubicacion" aria-label="Ubicación del proyecto" required maxLength={150} placeholder="Ej. Autopista Duarte KM 22 / Piantini" disabled={!enabled} />
      </label>

      <label htmlFor="quote-descripcion" className="full">
        Descripción del proyecto <span aria-hidden="true">*</span>
        <textarea
          id="quote-descripcion"
          name="descripcion"
          aria-label="Descripción del proyecto"
          required
          minLength={10}
          maxLength={2000}
          placeholder="Describe el alcance, metrajes aproximados o fecha límite..."
          disabled={!enabled}
        />
      </label>

      <label className="honeypot" aria-hidden="true" htmlFor="quote-website">
        Website
        <input id="quote-website" name="website" autoComplete="off" tabIndex={-1} />
      </label>

      <label className="checkbox full" htmlFor="quote-consentimiento">
        <input id="quote-consentimiento" name="consentimiento" type="checkbox" required value="yes" disabled={!enabled} />
        <span>
          Acepto que mis datos se utilicen para responder a esta consulta.{' '}
          <Link href="/privacidad">Ver privacidad</Link>.
        </span>
      </label>

      {sitekey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={() => setCaptchaReady(true)}
          />
          <div className="full" ref={captcha} />
        </>
      )}

      <div className="full actions" style={{ margin: 0 }}>
        <button
          className="button"
          style={{ flex: '1 1 240px' }}
          disabled={!enabled || busy || (!!sitekey && !token)}
          type="submit"
        >
          {busy ? 'Enviando…' : 'Enviar solicitud de cotización ↗'}
        </button>

        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="button outline"
          style={{ flex: '1 1 200px' }}
        >
          Enviar vía WhatsApp ↗
        </button>
      </div>

      {result && (
        <p
          className={`full ${result.ok ? 'form-success' : 'form-error'}`}
          role={result.ok ? 'status' : 'alert'}
        >
          {result.message}
        </p>
      )}
    </form>
  );
}
