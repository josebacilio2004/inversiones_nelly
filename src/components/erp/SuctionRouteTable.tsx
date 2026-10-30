'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';
import { Modal } from '@/components/ui/Modal';
import type { RentalContract } from '@/types';

export const SuctionRouteTable: React.FC = () => {
  const { contracts, updateSuction, showToast } = useAppStore();
  const [selectedContract, setSelectedContract] = useState<RentalContract | null>(null);

  const handleConfirmSuction = () => {
    if (!selectedContract) return;
    const today = new Date().toISOString().split('T')[0] ?? '2026-11-01';
    const certNumber = `DIG-SUCC-${Math.floor(8000 + Math.random() * 1999)}`;

    updateSuction(selectedContract.id, certNumber, `${today} (Hoy - 16:30 hrs)`);
    setSelectedContract(null);

    showToast(
      'Succión Registrada',
      `Obra: ${selectedContract.projectName}. Certificado DIGESA emitido: ${certNumber}`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Flota de Sanitarios & Hojas de Ruta</h2>
          <p className="text-xs text-slate-400">
            Control de números de serie `IN-BP-XXX` y mantenimiento con camión cisterna hidrostático
          </p>
        </div>
        <button
          onClick={() =>
            showToast('Hoja de Ruta Generada', 'Descargando manifiesto de cisterna en PDF', 'info')
          }
          className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md"
        >
          <Icons.Truck className="w-4 h-4" />
          Imprimir Hoja de Ruta de Cisterna
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contracts.map((c) => (
          <div
            key={c.id}
            className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 flex flex-col justify-between"
          >
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

              <div className="mt-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Unidades Asignadas ({c.unitsCount}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.assignedSeries.map((serie, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px] px-1.5 py-0.5 rounded"
                    >
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
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Certificado:</span>
                  <span className="font-mono text-[#00A8E8]">{c.digesaCertNumber}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-700">
              <button
                onClick={() => setSelectedContract(c)}
                className="w-full bg-[#00A8E8] hover:bg-[#0092ca] text-slate-950 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Icons.Droplets className="w-3.5 h-3.5" />
                Registrar Succión Hoy
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={selectedContract !== null}
        onClose={() => setSelectedContract(null)}
        title="Registrar Servicio de Succión"
        subtitle={selectedContract?.companyName}
        maxWidth="sm"
      >
        {selectedContract && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <div>
                <span className="text-slate-500">Obra:</span>
                <div className="font-bold text-slate-800">{selectedContract.projectName}</div>
              </div>
              <div>
                <span className="text-slate-500">Ubicación:</span>
                <div className="text-slate-700">{selectedContract.location}</div>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span>Unidades:</span>
                <strong className="text-[#2E5A07]">{selectedContract.unitsCount} baños</strong>
              </div>
              <div className="flex justify-between">
                <span>Cisterna:</span>
                <strong className="text-[#00A8E8]">Cisterna B8F-912 (1,500 gal)</strong>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedContract(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSuction}
                className="flex-1 py-2.5 rounded-xl bg-[#00A8E8] hover:bg-[#0092ca] text-slate-950 font-black flex items-center justify-center gap-1.5 shadow-md"
              >
                <Icons.CheckCircle className="w-4 h-4" />
                Emitir Certificado
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
