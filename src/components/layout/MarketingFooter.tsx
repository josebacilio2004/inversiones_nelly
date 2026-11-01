'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NellyLogo } from '@/components/brand/NellyLogo';
import { Modal } from '@/components/ui/Modal';
import { Icons } from '@/components/ui/Icons';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/i18n';

export const MarketingFooter: React.FC = () => {
  const { language, showToast } = useAppStore();
  const t = translations[language];
  const [claimsModalOpen, setClaimsModalOpen] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const handleClaimSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClaimSubmitted(true);
    showToast(
      'Reclamo Registrado en Libro Virtual',
      'Tu hoja de reclamación Nº REC-2026-0842 ha sido registrada. Recibirás respuesta formal en un plazo máximo de 15 días hábiles.',
      'success'
    );
    setTimeout(() => {
      setClaimsModalOpen(false);
      setClaimSubmitted(false);
    }, 2500);
  };

  return (
    <footer className="bg-[#0B1322] text-slate-400 text-xs py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        
        {/* Columna 1: Marca y Propósito */}
        <div className="lg:col-span-2 space-y-4">
          <NellyLogo size="md" darkTheme />
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            {t.footerDesc}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#6CBE1A]">
              <Icons.ShieldCheck className="w-3.5 h-3.5" />
              DIGESA Nº DIG-2024-EP
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#00A8E8]">
              RUC 20608945123
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#C8A064]">
              ISO 9001 / 14001
            </span>
          </div>
        </div>

        {/* Columna 2: División Sanitarios */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 text-[#6CBE1A]">
            {t.footerToilets}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/sanitarios-portatiles" className="hover:text-white transition">
                • Cabinas Estándar de Obra (210L)
              </Link>
            </li>
            <li>
              <Link href="/sanitarios-portatiles" className="hover:text-white transition">
                • Sanitarios Ejecutivos VIP a Pedal
              </Link>
            </li>
            <li>
              <Link href="/sanitarios-portatiles" className="hover:text-white transition">
                • Sanitarios Accesibles (Ley 29973)
              </Link>
            </li>
            <li>
              <Link href="/sanitarios-portatiles#g050-calculator" className="hover:text-[#6CBE1A] transition font-semibold">
                • Calculadora Norma G.050 MINTRA
              </Link>
            </li>
            <li>
              <Link href="/sanitarios-portatiles" className="hover:text-white transition">
                • Succión Hidrostática con Cisterna
              </Link>
            </li>
            <li>
              <Link href="/sanitarios-portatiles" className="hover:text-white transition">
                • Manifiesto de Residuos DIGESA
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: División Hotel */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 text-[#C8A064]">
            {t.footerHotel}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/hotel" className="hover:text-white transition">
                • Habitaciones Simples Ejecutivas
              </Link>
            </li>
            <li>
              <Link href="/hotel" className="hover:text-white transition">
                • Matrimonial Superior Climatizada
              </Link>
            </li>
            <li>
              <Link href="/hotel" className="hover:text-white transition">
                • Doble Cuadrillas para Contratistas
              </Link>
            </li>
            <li>
              <Link href="/hotel" className="hover:text-white transition">
                • Cocheras Cerradas para Flotas 4x4
              </Link>
            </li>
            <li>
              <Link href="/hotel" className="hover:text-white transition">
                • Desayuno Temprano desde las 05:30 AM
              </Link>
            </li>
            <li>
              <Link href="/convenio-constructora" className="hover:text-[#C8A064] transition font-semibold">
                • Convenio B2B Factura a 30 Días
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 4: Contacto & Canales Directos */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 text-white">
            {t.footerContact}
          </h4>
          <div className="space-y-2.5 text-xs text-slate-400">
            <p className="flex items-start gap-2">
              <span className="text-[#6CBE1A]">🏢</span>
              <span>{t.footerCentralOffice}</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#00A8E8]">📍</span>
              <span>Base Operativa: Megaparque Industrial Lurín, Lima</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#6CBE1A]">📞</span>
              <a href="tel:017198420" className="hover:text-white font-mono">
                Central: (01) 719-8420
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#25D366]">📱</span>
              <a
                href="https://wa.me/51998675270?text=Hola%20Inversiones%20Nelly%20S.A.C.,%20deseo%20cotizar%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 font-mono font-bold text-white"
              >
                WhatsApp: +51 998 675 270
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#C8A064]">✉️</span>
              <span className="font-mono">{t.footerEmail}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Franja Inferior: Términos, Libro de Reclamaciones y Copyright */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <div>
          {t.footerRights}
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="/terminos-y-condiciones"
            className="hover:text-white transition font-medium underline underline-offset-4"
          >
            {t.footerTerms}
          </Link>

          <button
            type="button"
            onClick={() => setClaimsModalOpen(true)}
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {t.footerClaims}
          </button>

          <Link
            href="/terminos-y-condiciones"
            className="hover:text-white transition"
          >
            {t.footerPrivacy}
          </Link>

          <Link
            href="/admin/dashboard"
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded border border-slate-800 font-mono text-[10px]"
          >
            Intranet ERP
          </Link>
        </div>
      </div>

      {/* MODAL DEL LIBRO DE RECLAMACIONES VIRTUAL */}
      {claimsModalOpen && (
        <Modal
          isOpen={claimsModalOpen}
          onClose={() => setClaimsModalOpen(false)}
          title="Libro de Reclamaciones Virtual • D.S. 011-2011-PCM"
          maxWidth="lg"
        >
          {claimSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black">
                ✓
              </div>
              <h3 className="text-xl font-black text-slate-900">
                ¡Hoja de Reclamación Registrada!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Código de seguimiento: <strong className="font-mono text-slate-900">REC-2026-0842</strong>. Se ha remitido una copia digital a tu correo institucional. Conforme a ley, emitiremos pronunciamiento formal en un plazo no mayor a 15 días hábiles.
              </p>
            </div>
          ) : (
            <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs text-slate-800">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                <strong>INVERSIONES NELLY S.A.C.</strong> • RUC 20608945123 • Sede Central: Av. Los Próceres 1240, Lima.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre o Razón Social (*)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Consorcio Vial del Norte / Juan Pérez"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6CBE1A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">RUC o DNI (*)</label>
                  <input
                    type="text"
                    required
                    maxLength={11}
                    placeholder="20512345678"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6CBE1A] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correo Electrónico (*)</label>
                  <input
                    type="email"
                    required
                    placeholder="logistica@empresa.com.pe"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6CBE1A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Teléfono Móvil (*)</label>
                  <input
                    type="tel"
                    required
                    placeholder="998675270"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6CBE1A] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Servicio Reclamado</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6CBE1A] bg-white">
                  <option value="SANITARIOS">Alquiler / Succión de Baños Portátiles</option>
                  <option value="HOTEL">Hospedaje / Habitaciones Hotel Nelly Ejecutivo</option>
                  <option value="CONVENIO">Facturación Electrónica / Convenio B2B</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tipo de Incidencia</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="claimType" value="QUEJA" defaultChecked />
                    <span>Queja (Disconformidad con atención)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="claimType" value="RECLAMO" />
                    <span>Reclamo (Disconformidad con servicio/producto)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detalle y Petitorio (*)</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe claramente los hechos y lo que solicitas como solución..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6CBE1A]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setClaimsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#2E5A07] hover:bg-[#234505] text-white px-5 py-2 rounded-xl font-bold shadow-md transition"
                >
                  Enviar Reclamo a Gerencia
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </footer>
  );
};
