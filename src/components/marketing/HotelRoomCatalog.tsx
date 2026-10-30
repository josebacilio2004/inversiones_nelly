'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';
import { Modal } from '@/components/ui/Modal';
import type { HotelRoom, Invoice } from '@/types';

export const HotelRoomCatalog: React.FC = () => {
  const { rooms, bookRoom, addInvoice, showToast } = useAppStore();
  const [isCorporateRate, setIsCorporateRate] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);

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
    <div>
      {/* Selector de Tarifa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900">Habitaciones & Tarifas</h3>
          <p className="text-xs text-slate-500">
            {isCorporateRate
              ? 'Aplicando convenio corporativo especial para empresas de construcción y minería'
              : 'Tarifa general para huéspedes particulares'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCorporateRate(!isCorporateRate)}
          className={`py-2 px-4 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
            isCorporateRate
              ? 'bg-[#C8A064] text-slate-950 border-[#C8A064] shadow-md'
              : 'bg-slate-100 text-slate-700 border-slate-300'
          }`}
        >
          <span>{isCorporateRate ? 'Convenio Corporativo Activo' : 'Tarifa Estándar'}</span>
          <span className="text-[10px] bg-slate-950/20 px-2 py-0.5 rounded font-black">
            {isCorporateRate ? '-25% DESC' : 'B2C'}
          </span>
        </button>
      </div>

      {/* Grid de Habitaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => {
          const effectivePrice = isCorporateRate ? room.corporatePrice : room.basePrice;
          const isAvailable = room.status === 'DISPONIBLE';

          return (
            <div
              key={room.id}
              className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isAvailable
                  ? 'border-slate-200 shadow-md hover:shadow-xl'
                  : 'border-slate-200 opacity-75 bg-slate-50'
              }`}
            >
              <div>
                <div
                  className={`p-4 ${
                    isAvailable
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded">
                      Piso {room.floor} • Hab. {room.roomNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        room.status === 'DISPONIBLE'
                          ? 'bg-[#6CBE1A] text-slate-950'
                          : room.status === 'OCUPADA'
                          ? 'bg-rose-500 text-white'
                          : room.status === 'LIMPIEZA_PENDIENTE'
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-purple-500 text-white'
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

                  <h3 className="text-base font-bold mt-2 leading-tight">{room.typeName}</h3>
                </div>

                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Por Noche</div>
                    <div className="text-xl font-black text-[#8a6828]">S/ {effectivePrice}</div>
                  </div>
                  {isCorporateRate && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                      Ahorro S/ {room.basePrice - room.corporatePrice}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Incluye:
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {room.amenities.map((am, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A064]"></span>
                        {am}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 pt-0">
                {isAvailable ? (
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="w-full bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Icons.Bed className="w-4 h-4" />
                    Reservar Ahora
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-200 text-slate-400 font-semibold py-2.5 rounded-xl text-xs cursor-not-allowed"
                  >
                    {room.status === 'OCUPADA'
                      ? `Ocupada (${room.currentGuest?.split('(')[0] || 'Huésped'})`
                      : 'No Disponible'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Reserva Instantánea */}
      <Modal
        isOpen={selectedRoom !== null}
        onClose={() => setSelectedRoom(null)}
        title={`Reservar Habitación #${selectedRoom?.roomNumber}`}
        subtitle={`${selectedRoom?.typeName} - Piso ${selectedRoom?.floor}`}
      >
        {selectedRoom && (
          <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre Completo del Huésped:</label>
              <input
                type="text"
                name="guestName"
                required
                defaultValue="Ing. Roberto Alarcón"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-semibold"
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Empresa Contratista:</label>
                <input
                  type="text"
                  name="companyName"
                  defaultValue="Consorcio Vial del Norte"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none"
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none font-bold"
              />
            </div>

            <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Tarifa Seleccionada:</span>
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
