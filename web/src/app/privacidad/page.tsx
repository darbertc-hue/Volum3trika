import type { Metadata } from 'next';
import { getContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacidad y Protección de Datos',
  description: 'Conoce cómo tratamos tus datos de contacto y cotización bajo la Ley 172-13 de la República Dominicana.'
};

export default async function Privacy() {
  const { settings } = await getContent();

  return (
    <section className="section prose">
      <p className="eyebrow">Marco Legal y Tratamiento de Información</p>
      <h1>Privacidad y Protección de Datos</h1>

      <h2>1. Identidad del Responsable</h2>
      <p>
        El tratamiento de sus datos de contacto y cotización está a cargo de <strong>{settings.legalName || 'VOLUM3TRIKA² INGENIERÍA Y SERVICIOS, SRL.'}</strong>, provista del <strong>RNC 133-40156-3</strong>, con domicilio legal en {settings.address}.
      </p>

      <h2>2. Tratamiento de Solicitudes de Cotización</h2>
      <p>
        Los datos recopilados mediante nuestros canales de contacto y cotización (nombre, correo electrónico, teléfono, sector de intervención, ubicación y memoria descriptiva del proyecto) son tratados exclusivamente para fines de evaluación técnica, análisis de precios unitarios (APU), formulación de propuestas económicas y seguimiento comercial directo.
      </p>
      <p>
        Dando cumplimiento a la <strong>Ley No. 172-13 sobre la Protección Integral de los Datos Personales de la República Dominicana</strong>, VOLUM3TRIKA² garantiza que sus datos no serán cedidos, comercializados ni transferidos a terceros ajenos a la ejecución o cotización de la obra contratada.
      </p>

      <h2>3. Canales de Comunicación y Terceros</h2>
      <p>
        Las comunicaciones iniciadas mediante enlaces directos a WhatsApp se rigen bajo los términos de privacidad y cifrado de extremo a extremo de dicha plataforma externa. Los envíos de formularios están protegidos contra abuso automatizado mediante validación criptográfica y no almacenan cookies invasivas de rastreo publicitario.
      </p>

      <h2>4. Ejercicio de Derechos ARCO</h2>
      <p>
        Usted tiene el derecho inalienable de acceder, rectificar, cancelar u oponerse al tratamiento de sus datos de contacto en cualquier momento. Para ejercer estos derechos, puede remitir una solicitud escrita firmada a nuestro correo institucional:{' '}
        <a href={`mailto:${settings.email}`}>{settings.email}</a> o comunicarse con nuestra directiva técnica a los teléfonos oficiales de la empresa.
      </p>

      <p className="notice">
        Cualquier modificación o actualización a este aviso de privacidad será publicada directamente en este apartado con indicación de la fecha de vigencia correspondiente.
      </p>
    </section>
  );
}
