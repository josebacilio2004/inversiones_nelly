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
    categoryLabel: 'Construcción & Obras Civiles',
    monthlyRate: 380,
    weeklyRate: 150,
    dailyRate: 65,
    badge: 'Norma G.050 Obligatorio',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80',
    description: 'Polietileno virgen de alta densidad (HDPE) con protección UV y ventilación cruzada. Diseñado para trabajo rudo en campamentos y obras civiles.',
    specs: {
      tankCapacity: '210 Litros (~450 usos)',
      dimensions: '1.12m x 1.18m x 2.25m',
      weight: '78 Kg',
      flushType: 'Gravedad c/ trampilla hermética',
      sink: 'Opcional externo',
      normCompliance: 'MINTRA - Norma Técnica G.050',
    },
  },
  {
    id: 'm2',
    code: 'IN-SAN-02',
    name: 'Sanitario Ejecutivo VIP (Lavamanos y Bomba de Pie)',
    category: 'EVENTOS_VIP',
    categoryLabel: 'Ingeniería / Eventos VIP',
    monthlyRate: 540,
    weeklyRate: 220,
    dailyRate: 95,
    badge: 'Confort Superior',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Cabina ejecutiva con lavamanos interno integrado, activación por bomba de pedal higiénica, espejo, perchero y dosificador de jabón antibacterial.',
    specs: {
      tankCapacity: '230 Litros c/ recirculación',
      dimensions: '1.20m x 1.20m x 2.30m',
      weight: '86 Kg',
      flushType: 'Bomba hidráulica de pie 100% manos libres',
      sink: 'Lavamanos autónomo integrado c/ espejo',
      normCompliance: 'Estándar Corporativo & Eventos',
    },
  },
  {
    id: 'm3',
    code: 'IN-SAN-03',
    name: 'Sanitario Accesible para Discapacitados',
    category: 'DISCAPACITADOS',
    categoryLabel: 'Inclusión & Universal',
    monthlyRate: 650,
    weeklyRate: 260,
    dailyRate: 110,
    badge: 'Ley 29973 Accesibilidad',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    description: 'Cabina extragrande de nivel cero con rampa de ingreso directo para silla de ruedas, pasamanos de apoyo perimetrales y tanque rebajado.',
    specs: {
      tankCapacity: '180 Litros',
      dimensions: '1.65m x 1.65m x 2.25m',
      weight: '115 Kg',
      flushType: 'Palanca ergonómica suave al tacto',
      sink: 'Lavamanos bajo alcance frontal',
      normCompliance: 'Reglamento Nacional de Edificaciones',
    },
  },
  {
    id: 'm4',
    code: 'IN-LAV-01',
    name: 'Lavamanos Portátil Doble Autónomo',
    category: 'LAVAMANOS',
    categoryLabel: 'Higiene & Desinfección',
    monthlyRate: 320,
    weeklyRate: 130,
    dailyRate: 55,
    badge: 'Bioseguridad DIGESA',
    imageUrl: 'https://images.unsplash.com/photo-1584772659345-0d04c000f606?auto=format&fit=crop&w=800&q=80',
    description: 'Estación doble de lavado de manos simultáneo. Funciona con bomba de pedal sin conexión a red de agua ni desagüe exterior.',
    specs: {
      tankCapacity: 'Agua limpia 85L | Residual 95L',
      dimensions: '0.85m x 0.65m x 1.40m',
      weight: '32 Kg (vacío)',
      flushType: 'Doble bomba pedal independiente',
      sink: '2 cubas gemelas con dispensador jabón',
      normCompliance: 'Protocolos Sanitarios MINSA',
    },
  },
  {
    id: 'm5',
    code: 'IN-DUC-01',
    name: 'Módulo de Ducha Portátil de Obra',
    category: 'DUCHAS',
    categoryLabel: 'Campamentos & Minería',
    monthlyRate: 420,
    weeklyRate: 170,
    dailyRate: 70,
    badge: 'Campamentos Lejanos',
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    description: 'Cabina hermética para aseo de personal en turnos rotativos. Piso antideslizante con desagüe perimetral y cortina vinílica de uso pesado.',
    specs: {
      tankCapacity: 'Conexión a red o cisterna externa',
      dimensions: '1.15m x 1.15m x 2.20m',
      weight: '72 Kg',
      flushType: 'Grifería economizadora de caudal',
      sink: 'Rejilla colectora c/ salida 2 pulgadas',
      normCompliance: 'D.S. 024-2016-EM Minería',
    },
  },
];

export const SanitaryCatalogGrid: React.FC = () => {
  const showToast = useAppStore((state) => state.showToast);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                src={model.imageUrl}
                alt={model.name}
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

          {/* Botón de Selección Rápida */}
          <div className="p-4 pt-0">
            <button
              onClick={() => {
                showToast('Modelo Seleccionado', `${model.name} cargado en el formulario`, 'info');
                document.getElementById('sticky-quote-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-[#2E5A07] hover:bg-[#234505] text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Icons.CheckCircle className="w-4 h-4 text-[#6CBE1A]" />
              Seleccionar para Cotizar
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
