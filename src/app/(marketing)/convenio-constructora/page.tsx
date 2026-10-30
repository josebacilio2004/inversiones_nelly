import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

export default function ConvenioConstructoraPage() {
  return (
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
            Inversiones Nelly S.A.C. es el único operador en la región que une saneamiento ambiental certificado y hotelería corporativa bajo un único contrato y línea de crédito.
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
              <li>• Mantenimiento programado con camión cisterna propio.</li>
              <li>• Desinfección con químicos biodegradables autorizados.</li>
              <li>• Certificados ambientales válidos para SUNAFIL y OEFA.</li>
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
            <p className="text-xs text-slate-400">
              Atención directa con gerencia comercial: cotizaciones@inversionesnelly.pe
            </p>
          </div>
          <Link
            href="/sanitarios-portatiles#sticky-quote-form"
            className="bg-[#6CBE1A] hover:bg-[#5da715] text-slate-950 font-bold px-6 py-3 rounded-xl text-xs shrink-0 transition"
          >
            Iniciar Cotización Rápida
          </Link>
        </div>
      </div>
    </div>
  );
}
