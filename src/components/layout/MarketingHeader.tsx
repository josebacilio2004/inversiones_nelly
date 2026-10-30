'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NellyLogo } from '@/components/brand/NellyLogo';
import { Icons } from '@/components/ui/Icons';

export const MarketingHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {/* 1. TOP BAR CORPORATIVO B2B */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse"></span>
              RUC: <strong className="text-white">20608945123</strong>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
              <Icons.ShieldCheck className="w-4 h-4 text-[#00A8E8]" />
              Autorización Sanitaria DIGESA N° DIG-2024-EP
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <Icons.Phone className="w-3.5 h-3.5 text-[#6CBE1A]" />
              Central 24/7: (01) 719-8420 / 987-654-321
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="bg-[#6CBE1A] hover:bg-[#5aa314] text-slate-950 px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-[#6CBE1A]/20"
            >
              <Icons.Cpu className="w-3.5 h-3.5" />
              Acceso Intranet ERP
            </Link>
          </div>
        </div>
      </div>

      {/* 2. HEADER STICKY PRINCIPAL */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <NellyLogo size="md" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg transition ${
                pathname === '/'
                  ? 'text-slate-950 bg-slate-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Inicio Grupo
            </Link>

            {/* Sub-portal Sanitarios */}
            <div className="relative group">
              <Link
                href="/sanitarios-portatiles"
                className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition ${
                  pathname === '/sanitarios-portatiles'
                    ? 'text-[#2E5A07] bg-[#6CBE1A]/15 font-bold border border-[#6CBE1A]/30'
                    : 'text-slate-700 hover:text-[#2E5A07] hover:bg-slate-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#6CBE1A]"></span>
                Eco-Sanitarios Portátiles
                <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
              </Link>

              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all">
                <Link
                  href="/sanitarios-portatiles"
                  className="block p-2.5 rounded-lg hover:bg-slate-50"
                >
                  <div className="text-xs font-bold text-slate-800">Catálogo para Obras y Minería</div>
                  <div className="text-[11px] text-slate-500">Cabinas HDPE y tanques de 210L según Norma G.050</div>
                </Link>
                <Link
                  href="/sanitarios-portatiles#g050-calculator"
                  className="block p-2.5 rounded-lg hover:bg-slate-50 border-t border-slate-100"
                >
                  <div className="text-xs font-bold text-[#6CBE1A]">Calculadora Norma G.050</div>
                  <div className="text-[11px] text-slate-500">Cálculo exacto de inodoros por cantidad de obreros</div>
                </Link>
                <Link
                  href="/sanitarios-portatiles"
                  className="block p-2.5 rounded-lg hover:bg-slate-50 border-t border-slate-100"
                >
                  <div className="text-xs font-bold text-[#00A8E8]">Servicio de Succión Hidrostática</div>
                  <div className="text-[11px] text-slate-500">Desinfección periódica y certificado DIGESA</div>
                </Link>
              </div>
            </div>

            {/* Sub-portal Hotel */}
            <div className="relative group">
              <Link
                href="/hotel"
                className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition ${
                  pathname === '/hotel'
                    ? 'text-[#8a6828] bg-[#C8A064]/15 font-bold border border-[#C8A064]/30'
                    : 'text-slate-700 hover:text-[#8a6828] hover:bg-slate-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#C8A064]"></span>
                Hotel & Hospedaje Ejecutivo
                <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
              </Link>

              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all">
                <Link href="/hotel" className="block p-2.5 rounded-lg hover:bg-slate-50">
                  <div className="text-xs font-bold text-slate-800">Habitaciones & Tarifas Corporativas</div>
                  <div className="text-[11px] text-slate-500">Simple Ejecutiva, Matrimonial, Doble y Suites</div>
                </Link>
                <Link href="/hotel" className="block p-2.5 rounded-lg hover:bg-slate-50 border-t border-slate-100">
                  <div className="text-xs font-bold text-[#C8A064]">Alojamiento para Contratistas</div>
                  <div className="text-[11px] text-slate-500">Cocheras para camionetas 4x4 y desayuno a campo</div>
                </Link>
              </div>
            </div>

            {/* Convenio Mixto */}
            <Link
              href="/convenio-constructora"
              className={`px-3.5 py-2 rounded-lg font-medium transition ${
                pathname === '/convenio-constructora'
                  ? 'text-indigo-600 bg-indigo-50 font-bold'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              Convenio Integral Constructora
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sanitarios-portatiles#sticky-quote-form"
              className="bg-[#2E5A07] hover:bg-[#234505] text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-2"
            >
              <Icons.Truck className="w-4 h-4 text-[#6CBE1A]" />
              Cotizar Baños para Obra
            </Link>

            <Link
              href="/admin/dashboard"
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5"
            >
              <Icons.Cpu className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span className="hidden sm:inline">Panel ERP</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
