'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NellyLogo } from '@/components/brand/NellyLogo';
import { Icons } from '@/components/ui/Icons';
import { useAppStore } from '@/store/useAppStore';

interface SubMenuItem {
  href: string;
  label: string;
  badge?: string;
}

interface MenuGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SubMenuItem[];
}

export const ErpSidebar: React.FC = () => {
  const pathname = usePathname();
  const { companyInfo } = useAppStore();

  const menuGroups: MenuGroup[] = [
    {
      id: 'bi',
      title: 'Business Intelligence',
      icon: Icons.BarChart,
      items: [
        { href: '/admin/dashboard', label: 'Dashboard Ejecutivo BI', badge: 'Recharts' },
        { href: '/admin/facturacion', label: 'Facturación & SUNAT', badge: 'XML/CDR' },
      ],
    },
    {
      id: 'sanitarios',
      title: 'Eco-Sanitarios Portátiles',
      icon: Icons.Truck,
      items: [
        { href: '/admin/sanitarios', label: 'Flota, Rutas & Succión', badge: 'DIGESA' },
      ],
    },
    {
      id: 'hotel',
      title: 'División Hospitalidad',
      icon: Icons.Bed,
      items: [
        { href: '/admin/hotel', label: 'Rack Hotelero & Huéspedes', badge: '12 Hab.' },
      ],
    },
    {
      id: 'config',
      title: 'Administración & Control',
      icon: Icons.Settings,
      items: [
        { href: '/admin/empresa', label: 'Datos de la Empresa', badge: 'RUC 20' },
        { href: '/admin/usuarios', label: 'Gestión de Usuarios & Roles', badge: 'RBAC' },
        { href: '/admin/devops', label: 'Infraestructura DevOps', badge: 'Docker' },
      ],
    },
  ];

  // Estado para acordeones desplegables. Por defecto todos abiertos para rápido acceso
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    bi: true,
    sanitarios: true,
    hotel: true,
    config: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-72 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen select-none">
      <div className="overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin scrollbar-thumb-slate-800">
        {/* Cabecera Marca */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-sm sticky top-0 z-10">
          <Link href="/">
            <NellyLogo size="sm" darkTheme />
          </Link>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6CBE1A] animate-pulse"></span>
              <span className="text-[11px] font-mono text-[#6CBE1A] font-bold">ERP NELLY v2.6 BI</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              PRODUCCIÓN
            </span>
          </div>
        </div>

        {/* Navegación con Menús Desplegables */}
        <nav className="p-3.5 space-y-3 text-xs font-semibold">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider px-3 py-1 font-mono flex items-center justify-between">
            <span>Módulos del Sistema</span>
            <span className="text-slate-600 text-[9px]">Acordeón</span>
          </div>

          {menuGroups.map((group) => {
            const GroupIcon = group.icon;
            const isOpen = openSections[group.id] ?? true;
            const hasActiveChild = group.items.some((item) => pathname === item.href);

            return (
              <div key={group.id} className="rounded-2xl border border-slate-850 bg-slate-900/40 overflow-hidden">
                {/* Botón Cabecera del Grupo Desplegable */}
                <button
                  type="button"
                  onClick={() => toggleSection(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold transition text-left ${
                    hasActiveChild
                      ? 'text-white bg-slate-800/60 border-b border-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`p-1 rounded-lg ${hasActiveChild ? 'bg-[#6CBE1A]/20 text-[#6CBE1A]' : 'bg-slate-800 text-slate-400'}`}>
                      <GroupIcon className="w-4 h-4 shrink-0" />
                    </span>
                    <span className="tracking-tight">{group.title}</span>
                  </div>
                  <Icons.ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Submenú Desplegable */}
                {isOpen && (
                  <div className="p-1.5 space-y-1 bg-slate-950/40">
                    {group.items.map((subItem) => {
                      const isActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl transition text-[11px] ${
                            isActive
                              ? 'bg-[#6CBE1A] text-slate-950 font-black shadow-md shadow-[#6CBE1A]/20'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-slate-950' : 'bg-slate-600'
                              }`}
                            />
                            <span>{subItem.label}</span>
                          </div>
                          {subItem.badge && (
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                                isActive
                                  ? 'bg-slate-950/30 text-slate-950'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                              }`}
                            >
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Pie de Sidebar con Datos de Empresa y Sesión */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/90 space-y-3 shrink-0">
        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px]">RUC Activo:</span>
            <span className="text-[#6CBE1A] font-mono font-bold text-[10px]">{companyInfo.ruc}</span>
          </div>
          <div className="font-black text-white truncate mt-0.5">{companyInfo.businessName}</div>
          <div className="text-[10px] text-[#00A8E8] font-mono mt-0.5 flex items-center gap-1">
            <Icons.UserCheck className="w-3 h-3" />
            <span>Nelly Gladys • Superadmin</span>
          </div>
        </div>

        <Link
          href="/"
          className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 border border-slate-700 shadow-sm"
        >
          <Icons.ChevronRight className="w-3.5 h-3.5 rotate-180" />
          Volver al Portal Web
        </Link>
      </div>
    </aside>
  );
};
