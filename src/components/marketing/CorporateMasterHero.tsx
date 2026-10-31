'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';
import { NellyLogo } from '@/components/brand/NellyLogo';

export const CorporateMasterHero: React.FC = () => {
  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] bg-[#0B1322] text-white overflow-hidden flex items-center">
      {/* Background con imagen y overlay de alto contraste */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="Infraestructura y Corporativo Inversiones Nelly"
          className="w-full h-full object-cover opacity-25 filter brightness-90 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1322] via-[#0F172A]/90 to-[#0B1322]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6CBE1A]/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C8A064]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Mensaje Corporativo Maestro */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse"></span>
              <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                Grupo Empresarial Homologado en el Perú
              </span>
              <span className="text-[10px] bg-[#6CBE1A]/20 text-[#6CBE1A] px-2 py-0.5 rounded font-mono font-bold">
                RUC 20608945123
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12]"
            >
              Liderazgo Integral en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6CBE1A] to-[#00A8E8]">
                Saneamiento Ambiental
              </span>{' '}
              &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C388] to-[#C8A064]">
                Hospitalidad Corporativa
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl"
            >
              En <strong>Inversiones Nelly S.A.C.</strong> impulsamos los grandes proyectos de construcción, minería y eventos del Perú. Equipamos tus frentes de trabajo con sanitarios portátiles bajo la <strong>Norma Técnica G.050</strong> con succión hidrostática certificada por DIGESA, y brindamos el descanso estratégico para tus cuadrillas e ingenieros en nuestro <strong>Hotel Ejecutivo</strong> con facturación unificada.
            </motion.p>

            {/* Métricas Corporativas Clave */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-[#6CBE1A] font-mono">+12 Años</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Operando en todo el Perú</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-[#00A8E8] font-mono">100% Propios</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Camiones cisterna al vacío</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-[#C8A064] font-mono">DIGESA</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Certificación N° DIG-2024</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white font-mono">24/7</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Atención y emergencia</div>
              </div>
            </motion.div>

            {/* CTAs Principales */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <a
                href="#enfoque-sanitarios"
                className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-[#6CBE1A]/25 transition flex items-center gap-2 text-sm"
              >
                <Icons.Truck className="w-4 h-4" />
                División Eco-Sanitarios Portátiles
                <Icons.ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#enfoque-hotel"
                className="bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-[#C8A064]/25 transition flex items-center gap-2 text-sm"
              >
                <Icons.Bed className="w-4 h-4" />
                División Hotel & Hospedaje
                <Icons.ChevronRight className="w-4 h-4" />
              </a>

              <Link
                href="/convenio-constructora"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl border border-white/20 transition text-sm flex items-center gap-2"
              >
                Convenio B2B Factura Única
              </Link>
            </motion.div>
          </div>

          {/* Columna Derecha: Tarjetas de las 2 Divisiones */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card División Sanitarios */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gradient-to-r from-slate-900 to-[#142312] border-2 border-[#6CBE1A]/30 rounded-3xl p-5 shadow-2xl overflow-hidden cursor-pointer"
              onClick={() => {
                document.getElementById('enfoque-sanitarios')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-[#6CBE1A]/40">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=400&q=80"
                    alt="Sanitarios de obra"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-[#6CBE1A] uppercase tracking-wider bg-[#6CBE1A]/15 px-2.5 py-0.5 rounded-full inline-block">
                    Sector Industrial & Construcción
                  </span>
                  <h3 className="text-base font-black text-white mt-1 group-hover:text-[#6CBE1A] transition">
                    Eco-Sanitarios Portátiles
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                    Cabinas HDPE 210L, succión con camión cisterna al vacío e insumos biodegradables.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#6CBE1A]/20 text-[#6CBE1A] shrink-0">
                  <Icons.ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Card División Hotel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gradient-to-r from-slate-900 to-[#221B13] border-2 border-[#C8A064]/30 rounded-3xl p-5 shadow-2xl overflow-hidden cursor-pointer"
              onClick={() => {
                document.getElementById('enfoque-hotel')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-[#C8A064]/40">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80"
                    alt="Habitación de hotel"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-[#E5C388] uppercase tracking-wider bg-[#C8A064]/15 px-2.5 py-0.5 rounded-full inline-block">
                    Hospitalidad & Hospedaje
                  </span>
                  <h3 className="text-base font-black text-white mt-1 group-hover:text-[#C8A064] transition">
                    Hotel Nelly Ejecutivo
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                    Descanso para ingenieros y cuadrillas. Cocheras para camionetas 4x4 y desayuno a campo.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#C8A064]/20 text-[#C8A064] shrink-0">
                  <Icons.ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
