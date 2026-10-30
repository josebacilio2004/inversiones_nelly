import type { G050CalculationResult } from '@/types';

/**
 * Calculador Oficial según Norma Técnica Peruana G.050:
 * "Seguridad durante la construcción" (R.M. Nº 050-2013-TR y modificatorias).
 * 
 * Regla: 1 inodoro + 1 lavamanos por cada 20 trabajadores (o fracción mayor a 5).
 * En minería o alta montaña, se incrementa factor de seguridad biológica.
 */
export function calculateG050({
  workersCount,
  shiftsCount = 1,
  sector = 'OBRA',
}: {
  workersCount: number;
  shiftsCount?: number;
  sector?: 'OBRA' | 'MINERIA' | 'EVENTOS' | 'AGRO';
}): G050CalculationResult {
  const safeWorkers = Math.max(1, workersCount);
  
  // Factor de carga según sector operativo
  let sectorMultiplier = 1.0;
  if (sector === 'MINERIA') sectorMultiplier = 1.25;
  if (sector === 'EVENTOS') sectorMultiplier = 1.15;

  const effectiveWorkers = safeWorkers * sectorMultiplier;

  // Cálculo de dotación legal
  const toiletsRequired = Math.max(1, Math.ceil(effectiveWorkers / 20));
  const sinksRequired = Math.max(1, Math.ceil(effectiveWorkers / 20));

  // Frecuencia sugerida de mantenimiento por capacidad de tanque (210L)
  let recommendedSuction = '1 vez por semana';
  let costMultiplier = 1.0;

  if (effectiveWorkers > 30 && effectiveWorkers <= 70) {
    recommendedSuction = '2 veces por semana (Recomendado)';
    costMultiplier = 1.35;
  } else if (effectiveWorkers > 70) {
    recommendedSuction = '3 veces por semana o Interdiario';
    costMultiplier = 1.7;
  }

  if (shiftsCount > 1) {
    costMultiplier *= 1.2;
  }

  // Tarifa base estándar S/ 380 por inodoro + S/ 280 por lavamanos
  const baseToiletCost = toiletsRequired * 380 * costMultiplier;
  const baseSinkCost = sinksRequired * 280;
  const estimatedMonthlyCost = Math.round(baseToiletCost + baseSinkCost);

  return {
    toiletsRequired,
    sinksRequired,
    recommendedSuction,
    estimatedMonthlyCost,
  };
}
