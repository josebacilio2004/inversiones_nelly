import React from 'react';

interface NellyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  darkTheme?: boolean;
  className?: string;
}

export const NellyLogo: React.FC<NellyLogoProps> = ({
  size = 'md',
  darkTheme = false,
  className = '',
}) => {
  const dim = size === 'sm' ? 36 : size === 'lg' ? 64 : 48;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 120 120"
        className="shrink-0 transition-transform hover:scale-105 duration-300"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6CBE1A" />
            <stop offset="45%" stopColor="#00A8E8" />
            <stop offset="85%" stopColor="#2E5A07" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E5A07" />
            <stop offset="100%" stopColor="#6CBE1A" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5C388" />
            <stop offset="100%" stopColor="#C8A064" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Círculo exterior oscuro con aro orgánico de gradiente */}
        <circle cx="60" cy="60" r="54" fill="#0B1322" stroke="url(#ringGrad)" strokeWidth="4.5" />

        {/* Arco de agua/higiene interno */}
        <path
          d="M 22 62 A 40 40 0 0 1 98 62"
          fill="none"
          stroke="#00A8E8"
          strokeWidth="2.5"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* Hojas verdes a la izquierda */}
        <path d="M 20 62 C 16 48 30 38 34 50 C 36 58 26 64 20 62 Z" fill="url(#leafGrad)" />
        <path d="M 22 56 C 26 50 32 50 32 54" stroke="#A6E22E" strokeWidth="1" fill="none" />
        <circle cx="28" cy="48" r="1.8" fill="#FFFFFF" opacity="0.9" filter="url(#glow)" />
        <circle cx="24" cy="54" r="1.2" fill="#00A8E8" opacity="0.8" />

        {/* Letra 'I' en Dorado Hospitalidad (#C8A064) */}
        <g transform="translate(42, 38)">
          <path
            d="M 2 2 H 16 M 9 2 V 44 M 2 44 H 16"
            stroke="url(#goldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        </g>

        {/* Letra 'N' en Verde Ecológico Primario (#6CBE1A) */}
        <g transform="translate(62, 38)">
          <path
            d="M 4 44 V 2 L 28 44 V 2"
            stroke="#6CBE1A"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Brote superior derecho sobre la N */}
          <path d="M 28 4 C 28 -4 40 -2 38 6 C 35 10 30 7 28 4 Z" fill="url(#leafGrad)" />
          <circle cx="34" cy="2" r="1" fill="#FFFFFF" />
        </g>
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-black tracking-wider leading-none text-base md:text-lg ${
            darkTheme ? 'text-white' : 'text-slate-900'
          }`}
        >
          INVERSIONES <span className="text-[#6CBE1A]">NELLY</span>{' '}
          <span className="text-[#C8A064] text-xs font-semibold">S.A.C.</span>
        </span>
        <span className="text-[10px] font-medium tracking-tight text-slate-400 mt-0.5">
          Eco-Sanitarios Portátiles & Hotel Ejecutivo • RUC 20608945123
        </span>
      </div>
    </div>
  );
};
