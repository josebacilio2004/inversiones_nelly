import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.info('🌱 Iniciando Seeding de Inversiones Nelly S.A.C. ...');

  // 1. Clientes Iniciales B2B
  const vialNorte = await prisma.coreCustomer.upsert({
    where: { docNumber: '20512345678' },
    update: {},
    create: {
      docType: 'RUC',
      docNumber: '20512345678',
      businessName: 'CONSORCIO VIAL DEL NORTE S.A.C.',
      contactName: 'Ing. Carlos Mendoza',
      email: 'contacto@vialnorte.pe',
      phone: '987654321',
      fiscalAddress: 'Av. Industrial 450, Ate, Lima',
      customerSegment: 'AMBOS',
      creditLimit: 50000.0,
    },
  });

  const cosapi = await prisma.coreCustomer.upsert({
    where: { docNumber: '20100070970' },
    update: {},
    create: {
      docType: 'RUC',
      docNumber: '20100070970',
      businessName: 'CONSTRUCTORA COSAPI INGENIERÍA S.A.',
      contactName: 'Ing. Fernando Graña',
      email: 'logistica@cosapi.com.pe',
      phone: '017198420',
      fiscalAddress: 'Av. República de Colombia 791, San Isidro, Lima',
      customerSegment: 'AMBOS',
      creditLimit: 120000.0,
    },
  });

  // 2. Catálogo Técnico de Sanitarios Portátiles (Estilo Ancro)
  const models = [
    {
      code: 'IN-SAN-01',
      name: 'Sanitario Estándar de Obra (Tanque 210L)',
      category: 'OBRA_MINERIA' as const,
      dailyRate: 65,
      weeklyRate: 150,
      monthlyRate: 380,
      specs: {
        tankCapacity: '210 Litros (~450 usos)',
        dimensions: '1.12m x 1.18m x 2.25m',
        weight: '78 Kg',
        flushType: 'Gravedad c/ trampilla hermética',
        material: 'Polietileno de alta densidad (HDPE) con protección UV',
        normCompliance: 'MINTRA - Norma Técnica G.050',
      },
    },
    {
      code: 'IN-SAN-02',
      name: 'Sanitario Ejecutivo VIP (Lavamanos y Bomba de Pie)',
      category: 'EVENTOS_VIP' as const,
      dailyRate: 95,
      weeklyRate: 220,
      monthlyRate: 540,
      specs: {
        tankCapacity: '230 Litros c/ recirculación',
        dimensions: '1.20m x 1.20m x 2.30m',
        weight: '86 Kg',
        flushType: 'Bomba hidráulica de pedal 100% manos libres',
        material: 'Polietileno virginal reforzado',
        normCompliance: 'Estándar Corporativo & Eventos',
      },
    },
    {
      code: 'IN-SAN-03',
      name: 'Sanitario Accesible para Discapacitados',
      category: 'DISCAPACITADOS' as const,
      dailyRate: 110,
      weeklyRate: 260,
      monthlyRate: 650,
      specs: {
        tankCapacity: '180 Litros',
        dimensions: '1.65m x 1.65m x 2.25m',
        weight: '115 Kg',
        flushType: 'Palanca ergonómica suave al tacto',
        material: 'Estructura nivel cero con barras de acero inoxidable',
        normCompliance: 'Ley 29973 de Accesibilidad Universal',
      },
    },
    {
      code: 'IN-LAV-01',
      name: 'Lavamanos Portátil Doble Autónomo a Pedal',
      category: 'LAVAMANOS' as const,
      dailyRate: 55,
      weeklyRate: 130,
      monthlyRate: 320,
      specs: {
        tankCapacity: 'Agua limpia 85L | Residual 95L',
        dimensions: '0.85m x 0.65m x 1.40m',
        weight: '32 Kg',
        flushType: 'Doble bomba pedal independiente',
        material: 'HDPE antimicrobiano con doble jabonera',
        normCompliance: 'Protocolos Sanitarios MINSA',
      },
    },
    {
      code: 'IN-DUC-01',
      name: 'Módulo de Ducha Portátil de Obra',
      category: 'DUCHAS' as const,
      dailyRate: 70,
      weeklyRate: 170,
      monthlyRate: 420,
      specs: {
        tankCapacity: 'Conexión a cisterna / red exterior',
        dimensions: '1.15m x 1.15m x 2.20m',
        weight: '72 Kg',
        flushType: 'Grifería economizadora de caudal',
        material: 'Cabina estanca con piso antideslizante',
        normCompliance: 'D.S. 024-2016-EM Minería',
      },
    },
  ];

  for (const model of models) {
    await prisma.sanCatalogModel.upsert({
      where: { code: model.code },
      update: {},
      create: model,
    });
  }

  // 3. Habitaciones del Hotel (Pisos 1, 2 y 3)
  const roomSeedData = [
    { roomNumber: '101', floor: 1, roomType: 'SIMPLE_EJECUTIVA' as const, typeName: 'Simple Ejecutiva', basePriceNight: 110, corporatePriceNight: 85, status: 'DISPONIBLE' as const, amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Agua Caliente 24h', 'Smart TV'] },
    { roomNumber: '102', floor: 1, roomType: 'SIMPLE_EJECUTIVA' as const, typeName: 'Simple Ejecutiva', basePriceNight: 110, corporatePriceNight: 85, status: 'OCUPADA' as const, amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Smart TV'] },
    { roomNumber: '103', floor: 1, roomType: 'MATRIMONIAL' as const, typeName: 'Matrimonial Superior', basePriceNight: 160, corporatePriceNight: 125, status: 'DISPONIBLE' as const, amenities: ['Cama Queen', 'Frigobar', 'A/C', 'Cochera 4x4'] },
    { roomNumber: '104', floor: 1, roomType: 'DOBLE_CORPORATIVA' as const, typeName: 'Doble para Contratistas', basePriceNight: 190, corporatePriceNight: 145, status: 'OCUPADA' as const, amenities: ['2 Camas 1.5 plazas', 'Casilleros c/ llave', 'Cochera techada'] },

    { roomNumber: '201', floor: 2, roomType: 'SIMPLE_EJECUTIVA' as const, typeName: 'Simple Ejecutiva', basePriceNight: 110, corporatePriceNight: 85, status: 'LIMPIEZA_PENDIENTE' as const, amenities: ['Wi-Fi 200Mbps', 'Escritorio de Obra'] },
    { roomNumber: '202', floor: 2, roomType: 'SIMPLE_EJECUTIVA' as const, typeName: 'Simple Ejecutiva', basePriceNight: 110, corporatePriceNight: 85, status: 'DISPONIBLE' as const, amenities: ['Wi-Fi 200Mbps', 'Baño Privado'] },
    { roomNumber: '203', floor: 2, roomType: 'MATRIMONIAL' as const, typeName: 'Matrimonial Superior', basePriceNight: 160, corporatePriceNight: 125, status: 'OCUPADA' as const, amenities: ['Cama Queen', 'Frigobar', 'Balcón'] },
    { roomNumber: '204', floor: 2, roomType: 'DOBLE_CORPORATIVA' as const, typeName: 'Doble para Contratistas', basePriceNight: 190, corporatePriceNight: 145, status: 'DISPONIBLE' as const, amenities: ['2 Camas', 'Wi-Fi 200Mbps'] },

    { roomNumber: '301', floor: 3, roomType: 'SIMPLE_EJECUTIVA' as const, typeName: 'Simple Ejecutiva', basePriceNight: 110, corporatePriceNight: 85, status: 'DISPONIBLE' as const, amenities: ['Wi-Fi 200Mbps', 'Baño Privado'] },
    { roomNumber: '302', floor: 3, roomType: 'SIMPLE_EJECUTIVA' as const, typeName: 'Simple Ejecutiva', basePriceNight: 110, corporatePriceNight: 85, status: 'MANTENIMIENTO' as const, amenities: ['En remodelación de pintura'] },
    { roomNumber: '303', floor: 3, roomType: 'SUITE_NELLY' as const, typeName: 'Suite Nelly Presidencial', basePriceNight: 280, corporatePriceNight: 220, status: 'DISPONIBLE' as const, amenities: ['Cama King', 'Sala de Reuniones de Obra', 'Kitchenette'] },
    { roomNumber: '304', floor: 3, roomType: 'SUITE_NELLY' as const, typeName: 'Suite Nelly Presidencial', basePriceNight: 280, corporatePriceNight: 220, status: 'OCUPADA' as const, amenities: ['Cama King', 'Sala Ejecutiva', 'Hidromasaje'] },
  ];

  for (const room of roomSeedData) {
    await prisma.hotRoom.upsert({
      where: { roomNumber: room.roomNumber },
      update: {},
      create: room,
    });
  }

  console.info('✅ Seeding completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
