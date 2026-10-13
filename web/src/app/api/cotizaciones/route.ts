import { NextRequest,NextResponse } from 'next/server';
import { Resend } from 'resend';
import { quoteSchema,verifyTurnstile } from '@/lib/quote';
import { getContent } from '@/lib/content';
export const runtime='nodejs';
function reply(message:string,status:number){return NextResponse.json({message},{status,headers:{'Cache-Control':'no-store'}});}
async function limitedBody(request:Request){const reader=request.body?.getReader();if(!reader)throw new Error('Empty');let total=0;const chunks:Uint8Array[]=[];try{while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>16000){await reader.cancel();throw new Error('Large')}chunks.push(value)}}finally{reader.releaseLock()}const bytes=new Uint8Array(total);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length}return JSON.parse(new TextDecoder().decode(bytes));}
export async function POST(request:NextRequest){
  const origin=request.headers.get('origin');
  const host=request.headers.get('host');
  const requestOrigin=host?`${request.nextUrl.protocol}//${host}`:request.nextUrl.origin;
  const accepted=[requestOrigin,process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean);
  if(!origin||!accepted.includes(origin))return reply('Origen de solicitud no permitido.',403);
  if(!request.headers.get('content-type')?.startsWith('application/json'))return reply('Formato de solicitud no permitido.',415);
  let body:unknown;try{body=await limitedBody(request)}catch{return reply('La solicitud no es válida o supera el tamaño permitido.',400)}
  const parsed=quoteSchema.safeParse(body);if(!parsed.success)return reply('Revisa los campos obligatorios, el correo y la descripción del proyecto.',400);
  const q=parsed.data;if(q.website)return reply('No se pudo validar la solicitud.',400);
  const {services}=await getContent();const service=services.find(s=>s.slug===q.servicio);if(!service&&q.servicio!=='solucion-integral')return reply('Selecciona un servicio válido.',400);
  if(!process.env.RESEND_API_KEY||!process.env.QUOTE_FROM_EMAIL||!process.env.QUOTE_TO_EMAIL)return reply('El formulario aún no está activo. Contáctanos por WhatsApp o correo.',503);
  const secret=process.env.TURNSTILE_SECRET_KEY;
  if(process.env.NODE_ENV==='production'&&(!secret||!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY))return reply('La verificación del formulario aún no está configurada. Usa WhatsApp.',503);
  if(secret&&!await verifyTurnstile(secret,q.turnstileToken))return reply('Completa nuevamente la verificación antes de enviar.',400);
  try{const resend=new Resend(process.env.RESEND_API_KEY);const result=await resend.emails.send({from:process.env.QUOTE_FROM_EMAIL,to:process.env.QUOTE_TO_EMAIL,replyTo:q.correo,subject:'Solicitud de cotización — VOLUM3TRIKA²',text:`Nombre: ${q.nombre}\nCorreo: ${q.correo}\nTeléfono: ${q.telefono}\nEmpresa: ${q.empresa||'No indicada'}\nServicio: ${service?.title||'Solución integral'}\nUbicación: ${q.ubicacion}\n\n${q.descripcion}\n\nConsentimiento de contacto: aceptado.`},{idempotencyKey:`quote/${q.requestId}`});if(result.error)return reply('No se pudo recibir la solicitud. Intenta de nuevo o usa WhatsApp.',502);return reply('Tu solicitud fue aceptada para envío al equipo. Nos comunicaremos contigo para revisar el alcance.',200)}catch{return reply('No se pudo enviar la solicitud. Intenta de nuevo o usa WhatsApp.',502)}
}
