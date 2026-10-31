'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HotelRoomCatalog } from '@/components/marketing/HotelRoomCatalog';
import { Icons } from '@/components/ui/Icons';

export default function HotelPage() {
  return (
    <div className="pb-16 bg-[#F8FAFC]">
      {/* 1. HERO HOSPITALIDAD CON FOTOGRAFÍA Y MOTION */}
      <section className="relative min-h-[460px] lg:min-h-[520px] bg-[#0F172A] text-white flex items-center overflow-hidden">
        {/* Background photo with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
            alt="Hotel Nelly Instalaciones"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C8A064]/20 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="max-w-2xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A064]/20 border border-[#C8A064]/40 text-[#E5C388] text-xs font-bold uppercase tracking-wider"
            >
              <Icons.Bed className="w-4 h-4" />
              Hospedaje & Confort para Equipos de Trabajo
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Descanso Ejecutivo & Hospitalidad en el{' '}
              <span className="text-[#C8A064]">Hotel Nelly</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              Instalaciones de primer nivel diseñadas para contratistas, ingenieros y supervisores de obra. Habitaciones climatizadas, conexión Wi-Fi de alta velocidad, cochera techada para camionetas 4x4 y tarifas corporativas preferenciales con factura SUNAT mensual.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2 text-xs"
            >
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
                <Icons.CheckCircle className="w-4 h-4 text-[#C8A064]" />
                Cochera cerrada con vigilancia 24h
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
                <Icons.CheckCircle className="w-4 h-4 text-[#C8A064]" />
                Desayuno temprano 05:30 AM
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
                <Icons.CheckCircle className="w-4 h-4 text-[#C8A064]" />
                Convenios corporativos -25%
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO DE HABITACIONES INTERACTIVO */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <HotelRoomCatalog />
      </section>

      {/* 3. SERVICIOS COMPLEMENTARIOS */}
      <section className="bg-slate-100 py-16 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#8a6828] uppercase tracking-wider bg-[#C8A064]/20 px-3 py-1 rounded-full">
              Infraestructura para Contratistas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Servicios Diseñados para la Dinámica de Obra
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Todo lo que tus ingenieros y técnicos necesitan para mantenerse operativos y descansados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C8A064]/20 text-[#8a6828] flex items-center justify-center mb-4">
                  <Icons.Truck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Cochera para Camionetas 4x4</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Patio cerrado de estacionamiento vigilado las 24 horas con cámaras perimetrales. Espacio amplio para camionetas de supervisión, pick-ups y herramientas de valor.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#6CBE1A]/20 text-[#2E5A07] flex items-center justify-center mb-4">
                  <Icons.ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Desayuno Ejecutivo Temprano</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Servicio de desayuno nutritivo a partir de las 05:30 AM para cuadrillas que deben ingresar puntuales a la charla de seguridad matutina y al frente de trabajo.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#00A8E8]/20 text-[#00A8E8] flex items-center justify-center mb-4">
                  <Icons.FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Facturación Electrónica Consolidada</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Emisión periódica de facturas detalladas por centro de costos, huéspedes y noches consumidas, simplificando la rendición de cuentas de tu consorcio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
