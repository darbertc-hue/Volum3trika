'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; } }
export function track(name: 'whatsapp_click' | 'quote_submitted' | 'estimator_click', detail: Record<string,string> = {}) {
  window.dispatchEvent(new CustomEvent('volum3trika:conversion', { detail: { event: name, ...detail } }));
  if (window.gtag && localStorage.getItem('v3-analytics-consent') === 'yes') window.gtag('event', name, detail);
}
export function TrackedWhatsApp({ href, children, className = 'button outline' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')}>{children}</a>;
}
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState<string | null>(null);
  useEffect(() => { setConsent(localStorage.getItem('v3-analytics-consent')); }, []);
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;
  if (consent === 'yes') return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive"/><Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}</Script></>;
  if (consent === 'no') return null;
  function choose(value: string) { localStorage.setItem('v3-analytics-consent', value); setConsent(value); }
  return <aside className="consent" aria-label="Preferencias de analítica"><p>¿Permites analítica opcional para mejorar la experiencia? <a href="/privacidad">Ver privacidad</a></p><button className="button" onClick={()=>choose('yes')}>Aceptar</button><button className="button outline" onClick={()=>choose('no')}>Rechazar</button></aside>;
}
