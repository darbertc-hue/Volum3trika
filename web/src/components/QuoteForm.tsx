'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { track } from './Analytics';
declare global { interface Window { turnstile?: { render:(el:HTMLElement,options:Record<string,unknown>)=>string; remove:(id:string)=>void; reset:(id:string)=>void }; } }
export default function QuoteForm({services,initialService,enabled}: {services:{slug:string;title:string}[];initialService:string;enabled:boolean}) {
  const sitekey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [token,setToken]=useState(''); const [busy,setBusy]=useState(false); const [result,setResult]=useState<{ok:boolean;message:string}|null>(null);
  const captcha=useRef<HTMLDivElement>(null);const widget=useRef<string|null>(null);const requestId=useRef('');const [captchaReady,setCaptchaReady]=useState(false);
  useEffect(()=>{requestId.current=crypto.randomUUID();},[]);
  useEffect(()=>{if(!sitekey||!captchaReady||!window.turnstile||!captcha.current)return;widget.current=window.turnstile.render(captcha.current,{sitekey,callback:(t:string)=>setToken(t),'expired-callback':()=>setToken(''),'error-callback':()=>{setToken('');setResult({ok:false,message:'No se pudo completar la verificación. Recarga la página o usa WhatsApp.'})}});return()=>{if(widget.current){window.turnstile?.remove(widget.current);widget.current=null}};},[sitekey,captchaReady]);
  async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();if(busy)return;setBusy(true);setResult(null);const form=event.currentTarget;const data=Object.fromEntries(new FormData(form));try{const response=await fetch('/api/cotizaciones',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,turnstileToken:token,requestId:requestId.current})});const payload=await response.json();setResult({ok:response.ok,message:payload.message||'No se pudo enviar la solicitud.'});if(response.ok){track('quote_submitted',{service:String(data.servicio)});form.reset();requestId.current=crypto.randomUUID();}}catch{setResult({ok:false,message:'No pudimos conectar. Intenta nuevamente o comunícate por WhatsApp.'})}finally{setBusy(false);setToken('');if(widget.current)window.turnstile?.reset(widget.current);}}
  return <form className="quote-form" onSubmit={submit} onChange={()=>{if(result)setResult(null)}}>
    {!enabled&&<p className="notice full">La recepción de solicitudes por formulario aún no está activa. Puedes contactarnos ahora por WhatsApp, teléfono o correo.</p>}
    <label>Nombre<input name="nombre" required maxLength={100} autoComplete="name"/></label><label>Correo electrónico<input name="correo" type="email" required maxLength={254} autoComplete="email"/></label>
    <label>Teléfono<input name="telefono" type="tel" required maxLength={30} autoComplete="tel"/></label><label>Empresa (opcional)<input name="empresa" maxLength={120} autoComplete="organization"/></label>
    <label className="full">Servicio<select name="servicio" required defaultValue={initialService}><option value="">Selecciona una solución</option>{services.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}<option value="solucion-integral">Solución integral</option></select></label>
    <label className="full">Ubicación del proyecto<input name="ubicacion" required maxLength={150}/></label><label className="full">Descripción del proyecto<textarea name="descripcion" required minLength={10} maxLength={2000}/></label>
    <label className="honeypot" aria-hidden="true">Website<input name="website" autoComplete="off" tabIndex={-1}/></label>
    <label className="checkbox full"><input name="consentimiento" type="checkbox" required value="yes"/><span>Acepto que mis datos se utilicen para responder a esta consulta. <Link href="/privacidad">Ver privacidad</Link>.</span></label>
    {sitekey&&<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setCaptchaReady(true)}/><div className="full" ref={captcha}/></>}
    <button className="button full" disabled={!enabled||busy||!!sitekey&&!token} type="submit">{busy?'Enviando…':'Enviar solicitud de cotización ↗'}</button>
    {result&&<p className={`full ${result.ok?'form-success':'form-error'}`} role={result.ok?'status':'alert'}>{result.message}</p>}
  </form>;
}
