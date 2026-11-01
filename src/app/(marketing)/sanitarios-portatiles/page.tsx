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
      {/* 1. HERO CINEMATOGRÁFICO DE PRESENTACIÓN A ANCHO COMPLETO CON VÍDEO TRANSPARENTE DE FONDO */}
      <section className="relative min-h-[82vh] flex items-center justify-center text-white py-16 px-4 sm:px-6 overflow-hidden border-b border-slate-800">
        {/* VÍDEO DE FONDO CLARAMENTE VISIBLE CON OVERLAY ULTRA TRANSPARENTE */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-100 filter brightness-[0.78] contrast-[1.12] saturate-[1.10]"
          >
            <source src="/videos/landing1.mp4" type="video/mp4" />
          </video>
          {/* Capas sutiles que permiten ver el video claramente manteniendo la legibilidad de la marca */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/40 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1322] via-transparent to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#6CBE1A]/15 via-transparent to-transparent mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#00A8E8]/15 via-transparent to-transparent mix-blend-screen" />
        </div>

        {/* CONTENIDO DEL HERO: 100% PRESENTACIÓN DE GRAN IMPACTO */}
        <div className="max-w-5xl mx-auto text-center relative z-10 py-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-[#6CBE1A]/40 text-[#6CBE1A] text-xs font-mono font-bold uppercase mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse"></span>
            <Icons.Truck className="w-4 h-4" />
            <span>Red Nacional de Saneamiento • Res. DIGESA Nº DIG-2024-EP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Liderazgo Nacional en Alquiler & Succión de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6CBE1A] to-[#8ee238]">
              Baños Portátiles
            </span>{' '}
            para Obra y Minería
          </h1>

          <p className="text-slate-200 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Equipamos tus frentes de construcción, consorcios viales y campamentos mineros con cabinas rotomoldeadas en HDPE de 210L bajo la <strong>Norma Técnica Peruana G.050</strong>. Operación continua con camiones hidrosuccionadores al vacío propios, desinfección biodegradable y entrega de <strong>Manifiestos DIGESA</strong> para auditorías de SUNAFIL.
          </p>

          {/* Botones de Navegación y Acción (CTAs) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <a
              href="#seccion-cotizador"
              className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl transition flex items-center gap-2 shadow-xl shadow-[#6CBE1A]/20 transform hover:-translate-y-0.5"
            >
              <Icons.Calculator className="w-4 h-4" />
              <span>Cotizar Baños para Obra ↓</span>
            </a>

            <a
              href="#catalogo-sanitarios"
              className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-2xl backdrop-blur-md border border-slate-700 transition flex items-center gap-2 shadow-lg hover:border-slate-500"
            >
              <Icons.Eye className="w-4 h-4 text-[#00A8E8]" />
              <span>Ver Catálogo Técnico 360° ↓</span>
            </a>

            <a
              href="https://wa.me/51998675270?text=Hola%20Inversiones%20Nelly,%20deseo%20cotizar%20baños%20portátiles%20para%20un%20proyecto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-3.5 rounded-2xl backdrop-blur-md transition flex items-center gap-2 shadow-lg"
            >
              <Icons.Phone className="w-4 h-4" />
              <span>WhatsApp 24/7 (+51 998 675 270)</span>
            </a>
          </div>

          {/* 4 KPIs Flotantes con Glassmorphism */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-[#6CBE1A] font-mono">+1,250</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Baños en Operación</div>
            </div>
            <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-[#00A8E8] font-mono">100%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Cisternas Propias</div>
            </div>
            <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-[#C8A064] font-mono">18 Regiones</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Cobertura Nacional</div>
            </div>
            <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">DIGESA</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Residuos Homologados</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO TÉCNICO EXCLUSIVO DE BAÑOS PORTÁTILES (PASARELA DE FOTOS Y VISOR 360°) */}
      <section id="catalogo-sanitarios" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#6CBE1A] uppercase tracking-wider bg-[#6CBE1A]/20 px-3.5 py-1 rounded-full border border-[#6CBE1A]/30 font-mono">
            Equipamiento de Grado Industrial HDPE
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

      {/* 3. SECCIÓN DEDICADA DE COTIZACIÓN B2B Y CALCULADORA NORMA G.050 (AQUÍ ESTÁ EL COTIZADOR) */}
      <section id="seccion-cotizador" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#00A8E8] uppercase tracking-wider bg-[#00A8E8]/20 px-3.5 py-1 rounded-full border border-[#00A8E8]/30 font-mono">
            Dimensionamiento Técnico & Presupuesto Inmediato
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            Calculadora de la Norma Técnica G.050 y Cotizador en Obra
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Calcula la dotación legal de cabinas sanitarias según el número de trabajadores en tu frente de obra y cotiza al instante con tarifa corporativa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calculadora G.050 a la izquierda */}
          <div className="lg:col-span-7">
            <G050Calculator
              onTransferToQuote={(data) => {
                setQuotePrefill(data);
                // Scroll suave hacia el formulario de cotización
                const el = document.getElementById('sticky-quote-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </div>

          {/* Formulario de Cotización B2B a la derecha */}
          <div id="sticky-quote-form" className="lg:col-span-5">
            <StickyQuoteForm
              initialUnits={quotePrefill.units}
              initialFrequency={quotePrefill.frequency}
            />
          </div>
        </div>
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
