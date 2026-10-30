import React from 'react';
import Link from 'next/link';
import { HeroSplitScreen } from '@/components/marketing/HeroSplitScreen';
import { Icons } from '@/components/ui/Icons';

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SPLIT-SCREEN 50 / 50 */}
      <HeroSplitScreen />

      {/* 2. BARRA DE AUTORIDAD Y RESPALDO */}
      <section className="bg-white border-y border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black text-[#2E5A07]">+12 Años</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">Liderando Saneamiento y Hospedaje</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black text-[#00A8E8]">100% Propios</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">Camiones Hidrosuccionadores al Vacío</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black text-[#6CBE1A]">Norma G.050</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">Aprobado en Auditorías SUNAFIL</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black text-[#C8A064]">Facturación Única</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">Crédito 30 días para Constructoras</div>
          </div>
        </div>
      </section>

      {/* 3. BLOQUE ESTRATÉGICO B2B: CONVENIO INTEGRAL CONSTRUCTORA */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#142312] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="bg-[#6CBE1A]/20 text-[#6CBE1A] border border-[#6CBE1A]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Sinergia B2B Exclusiva en Perú
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-4 leading-tight">
              ¿Inicias una obra o proyecto en la región? <br />
              <span className="text-[#6CBE1A]">Sanitarios en el Frente de Trabajo</span> +{' '}
              <span className="text-[#C8A064]">Hotel para tus Ingenieros</span>
            </h3>

            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Optimiza la administración de tu constructora o consorcio. Unifica en un solo contrato homologado la dotación de baños portátiles con limpieza certificada y el hospedaje de tu staff técnico con una sola Factura Electrónica SUNAT mensual.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#6CBE1A] font-bold text-sm mb-1">✓ Un Solo Proveedor</div>
                <p className="text-xs text-slate-400">Menos papeleo administrativo y homologación directa.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#C8A064] font-bold text-sm mb-1">✓ Tarifa Paquete Mixto</div>
                <p className="text-xs text-slate-400">Hasta 25% de ahorro en tarifas hoteleras y de alquiler.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#00A8E8] font-bold text-sm mb-1">✓ Línea de Crédito</div>
                <p className="text-xs text-slate-400">Facilidades de pago a 30 o 60 días para consorcios.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/convenio-constructora"
                className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-6 py-3 rounded-xl transition text-sm flex items-center gap-2"
              >
                Solicitar Convenio Corporativo B2B
                <Icons.ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/dashboard"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl transition text-sm border border-white/20"
              >
                Ver Demostración del ERP Unificado
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
