'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';

export interface OperationHub {
  id: string;
  name: string;
  department: string;
  coords: { x: number; y: number }; // Porcentaje sobre el mapa (SVG viewBox 0..600 x 0..700)
  clientName: string;
  contractCode: string;
  unitsDeployed: number;
  model: string;
  suctionStatus: 'EN_RUTA' | 'COMPLETADO_HOY' | 'PROGRAMADO_MANANA';
  assignedTruck: string;
  driverName: string;
  lastService: string;
  digesaCert: string;
  sector: 'Construcción Civil' | 'Minería' | 'Agroindustria' | 'Infraestructura Vial';
}

const HUBS: OperationHub[] = [
  {
    id: 'hub-lima',
    name: 'Lima Metropolitana & Callao',
    department: 'Lima',
    coords: { x: 230, y: 350 },
    clientName: 'CONSORCIO METRO LÍNEA 2 & COSAPI INGENIERÍA',
    contractCode: 'CTR-2026-089',
    unitsDeployed: 450,
    model: 'Sanitario Estándar de Obra (Tanque 210L)',
    suctionStatus: 'EN_RUTA',
    assignedTruck: 'Cisterna Hidrosuccionadora IN-SUC-01',
    driverName: 'Tco. Manuel Cárdenas (Brevete Especial A-IIIc)',
    lastService: 'Hoy 14:15 hrs',
    digesaCert: 'DIG-RES-2026-4412',
    sector: 'Infraestructura Vial',
  },
  {
    id: 'hub-chosica',
    name: 'Chosica - Carretera Central Km 42',
    department: 'Lima Provincias',
    coords: { x: 255, y: 335 },
    clientName: 'CONSORCIO VIAL DEL NORTE S.A.C.',
    contractCode: 'CTR-2026-089',
    unitsDeployed: 38,
    model: 'Sanitario Estándar de Obra (Tanque 210L)',
    suctionStatus: 'COMPLETADO_HOY',
    assignedTruck: 'Cisterna Hidrosuccionadora IN-SUC-02',
    driverName: 'Tco. Roberto Gómez',
    lastService: 'Hoy 11:30 hrs',
    digesaCert: 'DIG-RES-2026-4412',
    sector: 'Construcción Civil',
  },
  {
    id: 'hub-lurin',
    name: 'Lurín - Megaparque Industrial',
    department: 'Lima',
    coords: { x: 245, y: 375 },
    clientName: 'CONSTRUCTORA COSAPI INGENIERÍA S.A.',
    contractCode: 'CTR-2026-094',
    unitsDeployed: 85,
    model: 'Sanitario Ejecutivo VIP (Lavamanos y Bomba de Pie)',
    suctionStatus: 'EN_RUTA',
    assignedTruck: 'Cisterna Hidrosuccionadora IN-SUC-03',
    driverName: 'Tco. Juan Carlos Flores',
    lastService: 'Hoy 13:40 hrs',
    digesaCert: 'DIG-RES-2026-4520',
    sector: 'Construcción Civil',
  },
  {
    id: 'hub-ica',
    name: 'Ica - Subtanjalla & Villacurí',
    department: 'Ica',
    coords: { x: 280, y: 440 },
    clientName: 'AGROEXPORTADORA DEL SUR S.A.A.',
    contractCode: 'CTR-2026-102',
    unitsDeployed: 120,
    model: 'Sanitario Estándar de Obra (Tanque 210L)',
    suctionStatus: 'COMPLETADO_HOY',
    assignedTruck: 'Cisterna Hidrosuccionadora IN-SUC-04',
    driverName: 'Tco. Javier Ramos',
    lastService: 'Hoy 09:20 hrs',
    digesaCert: 'DIG-RES-2026-4601',
    sector: 'Agroindustria',
  },
  {
    id: 'hub-junin',
    name: 'Junín - Toromocho / Chinalco (4,500 msnm)',
    department: 'Junín',
    coords: { x: 295, y: 310 },
    clientName: 'MINERA CHINALCO PERÚ S.A.',
    contractCode: 'CTR-2026-118',
    unitsDeployed: 75,
    model: 'Sanitario Térmico Reforzado para Gran Altitud',
    suctionStatus: 'PROGRAMADO_MANANA',
    assignedTruck: 'Camión Cisterna 4x4 IN-SUC-05',
    driverName: 'Tco. Carlos Mendoza',
    lastService: 'Ayer 16:00 hrs',
    digesaCert: 'DIG-RES-2026-4780',
    sector: 'Minería',
  },
  {
    id: 'hub-trujillo',
    name: 'La Libertad - Proyecto Chavimochic',
    department: 'La Libertad',
    coords: { x: 145, y: 220 },
    clientName: 'CONSORCIO HIDRÁULICO CHAVIMOCHIC',
    contractCode: 'CTR-2026-130',
    unitsDeployed: 90,
    model: 'Sanitario Estándar de Obra (Tanque 210L)',
    suctionStatus: 'EN_RUTA',
    assignedTruck: 'Cisterna Hidrosuccionadora IN-SUC-06',
    driverName: 'Tco. Luis Paredes',
    lastService: 'Hoy 15:00 hrs',
    digesaCert: 'DIG-RES-2026-4890',
    sector: 'Infraestructura Vial',
  },
  {
    id: 'hub-arequipa',
    name: 'Arequipa - Cerro Verde / Yarabamba',
    department: 'Arequipa',
    coords: { x: 420, y: 530 },
    clientName: 'CONSORCIO CONSTRUCTOR AREQUIPA INDUSTRIAL',
    contractCode: 'CTR-2026-144',
    unitsDeployed: 60,
    model: 'Sanitario Ejecutivo VIP (Lavamanos y Bomba de Pie)',
    suctionStatus: 'COMPLETADO_HOY',
    assignedTruck: 'Cisterna Hidrosuccionadora IN-SUC-07',
    driverName: 'Tco. Fernando Quispe',
    lastService: 'Hoy 12:10 hrs',
    digesaCert: 'DIG-RES-2026-4920',
    sector: 'Minería',
  },
  {
    id: 'hub-moquegua',
    name: 'Moquegua - Quellaveco Mina',
    department: 'Moquegua',
    coords: { x: 460, y: 570 },
    clientName: 'CONTRATISTAS ANGLO AMERICAN S.A.',
    contractCode: 'CTR-2026-156',
    unitsDeployed: 50,
    model: 'Sanitario Accesible & Ejecutivo',
    suctionStatus: 'PROGRAMADO_MANANA',
    assignedTruck: 'Camión Cisterna 4x4 IN-SUC-08',
    driverName: 'Tco. Víctor Valdivia',
    lastService: 'Ayer 17:30 hrs',
    digesaCert: 'DIG-RES-2026-5011',
    sector: 'Minería',
  },
  {
    id: 'hub-piura',
    name: 'Piura - Refinería Talara',
    department: 'Piura',
    coords: { x: 110, y: 120 },
    clientName: 'TÉCNICAS REUNIDAS DEL PERÚ',
    contractCode: 'CTR-2026-162',
    unitsDeployed: 70,
    model: 'Sanitario Estándar de Obra (Tanque 210L)',
    suctionStatus: 'EN_RUTA',
    assignedTruck: 'Cisterna Hidrosuccionadora IN-SUC-09',
    driverName: 'Tco. Pedro Huamán',
    lastService: 'Hoy 10:45 hrs',
    digesaCert: 'DIG-RES-2026-5120',
    sector: 'Construcción Civil',
  },
];

export const PeruInteractiveMap: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<OperationHub>(HUBS[0] as OperationHub);
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<OperationHub | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toLowerCase();
    if (!query) return;

    const match = HUBS.find(
      (h) =>
        h.contractCode.toLowerCase().includes(query) ||
        h.clientName.toLowerCase().includes(query) ||
        h.name.toLowerCase().includes(query) ||
        h.department.toLowerCase().includes(query)
    );

    if (match) {
      setSelectedHub(match);
      setSearchResult(match);
    } else {
      setSearchResult(null);
    }
  };

  return (
    <section className="bg-[#0B1322] text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background decorativo de radar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Cabecera del Centro de Comando Logístico */}
      <div className="max-w-4xl mx-auto text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6CBE1A]/15 border border-[#6CBE1A]/30 text-[#6CBE1A] text-xs font-mono font-bold uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-ping" />
          Centro de Control Logístico & Cobertura Nacional en Tiempo Real
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Red Operativa de <span className="text-[#6CBE1A]">Baños Portátiles</span> & <span className="text-[#00A8E8]">Camiones Hidrosuccionadores</span> en Todo el Perú
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
          Haz clic o posa el cursor sobre cualquiera de los frentes de trabajo para inspeccionar en vivo las unidades de sanitarios portátiles desplegadas, el camión de succión asignado y el manifiesto ambiental oficial DIGESA.
        </p>

        {/* Barra de Búsqueda Rápida de Servicio / RUC / Contrato */}
        <form onSubmit={handleSearch} className="mt-6 max-w-xl mx-auto flex items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-700/80 shadow-xl">
          <Icons.Search className="w-5 h-5 text-slate-400 ml-2" />
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="Buscar por RUC, Contrato (ej. CTR-2026-089) o Región..."
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none px-2"
          />
          <button
            type="submit"
            className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5"
          >
            Rastrear
          </button>
        </form>
      </div>

      {/* Grid: Mapa Interactivo a la Izquierda + Panel Telemetría en Vivo a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto relative z-10">
        
        {/* COLUMNA 1: MAPA VECTORIAL DEL PERÚ CON NODOS INTERACTIVOS (7 Cols) */}
        <div className="lg:col-span-7 relative bg-slate-950/70 rounded-3xl p-4 sm:p-6 border border-slate-800/80 shadow-inner flex flex-col items-center justify-center">
          
          <div className="w-full flex justify-between items-center text-xs text-slate-400 mb-3 px-2">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              9 Nodos Activos • 1,250+ Cabinas en Terreno
            </span>
            <span className="font-mono text-[11px] bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-[#00A8E8]">
              DIGESA Saneamiento Perú
            </span>
          </div>

          <div className="relative w-full max-w-[500px] aspect-[5/6]">
            {/* SVG Vectorial Interactivo del Territorio Peruano */}
            <svg
              viewBox="0 0 600 700"
              className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,168,232,0.15)]"
            >
              <defs>
                <linearGradient id="peruGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0F172A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0B1322" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6CBE1A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00A8E8" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Silueta Geográfica Simplificada del Perú */}
              <path
                d="M 120 70 
                   Q 150 50, 200 60 
                   Q 260 80, 310 110 
                   Q 360 130, 420 180 
                   Q 460 230, 470 290 
                   Q 490 350, 470 420 
                   Q 480 480, 520 540 
                   Q 510 590, 470 630 
                   Q 430 650, 400 620 
                   Q 350 580, 310 520 
                   Q 260 460, 230 400 
                   Q 200 340, 160 280 
                   Q 110 210, 95 150 
                   Z"
                fill="url(#peruGradient)"
                stroke="#334155"
                strokeWidth="2.5"
                className="transition-colors duration-500"
              />

              {/* Líneas de Red Conectadas al Hub Central de Lima (estilo GlobalLink) */}
              {HUBS.filter(h => h.id !== 'hub-lima').map((hub) => (
                <path
                  key={`line-${hub.id}`}
                  d={`M 230 350 Q ${(230 + hub.coords.x) / 2 - 20} ${(350 + hub.coords.y) / 2 - 20}, ${hub.coords.x} ${hub.coords.y}`}
                  fill="none"
                  stroke={selectedHub.id === hub.id ? '#6CBE1A' : 'url(#routeGradient)'}
                  strokeWidth={selectedHub.id === hub.id ? 2.5 : 1.2}
                  strokeDasharray={selectedHub.id === hub.id ? 'none' : '4 4'}
                  className="transition-all duration-300"
                />
              ))}

              {/* Nodos Interactivos (Puntos sobre el mapa) */}
              {HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <g
                    key={hub.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHub(hub)}
                  >
                    {/* Anillo Pulsante */}
                    <circle
                      cx={hub.coords.x}
                      cy={hub.coords.y}
                      r={isSelected ? 16 : 9}
                      fill={isSelected ? '#6CBE1A' : '#00A8E8'}
                      opacity={isSelected ? 0.3 : 0.15}
                      className="animate-ping"
                    />

                    {/* Círculo Principal del Nodo */}
                    <circle
                      cx={hub.coords.x}
                      cy={hub.coords.y}
                      r={isSelected ? 8 : 5}
                      fill={isSelected ? '#6CBE1A' : '#00A8E8'}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-all duration-300 group-hover:scale-125"
                    />

                    {/* Etiqueta de la Ciudad */}
                    <text
                      x={hub.coords.x + 10}
                      y={hub.coords.y + 4}
                      fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                      fontSize="10"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="monospace"
                      className="select-none pointer-events-none"
                    >
                      {hub.department} ({hub.unitsDeployed})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full flex justify-center gap-4 text-[11px] text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6CBE1A]" />
              Nodo Seleccionado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A8E8]" />
              Frente de Obra / Operación
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-dashed bg-[#6CBE1A]" />
              Ruta Hidrosucción
            </span>
          </div>
        </div>

        {/* COLUMNA 2: PANEL DE TELEMETRÍA Y DETALLES DEL CLIENTE EN VIVO (5 Cols) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHub.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/95 rounded-3xl p-6 sm:p-7 border-2 border-[#6CBE1A]/40 shadow-2xl relative"
            >
              {/* Badge de Estado de Operación */}
              <div className="flex justify-between items-start gap-2 mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#6CBE1A]/20 text-[#6CBE1A] px-3 py-1 rounded-full border border-[#6CBE1A]/30 flex items-center gap-1.5">
                  <Icons.ShieldCheck className="w-3.5 h-3.5" />
                  {selectedHub.sector}
                </span>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    selectedHub.suctionStatus === 'EN_RUTA'
                      ? 'bg-amber-400 text-slate-950 font-black animate-pulse'
                      : selectedHub.suctionStatus === 'COMPLETADO_HOY'
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-blue-600 text-white font-black'
                  }`}
                >
                  {selectedHub.suctionStatus === 'EN_RUTA'
                    ? '🚚 Camión en Ruta'
                    : selectedHub.suctionStatus === 'COMPLETADO_HOY'
                    ? '✓ Succión Completada Hoy'
                    : '📅 Programado Mañana'}
                </span>
              </div>

              {/* Nombre de la Obra y Empresa */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedHub.name}
              </h3>
              <p className="text-xs font-semibold text-[#00A8E8] mt-1 flex items-center gap-1.5">
                <Icons.Building2 className="w-3.5 h-3.5" />
                {selectedHub.clientName}
              </p>

              {/* Métricas Principales del Contrato */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Baños Portátiles</div>
                  <div className="text-2xl font-black text-[#6CBE1A] font-mono">
                    {selectedHub.unitsDeployed}{' '}
                    <span className="text-xs font-normal text-slate-400">unidades</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Última Succión</div>
                  <div className="text-base font-bold text-white font-mono mt-1">
                    {selectedHub.lastService}
                  </div>
                </div>
              </div>

              {/* Especificaciones Técnicas del Servicio */}
              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Modelo Desplegado:</span>
                  <span className="font-bold text-white text-right">{selectedHub.model}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Camión Cisterna Asignado:</span>
                  <span className="font-bold text-[#00A8E8] text-right">{selectedHub.assignedTruck}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Operador Certificado:</span>
                  <span className="font-semibold text-white text-right">{selectedHub.driverName}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Contrato / Orden:</span>
                  <span className="font-mono text-[#6CBE1A] font-bold">{selectedHub.contractCode}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Manifiesto DIGESA:</span>
                  <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-bold">
                    {selectedHub.digesaCert}
                  </span>
                </div>
              </div>

              {/* Botón de Descarga de Certificado DIGESA Simulado */}
              <div className="mt-6 flex gap-3">
                <a
                  href="#sticky-quote-form"
                  className="flex-1 bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black py-3 rounded-xl text-xs text-center transition shadow-lg shadow-[#6CBE1A]/20"
                >
                  Cotizar Baños para esta Zona
                </a>
                <button
                  onClick={() => {
                    alert(`Descargando copia legal certificada del Manifiesto de Residuos Sólidos DIGESA N° ${selectedHub.digesaCert} para ${selectedHub.clientName}. Válido para auditorías SUNAFIL.`);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-3 rounded-xl text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
                  title="Descargar Certificado DIGESA"
                >
                  <Icons.FileText className="w-4 h-4 text-[#00A8E8]" />
                  <span>Manifiesto</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
