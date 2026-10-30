import React from 'react';
import { ErpSidebar } from '@/components/layout/ErpSidebar';

export default function ErpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100">
      <ErpSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBE1A]"></span>
            <span className="text-xs font-mono text-slate-400">Entorno: Producción Standalone</span>
          </div>
          <div className="text-xs text-slate-400">
            Sede Central: <strong className="text-white">Lima, Perú</strong>
          </div>
        </header>
        <main className="p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
