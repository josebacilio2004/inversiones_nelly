'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { lookupSunatRuc } from '@/lib/sunat';
import { QuoteFormSchema } from '@/lib/validations/quote.schema';
import { Icons } from '@/components/ui/Icons';
import type { RentalContract, Invoice } from '@/types';

interface StickyQuoteFormProps {
  initialUnits?: number;
  initialFrequency?: string;
}

export const StickyQuoteForm: React.FC<StickyQuoteFormProps> = ({
  initialUnits = 5,
  initialFrequency = '2 veces por semana',
}) => {
  const { addContract, addInvoice, showToast } = useAppStore();

  const [formData, setFormData] = useState({
    docNumber: '20512345678',
    companyName: 'CONSORCIO VIAL DEL NORTE S.A.C.',
    contactName: 'Ing. Jorge Ramirez',
    phone: '987-654-321',
    email: 'contacto@vialnorte.pe',
    projectName: 'Ampliación Colectores de Desagüe',
    location: 'Lurín - Sector Industrial, Lima',
    modelCode: 'IN-SAN-01',
    unitsCount: initialUnits,
    monthsCount: 3,
    cleaningFrequency: initialFrequency,
  });

  const [isSunatLoading, setIsSunatLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSunatLookup = async () => {
    setIsSunatLoading(true);
    try {
      const company = await lookupSunatRuc(formData.docNumber);
      setFormData((prev) => ({
        ...prev,
        companyName: company.businessName,
        location: company.fiscalAddress,
        contactName: company.representative,
      }));
      showToast('Consulta SUNAT Exitosa', `Razón Social: ${company.businessName}`, 'info');
    } catch {
      showToast('Aviso SUNAT', 'Se aplicó autocompletado estándar', 'info');
    } finally {
      setIsSunatLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const validation = QuoteFormSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0].toString()] = err.message;
      });
      setFormErrors(errors);
      showToast('Error de Validación', 'Por favor revisa los campos señalados', 'error');
      return;
    }

    const newCode = `CTR-2026-${Math.floor(100 + Math.random() * 900)}`;
    const baseMonthlyPrice = 380;
    const totalMonthly = baseMonthlyPrice * formData.unitsCount;

    const series = Array.from(
      { length: formData.unitsCount },
      () => `IN-BP-${Math.floor(100 + Math.random() * 899)}`
    );

    const newContract: RentalContract = {
      id: `c_${Date.now()}`,
      code: newCode,
      ruc: formData.docNumber,
      companyName: formData.companyName,
      projectName: formData.projectName,
      location: formData.location,
      modelCode: formData.modelCode,
      modelName: 'Sanitario Estándar de Obra (Tanque 210L)',
      unitsCount: formData.unitsCount,
      assignedSeries: series,
      cleaningFrequency: formData.cleaningFrequency,
      monthlyRate: totalMonthly,
      startDate: new Date().toISOString().split('T')[0] ?? '2026-11-01',
      endDate: new Date(Date.now() + formData.monthsCount * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0] ?? '2027-02-01',
      status: 'ACTIVO',
      lastSuctionDate: 'Pendiente 1ra Entrega',
      digesaCertNumber: `DIG-RES-2026-${Math.floor(5000 + Math.random() * 4000)}`,
    };

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      number: `F001-000${Math.floor(4600 + Math.random() * 900)}`,
      type: 'FACTURA',
      docNumber: formData.docNumber,
      clientName: formData.companyName,
      businessUnit: 'SANITARIOS',
      amount: totalMonthly,
      igv: totalMonthly * 0.18,
      total: totalMonthly * 1.18,
      date: new Date().toISOString().split('T')[0] ?? '2026-11-01',
      sunatStatus: 'ACEPTADO_SUNAT',
    };

    addContract(newContract);
    addInvoice(newInvoice);

    showToast(
      '¡Cotización Formal Enviada!',
      `Se reservaron ${formData.unitsCount} unidades en el ERP con código ${newCode}.`,
      'success'
    );
  };

  return (
    <div id="sticky-quote-form" className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border-2 border-[#6CBE1A]/30">
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

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            RUC de Empresa o DNI:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={formData.docNumber}
              onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
              placeholder="Ej: 20512345678"
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#6CBE1A] outline-none"
            />
            <button
              type="button"
              onClick={handleSunatLookup}
              disabled={isSunatLoading}
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg font-bold text-xs shrink-0 flex items-center gap-1 transition"
            >
              {isSunatLoading ? (
                <Icons.RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                'Validar SUNAT'
              )}
            </button>
          </div>
          {formErrors['docNumber'] && (
            <p className="text-rose-500 text-[11px] mt-1">{formErrors['docNumber']}</p>
          )}
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Razón Social (Detectada):
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-800 font-semibold text-xs outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Proyecto / Obra:</label>
            <input
              type="text"
              required
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Ubicación / Distrito:</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Cantidad Baños:</label>
            <input
              type="number"
              min="1"
              max="50"
              required
              value={formData.unitsCount}
              onChange={(e) => setFormData({ ...formData, unitsCount: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Succión / Limpieza:</label>
            <select
              value={formData.cleaningFrequency}
              onChange={(e) => setFormData({ ...formData, cleaningFrequency: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
            >
              <option value="1 vez por semana">1 vez por semana</option>
              <option value="2 veces por semana">2 veces por semana</option>
              <option value="3 veces por semana">3 veces por semana</option>
              <option value="Diario (Eventos)">Diario (Eventos)</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 mt-2">
          <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
            <span>Subtotal Estimado Mensual:</span>
            <span className="font-bold text-slate-900">
              S/ {380 * formData.unitsCount}.00
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>I.G.V. (18% Factura Oficial):</span>
            <span>S/ {(380 * formData.unitsCount * 0.18).toFixed(2)}</span>
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
  );
};
