'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';
import { Modal } from '@/components/ui/Modal';
import type { HotelRoom, Invoice } from '@/types';

export const HotelRoomCatalog: React.FC = () => {
  const { rooms, bookRoom, addInvoice, showToast } = useAppStore();
  const [isCorporateRate, setIsCorporateRate] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'SIMPLE' | 'MATRIMONIAL' | 'DOBLE' | 'SUITE'>('ALL');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredRooms = rooms.filter((r) => {
    if (selectedCategory === 'SIMPLE') return r.type === 'SIMPLE_EJECUTIVA';
    if (selectedCategory === 'MATRIMONIAL') return r.type === 'MATRIMONIAL';
    if (selectedCategory === 'DOBLE') return r.type === 'DOBLE_CORPORATIVA';
    if (selectedCategory === 'SUITE') return r.type === 'SUITE_NELLY';
    return true;
  });

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const form = e.currentTarget;
    const guestName = (form.elements.namedItem('guestName') as HTMLInputElement).value;
    const docNumber = (form.elements.namedItem('docNumber') as HTMLInputElement).value;
    const companyName = (form.elements.namedItem('companyName') as HTMLInputElement).value;
    const nights = Number((form.elements.namedItem('nights') as HTMLInputElement).value);

    const pricePerNight = isCorporateRate ? selectedRoom.corporatePrice : selectedRoom.basePrice;
    const totalAmount = pricePerNight * nights;
    const bookingCode = `NEL-HOT-${Math.floor(2000 + Math.random() * 8000)}`;

    bookRoom(
      selectedRoom.id,
      `${guestName} (${companyName || 'Particular'})`,
      docNumber,
      '2026-11-01',
      '2026-11-05'
    );

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      number: docNumber.length === 11 ? `F001-000${Math.floor(5000 + Math.random() * 500)}` : `B001-000${Math.floor(2000 + Math.random() * 500)}`,
      type: docNumber.length === 11 ? 'FACTURA' : 'BOLETA',
      docNumber,
      clientName: guestName,
      businessUnit: 'HOTEL',
      amount: totalAmount,
      igv: totalAmount * 0.18,
      total: totalAmount * 1.18,
      date: new Date().toISOString().split('T')[0] ?? '2026-11-01',
      sunatStatus: 'ACEPTADO_SUNAT',
    };
    addInvoice(newInvoice);

    setSelectedRoom(null);
    showToast(
      '¡Reserva Hotelera Confirmada!',
      `Habitación ${selectedRoom.roomNumber} (${selectedRoom.typeName}) bloqueada en el Rack ERP. Código: ${bookingCode}`,
      'success'
    );
  };

  return (
    <div className="space-y-8">
      {/* Selector de Tarifa y Filtros de Categoría */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm"
      >
        <div>
          <span className="text-[11px] font-bold text-[#8a6828] uppercase tracking-wider bg-[#C8A064]/15 px-3 py-1 rounded-full inline-block mb-1.5">
            Hospitalidad & Descanso de Campo
          </span>
          <h3 className="text-xl font-black text-slate-900">Catálogo de Habitaciones con Fotografía Real</h3>
          <p className="text-xs text-slate-500">
            {isCorporateRate
              ? 'Tarifas especiales activas con convenio para constructoras, minería y proveedores de obra.'
              : 'Mostrando tarifas estándar para huéspedes individuales.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCorporateRate(!isCorporateRate)}
            className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              isCorporateRate
                ? 'bg-[#C8A064] text-slate-950 border-[#C8A064] shadow-md shadow-[#C8A064]/20'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>{isCorporateRate ? 'Convenio B2B Activo' : 'Tarifa Particular'}</span>
            <span className="text-[10px] bg-slate-950/20 px-2 py-0.5 rounded font-black">
              {isCorporateRate ? '-25% DESC' : 'B2C'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Filtro Rápido de Categorías */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'ALL', label: 'Todas las Habitaciones' },
          { id: 'SIMPLE', label: 'Simple Ejecutiva' },
          { id: 'MATRIMONIAL', label: 'Matrimonial Superior' },
          { id: 'DOBLE', label: 'Doble para Contratistas' },
          { id: 'SUITE', label: 'Suite Nelly' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as 'ALL' | 'SIMPLE' | 'MATRIMONIAL' | 'DOBLE' | 'SUITE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Habitaciones con Framer Motion */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredRooms.map((room) => {
            const effectivePrice = isCorporateRate ? room.corporatePrice : room.basePrice;
            const isAvailable = room.status === 'DISPONIBLE';

            return (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className={`bg-white rounded-3xl overflow-hidden border transition-shadow duration-300 flex flex-col justify-between ${
                  isAvailable
                    ? 'border-slate-200 shadow-md hover:shadow-2xl'
                    : 'border-slate-200 opacity-75 bg-slate-50'
                }`}
              >
                <div>
                  {/* Imagen de la Habitación con badge interactivo */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900 group">
                    <img
                      src={room.imageUrl || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
                      alt={room.typeName}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out cursor-pointer"
                      onClick={() => setPreviewImage(room.imageUrl || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="font-mono text-xs font-black bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg border border-white/20">
                        Piso {room.floor} • #{room.roomNumber}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider backdrop-blur-md ${
                          room.status === 'DISPONIBLE'
                            ? 'bg-[#6CBE1A] text-slate-950'
                            : room.status === 'OCUPADA'
                            ? 'bg-rose-500/90 text-white'
                            : room.status === 'LIMPIEZA_PENDIENTE'
                            ? 'bg-amber-400/90 text-slate-950'
                            : 'bg-purple-500/90 text-white'
                        }`}
                      >
                        {room.status === 'DISPONIBLE'
                          ? 'Disponible'
                          : room.status === 'OCUPADA'
                          ? 'Ocupada'
                          : room.status === 'LIMPIEZA_PENDIENTE'
                          ? 'Limpieza'
                          : 'Mantenimiento'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                      <div>
                        <h4 className="text-sm font-bold leading-tight drop-shadow-md">{room.typeName}</h4>
                        <span className="text-[10px] text-slate-300">Habitación Climatizada</span>
                      </div>
                      <button
                        onClick={() => setPreviewImage(room.imageUrl || null)}
                        className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition"
                        title="Ver fotografía ampliada"
                      >
                        <Icons.Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Precios y Ahorro Corporativo */}
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Tarifa por Noche</div>
                      <div className="text-2xl font-black text-[#8a6828]">
                        S/ {effectivePrice} <span className="text-xs font-normal text-slate-500">/ noche</span>
                      </div>
                    </div>
                    {isCorporateRate && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg font-bold border border-emerald-200">
                        Ahorro S/ {room.basePrice - room.corporatePrice}
                      </span>
                    )}
                  </div>

                  {/* Amenidades de la Habitación */}
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Equipamiento & Confort:
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5">
                      {room.amenities.map((am, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A064] shrink-0"></span>
                          <span>{am}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Botón de Reserva */}
                <div className="p-4 pt-0">
                  {isAvailable ? (
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="w-full bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-black py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Icons.Bed className="w-4 h-4" />
                      Reservar Habitación
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-slate-200 text-slate-400 font-semibold py-3 rounded-xl text-xs cursor-not-allowed"
                    >
                      {room.status === 'OCUPADA'
                        ? `Ocupada (${room.currentGuest?.split('(')[0] || 'Huésped'})`
                        : 'No Disponible'}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal Lightbox de Foto Ampliada */}
      <Modal
        isOpen={previewImage !== null}
        onClose={() => setPreviewImage(null)}
        title="Fotografía Real de la Instalación"
        subtitle="Hotel & Hospedaje Corporativo Nelly S.A.C."
        maxWidth="lg"
      >
        {previewImage && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950">
              <img
                src={previewImage}
                alt="Vista ampliada habitación"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Equipamiento de alta durabilidad, Wi-Fi 200Mbps y agua caliente 24h.</span>
              <button
                onClick={() => setPreviewImage(null)}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Reserva Instantánea */}
      <Modal
        isOpen={selectedRoom !== null}
        onClose={() => setSelectedRoom(null)}
        title={`Reservar Habitación #${selectedRoom?.roomNumber}`}
        subtitle={`${selectedRoom?.typeName} - Piso ${selectedRoom?.floor}`}
      >
        {selectedRoom && (
          <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={selectedRoom.imageUrl}
                alt="Habitación"
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{selectedRoom.typeName}</h4>
                <p className="text-[11px] text-slate-500">Hab. #{selectedRoom.roomNumber} • Cochera 4x4 incluida</p>
                <div className="text-xs font-bold text-[#8a6828] mt-0.5">
                  S/ {isCorporateRate ? selectedRoom.corporatePrice : selectedRoom.basePrice} / noche
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre Completo del Huésped:</label>
              <input
                type="text"
                name="guestName"
                required
                defaultValue="Ing. Roberto Alarcón"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-semibold text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">DNI o RUC Empresa:</label>
                <input
                  type="text"
                  name="docNumber"
                  required
                  defaultValue="20512345678"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Empresa Contratista:</label>
                <input
                  type="text"
                  name="companyName"
                  defaultValue="Consorcio Vial del Norte"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Número de Noches:</label>
              <input
                type="number"
                name="nights"
                min="1"
                max="30"
                defaultValue="4"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-bold text-xs"
              />
            </div>

            <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Tarifa Aplicada:</span>
                <span className="font-bold text-slate-900">
                  S/ {isCorporateRate ? selectedRoom.corporatePrice : selectedRoom.basePrice} / noche
                </span>
              </div>
              <div className="flex justify-between text-slate-800 font-bold text-sm">
                <span>Total Estimado (4 noches):</span>
                <span className="text-[#8a6828]">
                  S/ {(isCorporateRate ? selectedRoom.corporatePrice : selectedRoom.basePrice) * 4}.00
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedRoom(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-black transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <Icons.CheckCircle className="w-4 h-4" />
                Confirmar Reserva
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
