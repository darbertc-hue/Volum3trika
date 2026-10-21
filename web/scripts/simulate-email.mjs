import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const samplePayload = {
  nombre: 'Lic. Roberto Morales',
  correo: 'rmorales@grupologistico.do',
  telefono: '809-555-0199',
  empresa: 'Logística & Distribución del Caribe, SAS',
  servicio: 'Estructura y obra civil',
  ubicacion: 'Autopista Duarte KM 24, Santo Domingo Oeste',
  descripcion:
    'Requerimos cotización preliminar para la construcción de una nave de almacenamiento en seco de 1,800 m², con losa de alta resistencia para montacargas y estructura metálica apernada. Deseamos visita técnica para levantamiento la próxima semana.',
  requestId: 'e4b162ca-9912-4f3b-b291-a18921bf1082'
};

function generateHtml(q) {
  const cleanPhone = q.telefono.replace(/\D/g, '');
  const waUrl = `https://wa.me/1${cleanPhone}?text=${encodeURIComponent(
    `Hola ${q.nombre}, le contactamos de VOLUM3TRIKA² en respuesta a su solicitud de cotización.`
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
          <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${q.servicio}</td>
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

const html = generateHtml(samplePayload);
const outDir = path.resolve(__dirname, '../test-results');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'simulated-quote-email.html');
fs.writeFileSync(outPath, html, 'utf-8');

console.log('✓ Simulación de correo de cotización generada exitosamente:');
console.log(`  Archivo: ${outPath}`);
console.log('  Puedes abrir este archivo HTML en tu navegador para previsualizar la plantilla que recibirá la directiva.');
