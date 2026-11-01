'use client';

import React, { useState } from 'react';
import { StickyQuoteForm } from '@/components/marketing/StickyQuoteForm';
import { G050Calculator } from '@/components/marketing/G050Calculator';
import { SanitaryCatalogGrid } from '@/components/marketing/SanitaryCatalogGrid';
import { PeruInteractiveMap } from '@/components/marketing/PeruInteractiveMap';
import { Icons } from '@/components/ui/Icons';

export default function SanitariosPage() {
  const [quotePrefill, setQuotePrefill] = useState<{ units: number; frequency: string }>({
    units: 5,
    frequency: '2 veces por semana',
  });

  return (
    <div className="pb-16 bg-[#0B1322]">
      {/* 1. HERO LOGÍSTICO Y PRESENTACIÓN VISUAL DE CABINAS (CON FOTO DESTACADA Y FORMULARIO) */}
      <section className="relative bg-[#0F172A] text-white py-12 px-4 sm:px-6 overflow-hidden border-b border-slate-800">
        {/* Background logístico vectorial */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="logisticsTechGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6CBE1A" strokeWidth="0.5" strokeOpacity="0.25" />
                <circle cx="40" cy="40" r="1.5" fill="#00A8E8" fillOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#logisticsTechGrid)" />
            <circle cx="85%" cy="30%" r="220" fill="none" stroke="#6CBE1A" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.3" />
            <circle cx="85%" cy="30%" r="140" fill="none" stroke="#00A8E8" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.3" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-7 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6CBE1A]/20 border border-[#6CBE1A]/40 text-[#6CBE1A] text-xs font-mono font-bold uppercase mb-4">
              <Icons.Truck className="w-4 h-4" />
              Red Nacional de Saneamiento • Res. DIGESA Nº DIG-2024
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white mb-4">
              Alquiler & Mantenimiento de{' '}
              <span className="text-[#6CBE1A]">Baños Portátiles</span> en Todo el Perú
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Flota especializada de <strong>baños portátiles de alto tránsito</strong> bajo la <strong>Norma Técnica G.050</strong>. Operamos con camiones hidrosuccionadores al vacío propios, químicos biodegradables de grado industrial y entrega inmediata de manifiestos ambientales DIGESA para auditorías de SUNAFIL y OEFA.
            </p>

            {/* Vitrina Visual de Impacto: Cabina en Operación Real */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#6CBE1A]/40 shadow-2xl bg-slate-950 mb-6 group">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="/images/sanitary_luxury_obra.jpg"
                  alt="Baño Portátil de Obra en Frente de Trabajo - Inversiones Nelly"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Badges Flotantes de Calidad */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#6CBE1A] text-slate-950 font-black text-xs px-3 py-1 rounded-xl shadow-lg flex items-center gap-1.5">
                    <Icons.Check className="w-3.5 h-3.5" />
                    HDPE Virgen 210L
                  </span>
                  <span className="bg-slate-950/80 backdrop-blur-md text-[#00A8E8] font-bold text-xs px-3 py-1 rounded-xl border border-[#00A8E8]/40">
                    Bomba de Pie Manos Libres
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-white font-black text-lg sm:text-xl">
                      Cabinas Rotomoldeadas para Minería y Obras Civiles
                    </div>
                    <div className="text-slate-300 text-xs mt-0.5">
                      Flota homologada con succión hidrostática periódica y certificado ambiental oficial
                    </div>
                  </div>
                  <a
                    href="#catalogo-sanitarios"
                    className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg shrink-0"
                  >
                    <span>Ver Catálogo</span>
                    <Icons.ChevronDown className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* KPI Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 mb-6">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shadow-lg">
                <div className="text-2xl font-black text-[#6CBE1A] font-mono">+1,250</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Baños en Obra</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shadow-lg">
                <div className="text-2xl font-black text-[#00A8E8] font-mono">100%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Camiones Propios</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shadow-lg">
                <div className="text-2xl font-black text-[#C8A064] font-mono">18 Reg.</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Cobertura Nacional</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shadow-lg">
                <div className="text-2xl font-black text-white font-mono">DIGESA</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Residuos Sólidos</div>
              </div>
            </div>
          </div>

          <div id="sticky-quote-form" className="lg:col-span-5">
            <StickyQuoteForm
              initialUnits={quotePrefill.units}
              initialFrequency={quotePrefill.frequency}
            />
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO TÉCNICO EXCLUSIVO DE BAÑOS PORTÁTILES (PRIMERO, CON PASARELA Y MODAL 360°) */}
      <section id="catalogo-sanitarios" className="py-14 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#6CBE1A] uppercase tracking-wider bg-[#6CBE1A]/20 px-3 py-1 rounded-full border border-[#6CBE1A]/30">
            Equipamiento de Grado Industrial
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            Catálogo Exclusivo de Baños Portátiles de Obra
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Modelos rotomoldeados en polietileno virgen (HDPE) con estanqueidad garantizada, pasarela de fotos y visor 360° interactivo.
          </p>
        </div>

        <SanitaryCatalogGrid />
      </section>

      {/* 3. WIDGET CALCULADORA NORMA G.050 */}
      <section id="g050-calculator" className="py-14 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
        <G050Calculator
          onTransferToQuote={(data) => {
            setQuotePrefill(data);
          }}
        />
      </section>

      {/* 4. CICLO OPERATIVO DEL SERVICIO EN 4 PASOS */}
      <section className="bg-slate-900/80 text-white py-16 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#00A8E8] uppercase tracking-wider bg-[#00A8E8]/20 px-3 py-1 rounded-full border border-[#00A8E8]/30">
              Procedimiento Estandarizado DIGESA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Ciclo de Servicio de Succión e Higiene
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Cómo garantizamos la operatividad continua de tus baños portátiles sin malos olores ni sanciones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Entrega en Obra', desc: 'Descarga con camión grúa plataforma y nivelación sobre terreno según el plano de seguridad de obra.' },
              { step: '02', title: 'Succión Hidrostática', desc: 'Evacuación de lodos al vacío con manguera hermética de 2.5 pulgadas. Cero derrames garantizado.' },
              { step: '03', title: 'Químicos Biodegradables', desc: 'Lavado a presión, recarga de bactericida aromático azul y reposición de insumos de higiene.' },
              { step: '04', title: 'Certificado DIGESA', desc: 'Firma de guía de succión y entrega de Manifiesto de Residuos Sólidos para auditorías de SUNAFIL.' },
            ].map((s) => (
              <div key={s.step} className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 relative flex flex-col justify-between hover:border-[#6CBE1A]/40 transition">
                <div>
                  <div className="text-4xl font-black text-[#6CBE1A]/30 mb-2 font-mono">{s.step}</div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RED NACIONAL Y CENTRO DE OPERACIONES MAPBOX GL EN TIEMPO REAL */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#6CBE1A] uppercase tracking-wider bg-[#6CBE1A]/20 px-3 py-1 rounded-full border border-[#6CBE1A]/30 font-mono">
            Mapbox GL™ • Telemetría Satelital
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            Centro de Operaciones y Red de Clientes en Todo el Perú
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Supervisión satelital y monitoreo en tiempo real de frentes de obra, consorcios viales y campamentos mineros.
          </p>
        </div>

        <PeruInteractiveMap />
      </section>
    </div>
  );
}
