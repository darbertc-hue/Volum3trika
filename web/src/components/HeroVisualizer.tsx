'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroVisualizer() {
  const [view, setView] = useState<'real' | 'cad'>('real');

  return (
    <div className="bg-[#141f23] border border-[#273a42] rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Top Header Bar */}
      <div className="bg-[#10191c] px-4 py-3 border-b border-[#25373f] flex items-center justify-between">
        <span className="font-mono text-xs text-[#00afc1] font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00afc1] animate-pulse"></span>
          CASO DOCUMENTADO #01
        </span>
        <div className="flex items-center bg-[#172429] p-0.5 rounded-lg border border-[#2d4048] text-xs">
          <button
            type="button"
            onClick={() => setView('real')}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
              view === 'real'
                ? 'bg-[#00afc1] text-[#090e10]'
                : 'text-[#80969d] hover:text-white'
            }`}
          >
            Obra Ejecutada
          </button>
          <button
            type="button"
            onClick={() => setView('cad')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
              view === 'cad'
                ? 'bg-[#00afc1] text-[#090e10] font-bold'
                : 'text-[#80969d] hover:text-white'
            }`}
          >
            Capa Técnica
          </button>
        </div>
      </div>

      {/* Visual Display Layer */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#0a0f12]">
        {/* Real Layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-end p-6 ${
            view === 'real' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <Image
            src="/images/industrial.webp"
            alt="Nave Industrial KM22 - Caso Documentado"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1417] via-[#0d1417]/40 to-transparent" />
          
          <div className="relative z-10 bg-[#090e10]/85 backdrop-blur-md p-4 rounded-xl border border-[#263a42]">
            <span className="text-[10px] font-mono text-[#00afc1] uppercase font-bold tracking-wider">
              PORTAFOLIO INDUSTRIAL · SLIDE 8
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Nave Industrial KM22</h3>
            <p className="text-xs text-[#a2b6bc] mt-1">
              Autopista Duarte · Estructura metálica pesada y pisos de hormigón pulido industrial.
            </p>
            <p className="text-[11px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
              <span>✓</span> Impacto: Optimización total para almacenamiento y distribución a gran escala.
            </p>
          </div>
        </div>

        {/* CAD Layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 p-6 flex flex-col justify-between bg-[#0b1215] ${
            view === 'cad' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0, 175, 193, 0.2) 1.2px, transparent 1.2px)',
            backgroundSize: '20px 20px'
          }}
        >
          <div className="flex justify-between items-start font-mono text-[11px] text-[#00afc1]">
            <span>EXP: KM22-DUARTE-IND</span>
            <span className="px-2 py-0.5 bg-[#00afc1]/10 border border-[#00afc1]/30 rounded">
              MEMORIA CODIA V²
            </span>
          </div>

          <div className="border border-[#00afc1]/30 rounded-xl h-44 relative flex items-center justify-center bg-[#071013]/60">
            <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-[#00afc1]/40" />
            <div className="absolute inset-y-4 left-1/2 border-l border-dashed border-[#00afc1]/40" />
            <div className="w-28 h-28 border-2 border-[#00afc1] rotate-45 flex items-center justify-center text-[10px] font-mono text-white bg-[#00afc1]/10 shadow-[0_0_15px_rgba(0,175,193,0.3)]">
              <span className="-rotate-45 font-bold">PÓRTICO METÁLICO</span>
            </div>
            <span className="absolute bottom-2 left-3 text-[10px] font-mono text-[#6c868f]">
              CARGA MÁXIMA: 45 kN/m²
            </span>
            <span className="absolute top-2 right-3 text-[10px] font-mono text-[#6c868f]">
              HORMIGÓN: F&apos;C 280 KG/CM²
            </span>
          </div>

          <div className="text-[11px] font-mono text-[#8ca0a6] flex justify-between border-t border-[#1d2d34] pt-2">
            <span>ENSAMBLAJE ACELERADO</span>
            <span className="text-[#00afc1] font-bold">SUPERVISIÓN DIRECTA</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-[#10191c] px-4 py-3 border-t border-[#25373f] flex items-center justify-between text-xs">
        <span className="text-[#7c929a]">¿Requieres cubicación o visita a tu predio?</span>
        <Link href="/contacto" className="text-[#00afc1] font-bold hover:underline flex items-center gap-1">
          Agendar levantamiento →
        </Link>
      </div>
    </div>
  );
}
