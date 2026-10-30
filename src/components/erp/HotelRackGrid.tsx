'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';
import { Modal } from '@/components/ui/Modal';
import type { HotelRoom, RoomStatus } from '@/types';

export const HotelRackGrid: React.FC = () => {
  const { rooms, updateRoomStatus, showToast } = useAppStore();
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);

  const handleStatusChange = (newStatus: RoomStatus) => {
    if (!selectedRoom) return;
    updateRoomStatus(selectedRoom.id, newStatus);
    setSelectedRoom(null);
    showToast(
      'Estado Actualizado',
      `Habitación ${selectedRoom.roomNumber} cambiada a ${newStatus}`,
      'info'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Rack Visual de Habitaciones (Pisos 1 al 3)</h2>
          <p className="text-xs text-slate-400">
            Haz clic en cualquier habitación para cambiar su estado operativo en tiempo real
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#6CBE1A]"></span>
            <span className="text-slate-300">Disponible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="text-slate-300">Ocupada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">Limpieza Pendiente</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span className="text-slate-300">Mantenimiento</span>
          </div>
        </div>
      </div>

      {[1, 2, 3].map((floorNumber) => (
        <div key={floorNumber} className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5">
          <h3 className="text-sm font-bold text-[#C8A064] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Icons.Building className="w-4 h-4" />
            Piso {floorNumber}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {rooms
              .filter((r) => r.floor === floorNumber)
              .map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    room.status === 'DISPONIBLE'
                      ? 'bg-slate-900 border-[#6CBE1A]/40 hover:border-[#6CBE1A]'
                      : room.status === 'OCUPADA'
                      ? 'bg-slate-900 border-rose-500/40 hover:border-rose-500'
                      : room.status === 'LIMPIEZA_PENDIENTE'
                      ? 'bg-slate-900 border-amber-400/40 hover:border-amber-400'
                      : 'bg-slate-900 border-purple-500/40 hover:border-purple-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-black text-white font-mono">#{room.roomNumber}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        room.status === 'DISPONIBLE'
                          ? 'bg-[#6CBE1A]/20 text-[#6CBE1A]'
                          : room.status === 'OCUPADA'
                          ? 'bg-rose-500/20 text-rose-400'
                          : room.status === 'LIMPIEZA_PENDIENTE'
                          ? 'bg-amber-400/20 text-amber-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-300 truncate">{room.typeName}</div>

                  {room.status === 'OCUPADA' ? (
                    <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                      <div className="text-white font-medium truncate">{room.currentGuest}</div>
                      <div className="text-[10px] text-slate-500">Hasta: {room.checkOut ?? 'Indefinido'}</div>
                    </div>
                  ) : (
                    <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                      <span>Tarifa:</span>
                      <strong className="text-slate-200">S/ {room.corporatePrice}</strong>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Modal de Control Rápido */}
      <Modal
        isOpen={selectedRoom !== null}
        onClose={() => setSelectedRoom(null)}
        title={`Habitación #${selectedRoom?.roomNumber} (${selectedRoom?.typeName})`}
        subtitle="Selecciona el nuevo estado para esta habitación en el Rack:"
        maxWidth="sm"
      >
        <div className="grid grid-cols-1 gap-2 text-xs">
          <button
            onClick={() => handleStatusChange('DISPONIBLE')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#6CBE1A]/20 hover:bg-[#6CBE1A]/30 text-[#6CBE1A] font-bold text-left border border-[#6CBE1A]/40 flex items-center justify-between"
          >
            <span>✓ Marcar DISPONIBLE (Limpia)</span>
            <span className="text-[10px]">Libre</span>
          </button>

          <button
            onClick={() => handleStatusChange('OCUPADA')}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-left border border-rose-500/40 flex items-center justify-between"
          >
            <span>✓ Marcar OCUPADA (Check-In)</span>
            <span className="text-[10px]">Huésped</span>
          </button>

          <button
            onClick={() => handleStatusChange('LIMPIEZA_PENDIENTE')}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-bold text-left border border-amber-400/40 flex items-center justify-between"
          >
            <span>✓ Marcar LIMPIEZA PENDIENTE</span>
            <span className="text-[10px]">Housekeeping</span>
          </button>

          <button
            onClick={() => handleStatusChange('MANTENIMIENTO')}
            className="w-full py-2.5 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-left border border-purple-500/40 flex items-center justify-between"
          >
            <span>✓ Bloquear por MANTENIMIENTO</span>
            <span className="text-[10px]">Reparación</span>
          </button>
        </div>
      </Modal>
    </div>
  );
};
