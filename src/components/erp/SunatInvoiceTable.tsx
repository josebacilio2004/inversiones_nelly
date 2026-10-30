'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';

export const SunatInvoiceTable: React.FC = () => {
  const { invoices, showToast } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Comprobantes de Pago Electrónicos SUNAT</h2>
          <p className="text-xs text-slate-400">Facturación unificada para servicios de sanitarios y hotel</p>
        </div>
        <button
          onClick={() =>
            showToast('Facturación Abierta', 'Formulario para emitir nueva factura electrónica SUNAT', 'info')
          }
          className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition"
        >
          + Emitir Nueva Factura Electrónica
        </button>
      </div>

      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
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
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-750">
                <td className="p-4 font-mono font-bold text-white">{inv.number}</td>
                <td className="p-4 font-mono">{inv.docNumber}</td>
                <td className="p-4 font-semibold text-white">{inv.clientName}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      inv.businessUnit === 'SANITARIOS'
                        ? 'bg-[#6CBE1A]/20 text-[#6CBE1A]'
                        : inv.businessUnit === 'HOTEL'
                        ? 'bg-[#C8A064]/20 text-[#C8A064]'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
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
  );
};
