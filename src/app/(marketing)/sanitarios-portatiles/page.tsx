'use client';

import React, { useState } from 'react';
import { StickyQuoteForm } from '@/components/marketing/StickyQuoteForm';
import { G050Calculator } from '@/components/marketing/G050Calculator';
import { SanitaryCatalogGrid } from '@/components/marketing/SanitaryCatalogGrid';
import { Icons } from '@/components/ui/Icons';

export default function SanitariosPage() {
  const [quotePrefill, setQuotePrefill] = useState<{ units: number; frequency: string }>({
    units: 5,
    frequency: '2 veces por semana',
  });

  return (
    <div className="pb-16">
      {/* 1. HERO B2B CON FORMULARIO STICKY DE COTIZACIÓN */}
      <section className="bg-gradient-to-b from-slate-900 to-[#142312] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/20 border border-[#6CBE1A]/40 text-[#6CBE1A] text-xs font-bold uppercase mb-4">
              <Icons.Truck className="w-4 h-4" />
              Flota Homologada a Nivel Nacional
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4">
              Alquiler de <span className="text-[#6CBE1A]">Sanitarios Portátiles</span> para Obras Civiles y Minería
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Cumplimiento irrestricto de la <strong>Norma Técnica G.050</strong>. Proveemos cabinas de alta durabilidad en polietileno virgen (HDPE), mantenimiento con camión cisterna al vacío y disposición final en rellenos sanitarios certificados por DIGESA.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-[#6CBE1A] shrink-0" />
                <span>Tanques 210L de gran autonomía</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-[#00A8E8] shrink-0" />
                <span>Bomba de pedal 100% manos libres</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-[#6CBE1A] shrink-0" />
                <span>Manifiesto DIGESA de residuos</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <StickyQuoteForm
              initialUnits={quotePrefill.units}
              initialFrequency={quotePrefill.frequency}
            />
          </div>
        </div>
      </section>

      {/* 2. WIDGET CALCULADORA NORMA G.050 */}
      <section id="g050-calculator" className="py-14 px-4 max-w-7xl mx-auto">
        <G050Calculator
          onTransferToQuote={(data) => {
            setQuotePrefill(data);
          }}
        />
      </section>

      {/* 3. CATÁLOGO TÉCNICO INTERACTIVO */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#2E5A07] uppercase tracking-wider bg-[#6CBE1A]/20 px-3 py-1 rounded-full">
            Equipamiento de Grado Industrial
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Catálogo Técnico de Sanitarios & Módulos Higiénicos
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Modelos rotomoldeados con garantía de higiene, estanqueidad y resistencia para las condiciones climáticas del Perú.
          </p>
        </div>

        <SanitaryCatalogGrid />
      </section>

      {/* 4. CICLO OPERATIVO DEL SERVICIO EN 4 PASOS */}
      <section className="bg-slate-900 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#00A8E8] uppercase tracking-wider">
              Procedimiento Estandarizado DIGESA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Ciclo de Servicio de Succión e Higiene
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Cómo garantizamos la operatividad continua de tus baños portátiles sin malos olores ni sanciones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Entrega en Obra', desc: 'Descarga con camión grúa plataforma y nivelación sobre terreno según el plano de seguridad.' },
              { step: '02', title: 'Succión Hidrostática', desc: 'Evacuación de lodos al vacío con manguera de alta presión hermética. Cero derrames.' },
              { step: '03', title: 'Químicos Biodegradables', desc: 'Lavado con hidrolavadora, recarga de bactericida aromático azul y dotación de papel higiénico.' },
              { step: '04', title: 'Certificado DIGESA', desc: 'Firma de guía de succión y emisión del manifiesto ambiental exigido por SUNAFIL y OEFA.' },
            ].map((s) => (
              <div key={s.step} className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 relative">
                <div className="text-4xl font-black text-[#6CBE1A]/30 mb-2 font-mono">{s.step}</div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
