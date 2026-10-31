'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';

export const SanitarySectionPersonalized: React.FC = () => {
  return (
    <section id="enfoque-sanitarios" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow ambiental verde y celeste */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6CBE1A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la División */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6CBE1A]/20 border border-[#6CBE1A]/40 text-[#6CBE1A] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Icons.Truck className="w-4 h-4" />
            Enfoque Personal: División Saneamiento Ambiental
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Sanitarios Portátiles de Alto Rendimiento para{' '}
            <span className="text-[#6CBE1A]">Obras Civiles</span>,{' '}
            <span className="text-[#00A8E8]">Minería</span> y{' '}
            <span className="text-white">Eventos</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed"
          >
            En obras de construcción y campamentos mineros, la higiene no puede fallar. En <strong>Inversiones Nelly S.A.C.</strong> garantizamos cabinas en polietileno virgen anti-impacto (HDPE) con la dotación legal exacta exigida por la <strong>Norma Técnica G.050</strong>, vaciado hermético con camiones hidrosuccionadores propios y certificados ambientales DIGESA que protegen a tu empresa ante inspecciones de SUNAFIL.
          </motion.p>
        </div>

        {/* Grid de 3 Pilares con Imágenes Reales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pilar 1: Cabinas HDPE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700/80 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/sanitary_luxury_obra.jpg"
                  alt="Cabinas de obra en frente de trabajo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#6CBE1A] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                  Norma G.050
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Cabinas Resistentes de 210 Litros</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rotomoldeadas con polietileno virgen (HDPE), protección solar anti-UV, trampilla hermética y ventilación cruzada continua para evitar olores en campo abierto.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <span className="text-[11px] font-mono text-[#6CBE1A] font-bold">Autonomía: ~450 usos por tanque</span>
            </div>
          </motion.div>

          {/* Pilar 2: Camiones Cisterna Propios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700/80 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/logistics_peru_network.jpg"
                  alt="Flota de camiones hidrosuccionadores"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#00A8E8] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                  Flota Propia
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Succión Hidrostática al Vacío</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No tercerizamos. Contamos con camiones cisterna equipados con bomba de vacío industrial, manguera reforzada y lavado a presión. Cero derrames garantizado.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <span className="text-[11px] font-mono text-[#00A8E8] font-bold">Capacidad: 1,500 galones al vacío</span>
            </div>
          </motion.div>

          {/* Pilar 3: Certificación DIGESA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700/80 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/toilet_modern_cabin.png"
                  alt="Módulos higiénicos con certificación DIGESA"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#6CBE1A] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                  Legal & Ambiental
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Certificado Sanitario DIGESA</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Disposición final de efluentes en plantas y rellenos sanitarios autorizados. Entregamos el Manifiesto de Residuos exigido en auditorías de SUNAFIL y OEFA.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <span className="text-[11px] font-mono text-[#6CBE1A] font-bold">100% Homologación inmediata</span>
            </div>
          </motion.div>
        </div>

        {/* Acciones y Calculadora Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-800 via-[#132212] to-slate-800 border-2 border-[#6CBE1A]/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-xs font-bold text-[#6CBE1A] uppercase tracking-wider">
              ¿No sabes cuántos inodoros exige la ley para tu frente de obra?
            </div>
            <h4 className="text-xl font-black text-white mt-1">
              Usa nuestra Calculadora Interactiva según la Norma G.050
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Ingresa el número de operarios y turnos: obtén el cálculo exacto de cabinas, lavamanos y presupuesto en Soles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/sanitarios-portatiles#g050-calculator"
              className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black px-5 py-3 rounded-xl text-xs transition flex items-center gap-2 shadow-lg"
            >
              <Icons.Calculator className="w-4 h-4" />
              Abrir Calculadora G.050
            </Link>

            <Link
              href="/sanitarios-portatiles"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs border border-white/20 transition flex items-center gap-2"
            >
              Ver Catálogo Completo & Cotizar por RUC
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
