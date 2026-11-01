'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/i18n';

export const CorporateMasterHero: React.FC = () => {
  const { language } = useAppStore();
  const t = translations[language];

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] bg-[#0B1322] text-white overflow-hidden flex items-center">
      {/* Background de Edificios Corporativos Más Visible (Requerimiento Usuario) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85"
          alt="Edificios e Infraestructura Corporativa Inversiones Nelly S.A.C."
          className="w-full h-full object-cover opacity-50 filter brightness-105 contrast-110"
        />
        {/* Overlays graduados para permitir alta visibilidad de los rascacielos sin perder legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1322]/90 via-[#0F172A]/75 to-[#0B1322]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1322] via-transparent to-[#0B1322]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6CBE1A]/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C8A064]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Mensaje Corporativo Maestro (Mobile-first responsive) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse"></span>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                {t.heroBadge}
              </span>
              <span className="text-[10px] bg-[#6CBE1A]/20 text-[#6CBE1A] px-2 py-0.5 rounded font-mono font-bold">
                RUC 20608945123
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12]"
            >
              {t.heroTitlePart1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6CBE1A] to-[#00A8E8]">
                {t.heroTitleSanitation}
              </span>{' '}
              {t.heroTitleAnd}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C388] to-[#C8A064]">
                {t.heroTitleHospitality}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-200 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl font-normal drop-shadow-sm"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Métricas Corporativas Clave Responsivas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2"
            >
              <div className="bg-slate-900/85 border border-slate-800/90 p-3 sm:p-3.5 rounded-2xl backdrop-blur-md shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-[#6CBE1A] font-mono">{t.heroYears}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">{t.heroYearsSub}</div>
              </div>
              <div className="bg-slate-900/85 border border-slate-800/90 p-3 sm:p-3.5 rounded-2xl backdrop-blur-md shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-[#00A8E8] font-mono">{t.heroTrucks}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">{t.heroTrucksSub}</div>
              </div>
              <div className="bg-slate-900/85 border border-slate-800/90 p-3 sm:p-3.5 rounded-2xl backdrop-blur-md shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-[#C8A064] font-mono">{t.heroDigesa}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">{t.heroDigesaSub}</div>
              </div>
              <div className="bg-slate-900/85 border border-slate-800/90 p-3 sm:p-3.5 rounded-2xl backdrop-blur-md shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-white font-mono">{t.heroService247}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">{t.heroService247Sub}</div>
              </div>
            </motion.div>

            {/* CTAs Principales con Soporte Mobile (w-full sm:w-auto) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3"
            >
              <Link
                href="/sanitarios-portatiles"
                className="w-full sm:w-auto bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-[#6CBE1A]/25 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Icons.Truck className="w-4 h-4" />
                <span>{t.heroCtaToilets}</span>
                <Icons.ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/hotel"
                className="w-full sm:w-auto bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-[#C8A064]/25 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Icons.Bed className="w-4 h-4" />
                <span>{t.heroCtaHotel}</span>
                <Icons.ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/convenio-constructora"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3.5 rounded-2xl border border-white/20 transition text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span>{t.heroCtaConvenio}</span>
              </Link>
            </motion.div>
          </div>

          {/* Columna Derecha: Tarjetas de las 2 Divisiones */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card División Sanitarios */}
            <Link href="/sanitarios-portatiles" className="block group">
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-r from-slate-900/95 to-[#142312]/95 border-2 border-[#6CBE1A]/40 rounded-3xl p-4 sm:p-5 shadow-2xl overflow-hidden cursor-pointer backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-[#6CBE1A]/50">
                    <img
                      src="/images/sanitary_luxury_obra.jpg"
                      alt="Sanitarios de obra en frente de trabajo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#6CBE1A] uppercase tracking-wider bg-[#6CBE1A]/15 px-2.5 py-0.5 rounded-full inline-block">
                      {t.cardToiletsTag}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1 group-hover:text-[#6CBE1A] transition truncate">
                      {t.cardToiletsTitle}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 leading-snug">
                      {t.cardToiletsDesc}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#6CBE1A]/20 text-[#6CBE1A] shrink-0">
                    <Icons.ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Card División Hotel (SOLO FOTO DE HABITACIÓN, NO CAPTURA DE PÁGINA) */}
            <Link href="/hotel" className="block group">
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-r from-slate-900/95 to-[#221B13]/95 border-2 border-[#C8A064]/40 rounded-3xl p-4 sm:p-5 shadow-2xl overflow-hidden cursor-pointer backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  {/* Foto Real de Habitación Hotelera Ejecutiva */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-[#C8A064]/50">
                    <img
                      src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                      alt="Habitación Hotel Nelly Ejecutivo - Confort para Residentes de Obra"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#E5C388] uppercase tracking-wider bg-[#C8A064]/15 px-2.5 py-0.5 rounded-full inline-block">
                      {t.cardHotelTag}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1 group-hover:text-[#C8A064] transition truncate">
                      {t.cardHotelTitle}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 leading-snug">
                      {t.cardHotelDesc}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#C8A064]/20 text-[#C8A064] shrink-0">
                    <Icons.ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};
