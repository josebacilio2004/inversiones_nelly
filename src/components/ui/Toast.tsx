'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icons } from '@/components/ui/Icons';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto bg-slate-900/95 border-l-4 border-[#6CBE1A] text-white p-4 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 flex items-start gap-3"
        >
          <div className="p-1 rounded-full bg-[#6CBE1A]/20 text-[#6CBE1A] shrink-0 mt-0.5">
            <Icons.CheckCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{t.title}</h4>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-white text-xs ml-2"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
