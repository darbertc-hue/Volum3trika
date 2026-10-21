import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { quoteSchema, verifyTurnstile } from '@/lib/quote';
import { getContent } from '@/lib/content';

export const runtime = 'nodejs';

function reply(message: string, status: number) {
  return NextResponse.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function limitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Empty');
  let total = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > 16000) {
        await reader.cancel();
        throw new Error('Large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.length;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

function generateQuoteHtml(
  q: {
    nombre: string;
    correo: string;
    telefono: string;
    empresa?: string;
    ubicacion: string;
    descripcion: string;
    requestId: string;
  },
  serviceTitle: string
) {
  const cleanPhone = q.telefono.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone.startsWith('1') ? cleanPhone : '1' + cleanPhone}?text=${encodeURIComponent(
    `Hola ${q.nombre}, le escribimos de VOLUM3TRIKA² SRL en respuesta a su solicitud de cotización para: ${serviceTitle}.`
  )}`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Nueva Cotización</title></head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d1417; color: #f0f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #141f23; border: 1px solid #273940; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #090e10; border-bottom: 2px solid #00afc1; padding: 20px 24px;">
      <h1 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: -0.5px;">
        VOLUM3TRIKA<span style="color: #00afc1;">²</span>
      </h1>
      <p style="margin: 4px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #82979e;">
        Solicitud de Cotización · Portal Web
      </p>
    </div>
    <div style="padding: 24px;">
      <p style="margin: 0 0 16px; font-size: 14px; color: #b5cbcf;">
        Se ha recibido un nuevo requerimiento de obra a través del portal oficial:
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #1f2e34;">
          <td style="padding: 10px 0; color: #7e949c; width: 130px; font-weight: bold;">Cliente:</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${q.nombre}</td>
        </tr>
        <tr style="border-bottom: 1px solid #1f2e34;">
          <td style="padding: 10px 0; color: #7e949c; font-weight: bold;">Empresa:</td>
          <td style="padding: 10px 0; color: #ffffff;">${q.empresa || 'Particular'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #1f2e34;">
          <td style="padding: 10px 0; color: #7e949c; font-weight: bold;">Teléfono:</td>
          <td style="padding: 10px 0; color: #00afc1;">
            <a href="tel:${q.telefono}" style="color: #00afc1; text-decoration: none; font-weight: bold;">${q.telefono}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #1f2e34;">
          <td style="padding: 10px 0; color: #7e949c; font-weight: bold;">Correo:</td>
          <td style="padding: 10px 0; color: #ffffff;">
            <a href="mailto:${q.correo}" style="color: #00afc1; text-decoration: none;">${q.correo}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #1f2e34;">
          <td style="padding: 10px 0; color: #7e949c; font-weight: bold;">Solución:</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${serviceTitle}</td>
        </tr>
        <tr style="border-bottom: 1px solid #1f2e34;">
          <td style="padding: 10px 0; color: #7e949c; font-weight: bold;">Ubicación:</td>
          <td style="padding: 10px 0; color: #ffffff;">${q.ubicacion}</td>
        </tr>
      </table>
      <div style="margin-top: 15px;">
        <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #82979e; font-weight: bold;">
          Memoria / Alcance Descriptivo:
        </p>
        <div style="background-color: #0d1417; border-left: 3px solid #00afc1; padding: 14px; border-radius: 4px; font-size: 13px; color: #d0e0e3; line-height: 1.6; white-space: pre-wrap;">${q.descripcion}</div>
      </div>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1f2e34; text-align: center;">
        <a href="${waUrl}" style="display: inline-block; padding: 12px 24px; background-color: #059669; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 13px;">
          Responder por WhatsApp al Cliente ↗
        </a>
      </div>
    </div>
    <div style="background-color: #090e10; padding: 12px 24px; border-top: 1px solid #1f2e34; font-size: 11px; color: #52676e; font-family: monospace;">
      ID de Radicado: ${q.requestId} · Ley 172-13 RD
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  const requestOrigin = host ? `${request.nextUrl.protocol}//${host}` : request.nextUrl.origin;
  const accepted = [requestOrigin, process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean);

  if (!origin || !accepted.includes(origin)) {
    return reply('Origen de solicitud no permitido.', 403);
  }

  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return reply('Formato de solicitud no permitido.', 415);
  }

  let body: unknown;
  try {
    body = await limitedBody(request);
  } catch {
    return reply('La solicitud no es válida o supera el tamaño permitido.', 400);
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return reply('Revisa los campos obligatorios, el correo y la descripción del proyecto.', 400);
  }

  const q = parsed.data;
  if (q.website) {
    return reply('No se pudo validar la solicitud.', 400);
  }

  const { services } = await getContent();
  const service = services.find(s => s.slug === q.servicio);
  if (!service && q.servicio !== 'solucion-integral') {
    return reply('Selecciona un servicio válido.', 400);
  }

  if (!process.env.RESEND_API_KEY || !process.env.QUOTE_FROM_EMAIL || !process.env.QUOTE_TO_EMAIL) {
    return reply('El formulario aún no está activo. Contáctanos por WhatsApp o correo.', 503);
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (
    process.env.NODE_ENV === 'production' &&
    (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  ) {
    return reply('La verificación del formulario aún no está configurada. Usa WhatsApp.', 503);
  }

  if (secret && !(await verifyTurnstile(secret, q.turnstileToken))) {
    return reply('Completa nuevamente la verificación antes de enviar.', 400);
  }

  const serviceTitle = service?.title || 'Solución integral';

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send(
      {
        from: process.env.QUOTE_FROM_EMAIL,
        to: process.env.QUOTE_TO_EMAIL,
        replyTo: q.correo,
        subject: `Nueva Cotización: ${q.nombre} — ${serviceTitle}`,
        text: `Nombre: ${q.nombre}\nCorreo: ${q.correo}\nTeléfono: ${q.telefono}\nEmpresa: ${
          q.empresa || 'Particular'
        }\nServicio: ${serviceTitle}\nUbicación: ${q.ubicacion}\n\n${
          q.descripcion
        }\n\nConsentimiento de contacto: aceptado.\nRadicado: ${q.requestId}`,
        html: generateQuoteHtml(q, serviceTitle)
      },
      { idempotencyKey: `quote/${q.requestId}` }
    );

    if (result.error) {
      return reply('No se pudo recibir la solicitud. Intenta de nuevo o usa WhatsApp.', 502);
    }

    return reply(
      'Tu solicitud fue enviada exitosamente al equipo técnico. Nos comunicaremos contigo en breve.',
      200
    );
  } catch {
    return reply('No se pudo enviar la solicitud. Intenta de nuevo o usa WhatsApp.', 502);
  }
}
