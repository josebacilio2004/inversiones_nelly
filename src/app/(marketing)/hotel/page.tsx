'use client';

import React, { useState } from 'react';
import { HotelRoomCatalog } from '@/components/marketing/HotelRoomCatalog';
import { RoomBlueprintPlan } from '@/components/marketing/RoomBlueprintPlan';
import { Icons } from '@/components/ui/Icons';

export default function HotelPage() {
  const [selectedLocation, setSelectedLocation] = useState('Lima Central / Proyectos Viales');
  const [selectedType, setSelectedType] = useState('Simple Ejecutiva');

  const handleSearchScroll = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('catalogo-habitaciones')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-16 bg-[#F8FAFC]">
      
      {/* ==================================================================== */}
      {/* 1. HERO SYSTEM DESIGN (INSPIRADO EN CAPTURA 1 "RENT H&U") */}
      {/* ==================================================================== */}
      <section className="relative pt-6 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1322] via-[#0F172A] to-[#1E293B] text-white shadow-2xl border border-slate-800">
          
          {/* Ambient Lighting & Architectural Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8A064]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00A8E8]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Grid Split del Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16 relative z-10">
            
            {/* Columna Izquierda: Mensaje y Marca */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A064]/20 border border-[#C8A064]/40 text-[#E5C388] text-xs font-mono font-bold uppercase tracking-wider">
                <Icons.Bed className="w-4 h-4" />
                Hotel Nelly • Hospitalidad Corporativa en el Perú
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Finding Your Ideal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C388] via-[#C8A064] to-[#F5EBE0]">
                  Executive Stay
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Diseñado exclusivamente para ingenieros residentes, cuadrillas de contratistas y supervisores de obra. Confort hotelero premium, cochera cerrada para camionetas 4x4, desayuno desde las <strong>05:30 AM</strong> y facturación mensual consolidada con línea de crédito SUNAT.
              </p>

              <div className="flex flex-wrap gap-4 text-xs pt-2">
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-slate-200">
                  <Icons.Check className="w-4 h-4 text-[#C8A064]" />
                  Cochera 4x4 techada 24h
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-slate-200">
                  <Icons.Check className="w-4 h-4 text-[#C8A064]" />
                  Desayuno temprano 5:30 AM
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-slate-200">
                  <Icons.Check className="w-4 h-4 text-[#C8A064]" />
                  Convenio RUC -25% ahorro
                </span>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Fotográfica de Habitación Real con Acabado Moderno */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#C8A064]/30 shadow-2xl group bg-slate-950">
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
                    alt="Habitación Ejecutiva Hotel Nelly"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-[#E5C388] text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/20">
                    Habitación Simple Ejecutiva
                  </span>

                  <span className="absolute bottom-4 right-4 bg-[#C8A064] text-slate-950 font-black text-sm px-3.5 py-1.5 rounded-xl shadow-lg">
                    S/ 85.00 <span className="text-[10px] font-normal">/ noche</span>
                  </span>
                </div>

                <div className="p-5 bg-slate-900/90 text-xs text-slate-300 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">Aislamiento Acústico & Climatizado</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Escritorio técnico de trabajo • Wi-Fi 200Mbps</div>
                  </div>
                  <a
                    href="#catalogo-habitaciones"
                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition border border-white/20"
                  >
                    Ver Rack
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* BARRA FLOTANTE DE BÚSQUEDA TIPO CÁPSULA (ESTILO SYSTEM DESIGN CAPTURA 1) */}
          <div className="p-4 sm:p-6 bg-white text-slate-900 border-t border-slate-200">
            <form onSubmit={handleSearchScroll} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Campo 1: Ubicación */}
              <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-4">
                <label className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  Ubicación / Proyecto
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm font-extrabold text-slate-900 bg-transparent focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="Lima Central / Proyectos Viales">Lima Central / Proyectos Viales</option>
                  <option value="Lurín - Sector Industrial">Lurín - Sector Industrial</option>
                  <option value="Chosica - Carretera Central">Chosica - Carretera Central</option>
                  <option value="Ica / Agroexportación">Ica / Agroexportación</option>
                  <option value="Campamento Minero Junín">Campamento Minero Junín</option>
                </select>
              </div>

              {/* Campo 2: Tipología de Habitación */}
              <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-4">
                <label className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  Tipología de Habitación
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-xs sm:text-sm font-extrabold text-slate-900 bg-transparent focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="Simple Ejecutiva">Simple Ejecutiva (1 Huésped)</option>
                  <option value="Matrimonial Superior">Matrimonial Superior (Cama Queen)</option>
                  <option value="Doble Contratistas">Doble Contratistas (2 Camas 1.5 Plz)</option>
                  <option value="Suite Nelly Presidencial">Suite Presidencial (Con Sala de Juntas)</option>
                </select>
              </div>

              {/* Campo 3: Tarifa / Régimen */}
              <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-4">
                <label className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  Régimen Tarifario
                </label>
                <div className="text-xs sm:text-sm font-extrabold text-[#C8A064] mt-0.5">
                  Tarifa Convenio B2B (-25%)
                </div>
                <div className="text-[10px] text-slate-500 font-semibold">Crédito 30 días con RUC</div>
              </div>

              {/* Botón de Búsqueda Cápsula */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-black py-3.5 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <Icons.Search className="w-4 h-4 text-[#C8A064]" />
                  <span>Buscar Disponibilidad</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. SECCIÓN "MOST VIEWED" (ESTILO SYSTEM DESIGN CAPTURA 1) */}
      {/* ==================================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Most Viewed
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Descubre las habitaciones con mayor demanda para estancias ejecutivas de contratistas y residentes de obra en el Perú.
          </p>
        </div>

        {/* Grid de 3 Tarjetas Redondeadas estilo Captura 1 con Fotos Reales de Hotel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Simple Ejecutiva */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80"
                  alt="Simple Ejecutiva"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 text-[#E5C388] text-[10px] font-black px-3 py-1 rounded-full uppercase backdrop-blur-sm border border-white/20">
                  Ingenieros Residentes
                </span>
                <span className="absolute bottom-3 right-3 bg-[#C8A064] text-slate-950 text-xs font-black px-3 py-1 rounded-xl shadow-md">
                  S/ 85.00 <span className="text-[10px] font-normal">/ noche</span>
                </span>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-semibold text-slate-400">Piso 1, 2 y 3 • Hab. 101, 201, 301</div>
                <h3 className="text-xl font-black text-slate-900 mt-1">Simple Ejecutiva</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Espacio acústicamente aislado con escritorio para laptop, silla ergonómica, Wi-Fi 200Mbps y baño privado.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-semibold">
                    <Icons.Bed className="w-4 h-4 text-[#C8A064]" /> 1 Cama 1.5 Plz
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Icons.ShieldCheck className="w-4 h-4 text-[#6CBE1A]" /> Baño Privado
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                href="#catalogo-habitaciones"
                className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition"
              >
                Ver Disponibilidad en Rack
              </a>
            </div>
          </div>

          {/* Card 2: Matrimonial Superior */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                  alt="Matrimonial Superior"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 text-[#E5C388] text-[10px] font-black px-3 py-1 rounded-full uppercase backdrop-blur-sm border border-white/20">
                  Supervisores & Jefaturas
                </span>
                <span className="absolute bottom-3 right-3 bg-[#C8A064] text-slate-950 text-xs font-black px-3 py-1 rounded-xl shadow-md">
                  S/ 115.00 <span className="text-[10px] font-normal">/ noche</span>
                </span>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-semibold text-slate-400">Piso 1 y 2 • Hab. 102, 202</div>
                <h3 className="text-xl font-black text-slate-900 mt-1">Matrimonial Superior</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Cama Queen Size con colchón ortopédico de resortes pocket, Smart TV de 55 pulgadas, frigobar y aire acondicionado frío/calor.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-semibold">
                    <Icons.Bed className="w-4 h-4 text-[#C8A064]" /> 1 Cama Queen
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Icons.ShieldCheck className="w-4 h-4 text-[#6CBE1A]" /> Cochera 4x4
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                href="#catalogo-habitaciones"
                className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition"
              >
                Ver Disponibilidad en Rack
              </a>
            </div>
          </div>

          {/* Card 3: Doble Contratistas */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
                  alt="Doble Contratistas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 text-[#E5C388] text-[10px] font-black px-3 py-1 rounded-full uppercase backdrop-blur-sm border border-white/20">
                  Cuadrillas Técnicas
                </span>
                <span className="absolute bottom-3 right-3 bg-[#C8A064] text-slate-950 text-xs font-black px-3 py-1 rounded-xl shadow-md">
                  S/ 130.00 <span className="text-[10px] font-normal">/ noche</span>
                </span>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-semibold text-slate-400">Piso 1 y 2 • Hab. 103, 104, 203</div>
                <h3 className="text-xl font-black text-slate-900 mt-1">Doble Contratistas</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Diseñada para parejas de técnicos o inspectores de campo. Dos camas independientes de 1.5 plazas, casilleros privados y baño completo.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-semibold">
                    <Icons.Bed className="w-4 h-4 text-[#C8A064]" /> 2 Camas Indep.
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Icons.ShieldCheck className="w-4 h-4 text-[#6CBE1A]" /> Desayuno 5:30am
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                href="#catalogo-habitaciones"
                className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition"
              >
                Ver Disponibilidad en Rack
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. PLANO ARQUITECTÓNICO VECTORIAL NATIVO (SYSTEM DESIGN CAPTURA 2) */}
      {/* ==================================================================== */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <RoomBlueprintPlan />
      </section>

      {/* ==================================================================== */}
      {/* 4. RACK VISUAL Y CATÁLOGO DE RESERVAS INTERACTIVO */}
      {/* ==================================================================== */}
      <section id="catalogo-habitaciones" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <HotelRoomCatalog />
      </section>

      {/* ==================================================================== */}
      {/* 5. NUESTROS SERVICIOS CORPORATIVOS (ESTILO CAPTURA 2 "OUR SERVICES") */}
      {/* ==================================================================== */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#C8A064] uppercase tracking-wider bg-[#C8A064]/20 px-3.5 py-1 rounded-full border border-[#C8A064]/30">
              Logística & Confort
            </span>
            <h2 className="text-3xl font-black text-white mt-2">
              Our Executive Services
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Servicios especialmente diseñados para la tranquilidad y puntualidad de los equipos técnicos de obra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80">
              <div className="text-3xl font-black text-[#C8A064] font-mono mb-2">01</div>
              <h3 className="text-base font-bold text-white mb-2">Cochera 4x4 Privada</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Estacionamiento cerrado con portón eléctrico y cámaras de vigilancia 24 horas para resguardar camionetas con herramientas.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80">
              <div className="text-3xl font-black text-[#6CBE1A] font-mono mb-2">02</div>
              <h3 className="text-base font-bold text-white mb-2">Desayuno 05:30 AM</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Servicio buffet temprano adaptado al horario de salida de cuadrillas hacia el frente de trabajo o campamento.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80">
              <div className="text-3xl font-black text-[#00A8E8] font-mono mb-2">03</div>
              <h3 className="text-base font-bold text-white mb-2">Wi-Fi Fibra 200Mbps</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Conectividad simétrica ultra estable en cada habitación para revisión y envío de planos BIM, informes y reportes técnicos.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80">
              <div className="text-3xl font-black text-[#E5C388] font-mono mb-2">04</div>
              <h3 className="text-base font-bold text-white mb-2">Facturación SUNAT 30 Días</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Factura Electrónica mensual por centro de costo de constructora con facilidades de crédito y convenio para consorcios.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
