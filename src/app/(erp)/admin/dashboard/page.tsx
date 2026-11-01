'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { KpiStatCard } from '@/components/erp/KpiStatCard';
import { Icons } from '@/components/ui/Icons';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function AdminDashboardPage() {
  const { contracts, rooms, showToast } = useAppStore();
  const [timeRange, setTimeRange] = useState<'30D' | 'TRIMESTRE' | 'ANUAL'>('TRIMESTRE');

  // Métricas reactivas
  const metrics = useMemo(() => {
    const totalContractIncome = contracts
      .filter((c) => c.status === 'ACTIVO')
      .reduce((sum, c) => sum + c.monthlyRate, 0);

    const occupiedRooms = rooms.filter((r) => r.status === 'OCUPADA').length;
    const totalRooms = rooms.length;
    const occupancyPercentage = Math.round((occupiedRooms / totalRooms) * 100);

    const monthlyHotelEstIncome = rooms
      .filter((r) => r.status === 'OCUPADA')
      .reduce((sum, r) => sum + r.corporatePrice * 30, 0);

    const rentedSanitaryUnits = contracts
      .filter((c) => c.status === 'ACTIVO')
      .reduce((sum, c) => sum + c.unitsCount, 0);

    const totalFleetUnits = 120;
    const scheduledSuctionsToday = contracts.filter((c) => c.status === 'ACTIVO').length;

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
      scheduledSuctionsToday,
    };
  }, [contracts, rooms]);

  // Datos para AreaChart: Ingresos Históricos y Proyectados B2B (Soles S/)
  const monthlyRevenueData = [
    { mes: 'May', sanitarios: 28500, hotel: 12400, total: 40900 },
    { mes: 'Jun', sanitarios: 31200, hotel: 14100, total: 45300 },
    { mes: 'Jul', sanitarios: 36800, hotel: 16800, total: 53600 },
    { mes: 'Ago', sanitarios: 41000, hotel: 17200, total: 58200 },
    { mes: 'Set', sanitarios: 47900, hotel: 18900, total: 66800 },
    { mes: 'Oct', sanitarios: 52400, hotel: 20080, total: 72480 },
  ];

  // Datos para BarChart: Distribución de Cabinas por Sector Económico
  const sectorDistributionData = [
    { sector: 'Minería & Canteras', cabinas: 450, succiónSLA: 99 },
    { sector: 'Obras Viales MTC', cabinas: 340, succiónSLA: 98 },
    { sector: 'Edificaciones Lima', cabinas: 280, succiónSLA: 97 },
    { sector: 'Agroexportación Ica', cabinas: 180, succiónSLA: 100 },
  ];

  // Datos para PieChart: Estado del Inventario de Baños Portátiles
  const inventoryStatusData = [
    { name: 'En Obra / Arrendados', value: 78, color: '#6CBE1A' },
    { name: 'Disponibles en Base', value: 14, color: '#00A8E8' },
    { name: 'Mantenimiento / Desinfección', value: 8, color: '#C8A064' },
  ];

  // Datos para LineChart: Cumplimiento de Succiones Semanales
  const weeklySuctionTrendData = [
    { semana: 'Sem 1', programadas: 42, ejecutadas: 42, conformidad: 100 },
    { semana: 'Sem 2', programadas: 48, ejecutadas: 47, conformidad: 98 },
    { semana: 'Sem 3', programadas: 55, ejecutadas: 55, conformidad: 100 },
    { semana: 'Sem 4', programadas: 62, ejecutadas: 61, conformidad: 99 },
  ];

  const handleExportBi = () => {
    showToast(
      'Exportación BI Generada',
      'El consolidado gerencial en Excel/PDF se ha descargado con los ratios de OEE y SUNAT.',
      'info'
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. ENCABEZADO EJECUTIVO BI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/15 border border-[#6CBE1A]/30 text-[#6CBE1A] text-xs font-mono font-bold mb-2">
            <Icons.BarChart className="w-3.5 h-3.5" />
            BUSINESS INTELLIGENCE & ANALYTICS ERP
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Panel Gerencial de Operaciones & Finanzas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Métricas integradas en tiempo real de saneamiento ambiental, hospitalidad corporativa y cumplimiento DIGESA.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Selector de Rango */}
          <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center text-xs font-bold">
            {(['30D', 'TRIMESTRE', 'ANUAL'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-xl transition ${
                  timeRange === range
                    ? 'bg-[#6CBE1A] text-slate-950 font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportBi}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-700 flex items-center gap-2 transition"
          >
            <Icons.FileText className="w-4 h-4 text-[#00A8E8]" />
            <span>Exportar BI</span>
          </button>
        </div>
      </div>

      {/* 2. TARJETAS KPI DE ALTO IMPACTO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiStatCard
          title="Facturación Mensual B2B"
          value={`S/ ${metrics.totalMonthlyIncome.toLocaleString('es-PE')}.00`}
          subValue={`Sanitarios: S/ ${metrics.sanitaryIncome.toLocaleString()} | Hotel: S/ ${metrics.hotelIncome.toLocaleString()}`}
          icon={Icons.TrendingUp}
          iconColorClass="bg-[#6CBE1A]/20 text-[#6CBE1A]"
          trendText="+14.2% vs setiembre"
        />

        <KpiStatCard
          title="Flota Activa en Obra"
          value={`${metrics.rentedSanitaryUnits} / ${metrics.totalFleetUnits}`}
          subValue={`${metrics.fleetUtilization}% de capacidad operativa`}
          icon={Icons.Truck}
          iconColorClass="bg-[#00A8E8]/20 text-[#00A8E8]"
          trendText="En ruta"
        />

        <KpiStatCard
          title="Ocupación Hotelera"
          value={`${metrics.occupancyPercentage}%`}
          subValue={`${metrics.occupiedRooms} habitaciones ocupadas de ${metrics.totalRooms}`}
          icon={Icons.Bed}
          iconColorClass="bg-[#C8A064]/20 text-[#C8A064]"
          trendText="ADR: S/ 115/noche"
        />

        <KpiStatCard
          title="Rutas de Succión Hoy"
          value={`${metrics.scheduledSuctionsToday} Obras`}
          subValue="2 Camiones cisterna con telemetría activa"
          icon={Icons.Droplets}
          iconColorClass="bg-emerald-500/20 text-emerald-400"
          trendText="100% Cero Fugas"
        />
      </div>

      {/* 3. GRÁFICOS INTERACTIVOS RECHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gráfico 1: Área de Facturación Combinada (8 columnas) */}
        <div className="lg:col-span-8 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Icons.TrendingUp className="w-4 h-4 text-[#6CBE1A]" />
                <span>Evolución de Ingresos B2B (Eco-Sanitarios vs Hospitalidad)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Facturación consolidada mensual expresada en Soles (PEN)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded bg-[#6CBE1A]"></span> Sanitarios
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded bg-[#00A8E8]"></span> Hotel Ejecutivo
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSanitarios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6CBE1A" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#6CBE1A" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorHotel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A8E8" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#00A8E8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mes" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(val) => `S/${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '1rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`S/ ${Number(value).toLocaleString('es-PE')}`, '']}
                />
                <Area
                  type="monotone"
                  dataKey="sanitarios"
                  name="Eco-Sanitarios"
                  stroke="#6CBE1A"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorSanitarios)"
                />
                <Area
                  type="monotone"
                  dataKey="hotel"
                  name="Hotel Ejecutivo"
                  stroke="#00A8E8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHotel)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Donut de Disponibilidad de Flota (4 columnas) */}
        <div className="lg:col-span-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.PieChart className="w-4 h-4 text-[#00A8E8]" />
              <span>Inventario Operativo de Flota</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Estado de las 1,250 cabinas rotomoldeadas
            </p>
          </div>

          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {inventoryStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Porcentaje']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
            {inventoryStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </span>
                <span className="font-mono font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. SEGUNDA FILA DE GRÁFICOS: BARCHART POR SECTOR Y LÍNEA DE CUMPLIMIENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* BarChart: Despliegue por Sector */}
        <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.Building className="w-4 h-4 text-[#C8A064]" />
              <span>Despliegue de Baños Portátiles por Sector Industrial</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Unidades operando en proyectos de infraestructura, minas y agricultura
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorDistributionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="sector" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value} Unidades`, 'Cabinas']}
                />
                <Bar dataKey="cabinas" fill="#6CBE1A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LineChart: Cumplimiento Semanal de Succión */}
        <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cumplimiento SLA de Succión Hidrostática</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tasa de entrega a tiempo de Manifiestos DIGESA
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklySuctionTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="semana" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[95, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Conformidad SLA']}
                />
                <Line
                  type="monotone"
                  dataKey="conformidad"
                  stroke="#00A8E8"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#6CBE1A', strokeWidth: 2, stroke: '#0f172a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. TABLA DE CONTRATOS EN OBRA ACTIVOS */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.CheckCircle className="w-4 h-4 text-[#6CBE1A]" />
              <span>Contratos de Sanitarios en Obra Activos</span>
            </h3>
            <p className="text-xs text-slate-400">
              Control de succión, rutas de camión cisterna y números de manifiesto DIGESA emitidos
            </p>
          </div>
          <Link
            href="/admin/sanitarios"
            className="text-xs text-[#6CBE1A] font-bold hover:underline flex items-center gap-1"
          >
            <span>Gestionar flota y rutas</span>
            <Icons.ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-3">Código / RUC</th>
                <th className="pb-3">Empresa / Proyecto</th>
                <th className="pb-3">Equipos</th>
                <th className="pb-3">Frecuencia</th>
                <th className="pb-3">Última Limpieza</th>
                <th className="pb-3">Certificado DIGESA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 font-mono">
                    <span className="font-bold text-white">{c.code}</span>
                    <div className="text-[10px] text-slate-500">{c.ruc}</div>
                  </td>
                  <td className="py-3">
                    <div className="font-bold text-white">{c.companyName}</div>
                    <div className="text-[11px] text-slate-400">
                      {c.projectName} ({c.location})
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="bg-[#6CBE1A]/20 text-[#6CBE1A] px-2 py-0.5 rounded-lg font-bold font-mono">
                      {c.unitsCount} unidades
                    </span>
                  </td>
                  <td className="py-3">{c.cleaningFrequency}</td>
                  <td className="py-3">
                    <span
                      className={
                        c.lastSuctionDate.includes('Hoy')
                          ? 'text-[#6CBE1A] font-bold'
                          : 'text-slate-300'
                      }
                    >
                      {c.lastSuctionDate}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-[#00A8E8]">
                    {c.digesaCertNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
