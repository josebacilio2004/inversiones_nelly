import React from 'react';
import { HotelRoomCatalog } from '@/components/marketing/HotelRoomCatalog';
import { Icons } from '@/components/ui/Icons';

export default function HotelPage() {
  return (
    <div className="pb-16">
      {/* 1. HERO HOSPITALIDAD */}
      <section className="bg-gradient-to-r from-slate-900 via-[#1F1B16] to-[#382E1E] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="bg-[#C8A064]/20 text-[#E5C388] border border-[#C8A064]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Hospedaje & Confort para Equipos de Trabajo
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
              Descanso Ejecutivo en el <span className="text-[#C8A064]">Hotel Nelly</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Instalaciones de primer nivel diseñadas para contratistas, ingenieros y supervisores de obra. Conexión Wi-Fi de alta velocidad para reportes, estacionamiento vigilado para flotas 4x4 y tarifas corporativas preferenciales con factura SUNAT.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO DE HABITACIONES */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <HotelRoomCatalog />
      </section>

      {/* 3. SERVICIOS COMPLEMENTARIOS */}
      <section className="bg-slate-100 py-12 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#C8A064]/20 text-[#8a6828] flex items-center justify-center mb-3">
              <Icons.Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Cochera para Camionetas 4x4</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Amplio patio de estacionamiento cerrado con cámaras de vigilancia y portón de seguridad para vehículos pesados y camionetas de ingeniería.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#6CBE1A]/20 text-[#2E5A07] flex items-center justify-center mb-3">
              <Icons.ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Desayuno Ejecutivo Temprano</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Servicio de desayuno desde las 05:30 AM para cuadrillas que deben ingresar temprano al frente de obra o campamento minero.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#00A8E8]/20 text-[#00A8E8] flex items-center justify-center mb-3">
              <Icons.FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Facturación Electrónica Consolidada</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Emisión periódica de facturas detalladas por centro de costos, facilitando la rendición de viáticos de tu personal técnico.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
