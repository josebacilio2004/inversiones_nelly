'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';
import type { CompanyInfo, BankAccountInfo } from '@/types';

export default function AdminEmpresaPage() {
  const { companyInfo, updateCompanyInfo, showToast } = useAppStore();

  const [formData, setFormData] = useState<CompanyInfo>({ ...companyInfo });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof CompanyInfo, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBankChange = (index: number, field: keyof BankAccountInfo, value: string) => {
    const updatedAccounts = [...formData.bankAccounts];
    const current = updatedAccounts[index];
    if (!current) return;
    const target: BankAccountInfo = { ...current };
    if (field === 'accountNumber') target.accountNumber = value;
    else if (field === 'cci') target.cci = value;
    else if (field === 'bank') target.bank = value;
    else if (field === 'accountType') target.accountType = value;
    else if (field === 'currency') target.currency = value;
    updatedAccounts[index] = target;
    setFormData((prev) => ({
      ...prev,
      bankAccounts: updatedAccounts,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(formData);
    setIsEditing(false);
    showToast(
      'Datos de la Empresa Actualizados',
      'La información fiscal, legal y cuentas bancarias han sido guardadas en el ERP unificado.',
      'success'
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/15 border border-[#6CBE1A]/30 text-[#6CBE1A] text-xs font-mono font-bold mb-2">
            <Icons.Building2 className="w-3.5 h-3.5" />
            CONFIGURACIÓN CORPORATIVA & FISCAL
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Datos Generales de la Empresa
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Información fiscal SUNAT, autorizaciones de DIGESA / MINAM y cuentas bancarias B2B.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
            <Icons.CheckCircle className="w-3.5 h-3.5" />
            HABILITADO EN SUNAT (HABIDO)
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 2. IDENTIFICACIÓN LEGAL Y TRIBUTARIA */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Icons.FileText className="w-4 h-4 text-[#6CBE1A]" />
                <span>Identificación Fiscal SUNAT & Representación Legal</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Datos oficiales para la emisión de Facturas Electrónicas y Licitaciones Públicas
              </p>
            </div>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold text-xs py-2 px-4 rounded-xl transition flex items-center gap-1.5 shadow-md"
              >
                <Icons.RefreshCw className="w-3.5 h-3.5" />
                <span>Editar Datos</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...companyInfo });
                    setIsEditing(false);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 px-3 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold text-xs py-2 px-4 rounded-xl transition shadow-md"
                >
                  Guardar Cambios
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Razón Social */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Razón Social Oficial</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white disabled:text-slate-400 focus:outline-none focus:border-[#6CBE1A]"
              />
            </div>

            {/* RUC */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Número de RUC</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.ruc}
                onChange={(e) => handleChange('ruc', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#6CBE1A] disabled:text-[#6CBE1A]/80 focus:outline-none focus:border-[#6CBE1A]"
              />
            </div>

            {/* Nombre Comercial */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nombre Comercial</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.tradeName}
                onChange={(e) => handleChange('tradeName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white disabled:text-slate-400 focus:outline-none focus:border-[#6CBE1A]"
              />
            </div>

            {/* Dirección Fiscal */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Dirección Fiscal Registrada</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.fiscalAddress}
                onChange={(e) => handleChange('fiscalAddress', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white disabled:text-slate-400 focus:outline-none focus:border-[#6CBE1A]"
              />
            </div>

            {/* Base Operaciones */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Planta Operativa & Maestranza</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.operationalBase}
                onChange={(e) => handleChange('operationalBase', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white disabled:text-slate-400 focus:outline-none focus:border-[#6CBE1A]"
              />
            </div>

            {/* Representante Legal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Representante Legal (Gerente General)</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.legalRepresentative}
                onChange={(e) => handleChange('legalRepresentative', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white disabled:text-slate-400 focus:outline-none focus:border-[#6CBE1A]"
              />
            </div>

            {/* DNI Representante */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">DNI del Representante</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.representativeDni}
                onChange={(e) => handleChange('representativeDni', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white disabled:text-slate-400 focus:outline-none focus:border-[#6CBE1A]"
              />
            </div>

            {/* Correo Facturación */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Correo Electrónico de Facturación</label>
              <input
                type="email"
                disabled={!isEditing}
                value={formData.billingEmail}
                onChange={(e) => handleChange('billingEmail', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-[#00A8E8] disabled:text-[#00A8E8]/80 focus:outline-none focus:border-[#00A8E8]"
              />
            </div>
          </div>
        </div>

        {/* 3. AUTORIZACIONES AMBIENTALES Y CONTACTO DE EMERGENCIA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Permisos Sanitarios */}
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Autorizaciones Ambientales & Homologación</span>
            </h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Resolución Sanitaria DIGESA (Transporte y Residuos)
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.digesaAuthorization}
                  onChange={(e) => handleChange('digesaAuthorization', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-emerald-400 disabled:text-emerald-400/80 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Registro MINAM como Empresa Operadora de Residuos Sólidos (EO-RS)
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.eorsMinamRegistry}
                  onChange={(e) => handleChange('eorsMinamRegistry', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#00A8E8] disabled:text-[#00A8E8]/80 focus:outline-none focus:border-[#00A8E8]"
                />
              </div>
            </div>
          </div>

          {/* Centrales Telefónicas */}
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.Phone className="w-4 h-4 text-[#C8A064]" />
              <span>Canales de Atención 24 Horas</span>
            </h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Central Telefónica Fija 24/7</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.phoneCentral}
                  onChange={(e) => handleChange('phoneCentral', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white disabled:text-slate-400 focus:outline-none focus:border-[#6CBE1A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">WhatsApp de Emergencias en Obra</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.emergencyWhatsapp}
                  onChange={(e) => handleChange('emergencyWhatsapp', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#6CBE1A] disabled:text-[#6CBE1A]/80 focus:outline-none focus:border-[#6CBE1A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. CUENTAS BANCARIAS B2B Y DETRACCIONES */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl">
          <div className="mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.CreditCard className="w-4 h-4 text-[#00A8E8]" />
              <span>Cuentas Bancarias B2B & Cuenta de Detracciones SUNAT</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cuentas oficiales para abono de cotizaciones y emisión de órdenes de compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.bankAccounts.map((account, index) => (
              <div key={index} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{account.bank}</span>
                  <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {account.currency}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500">Tipo:</span>
                    <div className="text-slate-300 text-[11px] font-medium">{account.accountType}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Número de Cuenta:</span>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={account.accountNumber}
                      onChange={(e) => handleBankChange(index, 'accountNumber', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-[#6CBE1A] disabled:text-[#6CBE1A]/90 focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Código Interbancario (CCI):</span>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={account.cci}
                      onChange={(e) => handleBankChange(index, 'cci', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-[#00A8E8] disabled:text-[#00A8E8]/90 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
