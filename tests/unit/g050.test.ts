import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateG050 } from '../../src/lib/g050.ts';

describe('Motor de Cálculo Norma Técnica Peruana G.050', () => {
  it('debe requerir 1 inodoro y 1 lavamanos para 20 trabajadores o menos en obra civil', () => {
    const res = calculateG050({ workersCount: 20, sector: 'OBRA' });
    assert.equal(res.toiletsRequired, 1);
    assert.equal(res.sinksRequired, 1);
    assert.equal(res.recommendedSuction, '1 vez por semana');
  });

  it('debe incrementar a 2 inodoros cuando la obra supera los 20 trabajadores (ej. 25 operarios)', () => {
    const res = calculateG050({ workersCount: 25, sector: 'OBRA' });
    assert.equal(res.toiletsRequired, 2);
    assert.equal(res.sinksRequired, 2);
  });

  it('debe sugerir 3 inodoros y succión 2 veces por semana para 45 trabajadores', () => {
    const res = calculateG050({ workersCount: 45, sector: 'OBRA' });
    assert.equal(res.toiletsRequired, 3);
    assert.equal(res.sinksRequired, 3);
    assert.ok(res.recommendedSuction.includes('2 veces por semana'));
  });

  it('debe aplicar factor de seguridad para campamentos de Minería (1.25x)', () => {
    // 20 trabajadores en minería = 25 efectivos -> 2 inodoros
    const res = calculateG050({ workersCount: 20, sector: 'MINERIA' });
    assert.equal(res.toiletsRequired, 2);
  });

  it('debe calcular presupuesto estimado mayor a cero y coherente en Soles', () => {
    const res = calculateG050({ workersCount: 50 });
    assert.ok(res.estimatedMonthlyCost > 1000);
  });
});
