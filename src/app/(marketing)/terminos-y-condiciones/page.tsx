'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

export default function TerminosYCondicionesPage() {
  return (
    <div className="bg-[#F8FAFC] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-xl">
        
        {/* Header de Términos */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBE1A]/15 border border-[#6CBE1A]/30 text-[#2E5A07] text-xs font-mono font-bold uppercase mb-3">
            <Icons.ShieldCheck className="w-4 h-4 text-[#6CBE1A]" />
            Inversiones Nelly S.A.C. • RUC 20608945123
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Vigente desde el 01 de Enero de 2026. Aplica a los servicios de alquiler de baños portátiles de obra, succión hidrostática certificada por DIGESA y hospedaje hotelero ejecutivo en todo el territorio de la República del Perú.
          </p>
        </div>

        {/* Secciones de Términos y Condiciones */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* 1. Marco Legal */}
          <section>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#6CBE1A]/20 text-[#2E5A07] flex items-center justify-center text-xs font-mono">01</span>
              Marco Legal y Regulatorio
            </h2>
            <p>
              Los servicios prestados por <strong>INVERSIONES NELLY S.A.C.</strong> se rigen estrictamente por la <strong>Norma Técnica Peruana G.050 &ldquo;Seguridad durante la Construcción&rdquo;</strong> (Resolución Ministerial Nº 427-2001-MTC/15.04 y sus modificatorias del Ministerio de Trabajo y Promoción del Empleo), la <strong>Ley de Gestión Integral de Residuos Sólidos (D.L. Nº 1278)</strong>, el <strong>Reglamento de la Ley Nº 29973 (Accesibilidad Universal para personas con discapacidad)</strong> y las directivas sanitarias de la <strong>Dirección General de Salud Ambiental (DIGESA)</strong> bajo la Autorización Sanitaria Nº DIG-2024-EP.
            </p>
          </section>

          {/* 2. Alquiler de Baños Portátiles y Responsabilidades */}
          <section>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#6CBE1A]/20 text-[#2E5A07] flex items-center justify-center text-xs font-mono">02</span>
              Alquiler, Entrega y Custodia de Sanitarios en Obra
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>
                <strong>Nivelación y Acceso:</strong> El CLIENTE se compromete a habilitar un terreno nivelado, firme y seguro para la descarga de los sanitarios portátiles mediante camión plataforma, así como permitir el ingreso expedito de nuestros camiones hidrosuccionadores al vacío en las frecuencias programadas.
              </li>
              <li>
                <strong>Uso Exclusivo:</strong> Los baños portátiles están destinados únicamente para la evacuación biológica humana de los operarios de obra. Queda prohibido arrojar escombros, piedras, cemento, trapos o químicos industriales en los tanques de recepción de 210L/250L.
              </li>
              <li>
                <strong>Custodia y Pérdida:</strong> El CLIENTE es responsable por la integridad física de las unidades (HDPE virgen) frente a incendios, vandalismo o aplastamiento por maquinaria pesada en el frente de trabajo.
              </li>
            </ul>
          </section>

          {/* 3. Succión Hidrostática y Manifiestos DIGESA */}
          <section>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#00A8E8]/20 text-[#00A8E8] flex items-center justify-center text-xs font-mono">03</span>
              Servicio de Succión Hidrostática & Manifiestos DIGESA
            </h2>
            <p>
              La frecuencia de succión será pactada por contrato (mínimo 2 a 6 veces por semana según la dotación de operarios bajo la Norma G.050). Cada intervención incluye la evacuación hermética de lodos al vacío, hidro-lavado a presión con desinfectante, recarga de bactericida aromatizado azul y reposición de insumos higiénicos.
            </p>
            <p className="mt-2">
              Al término de cada succión, nuestro personal técnico homologado emitirá la <strong>Guía de Remisión de Transportista y el Manifiesto de Manejo de Residuos Sólidos No Peligrosos</strong>, acreditando la disposición final autorizada en las plantas de tratamiento de SEDAPAL / DIGESA. Este documento es válido para inspecciones de SUNAFIL, OSINERGMIN y OEFA.
            </p>
          </section>

          {/* 4. Hospedaje Hotelero y Tarifas Convenio */}
          <section>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#C8A064]/20 text-[#C8A064] flex items-center justify-center text-xs font-mono">04</span>
              Hospedaje Ejecutivo para Contratistas e Ingenieros
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>
                <strong>Horarios de Operación:</strong> Check-in desde las 14:00 horas y Check-out hasta las 12:00 horas. Para cuadrillas con turnos rotativos de obra, se habilitará early check-in o late check-out previa coordinación con gerencia.
              </li>
              <li>
                <strong>Desayuno Temprano de Campo:</strong> El servicio de cafetería buffet está disponible diariamente desde las <strong>05:30 AM</strong> para permitir la salida puntual de las camionetas hacia el frente de trabajo.
              </li>
              <li>
                <strong>Cochera Cerrada 4x4:</strong> El hotel dispone de estacionamiento privado con portón eléctrico y videovigilancia las 24 horas para salvaguardar camionetas de supervisión y herramientas de topografía/ensayo.
              </li>
            </ul>
          </section>

          {/* 5. Facturación SUNAT y Convenio Unificado */}
          <section>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-mono">05</span>
              Facturación Electrónica SUNAT & Línea de Crédito B2B
            </h2>
            <p>
              Toda operación genera comprobantes de pago electrónicos válidos ante la SUNAT (Factura Electrónica Serie F001 o Boleta Serie B001). Los clientes corporativos con Convenio Integral Constructora acceden a <strong>Facturación Única Consolidada Mensual</strong> por centro de costos de obra y línea de crédito a <strong>15 o 30 días calendario</strong>, sujeta a evaluación crediticia y firma de pagaré o carta de fianza bancaria.
            </p>
          </section>

          {/* 6. Libro de Reclamaciones */}
          <section className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Icons.FileText className="w-4 h-4 text-[#6CBE1A]" />
              Libro de Reclamaciones y Atención al Usuario
            </h3>
            <p className="text-xs text-slate-600">
              Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley Nº 29571) y el D.S. 011-2011-PCM, Inversiones Nelly S.A.C. pone a disposición de sus clientes el <strong>Libro de Reclamaciones Virtual</strong>. Cualquier queja o reclamo será respondido en un plazo perentorio no mayor a 15 días hábiles a través del correo legal: <code>atencion@inversionesnelly.pe</code> o vía telefónica al <code>+51 998 675 270</code>.
            </p>
          </section>

        </div>

        {/* Botones de Retorno */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition"
          >
            ← Volver al Inicio de Inversiones Nelly
          </Link>
          <Link
            href="/sanitarios-portatiles#sticky-quote-form"
            className="bg-[#2E5A07] hover:bg-[#234505] text-white px-5 py-2.5 rounded-xl text-xs font-black transition shadow-md"
          >
            Cotizar Baños para Obra
          </Link>
        </div>

      </div>
    </div>
  );
}
