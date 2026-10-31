'use client';

import React, { useState, useMemo, useEffect } from 'react';

// ============================================================================
// INVERSIONES NELLY S.A.C. - SISTEMA WEB INTEGRADO & ERP CORPORATIVO
// Arquitectura: Next.js 15 App Router Simulator (Marketing + ERP Unificado)
// Stack: React, TypeScript, Tailwind CSS, Docker Architecture Ready
// Paleta Oficial:
//   - Verde Ecológico Primario: #6CBE1A (Oscuro: #2E5A07)
//   - Dorado Hospitalidad: #C8A064 (Claro: #F5EBE0)
//   - Azul Succión & Agua: #00A8E8
//   - Slate Corporativo: #0F172A
// ============================================================================

// --- TIPOS DE DOMINIO STRICT EN TYPESCRIPT ---
export type AppRoute = 
  | '/'
  | '/sanitarios-portatiles'
  | '/hotel'
  | '/admin/dashboard'
  | '/convenio-constructora';

export type ErpTab = 'kpis' | 'sanitarios' | 'hotel' | 'facturacion' | 'docker';

export type SanitaryCategory = 'OBRA_MINERIA' | 'EVENTOS_VIP' | 'DISCAPACITADOS' | 'LAVAMANOS' | 'DUCHAS';
export type UnitStatus = 'DISPONIBLE' | 'ALQUILADO_EN_OBRA' | 'EN_MANTENIMIENTO' | 'DESINFECCION';
export type RoomStatus = 'DISPONIBLE' | 'OCUPADA' | 'LIMPIEZA_PENDIENTE' | 'MANTENIMIENTO';
export type RoomType = 'SIMPLE_EJECUTIVA' | 'MATRIMONIAL' | 'DOBLE_CORPORATIVA' | 'SUITE_NELLY';

export interface SanitaryModel {
  id: string;
  code: string;
  name: string;
  category: SanitaryCategory;
  categoryLabel: string;
  monthlyRate: number;
  weeklyRate: number;
  dailyRate: number;
  description: string;
  badge: string;
  imageUrl?: string;
  specs: {
    tankCapacity: string;
    dimensions: string;
    weight: string;
    flushType: string;
    sink: string;
    normCompliance: string;
  };
}

export interface RentalContract {
  id: string;
  code: string;
  ruc: string;
  companyName: string;
  projectName: string;
  location: string;
  modelCode: string;
  modelName: string;
  unitsCount: number;
  assignedSeries: string[];
  cleaningFrequency: string;
  monthlyRate: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVO' | 'COTIZACION' | 'MANTENIMIENTO';
  lastSuctionDate: string;
  digesaCertNumber: string;
}

export interface HotelRoom {
  id: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  typeName: string;
  basePrice: number;
  corporatePrice: number;
  status: RoomStatus;
  currentGuest?: string;
  guestDoc?: string;
  checkIn?: string;
  checkOut?: string;
  amenities: string[];
  imageUrl?: string;
  gallery?: string[];
}

export interface HotelBooking {
  id: string;
  bookingCode: string;
  roomNumber: string;
  guestName: string;
  docNumber: string;
  companyName: string;
  isCorporate: boolean;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  status: 'CONFIRMADA' | 'CHECK_IN' | 'CHECK_OUT';
}

export interface Invoice {
  id: string;
  number: string;
  type: 'FACTURA' | 'BOLETA';
  docNumber: string;
  clientName: string;
  businessUnit: 'SANITARIOS' | 'HOTEL' | 'CONVENIO_INTEGRAL';
  amount: number;
  igv: number;
  total: number;
  date: string;
  sunatStatus: 'ACEPTADO_SUNAT' | 'PENDIENTE';
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

// --- ICONOS VECTORIALES EMBEBIDOS DE ALTA PRECISIÓN ---
const Icons = {
  Truck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14v10" />
      <circle cx="17" cy="18.5" r="2.5" />
      <circle cx="7" cy="18.5" r="2.5" />
    </svg>
  ),
  Bed: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  ),
  ShieldCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Droplets: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-.86 2.82-1.29 3.76S4 11.09 4 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  ),
  CheckCircle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Calculator: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  ),
  Building: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  ),
  FileText: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),
  Cpu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  ),
  Copy: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Phone: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ChevronRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Sparkles: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  RefreshCw: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  ),
  Check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
};

// ============================================================================
// COMPONENTE: ISOTIPO Y LOGO OFICIAL INVERSIONES NELLY S.A.C.
// Aro verde ecológico y azul agua, hojas a la izquierda, I en dorado, N en verde
// ============================================================================
export const NellyLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; darkTheme?: boolean }> = ({ 
  size = 'md', 
  darkTheme = false 
}) => {
  const dim = size === 'sm' ? 36 : size === 'lg' ? 64 : 48;
  return (
    <div className="flex items-center gap-3 select-none">
      <svg 
        width={dim} 
        height={dim} 
        viewBox="0 0 120 120" 
        className="shrink-0 transition-transform hover:scale-105 duration-300"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6CBE1A" />
            <stop offset="45%" stopColor="#00A8E8" />
            <stop offset="85%" stopColor="#2E5A07" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E5A07" />
            <stop offset="100%" stopColor="#6CBE1A" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5C388" />
            <stop offset="100%" stopColor="#C8A064" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Círculo base con aro orgánico */}
        <circle cx="60" cy="60" r="54" fill="#0B1322" stroke="url(#ringGrad)" strokeWidth="4.5" />
        
        {/* Arco de agua/higiene interno */}
        <path 
          d="M 22 62 A 40 40 0 0 1 98 62" 
          fill="none" 
          stroke="#00A8E8" 
          strokeWidth="2.5" 
          strokeDasharray="4 2" 
          opacity="0.85" 
        />

        {/* Hojas verdes a la izquierda */}
        <path 
          d="M 20 62 C 16 48 30 38 34 50 C 36 58 26 64 20 62 Z" 
          fill="url(#leafGrad)" 
        />
        <path 
          d="M 22 56 C 26 50 32 50 32 54" 
          stroke="#A6E22E" 
          strokeWidth="1" 
          fill="none" 
        />
        <circle cx="28" cy="48" r="1.8" fill="#FFFFFF" opacity="0.9" filter="url(#glow)" />
        <circle cx="24" cy="54" r="1.2" fill="#00A8E8" opacity="0.8" />

        {/* Letra "I" en Dorado Hospitalidad (#C8A064) */}
        <g transform="translate(42, 38)">
          <path 
            d="M 2 2 H 16 M 9 2 V 44 M 2 44 H 16" 
            stroke="url(#goldGrad)" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            filter="url(#glow)"
          />
        </g>

        {/* Letra "N" en Verde Ecológico Primario (#6CBE1A) */}
        <g transform="translate(62, 38)">
          <path 
            d="M 4 44 V 2 L 28 44 V 2" 
            stroke="#6CBE1A" 
            strokeWidth="5.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Hoja superior derecha sobre la N */}
          <path 
            d="M 28 4 C 28 -4 40 -2 38 6 C 35 10 30 7 28 4 Z" 
            fill="url(#leafGrad)" 
          />
          <circle cx="34" cy="2" r="1" fill="#FFFFFF" />
        </g>
      </svg>

      <div className="flex flex-col">
        <span className={`font-black tracking-wider leading-none text-base md:text-lg ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
          INVERSIONES <span className="text-[#6CBE1A]">NELLY</span> <span className="text-[#C8A064] text-xs font-semibold">S.A.C.</span>
        </span>
        <span className="text-[10px] font-medium tracking-tight text-slate-400 mt-0.5">
          Eco-Sanitarios Portátiles & Hotel Ejecutivo • RUC 20608945123
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// DATA MAESTRA INICIAL (SEED)
// ============================================================================
const INITIAL_SAN_MODELS: SanitaryModel[] = [
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

const INITIAL_CONTRACTS: RentalContract[] = [
  {
    id: 'c1',
    code: 'CTR-2026-089',
    ruc: '20512345678',
    companyName: 'CONSORCIO VIAL DEL NORTE S.A.C.',
    projectName: 'Mejoramiento Carretera Tramo II',
    location: 'Km 42 Carretera Central - Chosica',
    modelCode: 'IN-SAN-01',
    modelName: 'Sanitario Estándar de Obra (Tanque 210L)',
    unitsCount: 8,
    assignedSeries: ['IN-BP-001', 'IN-BP-002', 'IN-BP-003', 'IN-BP-004', 'IN-BP-005', 'IN-BP-006', 'IN-BP-007', 'IN-BP-008'],
    cleaningFrequency: '2 veces por semana',
    monthlyRate: 3040,
    startDate: '2026-09-01',
    endDate: '2027-02-28',
    status: 'ACTIVO',
    lastSuctionDate: '2026-10-28',
    digesaCertNumber: 'DIG-RES-2026-4412'
  },
  {
    id: 'c2',
    code: 'CTR-2026-094',
    ruc: '20100070970',
    companyName: 'CONSTRUCTORA COSAPI INGENIERÍA S.A.',
    projectName: 'Edificio Residencial Las Praderas',
    location: 'Av. Javier Prado Este 2840, San Borja',
    modelCode: 'IN-SAN-02',
    modelName: 'Sanitario Ejecutivo VIP (Lavamanos y Bomba de Pie)',
    unitsCount: 4,
    assignedSeries: ['IN-BP-012', 'IN-BP-013', 'IN-BP-014', 'IN-BP-015'],
    cleaningFrequency: '3 veces por semana',
    monthlyRate: 2160,
    startDate: '2026-10-10',
    endDate: '2027-04-30',
    status: 'ACTIVO',
    lastSuctionDate: '2026-10-29',
    digesaCertNumber: 'DIG-RES-2026-4520'
  },
  {
    id: 'c3',
    code: 'CTR-2026-102',
    ruc: '20485961234',
    companyName: 'AGROEXPORTADORA DEL SUR S.A.A.',
    projectName: 'Campaña Cosecha Espárragos 2026',
    location: 'Fundo San José, Ica',
    modelCode: 'IN-SAN-01',
    modelName: 'Sanitario Estándar de Obra (Tanque 210L)',
    unitsCount: 12,
    assignedSeries: ['IN-BP-020', 'IN-BP-021', 'IN-BP-022', 'IN-BP-023', 'IN-BP-024', 'IN-BP-025', 'IN-BP-026', 'IN-BP-027', 'IN-BP-028', 'IN-BP-029', 'IN-BP-030', 'IN-BP-031'],
    cleaningFrequency: 'Interdiario (3x/semana)',
    monthlyRate: 4560,
    startDate: '2026-10-01',
    endDate: '2026-12-15',
    status: 'ACTIVO',
    lastSuctionDate: '2026-10-27',
    digesaCertNumber: 'DIG-RES-2026-4389'
  }
];

const INITIAL_ROOMS: HotelRoom[] = [
  // Piso 1
  { id: 'r101', roomNumber: '101', floor: 1, type: 'SIMPLE_EJECUTIVA', typeName: 'Simple Ejecutiva', basePrice: 110, corporatePrice: 85, status: 'DISPONIBLE', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Agua Caliente 24h', 'Smart TV 43"'] },
  { id: 'r102', roomNumber: '102', floor: 1, type: 'SIMPLE_EJECUTIVA', typeName: 'Simple Ejecutiva', basePrice: 110, corporatePrice: 85, status: 'OCUPADA', currentGuest: 'Ing. Carlos Mendoza (Consorcio Vial)', checkIn: '2026-10-25', checkOut: '2026-11-05', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Agua Caliente 24h', 'Smart TV 43"'] },
  { id: 'r103', roomNumber: '103', floor: 1, type: 'MATRIMONIAL', typeName: 'Matrimonial Superior', basePrice: 160, corporatePrice: 125, status: 'DISPONIBLE', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', amenities: ['Cama Queen', 'Frigobar', 'A/C Frío-Calor', 'Cochera Privada'] },
  { id: 'r104', roomNumber: '104', floor: 1, type: 'DOBLE_CORPORATIVA', typeName: 'Doble para Contratistas', basePrice: 190, corporatePrice: 145, status: 'OCUPADA', currentGuest: 'Supervisores Obra Cosapi (2 pers.)', checkIn: '2026-10-27', checkOut: '2026-11-02', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', amenities: ['2 Camas 1.5 plazas', 'Casilleros c/ llave', 'Cochera para Camioneta 4x4'] },

  // Piso 2
  { id: 'r201', roomNumber: '201', floor: 2, type: 'SIMPLE_EJECUTIVA', typeName: 'Simple Ejecutiva', basePrice: 110, corporatePrice: 85, status: 'LIMPIEZA_PENDIENTE', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', amenities: ['Wi-Fi 200Mbps', 'Escritorio de Obra', 'Smart TV'] },
  { id: 'r202', roomNumber: '202', floor: 2, type: 'SIMPLE_EJECUTIVA', typeName: 'Simple Ejecutiva', basePrice: 110, corporatePrice: 85, status: 'DISPONIBLE', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Agua Caliente'] },
  { id: 'r203', roomNumber: '203', floor: 2, type: 'MATRIMONIAL', typeName: 'Matrimonial Superior', basePrice: 160, corporatePrice: 125, status: 'OCUPADA', currentGuest: 'Lic. Mariana Valdivia (Auditora)', checkIn: '2026-10-28', checkOut: '2026-10-31', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', amenities: ['Cama Queen', 'Frigobar', 'Balcón'] },
  { id: 'r204', roomNumber: '204', floor: 2, type: 'DOBLE_CORPORATIVA', typeName: 'Doble para Contratistas', basePrice: 190, corporatePrice: 145, status: 'DISPONIBLE', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', amenities: ['2 Camas 1.5 plazas', 'Wi-Fi Alta Velocidad', 'Cochera'] },

  // Piso 3
  { id: 'r301', roomNumber: '301', floor: 3, type: 'SIMPLE_EJECUTIVA', typeName: 'Simple Ejecutiva', basePrice: 110, corporatePrice: 85, status: 'DISPONIBLE', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Smart TV'] },
  { id: 'r302', roomNumber: '302', floor: 3, type: 'SIMPLE_EJECUTIVA', typeName: 'Simple Ejecutiva', basePrice: 110, corporatePrice: 85, status: 'MANTENIMIENTO', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', amenities: ['En remodelación de pintura'] },
  { id: 'r303', roomNumber: '303', floor: 3, type: 'SUITE_NELLY', typeName: 'Suite Nelly Presidencial', basePrice: 280, corporatePrice: 220, status: 'DISPONIBLE', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', amenities: ['Cama King', 'Sala de Reuniones de Obra', 'Kitchenette', 'Hidromasaje'] },
  { id: 'r304', roomNumber: '304', floor: 3, type: 'SUITE_NELLY', typeName: 'Suite Nelly Presidencial', basePrice: 280, corporatePrice: 220, status: 'OCUPADA', currentGuest: 'Gerencia Minera Chinalco', checkIn: '2026-10-26', checkOut: '2026-11-04', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', amenities: ['Cama King', 'Sala Ejecutiva', 'Kitchenette'] }
];

const INITIAL_INVOICES: Invoice[] = [
  { id: 'inv1', number: 'F001-0004520', type: 'FACTURA', docNumber: '20512345678', clientName: 'CONSORCIO VIAL DEL NORTE S.A.C.', businessUnit: 'SANITARIOS', amount: 3040, igv: 547.20, total: 3587.20, date: '2026-10-01', sunatStatus: 'ACEPTADO_SUNAT' },
  { id: 'inv2', number: 'F001-0004521', type: 'FACTURA', docNumber: '20100070970', clientName: 'CONSTRUCTORA COSAPI INGENIERÍA S.A.', businessUnit: 'CONVENIO_INTEGRAL', amount: 4850, igv: 873.00, total: 5723.00, date: '2026-10-10', sunatStatus: 'ACEPTADO_SUNAT' },
  { id: 'inv3', number: 'B001-0001289', type: 'BOLETA', docNumber: '44556677', clientName: 'MENDOZA ROBLES CARLOS ALBERTO', businessUnit: 'HOTEL', amount: 440, igv: 79.20, total: 519.20, date: '2026-10-25', sunatStatus: 'ACEPTADO_SUNAT' }
];

// DICCIONARIO SIMULADO PADRÓN SUNAT
const SUNAT_DIRECTORY: Record<string, { name: string; address: string; representative: string }> = {
  '20512345678': { name: 'CONSORCIO VIAL DEL NORTE S.A.C.', address: 'Av. Industrial 450, Urb. Vulcano, Ate, Lima', representative: 'Ing. Carlos Mendoza' },
  '20100070970': { name: 'CONSTRUCTORA COSAPI INGENIERÍA S.A.', address: 'Av. República de Colombia 791, San Isidro, Lima', representative: 'Ing. Fernando Graña' },
  '20485961234': { name: 'AGROEXPORTADORA DEL SUR S.A.A.', address: 'Panamericana Sur Km 300, Subtanjalla, Ica', representative: 'Lic. Roberto Palacios' },
  '20608945123': { name: 'INVERSIONES NELLY S.A.C.', address: 'Av. Los Próceres 1240, Lima', representative: 'Nelly Gladys Rojas' },
  '10458923412': { name: 'PAREDES LOPEZ JAVIER ENRIQUE', address: 'Jr. Carabaya 550, Cercado de Lima', representative: 'Javier Paredes' }
};

// ============================================================================
// COMPONENTE PRINCIPAL (APPLICATION ROOT)
// ============================================================================
export default function InversionesNellyApp() {
  // Simulación de Enrutamiento de Next.js App Router
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');
  const [activeErpTab, setActiveErpTab] = useState<ErpTab>('kpis');

  // Estado Central Reactivo (Global Typed State)
  const [contracts, setContracts] = useState<RentalContract[]>(INITIAL_CONTRACTS);
  const [rooms, setRooms] = useState<HotelRoom[]>(INITIAL_ROOMS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Modales
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuctionModalOpen, setIsSuctionModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<HotelRoom | null>(null);
  const [selectedContractForSuction, setSelectedContractForSuction] = useState<RentalContract | null>(null);
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState<HotelRoom | null>(null);

  // Formulario Sticky de Cotización B2B
  const [quoteForm, setQuoteForm] = useState({
    docNumber: '20512345678',
    companyName: 'CONSORCIO VIAL DEL NORTE S.A.C.',
    contactName: 'Ing. Jorge Ramirez',
    phone: '987-654-321',
    email: 'contacto@vialnorte.pe',
    projectName: 'Ampliación Colectores de Desagüe',
    location: 'Lurín - Sector Industrial, Lima',
    modelCode: 'IN-SAN-01',
    unitsCount: 5,
    monthsCount: 3,
    cleaningFrequency: '2 veces por semana',
    isSunatLoading: false
  });

  // Calculadora Interactiva Norma G.050
  const [workersCount, setWorkersCount] = useState<number>(45);
  const [shiftsCount, setShiftsCount] = useState<number>(1);
  const [calculatorSector, setCalculatorSector] = useState<'OBRA' | 'MINERIA' | 'EVENTOS'>('OBRA');

  // Buscador de Habitaciones Hotel
  const [hotelFilter, setHotelFilter] = useState({
    checkIn: '2026-11-01',
    checkOut: '2026-11-05',
    guests: 1,
    isCorporateRate: true
  });

  // Toast Dispatcher
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5500);
  };

  // KPIs Calculados Dinámicamente en Tiempo Real
  const erpMetrics = useMemo(() => {
    const totalContractIncome = contracts
      .filter(c => c.status === 'ACTIVO')
      .reduce((sum, c) => sum + c.monthlyRate, 0);

    const occupiedRooms = rooms.filter(r => r.status === 'OCUPADA').length;
    const totalRooms = rooms.length;
    const occupancyPercentage = Math.round((occupiedRooms / totalRooms) * 100);

    const monthlyHotelEstIncome = rooms
      .filter(r => r.status === 'OCUPADA')
      .reduce((sum, r) => sum + (r.corporatePrice * 30), 0);

    const rentedSanitaryUnits = contracts
      .filter(c => c.status === 'ACTIVO')
      .reduce((sum, c) => sum + c.unitsCount, 0);
    const totalFleetUnits = 120; // Capacidad de inventario global

    const scheduledSuctionsToday = contracts.filter(c => c.status === 'ACTIVO').length;

    return {
      totalMonthlyIncome: totalContractIncome + monthlyHotelEstIncome,
      sanitaryIncome: totalContractIncome,
      hotelIncome: monthlyHotelEstIncome,
      occupiedRooms,
      totalRooms,
      occupancyPercentage,
      rentedSanitaryUnits,
      totalFleetUnits,
      fleetUtilization: Math.round((rentedSanitaryUnits / totalFleetUnits) * 100),
      scheduledSuctionsToday
    };
  }, [contracts, rooms]);

  // Cálculos Automáticos Norma Técnica Peruana G.050:
  // "Seguridad durante la construcción" - 1 inodoro cada 20 trabajadores (o fracción)
  const g050Results = useMemo(() => {
    const effectiveWorkers = calculatorSector === 'MINERIA' ? workersCount * 1.2 : workersCount;
    const toiletsRequired = Math.ceil(effectiveWorkers / 20);
    const sinksRequired = Math.ceil(effectiveWorkers / 20);
    
    // Frecuencia sugerida de succión por carga biológica
    let recommendedSuction = '1 vez por semana';
    let baseWeeklyMultiplier = 1;
    if (effectiveWorkers > 35 && effectiveWorkers <= 80) {
      recommendedSuction = '2 veces por semana (Recomendado)';
      baseWeeklyMultiplier = 1.35;
    } else if (effectiveWorkers > 80) {
      recommendedSuction = '3 veces por semana o Interdiario';
      baseWeeklyMultiplier = 1.7;
    }

    const estimatedMonthlyCost = (toiletsRequired * 380 * baseWeeklyMultiplier) + (sinksRequired * 280);

    return {
      toiletsRequired,
      sinksRequired,
      recommendedSuction,
      estimatedMonthlyCost: Math.round(estimatedMonthlyCost)
    };
  }, [workersCount, shiftsCount, calculatorSector]);

  // Autocompletado Simulado SUNAT
  const handleSunatLookup = (doc: string) => {
    setQuoteForm(prev => ({ ...prev, isSunatLoading: true }));
    setTimeout(() => {
      const match = SUNAT_DIRECTORY[doc.trim()];
      if (match) {
        setQuoteForm(prev => ({
          ...prev,
          docNumber: doc,
          companyName: match.name,
          location: match.address,
          contactName: match.representative,
          isSunatLoading: false
        }));
        showToast('Consulta SUNAT Exitosa', `Razón Social: ${match.name}`, 'info');
      } else {
        // Generador corporativo si ingresan cualquier otro RUC
        const dummyName = doc.startsWith('20') ? `CONSTRUCTORA & SERVICIOS DEL PERÚ ${doc.substring(7)} S.A.C.` : 'CONTRATISTA PARTICULAR';
        setQuoteForm(prev => ({
          ...prev,
          docNumber: doc,
          companyName: dummyName,
          isSunatLoading: false
        }));
        showToast('Consulta SUNAT Rápida', `Padrón generado para RUC ${doc}`, 'info');
      }
    }, 700);
  };

  // Volcar datos calculados de Norma G.050 al Formulario Sticky de Cotización
  const transferG050ToQuote = () => {
    setQuoteForm(prev => ({
      ...prev,
      unitsCount: g050Results.toiletsRequired,
      cleaningFrequency: g050Results.recommendedSuction.split('(')[0]?.trim() ?? '2 veces por semana',
      modelCode: 'IN-SAN-01'
    }));
    showToast(
      'Datos volcados a la Cotización',
      `Se configuraron ${g050Results.toiletsRequired} sanitarios con succión ${g050Results.recommendedSuction}`,
      'success'
    );
    const formElement = document.getElementById('sticky-quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Enviar Cotización Rápida B2B -> Actualiza Estado Global ERP
  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedModel = INITIAL_SAN_MODELS.find(m => m.code === quoteForm.modelCode) ?? (INITIAL_SAN_MODELS[0] as SanitaryModel);
    const newCode = `CTR-2026-${Math.floor(100 + Math.random() * 900)}`;
    const totalMonthly = selectedModel.monthlyRate * quoteForm.unitsCount;

    // Generar códigos de serie para cada baño
    const series = Array.from({ length: quoteForm.unitsCount }, (_, i) => `IN-BP-${Math.floor(100 + Math.random() * 899)}`);

    const newContract: RentalContract = {
      id: `c_${Date.now()}`,
      code: newCode,
      ruc: quoteForm.docNumber,
      companyName: quoteForm.companyName,
      projectName: quoteForm.projectName,
      location: quoteForm.location,
      modelCode: selectedModel.code,
      modelName: selectedModel.name,
      unitsCount: Number(quoteForm.unitsCount),
      assignedSeries: series,
      cleaningFrequency: quoteForm.cleaningFrequency,
      monthlyRate: totalMonthly,
      startDate: new Date().toISOString().split('T')[0] ?? '2026-11-01',
      endDate: new Date(Date.now() + quoteForm.monthsCount * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] ?? '2027-02-01',
      status: 'ACTIVO',
      lastSuctionDate: 'Pendiente 1ra Entrega',
      digesaCertNumber: `DIG-RES-2026-${Math.floor(5000 + Math.random() * 4000)}`
    };

    // Actualizar contratos en ERP
    setContracts(prev => [newContract, ...prev]);

    // Generar Factura Borrador SUNAT en el ERP
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      number: `F001-000${Math.floor(4600 + Math.random() * 900)}`,
      type: 'FACTURA',
      docNumber: quoteForm.docNumber,
      clientName: quoteForm.companyName,
      businessUnit: 'SANITARIOS',
      amount: totalMonthly,
      igv: totalMonthly * 0.18,
      total: totalMonthly * 1.18,
      date: new Date().toISOString().split('T')[0] ?? '2026-11-01',
      sunatStatus: 'ACEPTADO_SUNAT'
    };
    setInvoices(prev => [newInvoice, ...prev]);

    showToast(
      '¡Cotización Formal Enviada con Éxito!',
      `Se reservaron ${quoteForm.unitsCount} unidades en el ERP con código ${newCode}. Un asesor técnico se comunicará en breve.`,
      'success'
    );
  };

  // Confirmar Reserva Hotel -> Ocupa Habitación en el Rack ERP
  const handleConfirmBooking = (room: HotelRoom, guestData: { name: string; doc: string; company: string; nights: number }) => {
    const bookingCode = `NEL-HOT-${Math.floor(2000 + Math.random() * 8000)}`;
    const effectivePrice = hotelFilter.isCorporateRate ? room.corporatePrice : room.basePrice;
    const totalAmount = effectivePrice * guestData.nights;

    // Actualizar habitación en el rack ERP a 'OCUPADA'
    setRooms(prev => prev.map(r => {
      if (r.id === room.id) {
        return {
          ...r,
          status: 'OCUPADA',
          currentGuest: `${guestData.name} (${guestData.company || 'Particular'})`,
          guestDoc: guestData.doc,
          checkIn: hotelFilter.checkIn,
          checkOut: hotelFilter.checkOut
        };
      }
      return r;
    }));

    // Generar factura / boleta automática en el ERP
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      number: guestData.doc.length === 11 ? `F001-000${Math.floor(5000 + Math.random() * 500)}` : `B001-000${Math.floor(2000 + Math.random() * 500)}`,
      type: guestData.doc.length === 11 ? 'FACTURA' : 'BOLETA',
      docNumber: guestData.doc,
      clientName: guestData.name,
      businessUnit: 'HOTEL',
      amount: totalAmount,
      igv: totalAmount * 0.18,
      total: totalAmount * 1.18,
      date: new Date().toISOString().split('T')[0] ?? '2026-11-01',
      sunatStatus: 'ACEPTADO_SUNAT'
    };
    setInvoices(prev => [newInvoice, ...prev]);

    setIsBookingModalOpen(false);
    setSelectedRoomForBooking(null);

    showToast(
      '¡Reserva Hotelera Confirmada!',
      `Habitación ${room.roomNumber} (${room.typeName}) bloqueada en el Rack ERP. Código: ${bookingCode}`,
      'success'
    );
  };

  // Registrar Limpieza / Succión Completada en ERP
  const handleExecuteSuction = (contract: RentalContract) => {
    const today = new Date().toISOString().split('T')[0] ?? '2026-11-01';
    const newCert = `DIG-SUCC-${Math.floor(8000 + Math.random() * 1999)}`;
    
    setContracts(prev => prev.map(c => {
      if (c.id === contract.id) {
        return {
          ...c,
          lastSuctionDate: `${today} (Hoy - 16:30 hrs)`,
          digesaCertNumber: newCert
        };
      }
      return c;
    }));

    setIsSuctionModalOpen(false);
    setSelectedContractForSuction(null);

    showToast(
      'Succión y Desinfección Registrada',
      `Obra: ${contract.projectName}. Se emitió el Certificado Ambiental ${newCert} con camión hidrosuccionador cisterna.`,
      'success'
    );
  };

  // Cambiar Estado de Habitación en el Rack ERP
  const handleUpdateRoomStatus = (roomId: string, newStatus: RoomStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          status: newStatus,
          currentGuest: newStatus === 'DISPONIBLE' ? undefined : r.currentGuest
        };
      }
      return r;
    }));
    setSelectedRoomForEdit(null);
    showToast('Estado de Habitación Actualizado', `Habitación cambiada a estado ${newStatus}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col antialiased selection:bg-[#6CBE1A] selection:text-white">
      
      {/* ==================================================================== */}
      {/* SISTEMA DE TOASTS FLOTANTES REACTIVOS */}
      {/* ==================================================================== */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className="pointer-events-auto bg-slate-900/95 border-l-4 border-[#6CBE1A] text-white p-4 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-slide-in flex items-start gap-3"
          >
            <div className="p-1 rounded-full bg-[#6CBE1A]/20 text-[#6CBE1A] shrink-0 mt-0.5">
              <Icons.CheckCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                {t.title}
                <span className="text-[10px] uppercase tracking-wider text-[#6CBE1A] font-mono">EN VIVO</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ==================================================================== */}
      {/* 1. TOP BAR CORPORATIVO B2B (CON CONMUTADOR VISUAL DE ENRUTAMIENTO) */}
      {/* ==================================================================== */}
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
            <div className="flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700 text-[11px]">
              <span className="text-slate-400 px-2 font-mono">Next.js App Router:</span>
              <span className="bg-[#6CBE1A]/20 text-[#6CBE1A] px-2 py-0.5 rounded font-mono font-semibold">
                {currentRoute.startsWith('/admin') ? `(erp) ${currentRoute}` : `(marketing) ${currentRoute}`}
              </span>
            </div>
            
            <button 
              onClick={() => setCurrentRoute(currentRoute.startsWith('/admin') ? '/' : '/admin/dashboard')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                currentRoute.startsWith('/admin')
                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
                  : 'bg-[#6CBE1A] hover:bg-[#5aa314] text-slate-950 font-bold shadow-md shadow-[#6CBE1A]/20'
              }`}
            >
              <Icons.Cpu className="w-3.5 h-3.5" />
              {currentRoute.startsWith('/admin') ? 'Ir al Portal Público' : 'Acceso Intranet ERP'}
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. HEADER STICKY CON ISOTIPO Y MEGA-MENÚ INTELIGENTE */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => setCurrentRoute('/')}>
            <NellyLogo size="md" />
          </div>

          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            <button
              onClick={() => setCurrentRoute('/')}
              className={`px-3.5 py-2 rounded-lg transition ${
                currentRoute === '/' 
                  ? 'text-slate-950 bg-slate-100 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Inicio Grupo
            </button>

            {/* Sub-portal Sanitarios */}
            <div className="relative group">
              <button
                onClick={() => setCurrentRoute('/sanitarios-portatiles')}
                className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition ${
                  currentRoute === '/sanitarios-portatiles'
                    ? 'text-[#2E5A07] bg-[#6CBE1A]/15 font-bold border border-[#6CBE1A]/30'
                    : 'text-slate-700 hover:text-[#2E5A07] hover:bg-slate-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#6CBE1A]"></span>
                Eco-Sanitarios Portátiles
                <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
              </button>
              
              {/* Dropdown flotante */}
              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all">
                <div 
                  onClick={() => setCurrentRoute('/sanitarios-portatiles')} 
                  className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <div className="text-xs font-bold text-slate-800">Catálogo para Obras y Minería</div>
                  <div className="text-[11px] text-slate-500">Cabinas HDPE y tanques de 210L según Norma G.050</div>
                </div>
                <div 
                  onClick={() => setCurrentRoute('/sanitarios-portatiles')} 
                  className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer border-t border-slate-100"
                >
                  <div className="text-xs font-bold text-[#6CBE1A]">Calculadora Norma G.050</div>
                  <div className="text-[11px] text-slate-500">Cálculo exacto de inodoros por cantidad de obreros</div>
                </div>
                <div 
                  onClick={() => setCurrentRoute('/sanitarios-portatiles')} 
                  className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer border-t border-slate-100"
                >
                  <div className="text-xs font-bold text-[#00A8E8]">Servicio de Succión Hidrostática</div>
                  <div className="text-[11px] text-slate-500">Desinfección periódica y certificado DIGESA</div>
                </div>
              </div>
            </div>

            {/* Sub-portal Hotel */}
            <div className="relative group">
              <button
                onClick={() => setCurrentRoute('/hotel')}
                className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition ${
                  currentRoute === '/hotel'
                    ? 'text-[#8a6828] bg-[#C8A064]/15 font-bold border border-[#C8A064]/30'
                    : 'text-slate-700 hover:text-[#8a6828] hover:bg-slate-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#C8A064]"></span>
                Hotel & Hospedaje Ejecutivo
                <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all">
                <div 
                  onClick={() => setCurrentRoute('/hotel')} 
                  className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <div className="text-xs font-bold text-slate-800">Habitaciones & Tarifas Corporativas</div>
                  <div className="text-[11px] text-slate-500">Simple Ejecutiva, Matrimonial, Doble y Suites</div>
                </div>
                <div 
                  onClick={() => setCurrentRoute('/hotel')} 
                  className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer border-t border-slate-100"
                >
                  <div className="text-xs font-bold text-[#C8A064]">Alojamiento para Contratistas</div>
                  <div className="text-[11px] text-slate-500">Cocheras para camionetas 4x4 y desayuno a campo</div>
                </div>
              </div>
            </div>

            {/* Convenio Mixto */}
            <button
              onClick={() => setCurrentRoute('/convenio-constructora')}
              className={`px-3.5 py-2 rounded-lg font-medium transition ${
                currentRoute === '/convenio-constructora'
                  ? 'text-indigo-600 bg-indigo-50 font-bold'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              Convenio Integral Constructora
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentRoute('/sanitarios-portatiles');
                setTimeout(() => {
                  document.getElementById('sticky-quote-form')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="bg-[#2E5A07] hover:bg-[#234505] text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-2"
            >
              <Icons.Truck className="w-4 h-4 text-[#6CBE1A]" />
              Cotizar Baños para Obra
            </button>

            <button
              onClick={() => setCurrentRoute('/admin/dashboard')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5"
            >
              <Icons.Cpu className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span className="hidden sm:inline">Panel ERP</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 3. VISTAS PRINCIPALES SEGÚN LA RUTA DE NEXT.JS SELECCIONADA */}
      {/* ==================================================================== */}
      <main className="flex-1">

        {/* ------------------------------------------------------------------ */}
        {/* RUTA 1: HUB CORPORATIVO GENERAL ( / ) */}
        {/* Portada General + Enfoques Personales de Sanitarios y Hotel */}
        {/* ------------------------------------------------------------------ */}
        {currentRoute === '/' && (
          <div>
            {/* 1. PORTADA GENERAL CORPORATIVA (MASTER HERO) */}
            <section className="relative bg-[#0F172A] text-white overflow-hidden border-b border-slate-800">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/95 to-[#0F172A]" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-slate-200 mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse" />
                  GRUPO EMPRESARIAL INVERSIONES NELLY S.A.C. • RUC 20608945123
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-5xl mx-auto leading-tight text-white mb-6">
                  Infraestructura Sanitaria & Hospitalidad Corporativa para <span className="bg-gradient-to-r from-[#6CBE1A] via-[#00A8E8] to-[#C8A064] bg-clip-text text-transparent">Grandes Proyectos en el Perú</span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                  Dos unidades de negocio especializadas trabajando bajo un solo respaldo legal y operativo: dotación y mantenimiento de baños portátiles en frentes de obra bajo la <strong>Norma Técnica G.050</strong>, y descanso ejecutivo para ingenieros y cuadrillas en el <strong>Hotel Nelly</strong> con Facturación SUNAT consolidada.
                </p>

                {/* Badges de Certificación y Respaldo */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300 mb-10">
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                    <Icons.ShieldCheck className="w-4 h-4 text-[#6CBE1A]" />
                    Registro DIGESA Res. 2026-4412
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                    <Icons.Check className="w-4 h-4 text-[#00A8E8]" />
                    Homologado SUNAFIL Norma G.050
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                    <Icons.FileText className="w-4 h-4 text-[#C8A064]" />
                    Facturación Electrónica SUNAT Única
                  </span>
                </div>

                {/* Acceso Rápido a las Dos Divisiones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  <button
                    onClick={() => setCurrentRoute('/sanitarios-portatiles')}
                    className="p-5 rounded-2xl bg-gradient-to-r from-[#142312] to-[#2E5A07]/80 border border-[#6CBE1A]/40 text-left hover:border-[#6CBE1A] transition shadow-lg group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[#6CBE1A] font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Icons.Truck className="w-4 h-4" /> División Eco-Sanitarios
                      </div>
                      <div className="text-white font-extrabold text-base">Alquiler de Baños & Succión en Obra</div>
                      <div className="text-slate-300 text-xs mt-1">Cabinas HDPE, camiones cisterna y norma G.050</div>
                    </div>
                    <Icons.ChevronRight className="w-5 h-5 text-[#6CBE1A] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setCurrentRoute('/hotel')}
                    className="p-5 rounded-2xl bg-gradient-to-r from-[#1B1917] to-[#382E1E]/80 border border-[#C8A064]/40 text-left hover:border-[#C8A064] transition shadow-lg group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[#E5C388] font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Icons.Bed className="w-4 h-4" /> División Hotel Nelly
                      </div>
                      <div className="text-white font-extrabold text-base">Hospedaje & Estadías de Trabajo</div>
                      <div className="text-slate-300 text-xs mt-1">Cochera 4x4, desayuno 05:30 AM y tarifa convenio</div>
                    </div>
                    <Icons.ChevronRight className="w-5 h-5 text-[#C8A064] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* 2. HERO SPLIT-SCREEN 50 / 50 INTERACTIVO */}
            <section className="relative min-h-[520px] grid grid-cols-1 lg:grid-cols-2">
              
              {/* Lado Izquierdo: Sanitarios Portátiles (Verde + Azul) */}
              <div className="relative bg-gradient-to-br from-[#0F172A] via-[#142312] to-[#2E5A07] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#6CBE1A]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6CBE1A]/20 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/20 border border-[#6CBE1A]/40 text-[#6CBE1A] text-xs font-bold tracking-wide uppercase mb-4">
                    <Icons.ShieldCheck className="w-4 h-4" />
                    División Saneamiento & Obras Civiles
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white mb-3">
                    Alquiler y Mantenimiento de <span className="text-[#6CBE1A]">Sanitarios Portátiles</span> en Obra
                  </h2>
                  
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-lg">
                    Soluciones sanitarias homologadas bajo la <strong>Norma Técnica G.050</strong>. Flota propia de camiones hidrosuccionadores al vacío, químicos biodegradables y certificados DIGESA inmediatos.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6 max-w-md">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-base font-black text-[#6CBE1A]">24 Horas</div>
                      <div className="text-[11px] text-slate-300">Entrega garantizada en sitio</div>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-base font-black text-[#00A8E8]">100% Legal</div>
                      <div className="text-[11px] text-slate-300">Certificación DIGESA ambiental</div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setCurrentRoute('/sanitarios-portatiles')}
                    className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-[#6CBE1A]/30 transition flex items-center gap-2 text-xs"
                  >
                    <Icons.Truck className="w-4 h-4" />
                    Entrar al Portal de Sanitarios
                  </button>
                  <button
                    onClick={() => {
                      setCurrentRoute('/sanitarios-portatiles');
                      setTimeout(() => {
                        document.getElementById('g050-calculator')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl border border-white/20 transition flex items-center gap-2 text-xs"
                  >
                    <Icons.Calculator className="w-4 h-4 text-[#6CBE1A]" />
                    Calculadora G.050
                  </button>
                </div>
              </div>

              {/* Lado Derecho: Hotel & Hospitalidad (Dorado + Slate) */}
              <div className="relative bg-gradient-to-br from-[#0B1322] via-[#1B1917] to-[#382E1E] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden group border-t lg:border-t-0 lg:border-l border-slate-800">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A064]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C8A064]/20 transition-all duration-700"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A064]/20 border border-[#C8A064]/40 text-[#E5C388] text-xs font-bold tracking-wide uppercase mb-4">
                    <Icons.Bed className="w-4 h-4" />
                    División Hotel & Hospedaje Corporativo
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white mb-3">
                    Hotel Nelly: Descanso Ejecutivo & <span className="text-[#C8A064]">Estadías de Trabajo</span>
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-lg">
                    Confort premium pensado para ingenieros residentes, supervisores de campo y cuadrillas de contratistas. Habitaciones equipadas, cochera privada para camionetas 4x4 y factura SUNAT.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6 max-w-md">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-base font-black text-[#C8A064]">Tarifas Obra</div>
                      <div className="text-[11px] text-slate-300">25% de ahorro con convenio RUC</div>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-base font-black text-[#E5C388]">Cochera 4x4</div>
                      <div className="text-[11px] text-slate-300">Vigilancia privada 24 horas</div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setCurrentRoute('/hotel')}
                    className="bg-[#C8A064] hover:bg-[#b58d52] text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-[#C8A064]/30 transition flex items-center gap-2 text-xs"
                  >
                    <Icons.Bed className="w-4 h-4" />
                    Ver Habitaciones & Reservar
                  </button>
                  <button
                    onClick={() => setCurrentRoute('/convenio-constructora')}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl border border-white/20 transition flex items-center gap-2 text-xs"
                  >
                    Convenio B2B para Empresas
                  </button>
                </div>
              </div>

            </section>

            {/* 3. BARRA DE AUTORIDAD Y RESPALDO EMPRESARIAL */}
            <section className="bg-white border-y border-slate-200 py-6 px-4">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#2E5A07]">+12 Años</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">Liderando Saneamiento y Hospedaje</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#00A8E8]">100% Propios</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">Camiones Hidrosuccionadores al Vacío</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#6CBE1A]">Norma G.050</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">Aprobado en Auditorías SUNAFIL</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#C8A064]">Facturación Única</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">Crédito 30 días para Constructoras</div>
                </div>
              </div>
            </section>

            {/* 4. ENFOQUE PERSONAL: DIVISIÓN ECO-SANITARIOS PORTÁTILES */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold text-[#2E5A07] uppercase tracking-wider bg-[#6CBE1A]/20 px-3.5 py-1 rounded-full">
                  Enfoque Especializado de Saneamiento
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 leading-tight">
                  División Eco-Sanitarios: Operatividad Ininterrumpida en Frentes de Trabajo
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Equipamiento rotomoldeado resistente al clima extremo y cuadrillas de mantenimiento equipadas con tecnología de succión al vacío.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Pilar 1 */}
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                    <img 
                      src="/images/sanitary_luxury_obra.jpg" 
                      alt="Baños de Obra" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#6CBE1A] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                      Norma G.050
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Cabinas HDPE de Alto Tránsito</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Fabricadas en polietileno virgen con protección anti-UV. Tanque estanco de 210L con ventilación cruzada que anula olores en ambientes calurosos.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2E5A07]">
                      <Icons.Check className="w-4 h-4 text-[#6CBE1A]" />
                      Modelos Estándar, VIP y Accesible
                    </div>
                  </div>
                </div>

                {/* Pilar 2 */}
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80" 
                      alt="Camión Cisterna Succión" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#00A8E8] text-white font-black text-[10px] px-2 py-0.5 rounded uppercase">
                      100% Sin Fugas
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Camiones Hidrosuccionadores</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Bomba de succión por vacío acoplada a mangueras reforzadas de 2.5 pulgadas. Limpieza profunda con hidro-lavado a presión y reposición química.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8]">
                      <Icons.Check className="w-4 h-4 text-[#00A8E8]" />
                      Rutas programadas de 2 a 6 veces / semana
                    </div>
                  </div>
                </div>

                {/* Pilar 3 */}
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                    <img 
                      src="/images/toilet_modern_cabin.png" 
                      alt="Certificado DIGESA" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase">
                      Disposición Final
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Certificación Ambiental DIGESA</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Trazabilidad legal completa. Entrega inmediata del Manifiesto de Residuos Sólidos para auditorías de SUNAFIL, OSINERGMIN y OEFA.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <Icons.Check className="w-4 h-4 text-emerald-600" />
                      Descarga en plantas autorizadas SEDAPAL
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentRoute('/sanitarios-portatiles')}
                  className="bg-[#2E5A07] hover:bg-[#234505] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition text-xs flex items-center gap-2"
                >
                  <Icons.Truck className="w-4 h-4 text-[#6CBE1A]" />
                  Ver Catálogo Técnico Completo de Sanitarios
                </button>
                <button
                  onClick={() => {
                    setCurrentRoute('/sanitarios-portatiles');
                    setTimeout(() => {
                      document.getElementById('g050-calculator')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-3.5 rounded-xl border border-slate-300 transition text-xs flex items-center gap-2"
                >
                  <Icons.Calculator className="w-4 h-4 text-[#2E5A07]" />
                  Calcular Cantidad Requerida por Norma G.050
                </button>
              </div>
            </section>

            {/* 5. ENFOQUE PERSONAL: DIVISIÓN HOTEL NELLY & DESCANSO EJECUTIVO */}
            <section className="py-16 px-4 bg-slate-900 text-white border-t border-slate-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-bold text-[#E5C388] uppercase tracking-wider bg-[#C8A064]/20 px-3.5 py-1 rounded-full border border-[#C8A064]/30">
                    Enfoque Especializado de Hospedaje
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 leading-tight">
                    Hotel Nelly: Hospitalidad & Logística para Cuadrillas y Supervisión
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-2">
                    Instalaciones diseñadas para asegurar el descanso del personal técnico de obra con servicios adaptados a los horarios de construcción.
                  </p>
                </div>

                {/* Grid de Habitaciones con Fotografía Real */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                  {[
                    { title: 'Simple Ejecutiva', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', price: 'S/ 85', desc: 'Escritorio de trabajo, Wi-Fi 200Mbps, baño privado' },
                    { title: 'Matrimonial Superior', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', price: 'S/ 115', desc: 'Cama Queen ortopédica, Smart TV 55", aire acondicionado' },
                    { title: 'Doble Contratistas', img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', price: 'S/ 130', desc: '2 camas 1.5 plazas, ideal para parejas de supervisores' },
                    { title: 'Suite Nelly Presidencial', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', price: 'S/ 220', desc: 'Cama King, sala privada de coordinación de obra y jacuzzi' }
                  ].map((h, i) => (
                    <div key={i} className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 flex flex-col justify-between group">
                      <div>
                        <div className="h-44 w-full overflow-hidden bg-slate-950 relative">
                          <img 
                            src={h.img} 
                            alt={h.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <span className="absolute bottom-2 right-2 bg-[#C8A064] text-slate-950 font-black text-xs px-2.5 py-0.5 rounded shadow">
                            {h.price} / noche
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-white text-base mb-1">{h.title}</h4>
                          <p className="text-xs text-slate-400">{h.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4 Ventajas de Contratistas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-[#C8A064] font-black text-sm mb-1">Cochera 4x4 Privada</div>
                    <div className="text-xs text-slate-300">Cámaras 24h para camionetas de obra</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-[#C8A064] font-black text-sm mb-1">Desayuno 05:30 AM</div>
                    <div className="text-xs text-slate-300">Listo para la salida temprana a campo</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-[#C8A064] font-black text-sm mb-1">Wi-Fi Fibra 200Mbps</div>
                    <div className="text-xs text-slate-300">Para planos BIM y videollamadas técnicas</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-[#C8A064] font-black text-sm mb-1">Factura SUNAT Única</div>
                    <div className="text-xs text-slate-300">Convenio a 30 días para consorcios</div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setCurrentRoute('/hotel')}
                    className="bg-[#C8A064] hover:bg-[#b58d52] text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#C8A064]/20 transition text-xs inline-flex items-center gap-2"
                  >
                    <Icons.Bed className="w-4 h-4" />
                    Explorar Habitaciones & Reservar Estadía
                  </button>
                </div>
              </div>
            </section>

            {/* 6. BLOQUE ESTRATÉGICO B2B: CONVENIO INTEGRAL CONSTRUCTORA */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#142312] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                  <span className="bg-[#6CBE1A]/20 text-[#6CBE1A] border border-[#6CBE1A]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Sinergia B2B Exclusiva en Perú
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-4 leading-tight">
                    ¿Inicias una obra o proyecto en la región? <br />
                    <span className="text-[#6CBE1A]">Sanitarios en el Frente de Trabajo</span> + <span className="text-[#C8A064]">Hotel para tus Ingenieros</span>
                  </h3>
                  
                  <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                    Optimiza la administración de tu constructora o consorcio. Unifica en un solo contrato homologado la dotación de baños portátiles con limpieza certificada y el hospedaje de tu staff técnico con una sola Factura Electrónica SUNAT mensual.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-[#6CBE1A] font-bold text-sm mb-1">✓ Un Solo Proveedor</div>
                      <p className="text-xs text-slate-400">Menos papeleo administrativo y homologación directa.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-[#C8A064] font-bold text-sm mb-1">✓ Tarifa Paquete Mixto</div>
                      <p className="text-xs text-slate-400">Hasta 25% de ahorro en tarifas hoteleras y de alquiler.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-[#00A8E8] font-bold text-sm mb-1">✓ Línea de Crédito</div>
                      <p className="text-xs text-slate-400">Facilidades de pago a 30 o 60 días para consorcios.</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => setCurrentRoute('/convenio-constructora')}
                      className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-6 py-3 rounded-xl transition text-sm flex items-center gap-2"
                    >
                      Solicitar Convenio Corporativo B2B
                      <Icons.ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentRoute('/admin/dashboard')}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl transition text-sm border border-white/20"
                    >
                      Ver Demostración del ERP Unificado
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* RUTA 2: SUB-PORTAL SANITARIOS PORTÁTILES ( /sanitarios-portatiles ) */}
        {/* Inspirado en Ancro Perú con CRO, Catálogo Técnico y Calculadora G.050 */}
        {/* ------------------------------------------------------------------ */}
        {currentRoute === '/sanitarios-portatiles' && (
          <div className="pb-16">
            
            {/* HERO B2B CON FORMULARIO STICKY DE COTIZACIÓN POR RUC */}
            <section className="bg-gradient-to-b from-slate-900 to-[#142312] text-white py-12 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Columna Izquierda: Información de Valor y Sector */}
                <div className="lg:col-span-7 pt-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/20 border border-[#6CBE1A]/40 text-[#6CBE1A] text-xs font-bold uppercase mb-4">
                    <Icons.Truck className="w-4 h-4" />
                    Flota Homologada a Nivel Nacional
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4">
                    Alquiler de <span className="text-[#6CBE1A]">Sanitarios Portátiles</span> para Obras Civiles y Minería
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    Cumplimiento irrestricto de la <strong>Norma Técnica G.050</strong>. Proveemos cabinas de alta durabilidad en polietileno virgen (HDPE), mantenimiento con camión cisterna al vacío y disposición final en rellenos sanitarios certificados por DIGESA.
                  </p>

                  {/* Selector Rápido de Sectores */}
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 mb-6">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      Selecciona tu Sector Operativo:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'OBRA', label: 'Construcción Civil', sub: 'Norma G.050' },
                        { id: 'MINERIA', label: 'Minería & Energía', sub: 'D.S. 024-2016' },
                        { id: 'EVENTOS', label: 'Eventos Masivos', sub: 'Línea Ejecutiva' },
                        { id: 'AGRO', label: 'Agroindustria', sub: 'Cuadrillas Móviles' }
                      ].map(sec => (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setCalculatorSector(sec.id as any);
                            showToast('Sector Actualizado', `Configurado para ${sec.label}`, 'info');
                          }}
                          className={`p-2.5 rounded-xl text-left border transition ${
                            calculatorSector === sec.id
                              ? 'bg-[#6CBE1A] text-slate-950 border-[#6CBE1A] font-bold shadow-md'
                              : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          <div className="text-xs font-bold">{sec.label}</div>
                          <div className={`text-[10px] ${calculatorSector === sec.id ? 'text-slate-800' : 'text-slate-400'}`}>
                            {sec.sub}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Beneficios Clave */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Icons.CheckCircle className="w-4 h-4 text-[#6CBE1A] shrink-0" />
                      <span>Tanques 210L de gran autonomía</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.CheckCircle className="w-4 h-4 text-[#00A8E8] shrink-0" />
                      <span>Bomba de pedal 100% manos libres</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.CheckCircle className="w-4 h-4 text-[#6CBE1A] shrink-0" />
                      <span>Manifiesto DIGESA de residuos</span>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: FORMULARIO STICKY DE COTIZACIÓN RÁPIDA POR RUC */}
                <div id="sticky-quote-form" className="lg:col-span-5">
                  <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border-2 border-[#6CBE1A]/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                          <Icons.FileText className="w-5 h-5 text-[#2E5A07]" />
                          Cotizador Rápido B2B
                        </h3>
                        <p className="text-xs text-slate-500">Valida con SUNAT y recibe respuesta inmediata</p>
                      </div>
                      <span className="bg-[#6CBE1A]/20 text-[#2E5A07] text-[11px] font-bold px-2 py-0.5 rounded">
                        Soles (S/)
                      </span>
                    </div>

                    <form onSubmit={handleSubmitQuote} className="space-y-3.5 text-xs">
                      {/* Input RUC con autocompletado SUNAT */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          RUC de Empresa o DNI:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={quoteForm.docNumber}
                            onChange={(e) => setQuoteForm({ ...quoteForm, docNumber: e.target.value })}
                            placeholder="Ej: 20512345678"
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#6CBE1A] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleSunatLookup(quoteForm.docNumber)}
                            disabled={quoteForm.isSunatLoading}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg font-bold text-xs shrink-0 flex items-center gap-1 transition"
                          >
                            {quoteForm.isSunatLoading ? (
                              <Icons.RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              'Validar SUNAT'
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Razón Social autocompletada */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Razón Social (Detectada):
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteForm.companyName}
                          onChange={(e) => setQuoteForm({ ...quoteForm, companyName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-800 font-semibold text-xs outline-none"
                        />
                      </div>

                      {/* Obra y Ubicación */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Nombre del Proyecto / Obra:</label>
                          <input
                            type="text"
                            required
                            value={quoteForm.projectName}
                            onChange={(e) => setQuoteForm({ ...quoteForm, projectName: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Ubicación / Distrito:</label>
                          <input
                            type="text"
                            required
                            value={quoteForm.location}
                            onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      {/* Modelo de Equipo */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tipo de Equipo:</label>
                        <select
                          value={quoteForm.modelCode}
                          onChange={(e) => setQuoteForm({ ...quoteForm, modelCode: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium outline-none text-slate-800"
                        >
                          {INITIAL_SAN_MODELS.map(m => (
                            <option key={m.code} value={m.code}>
                              {m.name} - S/ {m.monthlyRate}/mes
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Cantidad y Frecuencia */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Cantidad Baños:</label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            required
                            value={quoteForm.unitsCount}
                            onChange={(e) => setQuoteForm({ ...quoteForm, unitsCount: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Succión / Limpieza:</label>
                          <select
                            value={quoteForm.cleaningFrequency}
                            onChange={(e) => setQuoteForm({ ...quoteForm, cleaningFrequency: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="1 vez por semana">1 vez por semana</option>
                            <option value="2 veces por semana">2 veces por semana</option>
                            <option value="3 veces por semana">3 veces por semana</option>
                            <option value="Diario (Eventos)">Diario (Eventos)</option>
                          </select>
                        </div>
                      </div>

                      {/* Resumen de Presupuesto Estimado */}
                      <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 mt-2">
                        <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
                          <span>Subtotal Estimado Mensual:</span>
                          <span className="font-bold text-slate-900">
                            S/ {(INITIAL_SAN_MODELS.find(m => m.code === quoteForm.modelCode)?.monthlyRate || 380) * quoteForm.unitsCount}.00
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span>I.G.V. (18% Factura Oficial):</span>
                          <span>
                            S/ {(((INITIAL_SAN_MODELS.find(m => m.code === quoteForm.modelCode)?.monthlyRate || 380) * quoteForm.unitsCount) * 0.18).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-[#6CBE1A]/30 transition text-sm flex items-center justify-center gap-2"
                      >
                        <Icons.CheckCircle className="w-4 h-4" />
                        Enviar Cotización Formal Inmediata
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </section>

            {/* WIDGET INTERACTIVO: CALCULADORA NORMA TÉCNICA G.050 */}
            <section id="g050-calculator" className="py-14 px-4 max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/15 text-[#2E5A07] text-xs font-bold mb-2">
                      <Icons.Calculator className="w-4 h-4" />
                      Reglamento Oficial de Seguridad y Salud en Obra
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      Calculadora Interactiva Norma Técnica G.050
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Averigua cuántos sanitarios y lavamanos portátiles exige la ley peruana para tu cantidad de operarios.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start lg:self-auto">
                    {(['OBRA', 'MINERIA', 'EVENTOS'] as const).map(sec => (
                      <button
                        key={sec}
                        onClick={() => setCalculatorSector(sec)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          calculatorSector === sec
                            ? 'bg-[#2E5A07] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {sec === 'OBRA' ? 'Construcción Civil' : sec === 'MINERIA' ? 'Minería Subterránea/Tajo' : 'Eventos Masivos'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                  
                  {/* Controles de Entrada */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-slate-800">
                          Cantidad Total de Trabajadores en Obra:
                        </label>
                        <span className="text-2xl font-black text-[#2E5A07] bg-[#6CBE1A]/10 px-3 py-1 rounded-lg font-mono">
                          {workersCount} operarios
                        </span>
                      </div>
                      
                      <input
                        type="range"
                        min="5"
                        max="250"
                        step="5"
                        value={workersCount}
                        onChange={(e) => setWorkersCount(Number(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#6CBE1A]"
                      />
                      
                      <div className="flex justify-between text-[11px] text-slate-600 font-semibold mt-1">
                        <span>5 trabajadores</span>
                        <span>50</span>
                        <span>100</span>
                        <span>150</span>
                        <span>200</span>
                        <span>250+</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <label className="text-xs font-bold text-slate-700 block mb-2">
                          Régimen de Turnos de Trabajo:
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setShiftsCount(1)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                              shiftsCount === 1 
                                ? 'bg-[#2E5A07] text-white border-[#2E5A07]' 
                                : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            1 Turno (8 horas)
                          </button>
                          <button
                            type="button"
                            onClick={() => setShiftsCount(2)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                              shiftsCount === 2 
                                ? 'bg-[#2E5A07] text-white border-[#2E5A07]' 
                                : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            2 Turnos (24 horas)
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-center">
                        <div className="text-xs text-slate-500 font-medium">Parámetro Normativo Legal:</div>
                        <div className="text-xs font-bold text-slate-800 mt-1">
                          Norma G.050 Art. 12: 1 inodoro + 1 lavamanos por cada 20 trabajadores o fracción mayor a 5.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resultados Calculados */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#6CBE1A] uppercase tracking-wider mb-3">
                        Dotación Obligatoria Exigida por Ley:
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                          <div className="text-3xl font-black text-[#6CBE1A] font-mono">
                            {g050Results.toiletsRequired}
                          </div>
                          <div className="text-xs text-slate-300 font-semibold mt-0.5">
                            Inodoros Portátiles Mínimos
                          </div>
                        </div>

                        <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                          <div className="text-3xl font-black text-[#00A8E8] font-mono">
                            {g050Results.sinksRequired}
                          </div>
                          <div className="text-xs text-slate-300 font-semibold mt-0.5">
                            Lavamanos Autónomos
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-slate-300 mb-4">
                        <div className="flex justify-between py-1 border-b border-slate-700">
                          <span>Frecuencia Succión Recomendada:</span>
                          <strong className="text-white">{g050Results.recommendedSuction}</strong>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-700">
                          <span>Insumos Químicos Biodegradables:</span>
                          <strong className="text-[#6CBE1A]">Incluido 100%</strong>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Presupuesto Mensual Estimado:</span>
                          <strong className="text-xl font-black text-[#6CBE1A]">
                            S/ {g050Results.estimatedMonthlyCost}.00
                          </strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={transferG050ToQuote}
                      className="w-full bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black py-3 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Icons.Copy className="w-4 h-4" />
                      Volcar Datos al Formulario de Cotización
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* CATÁLOGO TÉCNICO INTERACTIVO DE MODELOS (SPECS COMPLETAS) */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-xs font-bold text-[#2E5A07] uppercase tracking-wider bg-[#6CBE1A]/20 px-3 py-1 rounded-full">
                  Equipamiento de Grado Industrial
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Catálogo Técnico de Sanitarios & Módulos Higiénicos
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Modelos rotomoldeados con garantía de higiene, estanqueidad y resistencia para las condiciones climáticas del Perú.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INITIAL_SAN_MODELS.map((model) => (
                  <div 
                    key={model.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Imagen del Modelo Sanitario */}
                      {model.imageUrl && (
                        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                          <img
                            src={model.imageUrl}
                            alt={model.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute bottom-2 left-3 font-mono text-[11px] font-bold bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm border border-white/20">
                            {model.code}
                          </span>
                          <span className="absolute top-3 right-3 bg-[#6CBE1A] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                            {model.badge}
                          </span>
                        </div>
                      )}

                      {/* Cabecera de la Tarjeta */}
                      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-slate-400 font-semibold">{model.categoryLabel}</span>
                          <span className="font-mono text-xs text-[#6CBE1A] font-bold">{model.code}</span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-1 leading-tight">
                          {model.name}
                        </h3>
                      </div>

                      {/* Tarifas */}
                      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
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
                      <div className="p-5 space-y-2.5 text-xs">
                        <p className="text-slate-600 text-xs leading-relaxed mb-3">
                          {model.description}
                        </p>

                        <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 border border-slate-100">
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
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => {
                          setQuoteForm(prev => ({ ...prev, modelCode: model.code }));
                          showToast('Modelo Seleccionado', `${model.name} cargado en el formulario`, 'info');
                          document.getElementById('sticky-quote-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full bg-[#2E5A07] hover:bg-[#234505] text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2"
                      >
                        <Icons.CheckCircle className="w-4 h-4 text-[#6CBE1A]" />
                        Seleccionar para Cotizar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CICLO OPERATIVO DEL SERVICIO EN 4 PASOS */}
            <section className="bg-slate-900 text-white py-14 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold text-[#00A8E8] uppercase tracking-wider">
                    Procedimiento Estandarizado DIGESA
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Ciclo de Servicio de Succión e Higiene
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Cómo garantizamos la operatividad continua de tus baños portátiles sin malos olores ni sanciones.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { step: '01', title: 'Entrega en Obra', desc: 'Descarga con camión grúa plataforma y nivelación sobre terreno según el plano de seguridad.' },
                    { step: '02', title: 'Succión Hidrostática', desc: 'Evacuación de lodos al vacío con manguera de alta presión hermética. Cero derrames.' },
                    { step: '03', title: 'Químicos Biodegradables', desc: 'Lavado con hidrolavadora, recarga de bactericida aromático azul y dotación de papel higiénico.' },
                    { step: '04', title: 'Certificado DIGESA', desc: 'Firma de guía de succión y emisión del manifiesto ambiental exigido por SUNAFIL y OEFA.' }
                  ].map(s => (
                    <div key={s.step} className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 relative">
                      <div className="text-4xl font-black text-[#6CBE1A]/30 mb-2 font-mono">{s.step}</div>
                      <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* RUTA 3: SUB-PORTAL HOTEL & RESERVAS ( /hotel ) */}
        {/* ------------------------------------------------------------------ */}
        {currentRoute === '/hotel' && (
          <div className="pb-16">
            
            {/* HERO HOSPITALIDAD CON BUSCADOR HORIZONTAL */}
            <section className="bg-gradient-to-r from-slate-900 via-[#1F1B16] to-[#382E1E] text-white py-12 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl">
                  <span className="bg-[#C8A064]/20 text-[#E5C388] border border-[#C8A064]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Hospedaje & Confort para Equipos de Trabajo
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
                    Descanso Ejecutivo en el <span className="text-[#C8A064]">Hotel Nelly</span>
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                    Instalaciones de primer nivel diseñadas para contratistas, ingenieros y supervisores de obra. Conexión Wi-Fi de alta velocidad para reportes, estacionamiento vigilado para flotas y tarifas corporativas preferenciales.
                  </p>
                </div>

                {/* BUSCADOR DE DISPONIBILIDAD HORIZONTAL */}
                <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-2xl mt-8 border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Fecha Check-In:
                      </label>
                      <input
                        type="date"
                        value={hotelFilter.checkIn}
                        onChange={(e) => setHotelFilter({ ...hotelFilter, checkIn: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Fecha Check-Out:
                      </label>
                      <input
                        type="date"
                        value={hotelFilter.checkOut}
                        onChange={(e) => setHotelFilter({ ...hotelFilter, checkOut: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Modalidad de Tarifa:
                      </label>
                      <button
                        type="button"
                        onClick={() => setHotelFilter(prev => ({ ...prev, isCorporateRate: !prev.isCorporateRate }))}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition flex items-center justify-between ${
                          hotelFilter.isCorporateRate
                            ? 'bg-[#C8A064] text-slate-950 border-[#C8A064]'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <span>{hotelFilter.isCorporateRate ? 'Convenio Corporativo' : 'Tarifa Estándar'}</span>
                        <span className="text-[10px] bg-slate-950/20 px-1.5 py-0.5 rounded font-black">
                          {hotelFilter.isCorporateRate ? '-25%' : 'B2C'}
                        </span>
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          showToast('Disponibilidad Filtrada', 'Mostrando habitaciones libres para las fechas seleccionadas', 'info');
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 h-9"
                      >
                        <Icons.Bed className="w-4 h-4 text-[#C8A064]" />
                        Filtrar Habitaciones
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* CATÁLOGO DE HABITACIONES DISPONIBLES */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Habitaciones & Tarifas</h2>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    {hotelFilter.isCorporateRate ? 'Aplicando tarifa especial para empresas de construcción' : 'Tarifa para huéspedes particulares'}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  Mostrando <strong className="text-slate-900">{rooms.filter(r => r.status === 'DISPONIBLE').length}</strong> libres de {rooms.length}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms.map((room) => {
                  const effectivePrice = hotelFilter.isCorporateRate ? room.corporatePrice : room.basePrice;
                  const isAvailable = room.status === 'DISPONIBLE';

                  return (
                    <div 
                      key={room.id}
                      className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                        isAvailable 
                          ? 'border-slate-200 shadow-md hover:shadow-xl' 
                          : 'border-slate-200 opacity-75 bg-slate-50'
                      }`}
                    >
                      <div>
                        {/* Fotografía Real de la Habitación */}
                        {room.imageUrl && (
                          <div className="relative h-48 w-full overflow-hidden bg-slate-900 group">
                            <img
                              src={room.imageUrl}
                              alt={room.typeName}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute bottom-2 left-3 font-mono text-[11px] font-bold bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm border border-white/20">
                              Piso {room.floor} • Hab. {room.roomNumber}
                            </span>
                            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow-md ${
                              room.status === 'DISPONIBLE' ? 'bg-[#6CBE1A] text-slate-950 font-black' :
                              room.status === 'OCUPADA' ? 'bg-rose-500 text-white' :
                              room.status === 'LIMPIEZA_PENDIENTE' ? 'bg-amber-400 text-slate-950' :
                              'bg-purple-500 text-white'
                            }`}>
                              {room.status === 'DISPONIBLE' ? 'Disponible' :
                               room.status === 'OCUPADA' ? 'Ocupada' :
                               room.status === 'LIMPIEZA_PENDIENTE' ? 'Limpieza' : 'Mantenimiento'}
                            </span>
                          </div>
                        )}

                        {/* Cabecera */}
                        <div className={`p-4 ${isAvailable ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white' : 'bg-slate-300 text-slate-700'}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-[#C8A064] font-semibold">
                              Alojamiento Corporativo
                            </span>
                            <span className="font-mono text-xs text-slate-300">
                              Hab. {room.roomNumber}
                            </span>
                          </div>
                          
                          <h3 className="text-base font-bold mt-1 leading-tight">
                            {room.typeName}
                          </h3>
                        </div>

                        {/* Precios */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Por Noche</div>
                            <div className="text-xl font-black text-[#8a6828]">
                              S/ {effectivePrice}
                            </div>
                          </div>
                          {hotelFilter.isCorporateRate && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                              Ahorro S/ {room.basePrice - room.corporatePrice}
                            </span>
                          )}
                        </div>

                        {/* Amenidades */}
                        <div className="p-4 space-y-2">
                          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Incluye:
                          </div>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {room.amenities.map((am, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A064]"></span>
                                {am}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Acción de Reserva */}
                      <div className="p-4 pt-0">
                        {isAvailable ? (
                          <button
                            onClick={() => {
                              setSelectedRoomForBooking(room);
                              setIsBookingModalOpen(true);
                            }}
                            className="w-full bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Icons.Bed className="w-4 h-4" />
                            Reservar Ahora
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full bg-slate-200 text-slate-400 font-semibold py-2.5 rounded-xl text-xs cursor-not-allowed"
                          >
                            {room.status === 'OCUPADA' ? `Ocupada (${room.currentGuest?.split('(')[0] || 'Huésped'})` : 'No Disponible'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SERVICIOS COMPLEMENTARIOS PARA OBRAS */}
            <section className="bg-slate-100 py-12 px-4 border-t border-slate-200">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A064]/20 text-[#8a6828] flex items-center justify-center mb-3">
                    <Icons.Truck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Cochera para Camionetas 4x4</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Amplio patio de estacionamiento cerrado con cámaras de vigilancia y portón de seguridad para vehículos pesados y camionetas de ingeniería.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#6CBE1A]/20 text-[#2E5A07] flex items-center justify-center mb-3">
                    <Icons.ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Desayuno Ejecutivo Temprano</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Servicio de desayuno desde las 05:30 AM para cuadrillas que deben ingresar temprano al frente de obra o campamento minero.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#00A8E8]/20 text-[#00A8E8] flex items-center justify-center mb-3">
                    <Icons.FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Facturación Electrónica Consolidada</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Emisión periódica de facturas detalladas por centro de costos, facilitando la rendición de viáticos de tu personal técnico.
                  </p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* RUTA 4: CONVENIO INTEGRAL CONSTRUCTORA ( /convenio-constructora ) */}
        {/* ------------------------------------------------------------------ */}
        {currentRoute === '/convenio-constructora' && (
          <div className="py-12 px-4 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
              <div className="max-w-3xl">
                <span className="bg-[#6CBE1A]/20 text-[#2E5A07] text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Paquete Sinergia B2B
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                  Convenio Integral para Constructoras y Contratistas
                </h1>
                <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                  Inversiones Nelly S.A.C. es la única empresa en la región que une saneamiento ambiental y hotelería corporativa bajo un único respaldo legal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                  <h3 className="text-base font-bold text-[#2E5A07] flex items-center gap-2 mb-3">
                    <Icons.Truck className="w-5 h-5 text-[#6CBE1A]" />
                    Frente de Obra: Sanitarios Portátiles
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li>• Cabinas higiénicas según la Norma Técnica G.050.</li>
                    <li>• Mantenimiento programado con camión de succión propio.</li>
                    <li>• Desinfección con productos amigables con el medio ambiente.</li>
                    <li>• Certificados ambientales válidos para SUNAFIL.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                  <h3 className="text-base font-bold text-[#8a6828] flex items-center gap-2 mb-3">
                    <Icons.Bed className="w-5 h-5 text-[#C8A064]" />
                    Hospedaje: Hotel Ejecutivo Nelly
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li>• Alojamiento para ingenieros residentes y supervisores.</li>
                    <li>• Cocheras privadas techadas para camionetas 4x4.</li>
                    <li>• Wi-Fi de alta velocidad para envío de informes y planos.</li>
                    <li>• Facturación con crédito a 30 o 60 días según avance de obra.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#0F172A] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base">¿Deseas activar una línea de crédito para tu consorcio?</h4>
                  <p className="text-xs text-slate-400">Atención directa con gerencia comercial: cotizaciones@inversionesnelly.pe</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentRoute('/sanitarios-portatiles');
                    setTimeout(() => {
                      document.getElementById('sticky-quote-form')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-6 py-3 rounded-xl text-xs shrink-0 transition"
                >
                  Iniciar Cotización Rápida
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* RUTA 5: ERP ADMINISTRATIVO UNIFICADO ( /admin/dashboard ) */}
        {/* Rutas: KPIs, Sanitarios/Succión, Hotel/Rack, Facturación, Docker */}
        {/* ------------------------------------------------------------------ */}
        {currentRoute === '/admin/dashboard' && (
          <div className="bg-slate-900 min-h-screen text-slate-100 pb-16">
            
            {/* TOP BAR ERP */}
            <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-4">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#6CBE1A] animate-pulse"></div>
                  <div>
                    <h1 className="text-base font-black text-white flex items-center gap-2">
                      INVERSIONES NELLY S.A.C.
                      <span className="text-[10px] bg-slate-800 text-[#6CBE1A] font-mono px-2 py-0.5 rounded border border-slate-700">
                        ERP UNIFICADO v2.5
                      </span>
                    </h1>
                    <p className="text-[11px] text-slate-400">
                      Módulo de Control Central: Saneamiento Ambiental + Hospitalidad Hotelera
                    </p>
                  </div>
                </div>

                {/* Conmutador de Pestañas del ERP */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                  {[
                    { id: 'kpis', label: 'Dashboard KPIs', icon: Icons.Cpu },
                    { id: 'sanitarios', label: 'Flota & Succión', icon: Icons.Truck },
                    { id: 'hotel', label: 'Rack Hotelero', icon: Icons.Bed },
                    { id: 'facturacion', label: 'Facturación SUNAT', icon: Icons.FileText },
                    { id: 'docker', label: 'Arquitectura Docker', icon: Icons.Sparkles }
                  ].map(tab => {
                    const IconComp = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveErpTab(tab.id as ErpTab)}
                        className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                          activeErpTab === tab.id
                            ? 'bg-[#6CBE1A] text-slate-950 font-bold shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">

              {/* ------------------------------------------------------------ */}
              {/* PESTAÑA ERP 1: DASHBOARD KPIS EN TIEMPO REAL */}
              {/* ------------------------------------------------------------ */}
              {activeErpTab === 'kpis' && (
                <div className="space-y-8">
                  {/* Tarjetas KPI */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-lg">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Facturación Mensual
                        </span>
                        <div className="p-2 rounded-lg bg-[#6CBE1A]/20 text-[#6CBE1A]">
                          <Icons.FileText className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-white mt-2 font-mono">
                        S/ {erpMetrics.totalMonthlyIncome.toLocaleString('es-PE')}.00
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                        <span>Sanitarios: S/ {erpMetrics.sanitaryIncome}</span>
                        <span>Hotel: S/ {erpMetrics.hotelIncome}</span>
                      </div>
                    </div>

                    <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-lg">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Flota de Baños en Obra
                        </span>
                        <div className="p-2 rounded-lg bg-[#00A8E8]/20 text-[#00A8E8]">
                          <Icons.Truck className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-white mt-2 font-mono">
                        {erpMetrics.rentedSanitaryUnits} <span className="text-sm font-normal text-slate-400">/ {erpMetrics.totalFleetUnits} unidades</span>
                      </div>
                      <div className="text-[11px] text-[#6CBE1A] font-semibold mt-1">
                        {erpMetrics.fleetUtilization}% de capacidad activa en proyectos
                      </div>
                    </div>

                    <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-lg">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Ocupación Hotelera
                        </span>
                        <div className="p-2 rounded-lg bg-[#C8A064]/20 text-[#C8A064]">
                          <Icons.Bed className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-white mt-2 font-mono">
                        {erpMetrics.occupancyPercentage}%
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {erpMetrics.occupiedRooms} habitaciones ocupadas de {erpMetrics.totalRooms}
                      </div>
                    </div>

                    <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-lg">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Rutas de Succión Hoy
                        </span>
                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                          <Icons.Droplets className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-white mt-2 font-mono">
                        {erpMetrics.scheduledSuctionsToday} Obras
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                        2 Camiones cisterna en ruta
                      </div>
                    </div>

                  </div>

                  {/* Resumen Rápido de Contratos en Obra */}
                  <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-base font-bold text-white">Contratos de Sanitarios en Obra Activos</h3>
                        <p className="text-xs text-slate-400">Monitoreo de limpieza y certificados DIGESA emitidos</p>
                      </div>
                      <button
                        onClick={() => setActiveErpTab('sanitarios')}
                        className="text-xs text-[#6CBE1A] font-bold hover:underline"
                      >
                        Ver todos los contratos →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-700 text-slate-400 font-semibold">
                            <th className="pb-3">Código / RUC</th>
                            <th className="pb-3">Empresa / Proyecto</th>
                            <th className="pb-3">Equipos</th>
                            <th className="pb-3">Frecuencia Succión</th>
                            <th className="pb-3">Última Limpieza</th>
                            <th className="pb-3">Certificado DIGESA</th>
                            <th className="pb-3 text-right">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                          {contracts.map(c => (
                            <tr key={c.id} className="hover:bg-slate-750/50">
                              <td className="py-3 font-mono">
                                <span className="font-bold text-white">{c.code}</span>
                                <div className="text-[10px] text-slate-500">{c.ruc}</div>
                              </td>
                              <td className="py-3">
                                <div className="font-bold text-white">{c.companyName}</div>
                                <div className="text-[11px] text-slate-400">{c.projectName} ({c.location})</div>
                              </td>
                              <td className="py-3">
                                <span className="bg-[#6CBE1A]/20 text-[#6CBE1A] px-2 py-0.5 rounded font-bold font-mono">
                                  {c.unitsCount} unidades
                                </span>
                              </td>
                              <td className="py-3">{c.cleaningFrequency}</td>
                              <td className="py-3">
                                <span className={c.lastSuctionDate.includes('Hoy') ? 'text-[#6CBE1A] font-bold' : 'text-slate-300'}>
                                  {c.lastSuctionDate}
                                </span>
                              </td>
                              <td className="py-3 font-mono text-[11px] text-[#00A8E8]">
                                {c.digesaCertNumber}
                              </td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedContractForSuction(c);
                                    setIsSuctionModalOpen(true);
                                  }}
                                  className="bg-[#00A8E8]/20 hover:bg-[#00A8E8]/30 text-[#00A8E8] border border-[#00A8E8]/40 px-2.5 py-1 rounded text-[11px] font-bold transition"
                                >
                                  Registrar Succión
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* ------------------------------------------------------------ */}
              {/* PESTAÑA ERP 2: FLOTA DE SANITARIOS Y RUTAS DE SUCCIÓN */}
              {/* ------------------------------------------------------------ */}
              {activeErpTab === 'sanitarios' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-white">Flota de Sanitarios & Hojas de Ruta</h2>
                      <p className="text-xs text-slate-400">Control de números de serie `IN-BP-XXX` y mantenimiento hidrostático</p>
                    </div>
                    <button
                      onClick={() => showToast('Hoja de Ruta Generada', 'Descargando manifiesto de camión cisterna en formato PDF', 'info')}
                      className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      <Icons.Truck className="w-4 h-4" />
                      Imprimir Hoja de Ruta de Cisterna
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contracts.map(c => (
                      <div key={c.id} className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-xs font-bold text-[#6CBE1A]">{c.code}</span>
                            <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                              {c.status}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-white text-sm mt-2">{c.companyName}</h3>
                          <div className="text-xs text-slate-400">{c.projectName}</div>
                          <div className="text-xs text-slate-500 mt-0.5">📍 {c.location}</div>

                          {/* Chips de Series Asignadas */}
                          <div className="mt-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              Unidades Físicas Asignadas ({c.unitsCount}):
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {c.assignedSeries.map((serie, idx) => (
                                <span key={idx} className="bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px] px-1.5 py-0.5 rounded">
                                  {serie}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs space-y-1 text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Frecuencia:</span>
                              <strong>{c.cleaningFrequency}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Última Succión:</span>
                              <strong className={c.lastSuctionDate.includes('Hoy') ? 'text-[#6CBE1A]' : 'text-amber-400'}>
                                {c.lastSuctionDate}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-700 flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedContractForSuction(c);
                              setIsSuctionModalOpen(true);
                            }}
                            className="flex-1 bg-[#00A8E8] hover:bg-[#0092ca] text-slate-950 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                          >
                            <Icons.Droplets className="w-3.5 h-3.5" />
                            Registrar Succión Hoy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------ */}
              {/* PESTAÑA ERP 3: RACK VISUAL DE HABITACIONES DEL HOTEL */}
              {/* ------------------------------------------------------------ */}
              {activeErpTab === 'hotel' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">Rack Visual de Habitaciones (Pisos 1 al 3)</h2>
                      <p className="text-xs text-slate-400">Haz clic en cualquier habitación para cambiar su estado operativo</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#6CBE1A]"></span>
                        <span className="text-slate-300">Disponible</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                        <span className="text-slate-300">Ocupada</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                        <span className="text-slate-300">Limpieza Pendiente</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span className="text-slate-300">Mantenimiento</span>
                      </div>
                    </div>
                  </div>

                  {/* Cuadrícula por Pisos */}
                  {[1, 2, 3].map(floorNumber => (
                    <div key={floorNumber} className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5">
                      <h3 className="text-sm font-bold text-[#C8A064] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Icons.Building className="w-4 h-4" />
                        Piso {floorNumber}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {rooms.filter(r => r.floor === floorNumber).map(room => (
                          <div
                            key={room.id}
                            onClick={() => setSelectedRoomForEdit(room)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                              room.status === 'DISPONIBLE'
                                ? 'bg-slate-900 border-[#6CBE1A]/40 hover:border-[#6CBE1A]'
                                : room.status === 'OCUPADA'
                                ? 'bg-slate-900 border-rose-500/40 hover:border-rose-500'
                                : room.status === 'LIMPIEZA_PENDIENTE'
                                ? 'bg-slate-900 border-amber-400/40 hover:border-amber-400'
                                : 'bg-slate-900 border-purple-500/40 hover:border-purple-500'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-lg font-black text-white font-mono">
                                #{room.roomNumber}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                room.status === 'DISPONIBLE' ? 'bg-[#6CBE1A]/20 text-[#6CBE1A]' :
                                room.status === 'OCUPADA' ? 'bg-rose-500/20 text-rose-400' :
                                room.status === 'LIMPIEZA_PENDIENTE' ? 'bg-amber-400/20 text-amber-300' :
                                'bg-purple-500/20 text-purple-300'
                              }`}>
                                {room.status}
                              </span>
                            </div>

                            <div className="text-xs font-semibold text-slate-300 truncate">
                              {room.typeName}
                            </div>

                            {room.status === 'OCUPADA' ? (
                              <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                                <div className="text-white font-medium truncate">{room.currentGuest}</div>
                                <div className="text-[10px] text-slate-500">Hasta: {room.checkOut || 'Indefinido'}</div>
                              </div>
                            ) : (
                              <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                                <span>Tarifa:</span>
                                <strong className="text-slate-200">S/ {room.corporatePrice}</strong>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ------------------------------------------------------------ */}
              {/* PESTAÑA ERP 4: FACTURACIÓN ELECTRÓNICA SUNAT */}
              {/* ------------------------------------------------------------ */}
              {activeErpTab === 'facturacion' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-white">Comprobantes de Pago Electrónicos SUNAT</h2>
                      <p className="text-xs text-slate-400">Facturación unificada para servicios de sanitarios y hotel</p>
                    </div>
                    <button
                      onClick={() => showToast('Facturación Abierta', 'Formulario para emitir nueva factura electrónica SUNAT', 'info')}
                      className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition"
                    >
                      + Emitir Nueva Factura Electrónica
                    </button>
                  </div>

                  <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-700 text-slate-400">
                          <th className="p-4">Comprobante</th>
                          <th className="p-4">RUC / DNI</th>
                          <th className="p-4">Cliente / Razón Social</th>
                          <th className="p-4">Unidad Negocio</th>
                          <th className="p-4">Subtotal</th>
                          <th className="p-4">Total S/</th>
                          <th className="p-4">Estado SUNAT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {invoices.map(inv => (
                          <tr key={inv.id} className="hover:bg-slate-750">
                            <td className="p-4 font-mono font-bold text-white">{inv.number}</td>
                            <td className="p-4 font-mono">{inv.docNumber}</td>
                            <td className="p-4 font-semibold text-white">{inv.clientName}</td>
                            <td className="p-4">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                inv.businessUnit === 'SANITARIOS' ? 'bg-[#6CBE1A]/20 text-[#6CBE1A]' :
                                inv.businessUnit === 'HOTEL' ? 'bg-[#C8A064]/20 text-[#C8A064]' :
                                'bg-indigo-500/20 text-indigo-300'
                              }`}>
                                {inv.businessUnit}
                              </span>
                            </td>
                            <td className="p-4 font-mono">S/ {inv.amount.toFixed(2)}</td>
                            <td className="p-4 font-mono font-bold text-white">S/ {inv.total.toFixed(2)}</td>
                            <td className="p-4">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6CBE1A]">
                                <Icons.CheckCircle className="w-3.5 h-3.5" />
                                {inv.sunatStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------ */}
              {/* PESTAÑA ERP 5: INFRAESTRUCTURA DOCKER & NEXT.JS READY */}
              {/* ------------------------------------------------------------ */}
              {activeErpTab === 'docker' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Infraestructura Dockerizada & Configuración Next.js</h2>
                    <p className="text-xs text-slate-400">Archivos listos para producción para desplegar la plataforma con un solo comando</p>
                  </div>

                  <DockerCodeViewer showToast={showToast} />
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* ==================================================================== */}
      {/* 4. MODALES INTERACTIVOS */}
      {/* ==================================================================== */}

      {/* MODAL 1: RESERVA DE HABITACIÓN HOTEL */}
      {isBookingModalOpen && selectedRoomForBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-900 shadow-2xl border border-slate-200 animate-scale-up">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Reservar Habitación #{selectedRoomForBooking.roomNumber}
                </h3>
                <p className="text-xs text-slate-500">{selectedRoomForBooking.typeName} - Piso {selectedRoomForBooking.floor}</p>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                handleConfirmBooking(selectedRoomForBooking, {
                  name: form.guestName.value,
                  doc: form.docNumber.value,
                  company: form.companyName.value,
                  nights: Number(form.nights.value)
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo del Huésped:</label>
                <input
                  type="text"
                  name="guestName"
                  required
                  defaultValue="Ing. Roberto Alarcón"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">DNI o RUC Empresa:</label>
                  <input
                    type="text"
                    name="docNumber"
                    required
                    defaultValue="20512345678"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Empresa Contratista:</label>
                  <input
                    type="text"
                    name="companyName"
                    defaultValue="Consorcio Vial del Norte"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Número de Noches:</label>
                <input
                  type="number"
                  name="nights"
                  min="1"
                  max="30"
                  defaultValue="4"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-bold"
                />
              </div>

              <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Tarifa Seleccionada:</span>
                  <span className="font-bold text-slate-900">
                    S/ {hotelFilter.isCorporateRate ? selectedRoomForBooking.corporatePrice : selectedRoomForBooking.basePrice} / noche
                  </span>
                </div>
                <div className="flex justify-between text-slate-800 font-bold text-sm">
                  <span>Total Estimado (4 noches):</span>
                  <span className="text-[#8a6828]">
                    S/ {(hotelFilter.isCorporateRate ? selectedRoomForBooking.corporatePrice : selectedRoomForBooking.basePrice) * 4}.00
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-black transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Icons.CheckCircle className="w-4 h-4" />
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: REGISTRAR SUCCIÓN DE SANITARIOS */}
      {isSuctionModalOpen && selectedContractForSuction && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl border border-slate-700 animate-scale-up">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icons.Droplets className="w-5 h-5 text-[#00A8E8]" />
                  Registrar Servicio de Succión
                </h3>
                <p className="text-xs text-slate-400">{selectedContractForSuction.companyName}</p>
              </div>
              <button
                onClick={() => setIsSuctionModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div>
                <span className="text-slate-400">Obra / Ubicación:</span>
                <div className="font-bold text-white mt-0.5">{selectedContractForSuction.projectName}</div>
                <div className="text-slate-400 text-[11px]">{selectedContractForSuction.location}</div>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="text-slate-400">Unidades a succión:</span>
                <strong className="text-[#6CBE1A]">{selectedContractForSuction.unitsCount} baños portátiles</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Camión Cisterna:</span>
                <strong className="text-[#00A8E8]">Cisterna Hidrostática Placa B8F-912</strong>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsSuctionModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleExecuteSuction(selectedContractForSuction)}
                className="flex-1 py-2.5 rounded-xl bg-[#00A8E8] hover:bg-[#0092ca] text-slate-950 font-bold transition text-xs flex items-center justify-center gap-1.5"
              >
                <Icons.CheckCircle className="w-4 h-4" />
                Firmar y Emitir Certificado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: GESTIÓN RÁPIDA DE HABITACIÓN EN RACK ERP */}
      {selectedRoomForEdit && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-sm w-full text-white shadow-2xl border border-slate-700">
            <h3 className="text-base font-bold text-white mb-1">
              Habitación #{selectedRoomForEdit.roomNumber} ({selectedRoomForEdit.typeName})
            </h3>
            <p className="text-xs text-slate-400 mb-4">Selecciona el nuevo estado para esta habitación:</p>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                onClick={() => handleUpdateRoomStatus(selectedRoomForEdit.id, 'DISPONIBLE')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#6CBE1A]/20 hover:bg-[#6CBE1A]/30 text-[#6CBE1A] font-bold text-left border border-[#6CBE1A]/40 flex items-center justify-between"
              >
                <span>✓ Marcar DISPONIBLE (Limpia)</span>
                <span className="text-[10px]">Libre</span>
              </button>

              <button
                onClick={() => handleUpdateRoomStatus(selectedRoomForEdit.id, 'OCUPADA')}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-left border border-rose-500/40 flex items-center justify-between"
              >
                <span>✓ Marcar OCUPADA (Check-In)</span>
                <span className="text-[10px]">Huésped</span>
              </button>

              <button
                onClick={() => handleUpdateRoomStatus(selectedRoomForEdit.id, 'LIMPIEZA_PENDIENTE')}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-bold text-left border border-amber-400/40 flex items-center justify-between"
              >
                <span>✓ Marcar LIMPIEZA PENDIENTE</span>
                <span className="text-[10px]">Housekeeping</span>
              </button>

              <button
                onClick={() => handleUpdateRoomStatus(selectedRoomForEdit.id, 'MANTENIMIENTO')}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-left border border-purple-500/40 flex items-center justify-between"
              >
                <span>✓ Bloquear por MANTENIMIENTO</span>
                <span className="text-[10px]">Reparación</span>
              </button>
            </div>

            <button
              onClick={() => setSelectedRoomForEdit(null)}
              className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. FOOTER CORPORATIVO UNIFICADO */}
      {/* ==================================================================== */}
      <footer className="bg-[#0B1322] text-slate-400 text-xs py-12 px-4 sm:px-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <NellyLogo size="sm" darkTheme />
            <p className="text-slate-400 text-xs leading-relaxed">
              Consorcio líder en saneamiento ambiental certificado y hospitalidad ejecutiva en el Perú. Garantía de cumplimiento ante SUNAFIL, DIGESA y SUNAT.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Eco-Sanitarios Portátiles</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Cabinas Estándar para Obras (G.050)</li>
              <li>• Sanitarios Ejecutivos VIP a Pedal</li>
              <li>• Lavamanos Dobles Autónomos</li>
              <li>• Succión Hidrostática con Cisterna</li>
              <li>• Certificados Ambientales DIGESA</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Hotel & Hospedaje Nelly</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Habitaciones Simples Ejecutivas</li>
              <li>• Habitaciones Dobles para Contratistas</li>
              <li>• Cocheras Privadas para Flotas 4x4</li>
              <li>• Convenios B2B con Factura a 30 días</li>
              <li>• Desayuno Temprano para Cuadrillas</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Contacto Corporativo</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>📍 Sede Central: Av. Los Próceres 1240, Lima - Perú</p>
              <p>📞 Centralita: (01) 719-8420 / 987-654-321</p>
              <p>✉️ Ventas: cotizaciones@inversionesnelly.pe</p>
              <div className="pt-2">
                <span className="inline-block bg-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono text-[11px] border border-slate-700">
                  RUC 20608945123
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 Inversiones Nelly S.A.C. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Libro de Reclamaciones Virtual</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidad</span>
            <span className="hover:text-slate-400 cursor-pointer">Homologación de Proveedores</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ============================================================================
// COMPONENTE: VISOR INTERACTIVO DE ARCHIVOS DOCKER & NEXT.JS
// Permite copiar el Dockerfile, docker-compose.yml y schema.prisma listos para prod
// ============================================================================
function DockerCodeViewer({ showToast }: { showToast: (t: string, m: string, type?: any) => void }) {
  const [activeTab, setActiveTab] = useState<'dockerfile' | 'compose' | 'prisma' | 'nextconfig'>('compose');
  const [copied, setCopied] = useState(false);

  const DOCKERFILE_CODE = `# ==========================================
# Inversiones Nelly S.A.C. - Dockerfile Multi-Stage
# Next.js 15 App Router + TypeScript + Prisma
# ==========================================

# ETAPA 1: Dependencias
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci

# ETAPA 2: Compilación y Build Standalone
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npx prisma generate
RUN npm run build

# ETAPA 3: Imagen Ultraligera de Ejecución (Runner)
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]`;

  const DOCKER_COMPOSE_CODE = `version: '3.9'

# ====================================================================
# Orquestación de Contenedores: Inversiones Nelly S.A.C.
# PostgreSQL 16 + Redis 7 + DB Migrator + Next.js App Router
# ====================================================================

services:
  # 1. Base de Datos Relacional Unificada (Sanitarios + Hotel)
  postgres_db:
    image: postgres:16-alpine
    container_name: nelly_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: \${DB_USER:-nelly_admin}
      POSTGRES_PASSWORD: \${DB_PASSWORD:-NellySecret2026!}
      POSTGRES_DB: \${DB_NAME:-inversiones_nelly_db}
      TZ: 'America/Lima'
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - nelly_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER:-nelly_admin} -d \${DB_NAME:-inversiones_nelly_db}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # 2. Caché y Lock de Habitaciones para Evitar Overbooking
  redis_cache:
    image: redis:7-alpine
    container_name: nelly_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass \${REDIS_PASSWORD:-NellyRedis2026!}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - nelly_network
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "\${REDIS_PASSWORD:-NellyRedis2026!}", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # 3. Migrador Automático de Prisma Schema
  db_migrator:
    build:
      context: .
      target: builder
    container_name: nelly_migrator
    environment:
      DATABASE_URL: postgresql://\${DB_USER:-nelly_admin}:\${DB_PASSWORD:-NellySecret2026!}@postgres_db:5432/\${DB_NAME:-inversiones_nelly_db}?schema=public
    depends_on:
      postgres_db:
        condition: service_healthy
    command: >
      sh -c "npx prisma migrate deploy && npx prisma db seed"
    networks:
      - nelly_network

  # 4. Aplicación Web Principal Next.js 15
  web_app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: nelly_nextjs_app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://\${DB_USER:-nelly_admin}:\${DB_PASSWORD:-NellySecret2026!}@postgres_db:5432/\${DB_NAME:-inversiones_nelly_db}?schema=public
      REDIS_URL: redis://:\${REDIS_PASSWORD:-NellyRedis2026!}@redis_cache:6379
      NEXT_PUBLIC_COMPANY_NAME: "Inversiones Nelly S.A.C."
      NEXT_PUBLIC_RUC: "20608945123"
      TZ: 'America/Lima'
    depends_on:
      postgres_db:
        condition: service_healthy
      redis_cache:
        condition: service_healthy
      db_migrator:
        condition: service_completed_successfully
    networks:
      - nelly_network

volumes:
  postgres_data:
  redis_data:

networks:
  nelly_network:
    driver: bridge`;

  const PRISMA_SCHEMA_CODE = `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. Directorio Único de Clientes B2B y Personas Naturales
model CoreCustomer {
  id              String   @id @default(uuid())
  docType         String   // RUC, DNI, CE
  docNumber       String   @unique
  businessName    String
  email           String?
  phone           String
  fiscalAddress   String?
  customerSegment String   @default("AMBOS") // SANITARIOS, HOTEL, AMBOS
  creditLimit     Decimal  @default(0.00) @db.Decimal(12, 2)
  createdAt       DateTime @default(now())

  rentalContracts SanRentalContract[]
  hotelBookings   HotBooking[]
  invoices        CoreInvoice[]
}

// 2. Catálogo y Contratos de Sanitarios Portátiles
model SanCatalogModel {
  id          String   @id @default(uuid())
  code        String   @unique
  name        String
  category    String   // OBRA_MINERIA, EVENTOS_VIP, etc.
  monthlyRate Decimal  @db.Decimal(10, 2)
  specs       Json
}

model SanRentalContract {
  id                String       @id @default(uuid())
  contractCode      String       @unique
  customerId        String
  customer          CoreCustomer @relation(fields: [customerId], references: [id])
  projectName       String
  deliveryAddress   String
  unitsCount        Int
  cleaningFrequency String
  monthlyRate       Decimal      @db.Decimal(12, 2)
  status            String       @default("ACTIVO")
  lastSuctionDate   DateTime?
  digesaCertNumber  String?
  createdAt         DateTime     @default(now())
}

// 3. Habitaciones y Reservas del Hotel
model HotRoom {
  id                  String       @id @default(uuid())
  roomNumber          String       @unique
  floor               Int
  roomType            String
  basePriceNight      Decimal      @db.Decimal(10, 2)
  corporatePriceNight Decimal      @db.Decimal(10, 2)
  status              String       @default("DISPONIBLE")
  bookings            HotBooking[]
}

model HotBooking {
  id           String       @id @default(uuid())
  bookingCode  String       @unique
  customerId   String
  customer     CoreCustomer @relation(fields: [customerId], references: [id])
  roomId       String
  room         HotRoom      @relation(fields: [roomId], references: [id])
  checkInDate  DateTime
  checkOutDate DateTime
  totalAmount  Decimal      @db.Decimal(12, 2)
  status       String       @default("CONFIRMADA")
  createdAt    DateTime     @default(now())
}

// 4. Facturación Electrónica SUNAT
model CoreInvoice {
  id           String       @id @default(uuid())
  number       String       @unique
  invoiceType  String       // FACTURA, BOLETA
  customerId   String
  customer     CoreCustomer @relation(fields: [customerId], references: [id])
  businessUnit String       // SANITARIOS, HOTEL, CONVENIO_INTEGRAL
  subtotal     Decimal      @db.Decimal(12, 2)
  igv          Decimal      @db.Decimal(12, 2)
  total        Decimal      @db.Decimal(12, 2)
  sunatStatus  String       @default("ACEPTADO_SUNAT")
  createdAt    DateTime     @default(now())
}`;

  const NEXT_CONFIG_CODE = `// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Habilita el modo standalone para contenedores Docker ultraligeros (<150MB)
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'inversionesnelly.pe'],
    },
  },
};

export default nextConfig;`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'dockerfile': return DOCKERFILE_CODE;
      case 'compose': return DOCKER_COMPOSE_CODE;
      case 'prisma': return PRISMA_SCHEMA_CODE;
      case 'nextconfig': return NEXT_CONFIG_CODE;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    showToast('Copiado al Portapapeles', `Código de ${activeTab} copiado con éxito`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('compose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'compose' ? 'bg-[#6CBE1A] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            docker-compose.yml
          </button>
          <button
            onClick={() => setActiveTab('dockerfile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'dockerfile' ? 'bg-[#6CBE1A] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dockerfile
          </button>
          <button
            onClick={() => setActiveTab('prisma')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'prisma' ? 'bg-[#6CBE1A] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            schema.prisma
          </button>
          <button
            onClick={() => setActiveTab('nextconfig')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'nextconfig' ? 'bg-[#6CBE1A] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            next.config.ts
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
        >
          {copied ? <Icons.CheckCircle className="w-3.5 h-3.5 text-[#6CBE1A]" /> : <Icons.Copy className="w-3.5 h-3.5" />}
          {copied ? '¡Copiado!' : 'Copiar Archivo'}
        </button>
      </div>

      <div className="p-4 overflow-x-auto bg-[#070D18]">
        <pre className="text-xs font-mono text-slate-300 leading-relaxed">
          <code>{getActiveCode()}</code>
        </pre>
      </div>

      <div className="bg-slate-900/90 px-4 py-3 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap justify-between items-center gap-2">
        <span>💡 <strong>Comando de Despliegue:</strong> <code>docker compose up -d --build</code></span>
        <span className="text-[#6CBE1A]">Multi-Stage Build • Next.js Standalone • PostgreSQL 16 • Redis 7</span>
      </div>
    </div>
  );
}
