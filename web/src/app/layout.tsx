import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Analytics from '@/components/Analytics';
import { getContent, siteUrl } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'VOLUM3TRIKA² | Ingeniería, construcción y mantenimiento',
    template: '%s | VOLUM3TRIKA²'
  },
  description:
    'Soluciones integrales de obra civil, terminaciones, instalaciones y mantenimiento en República Dominicana.',
  openGraph: {
    locale: 'es_DO',
    type: 'website',
    siteName: 'VOLUM3TRIKA²',
    title: 'VOLUM3TRIKA² | Ingeniería, construcción y mantenimiento',
    description:
      'Soluciones integrales de obra civil, terminaciones, instalaciones y mantenimiento en República Dominicana.',
    images: [
      {
        url: '/images/hero.webp',
        width: 900,
        height: 375,
        alt: 'VOLUM3TRIKA² Ingeniería y Servicios'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VOLUM3TRIKA² | Ingeniería, construcción y mantenimiento',
    description:
      'Soluciones integrales de obra civil, terminaciones, instalaciones y mantenimiento en República Dominicana.',
    images: ['/images/hero.webp']
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getContent();
  const phoneDigits = settings.phone.replace(/\D/g, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: settings.companyName,
    legalName: settings.legalName || 'VOLUM3TRIKA² INGENIERÍA Y SERVICIOS, SRL.',
    url: siteUrl(),
    logo: `${siteUrl()}/images/logo.png`,
    image: `${siteUrl()}/images/hero.webp`,
    description: settings.heroDescription,
    telephone: `+${phoneDigits.length === 10 ? '1' : ''}${phoneDigits}`,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Gaspar Polanco #54, Edificio Aimee I, Apt. 101, Bella Vista',
      addressLocality: 'Santo Domingo',
      addressRegion: 'Distrito Nacional',
      addressCountry: 'DO'
    },
    sameAs: [`https://www.instagram.com/${settings.instagram}/`]
  };

  return (
    <html lang="es-DO">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Ir al contenido
        </a>
        <Header />
        <main id="main">{children}</main>
        <footer className="footer">
          <div>
            <Link href="/">
              <Image
                className="logo"
                src="/images/logo.png"
                alt="VOLUM3TRIKA² Ingeniería y Servicios"
                width={367}
                height={175}
              />
            </Link>
            <p>Ingeniería, construcción y mantenimiento en República Dominicana.</p>
          </div>
          <div>
            <h2 className="eyebrow">Contacto</h2>
            <a href={`tel:+${phoneDigits.length === 10 ? '1' : ''}${phoneDigits}`}>
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <p>{settings.address}</p>
          </div>
          <div>
            <h2 className="eyebrow">Explora</h2>
            <Link href="/servicios">Soluciones</Link>
            <Link href="/proyectos">Proyectos</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/privacidad">Privacidad</Link>
            <a
              href={`https://www.instagram.com/${settings.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
              <span className="sr-only"> (abre en una pestaña nueva)</span>
            </a>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} {settings.companyName} · Ingeniería y Servicios
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
