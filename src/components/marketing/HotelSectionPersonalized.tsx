'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';
import { Modal } from '@/components/ui/Modal';

export const HotelSectionPersonalized: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const FEATURED_ROOMS = [
    {
      type: 'Simple Ejecutiva',
      badge: 'Ingenieros Residentes',
      price: 'S/ 85',
      regularPrice: 'S/ 110',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      description: 'Espacio ergonómico con escritorio de trabajo, Wi-Fi 200Mbps, baño privado impecable y Smart TV.',
      features: ['Cama 1.5 plazas', 'Escritorio & Silla', 'Agua caliente 24h', 'Cochera 4x4 techada'],
    },
    {
      type: 'Matrimonial Superior',
      badge: 'Supervisores & Consultores',
      price: 'S/ 125',
      regularPrice: 'S/ 160',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      description: 'Máximo descanso tras jornadas en campo. Cama Queen Size de resortes pocket, frigobar y A/C frío-calor.',
      features: ['Cama Queen Size', 'Frigobar surtido', 'A/C Climatizado', 'Balcón exterior'],
    },
    {
      type: 'Doble para Contratistas',
      badge: 'Cuadrillas Técnicas',
      price: 'S/ 145',
      regularPrice: 'S/ 190',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      description: 'Ideal para 2 técnicos o inspectores de obra. Dos camas independientes de 1.5 plazas y casilleros con llave.',
      features: ['2 Camas independientes', 'Casilleros privados', 'Wi-Fi alta velocidad', 'Cochera para flota'],
    },
    {
      type: 'Suite Nelly Presidencial',
      badge: 'Gerencias de Obra',
      price: 'S/ 220',
      regularPrice: 'S/ 280',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      description: 'Suite de alta gama con sala de juntas privada para coordinaciones de obra, kitchenette y cama King Size.',
      features: ['Cama King Size', 'Mesa de reuniones', 'Kitchenette', 'Hidromasaje'],
    },
  ];

  return (
    <section id="enfoque-hotel" className="py-20 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Glow ambiental dorado */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#C8A064]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#E5C388]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la División Hotel */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A064]/20 border border-[#C8A064]/40 text-[#E5C388] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Icons.Bed className="w-4 h-4" />
            Enfoque Personal: División Hospitalidad & Hospedaje
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Hotel Nelly: El Descanso Estratégico para{' '}
            <span className="text-[#C8A064]">Ingenieros Residentes</span>,{' '}
            <span className="text-[#E5C388]">Supervisores</span> y{' '}
            <span className="text-white">Cuadrillas</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed"
          >
            Sabemos que el rendimiento en obra depende del descanso del equipo. Diseñamos nuestras habitaciones pensando específicamente en el personal técnico y de ingeniería: camas ultra confortables, cocheras cerradas con vigilancia 24h para camionetas 4x4, desayuno temprano desde las 5:30 AM y facturas mensuales con crédito para constructoras.
          </motion.p>
        </div>

        {/* Galería Visual de Habitaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FEATURED_ROOMS.map((room, idx) => (
            <motion.div
              key={room.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Imagen del Cuarto con Badge y Zoom */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                    onClick={() => setActivePhoto(room.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20 pointer-events-none" />

                  <span className="absolute top-3 left-3 bg-[#C8A064] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                    {room.badge}
                  </span>

                  <button
                    onClick={() => setActivePhoto(room.image)}
                    className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black transition backdrop-blur-md"
                    title="Ampliar fotografía"
                  >
                    <Icons.Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Contenido y Precios */}
                <div className="p-5">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-base font-black text-white">{room.type}</h3>
                    <div className="text-right">
                      <span className="text-lg font-black text-[#E5C388] font-mono">{room.price}</span>
                      <span className="text-[10px] text-slate-400 block -mt-1">/ noche</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {room.description}
                  </p>

                  <div className="space-y-1.5 border-t border-slate-700/60 pt-3">
                    {room.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A064]"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón Reservar */}
              <div className="p-5 pt-0">
                <Link
                  href="/hotel"
                  className="w-full bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-black py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Icons.Bed className="w-4 h-4" />
                  Ver Disponibilidad
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Beneficios Clave para Contratistas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/60 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#C8A064]/20 text-[#E5C388] shrink-0">
              <Icons.Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Cochera para Camionetas 4x4</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Portón de acceso seguro, cámaras de vigilancia y espacio amplio para vehículos pesados y camionetas de ingeniería.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/60 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#6CBE1A]/20 text-[#6CBE1A] shrink-0">
              <Icons.ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Desayuno Ejecutivo Temprano</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Atención desde las 5:30 AM para que tus cuadrillas ingresen desayunadas al frente de obra o campamento.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/60 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#00A8E8]/20 text-[#00A8E8] shrink-0">
              <Icons.FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Factura SUNAT con Crédito</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Facilitamos la rendición de viáticos corporativos y emitimos facturas detalladas por centro de costo de tu constructora.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/hotel"
            className="inline-flex items-center gap-2 bg-[#C8A064] hover:bg-[#b88f4e] text-slate-950 font-black px-8 py-4 rounded-2xl text-sm shadow-xl shadow-[#C8A064]/20 transition"
          >
            <Icons.Bed className="w-5 h-5" />
            Explorar Todas las Habitaciones & Reservar Online
            <Icons.ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>

      {/* Modal Lightbox */}
      <Modal
        isOpen={activePhoto !== null}
        onClose={() => setActivePhoto(null)}
        title="Fotografía Real de Instalación"
        subtitle="Hotel Nelly - Alojamiento Ejecutivo Corporativo"
        maxWidth="lg"
      >
        {activePhoto && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden aspect-video bg-black">
              <img src={activePhoto} alt="Habitación" className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>Habitaciones climatizadas con agua caliente 24 horas y Wi-Fi de alta velocidad.</span>
              <button
                onClick={() => setActivePhoto(null)}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
