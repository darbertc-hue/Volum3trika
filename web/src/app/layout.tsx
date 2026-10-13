import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Analytics from '@/components/Analytics';
import { getContent, siteUrl } from '@/lib/content';
import './globals.css';
export const metadata: Metadata = { metadataBase: new URL(siteUrl()), title: { default: 'VOLUM3TRIKA² | Ingeniería, construcción y mantenimiento', template: '%s | VOLUM3TRIKA²' }, description: 'Soluciones integrales de obra civil, terminaciones, instalaciones y mantenimiento en República Dominicana.', openGraph: { locale: 'es_DO', type: 'website', siteName: 'VOLUM3TRIKA²', images: [{ url: '/images/hero.webp', width: 900, height: 375, alt: 'VOLUM3TRIKA² Ingeniería y Servicios' }] } };
export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {settings}=await getContent();
  return <html lang="es-DO"><body><a className="skip" href="#main">Ir al contenido</a><Header/><main id="main">{children}</main><footer className="footer"><div><Link href="/"><Image className="logo" src="/images/logo.png" alt="VOLUM3TRIKA² Ingeniería y Servicios" width={367} height={175}/></Link><p>Ingeniería, construcción y mantenimiento.</p></div><div><p className="eyebrow">Contacto</p><a href={`tel:+${settings.phone.replace(/\D/g,'').length===10?'1':''}${settings.phone.replace(/\D/g,'')}`}>{settings.phone}</a><a href={`mailto:${settings.email}`}>{settings.email}</a><p>{settings.address}</p></div><div><p className="eyebrow">Explora</p><Link href="/servicios">Soluciones</Link><Link href="/proyectos">Proyectos</Link><Link href="/nosotros">Nosotros</Link><Link href="/privacidad">Privacidad</Link><a href={`https://www.instagram.com/${settings.instagram}/`} target="_blank" rel="noopener noreferrer">Instagram ↗</a></div><div className="footer-bottom">© {new Date().getFullYear()} {settings.companyName} · Ingeniería y Servicios</div></footer><Analytics/></body></html>;
}
