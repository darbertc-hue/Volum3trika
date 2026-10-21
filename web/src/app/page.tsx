import Link from 'next/link';
import { getContent, whatsappUrl } from '@/lib/content';
import { QuoteCTA } from '@/components/Content';
import HeroVisualizer from '@/components/HeroVisualizer';
import Estimator from '@/components/Estimator';

export default async function Home() {
  const { settings, projects } = await getContent();

  return (
    <>
      {/* =========================================================================
          HERO SECTION: Authentic Portfolio Proposition (Slide 1 & 2)
      ========================================================================= */}
      <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 blueprint-grid border-b border-[#213137]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Value Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#162328] border border-[#273d45] text-xs font-mono text-[#00afc1]">
                <span className="w-2 h-2 bg-[#00afc1] rounded-full"></span>
                PORTAFOLIO CORPORATIVO OFICIAL
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Soluciones Integrales de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00afc1] via-[#5ae2ef] to-white">
                  Ingeniería, Construcción y Mantenimiento.
                </span>
              </h1>

              <p className="text-lg text-[#9cb1b7] max-w-2xl leading-relaxed">
                El socio estratégico definitivo: desde intervenciones correctivas de precisión quirúrgica hasta el desarrollo y rehabilitación de infraestructuras a gran escala en toda República Dominicana.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#estimador"
                  className="px-5 py-3 rounded-lg bg-[#00afc1] text-[#090e10] font-bold text-sm hover:bg-[#3cd5e4] shadow-lg shadow-[#00afc1]/20 transition-all flex items-center gap-2"
                >
                  <span>Calcular Alcance de Obra</span>
                  <span aria-hidden="true">→</span>
                </a>
                <Link
                  href="/proyectos"
                  className="px-5 py-3 rounded-lg bg-[#162227] border border-[#2d424b] text-white font-medium hover:border-[#00afc1] hover:text-[#00afc1] text-sm transition-all"
                >
                  Explora nuestra huella ↓
                </Link>
                <a
                  href={whatsappUrl(settings)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Cotizar por WhatsApp ↗</span>
                </a>
              </div>

              {/* Direct Trust Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1f2d33] text-xs">
                <div>
                  <div className="font-extrabold text-white text-xl font-mono">+15 Años</div>
                  <div className="text-[#7e949c]">Trayectoria Directiva</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-xl font-mono">100%</div>
                  <div className="text-[#7e949c]">Colegiados CODIA</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-xl font-mono">3 Núcleos</div>
                  <div className="text-[#7e949c]">Estructura, Acabados, Mantenimiento</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-xl font-mono">Nacional</div>
                  <div className="text-[#7e949c]">Cobertura en RD</div>
                </div>
              </div>
            </div>

            {/* Right Interactive View Switcher */}
            <div className="lg:col-span-5">
              <HeroVisualizer />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTORES / AUDIENCIAS ESTRATÉGICAS (PDF Slide 2)
      ========================================================================= */}
      <section id="excelencia" className="py-16 bg-[#0f171b] border-b border-[#213137]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs uppercase font-mono tracking-widest text-[#00afc1] font-bold">
              ADAPTABILIDAD TOTAL (SLIDE 2 DEL PORTAFOLIO)
            </p>
            <h2 className="text-3xl font-extrabold text-white mt-1">La Base de Nuestra Excelencia</h2>
            <p className="text-sm text-[#8ca0a7] mt-2">
              Diseñamos soluciones a la medida para cuatro segmentos estratégicos con requerimientos técnicos diferenciados:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#142025] border border-[#263a42] rounded-xl p-5 hover:border-[#00afc1] transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#00afc1]/10 text-[#00afc1] flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-105 transition-transform">
                🏭
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00afc1] transition-colors">
                Empresas e Industrias
              </h3>
              <p className="text-xs text-[#82979e] mt-2 leading-relaxed">
                Naves logísticas, pavimentos para montacargas de alto tonelaje, cuartos de bombeo y ampliaciones de plantas operativas.
              </p>
            </div>

            <div className="bg-[#142025] border border-[#263a42] rounded-xl p-5 hover:border-[#00afc1] transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#00afc1]/10 text-[#00afc1] flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-105 transition-transform">
                🏢
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00afc1] transition-colors">
                Desarrolladores Inmobiliarios
              </h3>
              <p className="text-xs text-[#82979e] mt-2 leading-relaxed">
                Fachadas comerciales en paneles ACM, cerramientos perimetrales, adecuaciones de lobbies y áreas comunes de torres corporativas.
              </p>
            </div>

            <div className="bg-[#142025] border border-[#263a42] rounded-xl p-5 hover:border-[#00afc1] transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#00afc1]/10 text-[#00afc1] flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-105 transition-transform">
                🏛️
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00afc1] transition-colors">
                Instituciones Públicas
              </h3>
              <p className="text-xs text-[#82979e] mt-2 leading-relaxed">
                Remozamientos de infraestructura cívica, cumplimiento normativo MOPC/CODIA y ejecuciones bajo cronogramas estrictos.
              </p>
            </div>

            <div className="bg-[#142025] border border-[#263a42] rounded-xl p-5 hover:border-[#00afc1] transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#00afc1]/10 text-[#00afc1] flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-105 transition-transform">
                🏡
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00afc1] transition-colors">
                Clientes Particulares Exclusivos
              </h3>
              <p className="text-xs text-[#82979e] mt-2 leading-relaxed">
                Terminaciones de lujo en villas residenciales (Casa de Campo), recubrimientos nobles de piso e instalaciones hidrosanitarias premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATÁLOGO INTEGRAL DE INGENIERÍA (PDF Slide 5)
      ========================================================================= */}
      <section id="catalogo" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-[#00afc1] font-bold">
              ALCANCE DE SERVICIOS (SLIDE 5)
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Catálogo Integral de Ingeniería</h2>
          </div>
          <p className="text-sm text-[#8ba0a7] max-w-md">
            Estructuramos nuestras operaciones en tres divisiones técnicas para garantizar que cada partida cumpla los estándares más altos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* División 01 */}
          <div className="bg-[#131d21] border border-[#23353c] rounded-2xl p-7 hover:border-[#00afc1] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#00afc1] mb-5">
                <span className="px-2.5 py-1 rounded bg-[#00afc1]/10 border border-[#00afc1]/20 font-bold">DIVISIÓN 01</span>
                <span className="text-white text-lg font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold text-white">Estructura y Obra Civil</h3>
              <p className="text-xs text-[#8ca0a7] mt-3 leading-relaxed">
                Ejecución de cimientos, naves de almacenaje y sistemas estructurales con capacidad de carga certificada.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#b0c4ca] border-t border-[#203138] pt-5">
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Construcción de naves industriales y de almacenamiento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Estructuras metálicas de alta resistencia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Sistemas aligerados (paneles de fibra de vidrio y yeso)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Pisos de hormigón pulido para alto tráfico</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#203138]">
              <Link href="/servicios/estructura-y-obra-civil" className="text-xs font-mono font-bold text-[#00afc1] hover:underline flex items-center gap-1">
                Explorar esta división →
              </Link>
            </div>
          </div>

          {/* División 02 */}
          <div className="bg-[#131d21] border border-[#23353c] rounded-2xl p-7 hover:border-[#00afc1] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#00afc1] mb-5">
                <span className="px-2.5 py-1 rounded bg-[#00afc1]/10 border border-[#00afc1]/20 font-bold">DIVISIÓN 02</span>
                <span className="text-white text-lg font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold text-white">Arquitectura y Terminaciones</h3>
              <p className="text-xs text-[#8ca0a7] mt-3 leading-relaxed">
                Detalle milimétrico para elevar el valor estético y la durabilidad de fachadas e interiores comerciales y residenciales.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#b0c4ca] border-t border-[#203138] pt-5">
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Revestimientos arquitectónicos en aluminio compuesto (ACM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Instalación de recubrimientos premium de pared y piso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Aplicación de pintura general (interior y exterior)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Divisiones modulares y adecuación de espacios corporativos</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#203138]">
              <Link href="/servicios/arquitectura-y-terminaciones" className="text-xs font-mono font-bold text-[#00afc1] hover:underline flex items-center gap-1">
                Explorar esta división →
              </Link>
            </div>
          </div>

          {/* División 03 */}
          <div className="bg-[#131d21] border border-[#23353c] rounded-2xl p-7 hover:border-[#00afc1] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#00afc1] mb-5">
                <span className="px-2.5 py-1 rounded bg-[#00afc1]/10 border border-[#00afc1]/20 font-bold">DIVISIÓN 03</span>
                <span className="text-white text-lg font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold text-white">Instalaciones y Mantenimiento</h3>
              <p className="text-xs text-[#8ca0a7] mt-3 leading-relaxed">
                Protección hidrosanitaria y térmica continua para salvaguardar la vida útil de las edificaciones y evitar filtraciones.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#b0c4ca] border-t border-[#203138] pt-5">
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Instalaciones hidrosanitarias y fontanería de precisión</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Sistemas de impermeabilización avanzados (membranas continuas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Protección integral de superficies y cubiertas de techos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00afc1] font-bold">■</span>
                  <span>Mantenimiento preventivo y correctivo de infraestructuras</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#203138]">
              <Link href="/servicios/instalaciones-y-mantenimiento" className="text-xs font-mono font-bold text-[#00afc1] hover:underline flex items-center gap-1">
                Explorar esta división →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ESPECIALIDAD LOGÍSTICA & RETAIL (PDF Slide 6)
      ========================================================================= */}
      <section id="logistica" className="py-16 bg-[#10191d] border-t border-b border-[#213137]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#142127] via-[#17272e] to-[#121c21] border border-[#2b414b] rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00afc1]/10 text-[#00afc1] border border-[#00afc1]/30 font-mono text-xs">
                SLIDE 6 DEL PORTAFOLIO OFICIAL
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Infraestructura para el Alto Rendimiento:{' '}
                <span className="text-[#00afc1]">Logística y Retail</span>
              </h2>
              <p className="text-sm text-[#9ab0b6] leading-relaxed">
                Especialistas en el diseño y construcción de naves industriales destinadas a cadenas de supermercados y centros de distribución logística a gran escala.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#0d1518]/80 border border-[#253942]">
                  <span className="text-[#00afc1] font-bold text-sm block">1. Ensamblaje Acelerado</span>
                  <p className="text-xs text-[#7e949c] mt-1.5 leading-normal">
                    Estructuras metálicas y sistemas aligerados para reducir drásticamente los plazos sin sacrificar integridad.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0d1518]/80 border border-[#253942]">
                  <span className="text-[#00afc1] font-bold text-sm block">2. Pisos Alto Tráfico</span>
                  <p className="text-xs text-[#7e949c] mt-1.5 leading-normal">
                    Fundición de hormigón pulido para soportar montacargas pesados y fricción constante en cadena de suministro.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0d1518]/80 border border-[#253942]">
                  <span className="text-[#00afc1] font-bold text-sm block">3. Espacio Inteligente</span>
                  <p className="text-xs text-[#7e949c] mt-1.5 leading-normal">
                    Diseño enfocado en la eficiencia operativa, maximizando almacenamiento y flujo de mercancías.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00afc1] text-[#090e10] font-bold text-xs uppercase tracking-wider hover:bg-[#32c9d9] transition-all"
                >
                  Consultar Proyecto Logístico →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          NUESTRA HUELLA: PROYECTOS DOCUMENTADOS (PDF Slides 7 - 11)
      ========================================================================= */}
      <section id="huella" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-[#00afc1] font-bold">
              NUESTRA HUELLA: DE PLANO A LA REALIDAD
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Casos Documentados en el Portafolio</h2>
          </div>
          <Link
            href="/proyectos"
            className="text-xs font-mono font-bold text-[#00afc1] hover:underline flex items-center gap-1"
          >
            Ver todos los proyectos en archivo →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map(p => (
            <article
              key={p.slug}
              className="bg-[#131d21] border border-[#24363d] rounded-2xl overflow-hidden hover:border-[#00afc1] transition-all group"
            >
              <div
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${p.image})` }}
              >
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#090e10]/90 text-[#00afc1] font-mono text-xs border border-[#00afc1]/30">
                  {p.sector.toUpperCase()}
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/60 text-white font-mono text-[11px] backdrop-blur">
                  {p.location || 'República Dominicana'}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00afc1] transition-colors">
                    <Link href={`/proyectos/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="text-xs text-[#8ca0a7] mt-1">{p.summary}</p>
                </div>
                <div className="bg-[#0e1619] p-3.5 rounded-xl border border-[#1e2f36] space-y-2 text-xs">
                  <div>
                    <span className="text-[#00afc1] font-mono font-bold block text-[11px]">ALCANCE REALIZADO:</span>
                    <p className="text-[#b2c6cc] text-[11px]">{p.scope.join(', ')}.</p>
                  </div>
                  {p.impact && (
                    <div className="border-t border-[#1a2930] pt-2">
                      <span className="text-emerald-400 font-mono font-bold block text-[11px]">IMPACTO:</span>
                      <p className="text-[#95abb2] text-[11px]">{p.impact}</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SINERGIA DIRECTIVA (PDF Slide 4)
      ========================================================================= */}
      <section id="directiva" className="py-20 bg-[#0f171b] border-t border-b border-[#213137]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase font-mono tracking-widest text-[#00afc1] font-bold">
              SINERGIA DIRECTIVA (SLIDE 4)
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">El Motor de la Ejecución</h2>
            <p className="text-sm text-[#8ca0a7] mt-2">
              La combinación de cálculo estructural y gestión rigurosa garantiza proyectos sin sobrecostos ni retrasos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {settings.team.map((person, idx) => (
              <div key={person.name} className="bg-[#142025] border border-[#273d46] rounded-2xl p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00afc1] to-[#085a63] flex items-center justify-center font-bold text-white text-xl shadow-lg">
                    {person.name.split(' ').slice(-2).map(n => n[0]).join('') || 'V²'}
                  </div>
                  <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    idx === 0
                      ? 'bg-[#00afc1]/10 text-[#00afc1] border border-[#00afc1]/30'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {idx === 0 ? '+15 AÑOS TRAYECTORIA' : 'PROJECT MANAGER'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{person.name}</h3>
                  <p className="text-xs text-[#00afc1] font-mono font-medium">{person.role}</p>
                </div>

                <p className="text-xs text-[#9eb2b8] border-t border-[#203138] pt-4 leading-relaxed">
                  {person.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          ESTIMADOR INTERACTIVO 2.0
      ========================================================================= */}
      <Estimator whatsappNumber={settings.whatsapp} />

      {/* =========================================================================
          QUOTE CTA BANNER FINAL
      ========================================================================= */}
      <QuoteCTA settings={settings} />
    </>
  );
}
