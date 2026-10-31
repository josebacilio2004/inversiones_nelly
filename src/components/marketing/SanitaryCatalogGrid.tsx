'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';
import { useAppStore } from '@/store/useAppStore';
import type { SanitaryModel } from '@/types';

const CATALOG_MODELS: SanitaryModel[] = [
  {
    id: 'm1',
    code: 'IN-SAN-01',
    name: 'Sanitario Estándar de Obra (Tanque 210L)',
    category: 'OBRA_MINERIA',
    categoryLabel: 'Construcción Civil & Obras',
    monthlyRate: 380,
    weeklyRate: 150,
    dailyRate: 65,
    badge: 'Norma G.050 Obligatorio',
    imageUrl: '/images/sanitary_luxury_obra.jpg',
    description: 'Polietileno virgen de alta densidad (HDPE) con protección anti-UV y ventilación cruzada continua. Diseñado para trabajo pesado en frentes de obra civil y campamentos.',
    specs: {
      tankCapacity: '210 Litros (~450 usos)',
      dimensions: '1.12m x 1.18m x 2.25m',
      weight: '78 Kg',
      flushType: 'Gravedad c/ trampilla hermética anti-olor',
      sink: 'Dispensador alcohol gel integrado',
      normCompliance: 'MINTRA - Norma Técnica G.050',
    },
  },
  {
    id: 'm2',
    code: 'IN-SAN-02',
    name: 'Sanitario Ejecutivo VIP (Lavamanos y Bomba de Pie)',
    category: 'EVENTOS_VIP',
    categoryLabel: 'Ingeniería / Supervisión VIP',
    monthlyRate: 540,
    weeklyRate: 220,
    dailyRate: 95,
    badge: 'Confort Superior',
    imageUrl: '/images/sanitary_luxury_obra.jpg',
    description: 'Cabina ejecutiva con lavamanos interno integrado, activación por bomba de pedal 100% manos libres, espejo biselado, perchero y dosificador antibacterial.',
    specs: {
      tankCapacity: '230 Litros c/ recirculación química',
      dimensions: '1.20m x 1.20m x 2.30m',
      weight: '86 Kg',
      flushType: 'Bomba hidráulica de pie 100% manos libres',
      sink: 'Lavamanos autónomo c/ espejo y toallero',
      normCompliance: 'Estándar Corporativo de Obra',
    },
  },
  {
    id: 'm3',
    code: 'IN-SAN-03',
    name: 'Sanitario Accesible Universal (Discapacitados)',
    category: 'DISCAPACITADOS',
    categoryLabel: 'Inclusión & Accesibilidad',
    monthlyRate: 650,
    weeklyRate: 260,
    dailyRate: 110,
    badge: 'Ley 29973 Accesibilidad',
    imageUrl: '/images/toilet_modern_cabin.png',
    description: 'Cabina extragrande de nivel cero con rampa de ingreso directo para silla de ruedas, pasamanos de apoyo perimetrales de acero inoxidable y tanque rebajado.',
    specs: {
      tankCapacity: '180 Litros',
      dimensions: '1.65m x 1.65m x 2.25m',
      weight: '115 Kg',
      flushType: 'Palanca ergonómica suave al tacto',
      sink: 'Lavamanos bajo de alcance frontal',
      normCompliance: 'Reglamento Nacional de Edificaciones',
    },
  },
  {
    id: 'm4',
    code: 'IN-SAN-04',
    name: 'Sanitario Autónomo de Alta Rotación',
    category: 'OBRA_MINERIA',
    categoryLabel: 'Mega-Obras & Eventos Masivos',
    monthlyRate: 590,
    weeklyRate: 240,
    dailyRate: 100,
    badge: 'Alta Densidad',
    imageUrl: '/images/toilet_modern_cabin.png',
    description: 'Módulo de saneamiento autónomo de alto tránsito. Puerta corredera con indicador de libre/ocupado, panel solar superior para luz LED y recirculación química reforzada.',
    specs: {
      tankCapacity: '250 Litros (~550 usos)',
      dimensions: '1.25m x 1.25m x 2.35m',
      weight: '92 Kg',
      flushType: 'Bomba de doble acción sellada',
      sink: 'Lavamanos higiénico con pedal',
      normCompliance: 'Norma Técnica DIGESA / MINSA',
    },
  },
];

export const SanitaryCatalogGrid: React.FC = () => {
  const showToast = useAppStore((state) => state.showToast);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {CATALOG_MODELS.map((model, idx) => (
        <motion.div
          key={model.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          whileHover={{ y: -6 }}
          className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            {/* Imagen del Modelo con Overlay */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900 group">
              <img
                src={model.imageUrl || '/images/sanitary_luxury_obra.jpg'}
                alt={model.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/sanitary_luxury_obra.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-[#6CBE1A] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                  {model.badge}
                </span>
              </div>
              <span className="absolute top-3 right-3 font-mono text-xs text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                {model.code}
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-sm font-bold leading-tight">{model.name}</h3>
                <div className="text-[11px] text-emerald-300 mt-0.5">{model.categoryLabel}</div>
              </div>
            </div>

            {/* Tarifas */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Tarifa Mensual</div>
                <div className="text-xl font-black text-[#2E5A07]">
                  S/ {model.monthlyRate} <span className="text-xs font-normal text-slate-500">/ mes</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Tarifa Semanal</div>
                <div className="text-xs font-bold text-slate-700">S/ {model.weeklyRate}</div>
              </div>
            </div>

            {/* Especificaciones Técnicas */}
            <div className="p-4 space-y-2.5 text-xs">
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                {model.description}
              </p>

              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 border border-slate-100 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-500">Capacidad Tanque:</span>
                  <span className="font-bold text-slate-800">{model.specs.tankCapacity}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-500">Dimensiones:</span>
                  <span className="font-bold text-slate-800">{model.specs.dimensions}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-500">Sistema Descarga:</span>
                  <span className="font-bold text-slate-800">{model.specs.flushType}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-500">Normativa:</span>
                  <span className="font-bold text-[#2E5A07]">{model.specs.normCompliance}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 pt-0">
            <a
              href="#sticky-quote-form"
              onClick={() => {
                showToast(
                  'Modelo Seleccionado para Cotización',
                  `Has seleccionado el modelo ${model.name}. Completa el formulario para recibir la propuesta formal.`,
                  'info'
                );
              }}
              className="w-full block text-center bg-[#2E5A07] hover:bg-[#234505] text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm"
            >
              Cotizar este Sanitario
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
