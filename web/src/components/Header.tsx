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
      {/* Top Bar: Direct Technical Lines & RNC */}
      <aside className="bg-[#090e10] border-b border-[#1b272c] px-4 py-2 text-xs text-[#82979e]" aria-label="Información institucional y contacto directo">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00afc1]/10 text-[#00afc1] font-mono text-[11px] border border-[#00afc1]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00afc1] animate-pulse"></span>
              RNC 133-40156-3 · SANTO DOMINGO, RD
            </span>
            <span className="hidden md:inline text-[#3a4d54]">|</span>
            <span className="hidden md:inline text-[#9eb2b8]">Soluciones Integrales de Ingeniería, Construcción y Mantenimiento</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden lg:inline text-[#7e959d]">Líneas Directas:</span>
            <a href="tel:+18093898022" className="hover:text-white transition-colors text-[#00afc1] font-bold">809-389-8022</a>
            <span className="text-[#3a4d54]">/</span>
            <a href="tel:+18293839428" className="hover:text-white transition-colors text-[#c6d9de]">829-383-9428</a>
            <span className="text-[#3a4d54]">/</span>
            <a href="tel:+18099608371" className="hover:text-white transition-colors text-[#c6d9de]">809-960-8371</a>
          </div>
        </div>
      </aside>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-[#0d1417]/95 backdrop-blur-md border-b border-[#213137]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & CODIA Symbol */}
          <Link href="/" aria-label="VOLUM3TRIKA², inicio" onClick={closeMenu} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00afc1] via-[#008f9e] to-[#0d1417] p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#0d1417] rounded-[9px] flex items-center justify-center">
                <span className="text-white font-black text-lg tracking-tighter">V<span className="text-[#00afc1]">²</span></span>
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-0.5">
                VOLUM3TRIKA<span className="text-[#00afc1]">²</span>
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#7c939b] -mt-0.5">
                Ingeniería y Servicios, SRL
              </span>
            </div>
            <Image
              src="/images/logo.png"
              alt="VOLUM3TRIKA² Ingeniería y Servicios"
              width={160}
              height={40}
              priority
              className="h-8 w-auto object-contain rounded bg-white px-2 py-0.5 shadow-sm hidden sm:block ml-2"
            />
          </Link>

          {/* Navigation Links */}
          <nav
            id="main-nav"
            aria-label="Principal"
            className={`${
              open
                ? 'absolute top-full left-0 right-0 bg-[#0d1417] border-b border-[#213137] p-6 flex flex-col gap-4 shadow-2xl z-50'
                : 'hidden md:flex'
            } items-center gap-6 text-sm font-medium text-[#b5cbcf]`}
          >
            <Link
              href="/#excelencia"
              onClick={closeMenu}
              className="hover:text-[#00afc1] transition-colors"
            >
              Sectores
            </Link>
            <Link
              href="/servicios"
              onClick={closeMenu}
              aria-current={path.startsWith('/servicios') ? 'page' : undefined}
              className="hover:text-[#00afc1] transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/#logistica"
              onClick={closeMenu}
              className="hover:text-[#00afc1] transition-colors flex items-center gap-1.5 text-white"
            >
              <span className="px-1.5 py-0.5 rounded bg-[#00afc1]/20 text-[#00afc1] font-mono text-[10px] border border-[#00afc1]/30">
                ESPECIALIDAD
              </span>
              Logística & Retail
            </Link>
            <Link
              href="/proyectos"
              onClick={closeMenu}
              aria-current={path.startsWith('/proyectos') ? 'page' : undefined}
              className="hover:text-[#00afc1] transition-colors"
            >
              Nuestra Huella
            </Link>
            <Link
              href="/nosotros"
              onClick={closeMenu}
              aria-label="Nosotros"
              aria-current={path.startsWith('/nosotros') ? 'page' : undefined}
              className="hover:text-[#00afc1] transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/#estimador"
              onClick={closeMenu}
              className="hover:text-[#00afc1] transition-colors text-[#00afc1] font-bold"
            >
              Cotizador
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/18093898022?text=Hola,%20VOLUM3TRIKA².%20Deseo%20solicitar%20una%20revisión%20técnica%20para%20un%20proyecto."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-semibold transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Activo
            </a>
            <Link
              href="/contacto"
              className="px-5 py-2.5 rounded-lg bg-[#00afc1] hover:bg-[#32c9d9] text-[#090e10] font-bold text-sm shadow-lg shadow-[#00afc1]/20 transition-all transform hover:-translate-y-0.5"
            >
              Cotizar Proyecto
            </Link>
            <button
              className="md:hidden p-2 rounded-lg border border-[#273940] bg-[#141f23] text-white"
              type="button"
              aria-expanded={open}
              aria-controls="main-nav"
              onClick={() => setOpen(prev => !prev)}
            >
              Menú {open ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
