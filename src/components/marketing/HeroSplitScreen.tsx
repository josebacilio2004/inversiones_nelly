import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

export const HeroSplitScreen: React.FC = () => {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] grid grid-cols-1 lg:grid-cols-2">
      {/* Lado Izquierdo: Sanitarios Portátiles (Verde + Azul) */}
      <div className="relative bg-gradient-to-br from-[#0F172A] via-[#142312] to-[#2E5A07] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6CBE1A]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6CBE1A]/20 transition-all duration-700"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/20 border border-[#6CBE1A]/40 text-[#6CBE1A] text-xs font-bold tracking-wide uppercase mb-6">
            <Icons.ShieldCheck className="w-4 h-4" />
            División Saneamiento & Obras Civiles
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4">
            Alquiler y Mantenimiento de <span className="text-[#6CBE1A]">Sanitarios Portátiles</span> en Obra
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
            Soluciones sanitarias homologadas bajo la <strong>Norma Técnica G.050</strong>. Flota propia de camiones hidrosuccionadores al vacío, químicos biodegradables y certificados DIGESA inmediatos.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
              <div className="text-lg font-black text-[#6CBE1A]">24 Horas</div>
              <div className="text-xs text-slate-300">Entrega garantizada en sitio</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
              <div className="text-lg font-black text-[#00A8E8]">100% Legal</div>
              <div className="text-xs text-slate-300">Certificación DIGESA ambiental</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 flex flex-wrap gap-4">
          <Link
            href="/sanitarios-portatiles"
            className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-[#6CBE1A]/30 transition flex items-center gap-2 text-sm"
          >
            <Icons.Truck className="w-4 h-4" />
            Entrar al Portal de Sanitarios
          </Link>
          <Link
            href="/sanitarios-portatiles#g050-calculator"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/20 transition flex items-center gap-2 text-sm"
          >
            <Icons.Calculator className="w-4 h-4 text-[#6CBE1A]" />
            Calculadora G.050
          </Link>
        </div>
      </div>

      {/* Lado Derecho: Hotel & Hospitalidad (Dorado + Slate) */}
      <div className="relative bg-gradient-to-br from-[#0B1322] via-[#1B1917] to-[#382E1E] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden group border-t lg:border-t-0 lg:border-l border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A064]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C8A064]/20 transition-all duration-700"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A064]/20 border border-[#C8A064]/40 text-[#E5C388] text-xs font-bold tracking-wide uppercase mb-6">
            <Icons.Bed className="w-4 h-4" />
            División Hotel & Hospedaje Corporativo
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4">
            Hotel Nelly: Descanso Ejecutivo & <span className="text-[#C8A064]">Estadías de Trabajo</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
            Confort premium pensado para ingenieros residentes, supervisores de campo y cuadrillas de contratistas. Habitaciones equipadas, cochera privada para camionetas 4x4 y factura SUNAT.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
              <div className="text-lg font-black text-[#C8A064]">Tarifas Obra</div>
              <div className="text-xs text-slate-300">25% de ahorro con convenio RUC</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
              <div className="text-lg font-black text-[#E5C388]">Cochera 4x4</div>
              <div className="text-xs text-slate-300">Vigilancia privada 24 horas</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 flex flex-wrap gap-4">
          <Link
            href="/hotel"
            className="bg-[#C8A064] hover:bg-[#b58d52] text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-[#C8A064]/30 transition flex items-center gap-2 text-sm"
          >
            <Icons.Bed className="w-4 h-4" />
            Ver Habitaciones & Reservar
          </Link>
          <Link
            href="/convenio-constructora"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/20 transition flex items-center gap-2 text-sm"
          >
            Convenio B2B para Empresas
          </Link>
        </div>
      </div>
    </section>
  );
};
