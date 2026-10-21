'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, closeMenu]);

  return (
    <>
      <aside className="top-bar" aria-label="Información institucional y contacto directo">
        <div className="top-bar-inner">
          <div className="top-bar-badge">
            <span className="pulse-dot" aria-hidden="true" />
            <span>RNC 133-40156-3 · SANTO DOMINGO, RD</span>
          </div>
          <div className="top-bar-phones">
            <span className="top-bar-label">Líneas Directas:</span>
            <a href="tel:+18093898022" className="phone-primary">809-389-8022</a>
            <span className="separator">/</span>
            <a href="tel:+18293839428">829-383-9428</a>
            <span className="separator">/</span>
            <a href="tel:+18099608371">809-960-8371</a>
          </div>
        </div>
      </aside>

      <header className="header">
        <Link href="/" aria-label="VOLUM3TRIKA², inicio" onClick={closeMenu}>
          <Image
            className="logo"
            src="/images/logo.png"
            alt="VOLUM3TRIKA² Ingeniería y Servicios"
            width={367}
            height={175}
            priority
          />
        </Link>

        <button
          className="menu"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(prev => !prev)}
        >
          Menú {open ? '−' : '+'}
        </button>

        <nav
          id="main-nav"
          className={open ? 'navigation open' : 'navigation'}
          aria-label="Principal"
        >
          {[
            ['/servicios', 'Soluciones'],
            ['/proyectos', 'Proyectos'],
            ['/nosotros', 'Nosotros']
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? 'page' : undefined}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <Link href="/contacto" className="button small" onClick={closeMenu}>
            Cotizar ↗
          </Link>
        </nav>
      </header>
    </>
  );
}
