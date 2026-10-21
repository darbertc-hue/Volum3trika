'use client';
import { useState } from 'react';
import { track } from './Analytics';

const DISCIPLINES = [
  'Estructuras Metálicas & Cimentación',
  'Pisos Hormigón Pulido (Alto Tráfico)',
  'Fachadas en Paneles ACM',
  'Instalaciones Hidrosanitarias',
  'Sistemas de Impermeabilización',
  'Terminaciones Finas & Pintura'
];

export default function Estimator({ whatsappNumber = '18093898022' }: { whatsappNumber?: string }) {
  const [sector, setSector] = useState<'Industrial' | 'Corporativo' | 'Comercial' | 'Residencial'>('Industrial');
  const [area, setArea] = useState<number>(650);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([
    'Estructuras Metálicas & Cimentación',
    'Pisos Hormigón Pulido (Alto Tráfico)'
  ]);

  function toggleDiscipline(name: string) {
    setSelectedDisciplines(prev =>
      prev.includes(name) ? prev.filter(d => d !== name) : [...prev, name]
    );
  }

  // Calculate estimated execution weeks
  const disciplineCount = selectedDisciplines.length;
  const minWeeks = Math.max(3, Math.round((area / 280) * 1.8 + disciplineCount * 1.1));
  const maxWeeks = minWeeks + Math.round(minWeeks * 0.35);

  function exportToWhatsApp() {
    track('estimator_click', { sector, area: String(area) });
    const disciplinesText = selectedDisciplines.length ? selectedDisciplines.join(', ') : 'Por definir en visita técnica';
    const message = `Hola, VOLUM3TRIKA² SRL. Realicé una estimación preliminar en el portal para una obra en el sector ${sector} de aprox. ${area.toLocaleString()} m². Partidas: ${disciplinesText}. Plazo proyectado: ${minWeeks} - ${maxWeeks} semanas. ¿Podemos agendar una visita técnica para levantamiento?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="estimador" className="section bg-[#0d1417] text-[#f0f5f5] border-y border-[#213137]">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <p className="eyebrow" style={{ color: '#00afc1' }}>ESTIMADOR INTERACTIVO 2.0</p>
        <h2 className="text-white text-3xl sm:text-4xl font-extrabold mt-1">Calcula el alcance preliminar de tu obra</h2>
        <p className="copy mx-auto text-sm text-[#8ca0a7] mt-2">
          Selecciona tu sector, área estimada y disciplinas requeridas para obtener una proyección técnica de semanas operativas lista para cotización en 1 clic.
        </p>
      </div>

      <div className="bg-[#142025] border border-[#273d46] rounded-2xl p-6 lg:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#82979e] mb-3 font-semibold">
              1. Sector de Intervención
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(['Industrial', 'Corporativo', 'Comercial', 'Residencial'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSector(s)}
                  className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                    sector === s
                      ? 'border-[#00afc1] bg-[#00afc1]/15 text-white font-bold'
                      : 'border-[#273940] bg-[#0f171b] text-[#9eb2b8] hover:border-[#00afc1]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="range-area" className="text-xs font-mono uppercase tracking-wider text-[#82979e] font-semibold">
                2. Dimensión Estimada de Obra
              </label>
              <span className="text-sm font-mono font-bold text-[#00afc1] bg-[#00afc1]/10 px-2.5 py-0.5 rounded border border-[#00afc1]/30">
                {area.toLocaleString()} m²
              </span>
            </div>
            <input
              id="range-area"
              type="range"
              min="50"
              max="4000"
              step="25"
              value={area}
              onChange={e => setArea(parseInt(e.target.value, 10))}
              className="w-full accent-[#00afc1] bg-[#1d2d34] h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#637a82] mt-1 font-mono">
              <span>50 m²</span>
              <span>1,000 m²</span>
              <span>2,500 m²</span>
              <span>4,000+ m²</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#82979e] mb-3 font-semibold">
              3. Partidas y Disciplinas a Integrar
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {DISCIPLINES.map(item => {
                const checked = selectedDisciplines.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#00afc1]/10 border-[#00afc1]/50 text-white'
                        : 'bg-[#0e1619] border-[#22333a] text-[#a4b8be] hover:border-[#00afc1]/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDiscipline(item)}
                      className="rounded text-[#00afc1] w-4 h-4 bg-[#142025] border-[#2d414a] focus:ring-[#00afc1]"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Projection Output */}
        <div className="lg:col-span-5 bg-[#0f171b] border border-[#253942] rounded-xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f2e34] pb-3 text-xs font-mono">
              <span className="text-[#00afc1] font-bold">PROYECCIÓN TÉCNICA</span>
              <span className="text-[#7e959d]">CODIA V² #EST</span>
            </div>

            <div>
              <span className="text-xs text-[#7e959d] block">Sector & Dimensión:</span>
              <div className="text-lg font-bold text-white flex justify-between items-center">
                <span>{sector}</span>
                <span className="text-[#00afc1] font-mono">{area.toLocaleString()} m²</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-[#7e959d] block">Ventana de Ejecución Estimada:</span>
              <div className="text-2xl font-extrabold text-white flex items-baseline gap-2">
                <span>{minWeeks} - {maxWeeks}</span>
                <span className="text-xs text-[#7e959d] font-normal font-sans">semanas operativas</span>
              </div>
              <p className="text-[11px] text-[#6d848c] mt-1">Sujeto a validación de suelo y cubicación en visita técnica.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#142025] border border-[#23353c] text-xs text-[#9eb2b8] space-y-1.5">
              <p className="font-medium text-white flex items-center gap-1.5">
                <span className="text-[#00afc1]">✓</span> Incluido en la estimación inicial:
              </p>
              <ul className="text-[11px] text-[#788e96] space-y-1 pl-4 list-disc">
                <li>Levantamiento de medidas en obra sin costo</li>
                <li>Presupuesto desglosado por partidas (APU)</li>
                <li>Supervisión por Project Manager colegiado CODIA</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={exportToWhatsApp}
              className="w-full py-3.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <span>Enviar Estimación por WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </button>
            <p className="text-[11px] text-center text-[#6e858d]">
              Transferencia directa con mensaje estructurado para el equipo técnico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
