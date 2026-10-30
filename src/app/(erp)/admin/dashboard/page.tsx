'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { KpiStatCard } from '@/components/erp/KpiStatCard';
import { Icons } from '@/components/ui/Icons';

export default function AdminDashboardPage() {
  const { contracts, rooms } = useAppStore();

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard Ejecutivo ERP</h1>
        <p className="text-xs text-slate-400 mt-1">
          Visión unificada en tiempo real: Flota de Saneamiento y Operaciones Hoteleras
        </p>
      </div>

      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiStatCard
          title="Facturación Mensual"
          value={`S/ ${metrics.totalMonthlyIncome.toLocaleString('es-PE')}.00`}
          subValue={`Sanitarios: S/ ${metrics.sanitaryIncome} | Hotel: S/ ${metrics.hotelIncome}`}
          icon={Icons.FileText}
          iconColorClass="bg-[#6CBE1A]/20 text-[#6CBE1A]"
        />

        <KpiStatCard
          title="Flota en Obra"
          value={`${metrics.rentedSanitaryUnits} / ${metrics.totalFleetUnits}`}
          subValue={`${metrics.fleetUtilization}% de capacidad activa`}
          icon={Icons.Truck}
          iconColorClass="bg-[#00A8E8]/20 text-[#00A8E8]"
          trendText="En ruta"
        />

        <KpiStatCard
          title="Ocupación Hotelera"
          value={`${metrics.occupancyPercentage}%`}
          subValue={`${metrics.occupiedRooms} habitaciones de ${metrics.totalRooms}`}
          icon={Icons.Bed}
          iconColorClass="bg-[#C8A064]/20 text-[#C8A064]"
        />

        <KpiStatCard
          title="Succiones Hoy"
          value={`${metrics.scheduledSuctionsToday} Obras`}
          subValue="2 Camiones cisterna activos"
          icon={Icons.Droplets}
          iconColorClass="bg-emerald-500/20 text-emerald-400"
        />
      </div>

      {/* Contratos Recientes en Obra */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Contratos de Sanitarios en Obra Activos</h3>
            <p className="text-xs text-slate-400">Monitoreo de limpieza y certificados DIGESA emitidos</p>
          </div>
          <Link
            href="/admin/sanitarios"
            className="text-xs text-[#6CBE1A] font-bold hover:underline"
          >
            Ver todos los contratos →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 font-semibold">
                <th className="pb-3">Código / RUC</th>
                <th className="pb-3">Empresa / Proyecto</th>
                <th className="pb-3">Equipos</th>
                <th className="pb-3">Frecuencia</th>
                <th className="pb-3">Última Limpieza</th>
                <th className="pb-3">Certificado DIGESA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-750/50">
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
                    <span className="bg-[#6CBE1A]/20 text-[#6CBE1A] px-2 py-0.5 rounded font-bold font-mono">
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
