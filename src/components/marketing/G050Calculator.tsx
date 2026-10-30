'use client';

import React, { useState, useMemo } from 'react';
import { calculateG050 } from '@/lib/g050';
import { Icons } from '@/components/ui/Icons';
import { useAppStore } from '@/store/useAppStore';

interface G050CalculatorProps {
  onTransferToQuote?: (data: { units: number; frequency: string }) => void;
}

export const G050Calculator: React.FC<G050CalculatorProps> = ({ onTransferToQuote }) => {
  const [workersCount, setWorkersCount] = useState<number>(45);
  const [shiftsCount, setShiftsCount] = useState<number>(1);
  const [sector, setSector] = useState<'OBRA' | 'MINERIA' | 'EVENTOS'>('OBRA');
  const showToast = useAppStore((state) => state.showToast);

  const results = useMemo(() => {
    return calculateG050({
      workersCount,
      shiftsCount,
      sector,
    });
  }, [workersCount, shiftsCount, sector]);

  const handleTransfer = () => {
    if (onTransferToQuote) {
      onTransferToQuote({
        units: results.toiletsRequired,
        frequency: results.recommendedSuction.split('(')[0]?.trim() || '2 veces por semana',
      });
    }
    showToast(
      'Datos volcados al Formulario',
      `Configurado: ${results.toiletsRequired} sanitarios (${results.recommendedSuction})`,
      'success'
    );
    const formElement = document.getElementById('sticky-quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
            Calcula la dotación legal de inodoros portátiles exigida por SUNAFIL según la cantidad de operarios.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start lg:self-auto">
          {(['OBRA', 'MINERIA', 'EVENTOS'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setSector(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                sector === sec ? 'bg-[#2E5A07] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sec === 'OBRA' ? 'Construcción Civil' : sec === 'MINERIA' ? 'Minería' : 'Eventos Masivos'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
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
              <span>5 operarios</span>
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
                    shiftsCount === 1 ? 'bg-[#2E5A07] text-white border-[#2E5A07]' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  1 Turno (8h)
                </button>
                <button
                  type="button"
                  onClick={() => setShiftsCount(2)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                    shiftsCount === 2 ? 'bg-[#2E5A07] text-white border-[#2E5A07]' : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  2 Turnos (24h)
                </button>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-center">
              <div className="text-xs text-slate-500 font-medium">Parámetro Normativo Legal:</div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Norma G.050 Art. 12: 1 inodoro + 1 lavamanos por cada 20 trabajadores o fracción.
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-[#6CBE1A] uppercase tracking-wider mb-3">
              Dotación Obligatoria Exigida por Ley:
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="text-3xl font-black text-[#6CBE1A] font-mono">{results.toiletsRequired}</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">Inodoros Mínimos</div>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="text-3xl font-black text-[#00A8E8] font-mono">{results.sinksRequired}</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">Lavamanos Autónomos</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 mb-4">
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span>Frecuencia Succión:</span>
                <strong className="text-white">{results.recommendedSuction}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span>Químicos Biodegradables:</span>
                <strong className="text-[#6CBE1A]">Incluido 100%</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Presupuesto Mensual Estimado:</span>
                <strong className="text-xl font-black text-[#6CBE1A]">
                  S/ {results.estimatedMonthlyCost}.00
                </strong>
              </div>
            </div>
          </div>

          <button
            onClick={handleTransfer}
            className="w-full bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-black py-3 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Icons.Copy className="w-4 h-4" />
            Volcar Datos al Formulario de Cotización
          </button>
        </div>
      </div>
    </div>
  );
};
