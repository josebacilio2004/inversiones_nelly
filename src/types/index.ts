// ====================================================================
// INVERSIONES NELLY S.A.C. - DEFINICIÓN DE TIPOS DE DOMINIO Y DTOS
// ====================================================================

export type AppRoute =
  | '/'
  | '/sanitarios-portatiles'
  | '/hotel'
  | '/convenio-constructora'
  | '/admin/dashboard'
  | '/admin/sanitarios'
  | '/admin/hotel'
  | '/admin/facturacion'
  | '/admin/devops';

export type SanitaryCategory =
  | 'OBRA_MINERIA'
  | 'EVENTOS_VIP'
  | 'DISCAPACITADOS'
  | 'LAVAMANOS'
  | 'DUCHAS';

export type RoomStatus =
  | 'DISPONIBLE'
  | 'OCUPADA'
  | 'LIMPIEZA_PENDIENTE'
  | 'MANTENIMIENTO';

export type RoomType =
  | 'SIMPLE_EJECUTIVA'
  | 'MATRIMONIAL'
  | 'DOBLE_CORPORATIVA'
  | 'SUITE_NELLY';

export interface SanitaryModel {
  id: string;
  code: string;
  name: string;
  category: SanitaryCategory;
  categoryLabel: string;
  monthlyRate: number;
  weeklyRate: number;
  dailyRate: number;
  description: string;
  badge: string;
  specs: {
    tankCapacity: string;
    dimensions: string;
    weight: string;
    flushType: string;
    sink: string;
    normCompliance: string;
  };
}

export interface RentalContract {
  id: string;
  code: string;
  ruc: string;
  companyName: string;
  projectName: string;
  location: string;
  modelCode: string;
  modelName: string;
  unitsCount: number;
  assignedSeries: string[];
  cleaningFrequency: string;
  monthlyRate: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVO' | 'COTIZACION' | 'MANTENIMIENTO';
  lastSuctionDate: string;
  digesaCertNumber: string;
}

export interface HotelRoom {
  id: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  typeName: string;
  basePrice: number;
  corporatePrice: number;
  status: RoomStatus;
  currentGuest?: string;
  guestDoc?: string;
  checkIn?: string;
  checkOut?: string;
  amenities: string[];
}

export interface HotelBooking {
  id: string;
  bookingCode: string;
  roomNumber: string;
  guestName: string;
  docNumber: string;
  companyName: string;
  isCorporate: boolean;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  status: 'CONFIRMADA' | 'CHECK_IN' | 'CHECK_OUT';
}

export interface Invoice {
  id: string;
  number: string;
  type: 'FACTURA' | 'BOLETA';
  docNumber: string;
  clientName: string;
  businessUnit: 'SANITARIOS' | 'HOTEL' | 'CONVENIO_INTEGRAL';
  amount: number;
  igv: number;
  total: number;
  date: string;
  sunatStatus: 'ACEPTADO_SUNAT' | 'PENDIENTE';
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface G050CalculationResult {
  toiletsRequired: number;
  sinksRequired: number;
  recommendedSuction: string;
  estimatedMonthlyCost: number;
}
