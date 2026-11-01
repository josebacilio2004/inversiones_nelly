import type { Metadata } from 'next';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ToastContainer } from '@/components/ui/Toast';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Inversiones Nelly S.A.C. | Eco-Sanitarios Portátiles & Hotel Ejecutivo',
  description: 'Plataforma empresarial integrada: Alquiler y succión de sanitarios portátiles bajo Norma G.050 y hospedaje ejecutivo corporativo en Perú.',
  keywords: [
    'sanitarios portátiles',
    'alquiler de baños químicos',
    'norma g.050',
    'hotel corporativo',
    'hotel contratistas',
    'succión hidrostática',
    'inversiones nelly',
  ],
  authors: [{ name: 'Inversiones Nelly S.A.C.' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#6CBE1A] selection:text-white" suppressHydrationWarning>
        <ToastContainer />
        <WhatsAppButton />
        {children}
      </body>
    </html>
  );
}
