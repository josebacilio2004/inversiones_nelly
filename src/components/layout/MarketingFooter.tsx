import React from 'react';
import Link from 'next/link';
import { NellyLogo } from '@/components/brand/NellyLogo';

export const MarketingFooter: React.FC = () => {
  return (
    <footer className="bg-[#0B1322] text-slate-400 text-xs py-12 px-4 sm:px-6 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <NellyLogo size="sm" darkTheme />
          <p className="text-slate-400 text-xs leading-relaxed">
            Consorcio líder en saneamiento ambiental certificado y hospitalidad ejecutiva en el Perú. Garantía de cumplimiento ante SUNAFIL, DIGESA y SUNAT.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Eco-Sanitarios Portátiles</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>• Cabinas Estándar para Obras (G.050)</li>
            <li>• Sanitarios Ejecutivos VIP a Pedal</li>
            <li>• Lavamanos Dobles Autónomos</li>
            <li>• Succión Hidrostática con Cisterna</li>
            <li>• Certificados Ambientales DIGESA</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Hotel & Hospedaje Nelly</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>• Habitaciones Simples Ejecutivas</li>
            <li>• Habitaciones Dobles para Contratistas</li>
            <li>• Cocheras Privadas para Flotas 4x4</li>
            <li>• Convenios B2B con Factura a 30 días</li>
            <li>• Desayuno Temprano para Cuadrillas</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Contacto Corporativo</h4>
          <div className="space-y-2 text-xs text-slate-400">
            <p>📍 Sede Central: Av. Los Próceres 1240, Lima - Perú</p>
            <p>📞 Centralita: (01) 719-8420 / 987-654-321</p>
            <p>✉️ Ventas: cotizaciones@inversionesnelly.pe</p>
            <div className="pt-2">
              <span className="inline-block bg-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono text-[11px] border border-slate-700">
                RUC 20608945123
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
        <div>
          © 2026 Inversiones Nelly S.A.C. Todos los derechos reservados.
        </div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-slate-400">Libro de Reclamaciones Virtual</Link>
          <Link href="#" className="hover:text-slate-400">Política de Privacidad</Link>
          <Link href="#" className="hover:text-slate-400">Homologación de Proveedores</Link>
        </div>
      </div>
    </footer>
  );
};
