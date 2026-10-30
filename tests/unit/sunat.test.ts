import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validatePeruvianRuc, lookupSunatRuc } from '../../src/lib/sunat.ts';

describe('Validación y Consulta de RUC SUNAT (Perú)', () => {
  it('debe validar RUCs peruanos oficiales válidos', () => {
    assert.equal(validatePeruvianRuc('20608945123'), true);
    assert.equal(validatePeruvianRuc('20512345678'), true);
    assert.equal(validatePeruvianRuc('20131312955'), true);
  });

  it('debe rechazar RUCs con longitud incorrecta o caracteres alfabéticos', () => {
    assert.equal(validatePeruvianRuc('12345'), false);
    assert.equal(validatePeruvianRuc('2051234567A'), false);
    assert.equal(validatePeruvianRuc('30512345678'), false);
  });

  it('debe retornar datos de empresa registrada para RUC 20512345678', async () => {
    const data = await lookupSunatRuc('20512345678');
    assert.equal(data.businessName, 'CONSORCIO VIAL DEL NORTE S.A.C.');
    assert.equal(data.status, 'ACTIVO');
    assert.equal(data.condition, 'HABIDO');
  });

  it('debe generar razón social estructurada para RUCs válidos no cacheados', async () => {
    const data = await lookupSunatRuc('20999999991');
    assert.ok(data.businessName.includes('CONSTRUCTORA'));
  });
});
