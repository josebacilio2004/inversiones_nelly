'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';
import { useAppStore } from '@/store/useAppStore';
import { Modal } from '@/components/ui/Modal';
import type { SanitaryModel } from '@/types';

interface ExtendedSanitaryModel extends SanitaryModel {
  gallery: string[];
}

const CATALOG_MODELS: ExtendedSanitaryModel[] = [
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
    gallery: [
      '/images/sanitary_luxury_obra.jpg',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    ],
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
    gallery: [
      '/images/sanitary_luxury_obra.jpg',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    ],
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
    gallery: [
      '/images/toilet_modern_cabin.png',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    ],
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
    gallery: [
      '/images/toilet_modern_cabin.png',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
      '/images/sanitary_luxury_obra.jpg',
    ],
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

  // Estado para la pasarela de imágenes independiente en cada tarjeta
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({
    m1: 0,
    m2: 0,
    m3: 0,
    m4: 0,
  });

  // Estado para el Frame Modal 360°
  const [inspectedModel, setInspectedModel] = useState<ExtendedSanitaryModel | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0); // 0° a 360°
  const [activeFrameTab, setActiveFrameTab] = useState<'360' | 'gallery' | 'blueprint'>('360');

  const nextImage = (modelId: string, galleryLength: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [modelId]: ((prev[modelId] ?? 0) + 1) % galleryLength,
    }));
  };

  const prevImage = (modelId: string, galleryLength: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [modelId]: ((prev[modelId] ?? 0) - 1 + galleryLength) % galleryLength,
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATALOG_MODELS.map((model, idx) => {
          const currentImgIndex = activeImageIndexes[model.id] ?? 0;
          const currentImgUrl = model.gallery[currentImgIndex] || model.imageUrl;

          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 1. Pasarela de Fotos en la Tarjeta */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 select-none">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImgUrl}
                      src={currentImgUrl}
                      alt={`${model.name} - Foto ${currentImgIndex + 1}`}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.7 }}
                      transition={{ duration: 0.25 }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/sanitary_luxury_obra.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                  {/* Badges superiores */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#6CBE1A] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                      {model.badge}
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 font-mono text-xs text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                    {model.code}
                  </span>

                  {/* Flechas de Navegación de Pasarela */}
                  <button
                    type="button"
                    onClick={(e) => prevImage(model.id, model.gallery.length, e)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition opacity-80 hover:opacity-100"
                    title="Foto anterior"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => nextImage(model.id, model.gallery.length, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition opacity-80 hover:opacity-100"
                    title="Siguiente foto"
                  >
                    ›
                  </button>

                  {/* Puntos Indicadores de Pasarela */}
                  <div className="absolute bottom-11 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {model.gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndexes((prev) => ({ ...prev, [model.id]: i }));
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImgIndex === i
                            ? 'bg-[#6CBE1A] w-5'
                            : 'bg-white/50 hover:bg-white'
                        }`}
                        title={`Ver foto ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Nombre y Categoría */}
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <h3 className="text-sm font-bold leading-tight">{model.name}</h3>
                    <div className="text-[11px] text-emerald-300 mt-0.5">{model.categoryLabel}</div>
                  </div>
                </div>

                {/* 2. Tarifas */}
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

                {/* 3. Especificaciones Técnicas */}
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

              {/* 4. Botones de Acción: Inspeccionar Frame 360° + Cotizar */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setInspectedModel(model);
                    setRotationAngle(0);
                    setActiveFrameTab('360');
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm border border-slate-700"
                >
                  <Icons.Search className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>Inspeccionar Cabina en Frame 360°</span>
                </button>

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
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 5. MODAL / FRAME DE INSPECCIÓN INTERACTIVA 360° DEL BAÑO PORTÁTIL    */}
      {/* ==================================================================== */}
      {inspectedModel && (
        <Modal
          isOpen={!!inspectedModel}
          onClose={() => setInspectedModel(null)}
          title={`Frame de Inspección Técnica: ${inspectedModel.name}`}
          maxWidth="xl"
        >
          <div className="space-y-6">
            
            {/* Pestañas de Vista del Frame */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setActiveFrameTab('360')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeFrameTab === '360'
                    ? 'bg-[#2E5A07] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🔄 Rotación 360° / Frame CAD</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFrameTab('gallery')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeFrameTab === 'gallery'
                    ? 'bg-[#2E5A07] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📸 Pasarela Fotográfica HD ({inspectedModel.gallery.length} fotos)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFrameTab('blueprint')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeFrameTab === 'blueprint'
                    ? 'bg-[#2E5A07] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📐 Ficha Técnica & Planos G.050</span>
              </button>
            </div>

            {/* CONTENIDO PESTAÑA 1: SIMULADOR 360° / FRAME */}
            {activeFrameTab === '360' && (
              <div className="space-y-5">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                  
                  {/* SVG CAD Turntable Interactivo según el ángulo de giro */}
                  <div className="relative w-72 h-80 flex items-center justify-center">
                    <svg viewBox="0 0 300 360" className="w-full h-full">
                      <defs>
                        <radialGradient id="turntableGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#6CBE1A" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#0B1322" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      {/* Plataforma Giratoria */}
                      <ellipse cx="150" cy="310" rx="110" ry="25" fill="url(#turntableGlow)" />
                      <ellipse cx="150" cy="310" rx="90" ry="18" fill="none" stroke="#6CBE1A" strokeWidth="1.5" strokeDasharray="4 4" />

                      {/* Cabina 3D Proyectada con Rotación */}
                      <g transform={`rotate(${(rotationAngle - 180) * 0.15}, 150, 180)`}>
                        {/* Sombra de la base */}
                        <ellipse cx="150" cy="285" rx="55" ry="14" fill="#0F172A" opacity="0.8" />

                        {/* Cuerpo de la Cabina */}
                        <rect
                          x="100"
                          y="80"
                          width="100"
                          height="200"
                          rx="12"
                          fill="#1E293B"
                          stroke="#6CBE1A"
                          strokeWidth="3"
                        />

                        {/* Techo Translúcido */}
                        <path
                          d="M 90 85 Q 150 55 210 85 L 200 80 Q 150 50 100 80 Z"
                          fill="#6CBE1A"
                          opacity="0.85"
                        />

                        {/* Puerta y Rejillas frontales */}
                        {rotationAngle < 90 || rotationAngle > 270 ? (
                          // Vista Frontal
                          <g>
                            <rect x="115" y="105" width="70" height="165" rx="6" fill="#0F172A" stroke="#00A8E8" strokeWidth="1.5" />
                            <circle cx="125" cy="190" r="4" fill="#C8A064" />
                            <rect x="125" y="120" width="50" height="8" rx="2" fill="#334155" />
                            <text x="150" y="240" fill="#6CBE1A" fontSize="9" fontFamily="monospace" textAnchor="middle">INVERSIONES NELLY</text>
                            <text x="150" y="255" fill="#E2E8F0" fontSize="8" fontFamily="monospace" textAnchor="middle">{inspectedModel.code}</text>
                          </g>
                        ) : (
                          // Vista Lateral o Posterior
                          <g>
                            {/* Tubo de ventilación posterior */}
                            <rect x="175" y="60" width="12" height="220" rx="4" fill="#334155" stroke="#64748B" />
                            <ellipse cx="181" cy="60" rx="6" ry="2" fill="#6CBE1A" />
                            <text x="150" y="190" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">PANEL REFORZADO</text>
                            <text x="150" y="210" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">HDPE VIRGEN ANTI-UV</text>
                          </g>
                        )}
                      </g>

                      {/* Indicador de Ángulo */}
                      <text x="150" y="345" fill="#00A8E8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                        ÁNGULO: {rotationAngle}° • {rotationAngle < 45 || rotationAngle > 315 ? 'VISTA FRONTAL' : rotationAngle < 135 ? 'LATERAL DERECHA' : rotationAngle < 225 ? 'POSTERIOR' : 'LATERAL IZQUIERDA'}
                      </text>
                    </svg>
                  </div>

                  {/* Badge Flotante */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-[#6CBE1A]">
                    {inspectedModel.name}
                  </div>
                </div>

                {/* Control Deslizante de Rotación 360° */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                    <span>Girar Cabina (0° a 360°):</span>
                    <span className="font-mono text-[#2E5A07]">{rotationAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="w-full accent-[#6CBE1A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>Frontal (0°)</span>
                    <span>Lateral (90°)</span>
                    <span>Posterior (180°)</span>
                    <span>Lateral (270°)</span>
                    <span>Frontal (360°)</span>
                  </div>
                </div>
              </div>
            )}

            {/* CONTENIDO PESTAÑA 2: PASARELA FOTOGRÁFICA HD */}
            {activeFrameTab === 'gallery' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {inspectedModel.gallery.map((photo, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                    <img
                      src={photo}
                      alt={`${inspectedModel.name} - Ángulo ${i + 1}`}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-3 bg-white text-xs font-semibold text-slate-700">
                      Foto {i + 1}: {i === 0 ? 'Frente de Obra' : i === 1 ? 'Interior & Accesorios' : 'Detalle Operativo'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CONTENIDO PESTAÑA 3: FICHA TÉCNICA G.050 */}
            {activeFrameTab === 'blueprint' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Parámetros Constructivos</h4>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Capacidad Neta del Tanque:</span>
                    <span className="font-bold text-slate-900">{inspectedModel.specs.tankCapacity}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Dimensiones Exteriores:</span>
                    <span className="font-bold text-slate-900">{inspectedModel.specs.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Peso en Vacío:</span>
                    <span className="font-bold text-slate-900">{inspectedModel.specs.weight}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Mecanismo de Descarga:</span>
                    <span className="font-bold text-slate-900">{inspectedModel.specs.flushType}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Trazabilidad Sanitaria DIGESA</h4>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Normativa MINTRA:</span>
                    <span className="font-bold text-emerald-700">{inspectedModel.specs.normCompliance}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Frecuencia Succión Recomendada:</span>
                    <span className="font-bold text-slate-900">2 a 3 veces por semana</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Químico Biodegradable:</span>
                    <span className="font-bold text-slate-900">Bactericida Azul con aroma a pino</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Manifiesto de Residuos:</span>
                    <span className="font-bold text-slate-900">Entrega física y digital inmediata</span>
                  </div>
                </div>
              </div>
            )}

            {/* Botones del Modal */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setInspectedModel(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
              >
                Cerrar Frame
              </button>
              <a
                href="#sticky-quote-form"
                onClick={() => {
                  setInspectedModel(null);
                  showToast(
                    'Modelo Cargado para Cotización',
                    `Has cargado ${inspectedModel.name} al formulario de cotización.`,
                    'success'
                  );
                }}
                className="bg-[#2E5A07] hover:bg-[#234505] text-white px-6 py-2.5 rounded-xl text-xs font-black transition text-center shadow-md"
              >
                Cotizar este Sanitario Ahora
              </a>
            </div>

          </div>
        </Modal>
      )}
    </>
  );
};
