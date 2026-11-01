'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NellyLogo } from '@/components/brand/NellyLogo';
import { Icons } from '@/components/ui/Icons';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/i18n';

export const MarketingHeader: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage } = useAppStore();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP BAR CORPORATIVO B2B */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse"></span>
              {t.topBarRuc}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
              <Icons.ShieldCheck className="w-4 h-4 text-[#00A8E8]" />
              {t.topBarDigesa}
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <Icons.Phone className="w-3.5 h-3.5 text-[#6CBE1A]" />
              {t.topBarPhone}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Selector de Idioma (ES / EN) */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setLanguage('ES')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  language === 'ES'
                    ? 'bg-[#6CBE1A] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Español"
              >
                🇵🇪 ES
              </button>
              <button
                type="button"
                onClick={() => setLanguage('EN')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  language === 'EN'
                    ? 'bg-[#6CBE1A] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                🇺🇸 EN
              </button>
            </div>

            <Link
              href="/admin/dashboard"
              className="bg-[#6CBE1A] hover:bg-[#5aa314] text-slate-950 px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-[#6CBE1A]/20"
            >
              <Icons.Cpu className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.topBarErp}</span>
              <span className="sm:hidden">ERP</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. HEADER STICKY PRINCIPAL */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <NellyLogo size="md" />
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg transition ${
                pathname === '/'
                  ? 'text-slate-950 bg-slate-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.navGroupHome}
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
                {t.navToilets}
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
                {t.navHotel}
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
              {t.navJointDeal}
            </Link>
          </nav>

          {/* Acciones y Botón Hamburger Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/sanitarios-portatiles#sticky-quote-form"
              className="hidden sm:flex bg-[#2E5A07] hover:bg-[#234505] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm items-center gap-1.5"
            >
              <Icons.Truck className="w-4 h-4 text-[#6CBE1A]" />
              <span>{t.navQuoteBtn}</span>
            </Link>

            <Link
              href="/admin/dashboard"
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5"
            >
              <Icons.Cpu className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span className="hidden sm:inline">{t.navPanelErp}</span>
            </Link>

            {/* Botón Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 3. MENÚ DESPLEGABLE MÓVIL RESPONSIVE */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Idioma / Language:
              </span>
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setLanguage('ES')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    language === 'ES' ? 'bg-[#6CBE1A] text-slate-950' : 'text-slate-600'
                  }`}
                >
                  🇵🇪 Español
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('EN')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    language === 'EN' ? 'bg-[#6CBE1A] text-slate-950' : 'text-slate-600'
                  }`}
                >
                  🇺🇸 English
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === '/' ? 'bg-slate-100 text-slate-900' : 'text-slate-700'
                }`}
              >
                {t.navGroupHome}
              </Link>

              <Link
                href="/sanitarios-portatiles"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === '/sanitarios-portatiles'
                    ? 'bg-[#6CBE1A]/15 text-[#2E5A07]'
                    : 'text-slate-700'
                }`}
              >
                🚽 {t.navToilets}
              </Link>

              <Link
                href="/hotel"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === '/hotel'
                    ? 'bg-[#C8A064]/15 text-[#8a6828]'
                    : 'text-slate-700'
                }`}
              >
                🏨 {t.navHotel}
              </Link>

              <Link
                href="/convenio-constructora"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === '/convenio-constructora'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700'
                }`}
              >
                🤝 {t.navJointDeal}
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <Link
                href="/sanitarios-portatiles#sticky-quote-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#2E5A07] text-white py-3 rounded-xl text-xs font-bold text-center block shadow-md"
              >
                {t.navQuoteBtn}
              </Link>
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold text-center block"
              >
                {t.topBarErp}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
