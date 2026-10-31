'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';

interface PlanDetails {
  id: string;
  name: string;
  totalArea: string;
  category: string;
  spaces: { name: string; area: string; icon: string }[];
  specs: { label: string; value: string }[];
}

const ROOM_PLANS: Record<string, PlanDetails> = {
  simple: {
    id: 'simple',
    name: 'Simple Ejecutiva',
    totalArea: '28.5 m²',
    category: 'Ingenieros Residentes & Supervisores',
    spaces: [
      { name: 'Zona de Dormitorio (Cama 1.5 Plz)', area: '14.2 m²', icon: '🛏️' },
      { name: 'Escritorio de Trabajo Técnico & LAN', area: '5.8 m²', icon: '💻' },
      { name: 'Baño Completo con Ducha Hidromasaje', area: '5.1 m²', icon: '🚿' },
      { name: 'Hall de Ingreso & Clóset de EPP', area: '3.4 m²', icon: '🚪' },
    ],
    specs: [
      { label: 'Cama', value: '1.5 Plazas Ortopédica Pocket' },
      { label: 'Conectividad', value: 'Fibra Óptica 200 Mbps + LAN RJ45' },
      { label: 'Climatización', value: 'Aire Acondicionado Frío / Calor' },
      { label: 'Agua Caliente', value: 'Termo-tanque 24 Horas a Presión' },
    ],
  },
  matrimonial: {
    id: 'matrimonial',
    name: 'Matrimonial Superior',
    totalArea: '36.0 m²',
    category: 'Jefaturas & Consultores Externos',
    spaces: [
      { name: 'Dormitorio Principal (Cama Queen)', area: '18.5 m²', icon: '🛏️' },
      { name: 'Área de Estar & Mesa de Trabajo', area: '7.2 m²', icon: '🛋️' },
      { name: 'Baño Privado con Tina y Ducha Española', area: '6.5 m²', icon: '🚿' },
      { name: 'Balcón Exterior Panorámico', area: '3.8 m²', icon: '🌅' },
    ],
    specs: [
      { label: 'Cama', value: 'Queen Size Ergonómica 300 Hilos' },
      { label: 'Multimedia', value: 'Smart TV 55" 4K UHD con Streaming' },
      { label: 'Equipamiento', value: 'Frigobar silencioso y hervidor' },
      { label: 'Cochera', value: 'Espacio techado para camioneta 4x4' },
    ],
  },
  doble: {
    id: 'doble',
    name: 'Doble para Contratistas',
    totalArea: '42.0 m²',
    category: 'Cuadrillas Técnicas de Campo (2 Huéspedes)',
    spaces: [
      { name: 'Área de Descanso (2 Camas 1.5 Plz)', area: '22.0 m²', icon: '🛏️' },
      { name: 'Casilleros Individuales con Llave', area: '4.5 m²', icon: '🔐' },
      { name: 'Baño Compartido Doble Grifería', area: '7.5 m²', icon: '🚿' },
      { name: 'Zona de Descarga de Equipos/Herramientas', area: '8.0 m²', icon: '🧰' },
    ],
    specs: [
      { label: 'Camas', value: '2 Camas independientes de 1.5 Plazas' },
      { label: 'Seguridad', value: 'Lockers metálicos con clave/candado' },
      { label: 'Aislamiento', value: 'Paredes con atenuación acústica 45dB' },
      { label: 'Régimen', value: 'Desayuno buffet incluido desde 5:30 AM' },
    ],
  },
  suite: {
    id: 'suite',
    name: 'Suite Nelly Presidencial',
    totalArea: '65.0 m²',
    category: 'Gerencias de Consorcio & Minería',
    spaces: [
      { name: 'Master Bedroom (Cama King Size)', area: '26.0 m²', icon: '👑' },
      { name: 'Sala de Coordinaciones de Obra (6 Personas)', area: '18.5 m²', icon: '📊' },
      { name: 'Baño Principal con Jacuzzi & Ducha Doble', area: '11.5 m²', icon: '🛁' },
      { name: 'Kitchenette Equipado & Barra', area: '9.0 m²', icon: '☕' },
    ],
    specs: [
      { label: 'Capacidad', value: 'Sala técnica para reuniones de obra' },
      { label: 'Cama', value: 'King Size 2x2m con plumón térmico' },
      { label: 'Relax', value: 'Jacuzzi de hidromasaje 6 jets' },
      { label: 'Atención', value: 'Room service prioritario y cochera doble' },
    ],
  },
};

export const RoomBlueprintPlan: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('simple');
  const plan: PlanDetails = (ROOM_PLANS[selectedPlanId] ?? ROOM_PLANS.simple) as PlanDetails;

  return (
    <section className="bg-[#0B1322] text-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Glow de ambientación técnica */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A064]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cabecera del Componente */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A064]/15 border border-[#C8A064]/30 text-[#E5C388] text-xs font-mono font-bold uppercase mb-2">
            <Icons.Building className="w-3.5 h-3.5" />
            System Design Arquitectónico • Estándar Glasshaven
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            House & Room Plan
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Distribución modular optimizada para el descanso, trabajo remoto con planos y seguridad de herramientas.
          </p>
        </div>

        {/* Selector de Tipologías en Píldoras */}
        <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/80">
          {Object.values(ROOM_PLANS).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanId(p.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPlanId === p.id
                  ? 'bg-[#C8A064] text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal: Desglose de Metraje a la Izquierda + Plano Vectorial a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* COLUMNA 1: TABLA TÉCNICA DE ESPACIOS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono text-[#C8A064] uppercase font-bold tracking-wider">
              Categoría
            </span>
            <div className="text-lg font-black text-white mt-0.5">{plan.name}</div>
            <div className="text-xs text-slate-400 mt-0.5">{plan.category}</div>
            <div className="mt-3 inline-block bg-[#C8A064]/20 text-[#E5C388] font-mono font-black text-sm px-3 py-1 rounded-lg border border-[#C8A064]/40">
              Área Total: {plan.totalArea}
            </div>
          </div>

          {/* Lista de Ambientes y Metraje */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Desglose de Ambientes (m²):
            </div>
            {plan.spaces.map((sp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{sp.icon}</span>
                  <span className="text-slate-200 font-medium">{sp.name}</span>
                </div>
                <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                  {sp.area}
                </span>
              </div>
            ))}
          </div>

          {/* Especificaciones Constructivas */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {plan.specs.map((spec, i) => (
              <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                <div className="text-slate-400 font-semibold">{spec.label}</div>
                <div className="text-white font-bold mt-0.5 leading-tight">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: PLANO ARQUITECTÓNICO VECTORIAL 2D NATIVO (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border-2 border-slate-800/80 shadow-inner relative flex flex-col items-center">
          
          <div className="w-full flex justify-between items-center text-xs text-slate-400 mb-4 px-2">
            <span className="font-mono text-[11px] text-[#00A8E8] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00A8E8] animate-pulse" />
              PLANO ARQUITECTÓNICO COTA 1:50 • CAD VECTORIAL
            </span>
            <span className="font-mono text-[11px] bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-[#C8A064]">
              {plan.totalArea}
            </span>
          </div>

          {/* SVG Vectorial del Plano (Blueprint de Diseño Nativo) */}
          <div className="w-full max-w-[540px] aspect-[4/3] relative">
            <AnimatePresence mode="wait">
              <motion.svg
                key={plan.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                viewBox="0 0 600 450"
                className="w-full h-full filter drop-shadow-[0_0_20px_rgba(200,160,100,0.1)]"
              >
                <defs>
                  {/* Patrón de Rejilla de Plano Blueprint */}
                  <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="20" y2="0" stroke="#1E293B" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#1E293B" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* Fondo con Cuadrícula de Plano */}
                <rect width="600" height="450" fill="#0B1322" rx="16" />
                <rect width="600" height="450" fill="url(#gridPattern)" rx="16" opacity="0.6" />

                {/* Muros Perimetrales Exteriores (Grosor 8px) */}
                <rect
                  x="40"
                  y="40"
                  width="520"
                  height="370"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="8"
                  rx="6"
                />

                {/* Cotas y Medidas Exteriores */}
                <text x="300" y="28" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  ◀ 7.50 m Fachada Exterior ▶
                </text>
                <text x="18" y="235" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 18 235)">
                  ◀ 5.20 m Fondo ▶
                </text>

                {/* División Interna: Muro Divisorio Baño / Dormitorio */}
                <line x1="220" y1="40" x2="220" y2="240" stroke="#475569" strokeWidth="6" />
                <line x1="40" y1="240" x2="220" y2="240" stroke="#475569" strokeWidth="6" />

                {/* Puerta de Ingreso Principal con Giro de Batiente (Arco de 90°) */}
                <path d="M 520 370 A 50 50 0 0 0 470 420" fill="none" stroke="#00A8E8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="520" y1="370" x2="470" y2="370" stroke="#00A8E8" strokeWidth="2.5" />
                <text x="475" y="390" fill="#00A8E8" fontSize="9" fontFamily="monospace">Ingreso</text>

                {/* AMBIENTE 1: BAÑO COMPLETO (Sector Superior Izquierdo) */}
                <rect x="50" y="50" width="160" height="180" fill="#0F172A" opacity="0.7" />
                <text x="130" y="75" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  BAÑO PRIVADO
                </text>

                {/* Ducha con rejilla de drenaje */}
                <rect x="60" y="90" width="65" height="65" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                <circle cx="92" cy="122" r="5" fill="#00A8E8" />
                <line x1="60" y1="90" x2="125" y2="155" stroke="#334155" strokeWidth="1" />
                <line x1="125" y1="90" x2="60" y2="155" stroke="#334155" strokeWidth="1" />

                {/* Inodoro (WC) */}
                <rect x="145" y="90" width="40" height="25" rx="4" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
                <ellipse cx="165" cy="130" rx="15" ry="18" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />

                {/* Lavamanos con Grifería */}
                <rect x="70" y="180" width="55" height="35" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                <circle cx="97" cy="195" r="4" fill="#00A8E8" />

                {/* Puerta del baño con arco de batiente */}
                <path d="M 220 180 A 35 35 0 0 1 185 215" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="180" x2="185" y2="215" stroke="#94A3B8" strokeWidth="2" />

                {/* AMBIENTE 2: DORMITORIO & DESCANSO */}
                {selectedPlanId === 'doble' ? (
                  // Doble cama 1.5 plz
                  <g>
                    {/* Cama 1 */}
                    <rect x="250" y="60" width="110" height="150" rx="6" fill="#1E293B" stroke="#C8A064" strokeWidth="2" />
                    <rect x="260" y="70" width="90" height="30" rx="4" fill="#334155" stroke="#64748B" />
                    <text x="305" y="150" fill="#E2E8F0" fontSize="10" fontFamily="monospace" textAnchor="middle">Cama 1.5 Plz</text>

                    {/* Cama 2 */}
                    <rect x="420" y="60" width="110" height="150" rx="6" fill="#1E293B" stroke="#C8A064" strokeWidth="2" />
                    <rect x="430" y="70" width="90" height="30" rx="4" fill="#334155" stroke="#64748B" />
                    <text x="475" y="150" fill="#E2E8F0" fontSize="10" fontFamily="monospace" textAnchor="middle">Cama 1.5 Plz</text>

                    {/* Mesa de noche central */}
                    <rect x="375" y="60" width="30" height="35" rx="3" fill="#334155" stroke="#64748B" />
                    <circle cx="390" cy="77" r="4" fill="#C8A064" />
                  </g>
                ) : (
                  // Cama Queen / King o Simple
                  <g>
                    <rect
                      x={selectedPlanId === 'suite' ? '300' : '320'}
                      y="60"
                      width={selectedPlanId === 'suite' ? '190' : '150'}
                      height="160"
                      rx="8"
                      fill="#1E293B"
                      stroke="#C8A064"
                      strokeWidth="2.5"
                    />
                    {/* Almohadas */}
                    <rect
                      x={selectedPlanId === 'suite' ? '315' : '330'}
                      y="70"
                      width={selectedPlanId === 'suite' ? '70' : '55'}
                      height="30"
                      rx="4"
                      fill="#334155"
                      stroke="#64748B"
                    />
                    <rect
                      x={selectedPlanId === 'suite' ? '405' : '400'}
                      y="70"
                      width={selectedPlanId === 'suite' ? '70' : '55'}
                      height="30"
                      rx="4"
                      fill="#334155"
                      stroke="#64748B"
                    />
                    {/* Cubrecama y text */}
                    <line
                      x1={selectedPlanId === 'suite' ? '300' : '320'}
                      y1="130"
                      x2={selectedPlanId === 'suite' ? '490' : '470'}
                      y2="130"
                      stroke="#C8A064"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={selectedPlanId === 'suite' ? '395' : '395'}
                      y="170"
                      fill="#E2E8F0"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {selectedPlanId === 'suite' ? 'KING SIZE 2.0x2.0m' : selectedPlanId === 'matrimonial' ? 'QUEEN SIZE' : 'CAMA 1.5 PLAZAS'}
                    </text>

                    {/* Mesitas de Noche Flanqueantes */}
                    <rect x={selectedPlanId === 'suite' ? '260' : '280'} y="60" width="30" height="35" rx="3" fill="#334155" stroke="#64748B" />
                    <rect x={selectedPlanId === 'suite' ? '500' : '480'} y="60" width="30" height="35" rx="3" fill="#334155" stroke="#64748B" />
                  </g>
                )}

                {/* AMBIENTE 3: ESTACIÓN DE TRABAJO TÉCNICO CAD & SMART TV */}
                <rect x="250" y="320" width="160" height="50" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                <rect x="300" y="330" width="60" height="30" rx="3" fill="#0F172A" stroke="#00A8E8" strokeWidth="1" />
                <text x="330" y="350" fill="#00A8E8" fontSize="8" fontFamily="monospace" textAnchor="middle">LAPTOP/CAD</text>
                
                {/* Silla Ergonómica */}
                <circle cx="330" cy="295" r="14" fill="#334155" stroke="#C8A064" strokeWidth="1.5" />
                <path d="M 320 285 Q 330 280 340 285" fill="none" stroke="#C8A064" strokeWidth="2" />

                {/* AMBIENTE 4: CLÓSET DE EPP & MALETAS */}
                <rect x="60" y="270" width="140" height="110" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                <text x="130" y="315" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  LOCKERS / EPP
                </text>
                <text x="130" y="335" fill="#64748B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Casco • Chaleco • Botas
                </text>

                {/* Sello de Autenticidad CAD */}
                <g transform="translate(420, 290)">
                  <rect width="115" height="55" fill="#0F172A" stroke="#C8A064" strokeWidth="1" rx="4" opacity="0.85" />
                  <text x="10" y="16" fill="#C8A064" fontSize="8" fontFamily="monospace" fontWeight="bold">INVERSIONES NELLY</text>
                  <text x="10" y="28" fill="#94A3B8" fontSize="7" fontFamily="monospace">PROYECTO: HOTEL NELLY</text>
                  <text x="10" y="40" fill="#94A3B8" fontSize="7" fontFamily="monospace">PLANO: ARQ-MOD-2026</text>
                </g>
              </motion.svg>
            </AnimatePresence>
          </div>

          <div className="text-[11px] text-slate-400 mt-4 text-center">
            Diseño arquitectónico registrado. Aislamiento acústico de 45 dB y cerraduras electrónicas de proximidad RFID.
          </div>
        </div>

      </div>
    </section>
  );
};
