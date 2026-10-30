'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NellyLogo } from '@/components/brand/NellyLogo';
import { Icons } from '@/components/ui/Icons';

export const ErpSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard KPIs', icon: Icons.Cpu },
    { href: '/admin/sanitarios', label: 'Flota & Succión', icon: Icons.Truck },
    { href: '/admin/hotel', label: 'Rack Hotelero', icon: Icons.Bed },
    { href: '/admin/facturacion', label: 'Facturación SUNAT', icon: Icons.FileText },
    { href: '/admin/devops', label: 'Infraestructura DevOps', icon: Icons.Server },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        <div className="p-5 border-b border-slate-800">
          <Link href="/">
            <NellyLogo size="sm" darkTheme />
          </Link>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse"></span>
            <span className="text-[11px] font-mono text-[#6CBE1A] font-semibold">ERP UNIFICADO v2.5</span>
          </div>
        </div>

        <nav className="p-4 space-y-1.5 text-xs font-semibold">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider px-3 py-2 font-mono">
            Módulos Principales
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
                  isActive
                    ? 'bg-[#6CBE1A] text-slate-950 font-bold shadow-md shadow-[#6CBE1A]/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px]">
          <div className="text-slate-400">Usuario Activo:</div>
          <div className="font-bold text-white truncate">Admin. Nelly Gladys</div>
          <div className="text-[10px] text-[#00A8E8] font-mono mt-0.5">Rol: Super Administrador</div>
        </div>

        <Link
          href="/"
          className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 border border-slate-700"
        >
          <Icons.ChevronRight className="w-3.5 h-3.5 rotate-180" />
          Volver al Portal Web
        </Link>
      </div>
    </aside>
  );
};
