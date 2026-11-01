import { create } from 'zustand';
import type { 
  RentalContract, 
  HotelRoom, 
  Invoice, 
  ToastNotification, 
  RoomStatus,
  CompanyInfo,
  SystemUser
} from '@/types';

interface AppState {
  // Estado de Contratos en Obra
  contracts: RentalContract[];
  addContract: (contract: RentalContract) => void;
  updateSuction: (contractId: string, certNumber: string, dateStr: string) => void;

  // Estado del Rack Hotelero
  rooms: HotelRoom[];
  updateRoomStatus: (roomId: string, newStatus: RoomStatus, guest?: string) => void;
  bookRoom: (roomId: string, guest: string, doc: string, checkIn: string, checkOut: string) => void;

  // Estado de Facturas SUNAT
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;

  // Configuración de Datos de la Empresa
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;

  // Gestión de Usuarios del Sistema
  users: SystemUser[];
  addUser: (user: Omit<SystemUser, 'id' | 'lastLogin'>) => void;
  toggleUserStatus: (id: string) => void;
  deleteUser: (id: string) => void;

  // Sistema de Notificaciones Toast
  toasts: ToastNotification[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Idioma Global (Español / Inglés)
  language: 'ES' | 'EN';
  setLanguage: (lang: 'ES' | 'EN') => void;
}

const INITIAL_CONTRACTS: RentalContract[] = [
  {
    id: 'c1',
    code: 'CTR-2026-089',
    ruc: '20512345678',
    companyName: 'CONSORCIO VIAL DEL NORTE S.A.C.',
    projectName: 'Mejoramiento Carretera Tramo II',
    location: 'Km 42 Carretera Central - Chosica',
    modelCode: 'IN-SAN-01',
    modelName: 'Sanitario Estándar de Obra (Tanque 210L)',
    unitsCount: 8,
    assignedSeries: ['IN-BP-001', 'IN-BP-002', 'IN-BP-003', 'IN-BP-004', 'IN-BP-005', 'IN-BP-006', 'IN-BP-007', 'IN-BP-008'],
    cleaningFrequency: '2 veces por semana',
    monthlyRate: 3040,
    startDate: '2026-09-01',
    endDate: '2027-02-28',
    status: 'ACTIVO',
    lastSuctionDate: '2026-10-28',
    digesaCertNumber: 'DIG-RES-2026-4412',
  },
  {
    id: 'c2',
    code: 'CTR-2026-094',
    ruc: '20100070970',
    companyName: 'CONSTRUCTORA COSAPI INGENIERÍA S.A.',
    projectName: 'Edificio Residencial Las Praderas',
    location: 'Av. Javier Prado Este 2840, San Borja',
    modelCode: 'IN-SAN-02',
    modelName: 'Sanitario Ejecutivo VIP (Lavamanos y Bomba de Pie)',
    unitsCount: 4,
    assignedSeries: ['IN-BP-012', 'IN-BP-013', 'IN-BP-014', 'IN-BP-015'],
    cleaningFrequency: '3 veces por semana',
    monthlyRate: 2160,
    startDate: '2026-10-10',
    endDate: '2027-04-30',
    status: 'ACTIVO',
    lastSuctionDate: '2026-10-29',
    digesaCertNumber: 'DIG-RES-2026-4520',
  },
  {
    id: 'c3',
    code: 'CTR-2026-102',
    ruc: '20485961234',
    companyName: 'AGROEXPORTADORA DEL SUR S.A.A.',
    projectName: 'Campaña Cosecha Espárragos 2026',
    location: 'Fundo San José, Ica',
    modelCode: 'IN-SAN-01',
    modelName: 'Sanitario Estándar de Obra (Tanque 210L)',
    unitsCount: 12,
    assignedSeries: ['IN-BP-020', 'IN-BP-021', 'IN-BP-022', 'IN-BP-023', 'IN-BP-024', 'IN-BP-025', 'IN-BP-026', 'IN-BP-027', 'IN-BP-028', 'IN-BP-029', 'IN-BP-030', 'IN-BP-031'],
    cleaningFrequency: 'Interdiario (3x/semana)',
    monthlyRate: 4560,
    startDate: '2026-10-01',
    endDate: '2026-12-15',
    status: 'ACTIVO',
    lastSuctionDate: '2026-10-27',
    digesaCertNumber: 'DIG-RES-2026-4389',
  },
];

const INITIAL_ROOMS: HotelRoom[] = [
  { 
    id: 'r101', 
    roomNumber: '101', 
    floor: 1, 
    type: 'SIMPLE_EJECUTIVA', 
    typeName: 'Simple Ejecutiva', 
    basePrice: 110, 
    corporatePrice: 85, 
    status: 'DISPONIBLE', 
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Agua Caliente 24h', 'Smart TV 43"'] 
  },
  { 
    id: 'r102', 
    roomNumber: '102', 
    floor: 1, 
    type: 'SIMPLE_EJECUTIVA', 
    typeName: 'Simple Ejecutiva', 
    basePrice: 110, 
    corporatePrice: 85, 
    status: 'OCUPADA', 
    currentGuest: 'Ing. Carlos Mendoza (Consorcio Vial)', 
    checkIn: '2026-10-25', 
    checkOut: '2026-11-05', 
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    amenities: ['Wi-Fi 200Mbps', 'Baño Privado', 'Smart TV'] 
  },
  { 
    id: 'r103', 
    roomNumber: '103', 
    floor: 1, 
    type: 'MATRIMONIAL', 
    typeName: 'Matrimonial Superior', 
    basePrice: 160, 
    corporatePrice: 125, 
    status: 'DISPONIBLE', 
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Cama Queen', 'Frigobar', 'A/C Frío-Calor', 'Cochera Privada 4x4'] 
  },
  { 
    id: 'r104', 
    roomNumber: '104', 
    floor: 1, 
    type: 'DOBLE_CORPORATIVA', 
    typeName: 'Doble para Contratistas', 
    basePrice: 190, 
    corporatePrice: 145, 
    status: 'OCUPADA', 
    currentGuest: 'Supervisores Obra Cosapi (2 pers.)', 
    checkIn: '2026-10-27', 
    checkOut: '2026-11-02', 
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    amenities: ['2 Camas 1.5 plazas', 'Casilleros c/ llave'] 
  },

  { 
    id: 'r201', 
    roomNumber: '201', 
    floor: 2, 
    type: 'SIMPLE_EJECUTIVA', 
    typeName: 'Simple Ejecutiva', 
    basePrice: 110, 
    corporatePrice: 85, 
    status: 'LIMPIEZA_PENDIENTE', 
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    amenities: ['Wi-Fi 200Mbps', 'Escritorio de Obra'] 
  },
  { 
    id: 'r202', 
    roomNumber: '202', 
    floor: 2, 
    type: 'SIMPLE_EJECUTIVA', 
    typeName: 'Simple Ejecutiva', 
    basePrice: 110, 
    corporatePrice: 85, 
    status: 'DISPONIBLE', 
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    amenities: ['Wi-Fi 200Mbps', 'Baño Privado'] 
  },
  { 
    id: 'r203', 
    roomNumber: '203', 
    floor: 2, 
    type: 'MATRIMONIAL', 
    typeName: 'Matrimonial Superior', 
    basePrice: 160, 
    corporatePrice: 125, 
    status: 'OCUPADA', 
    currentGuest: 'Lic. Mariana Valdivia (Auditora)', 
    checkIn: '2026-10-28', 
    checkOut: '2026-10-31', 
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Cama Queen', 'Frigobar'] 
  },
  { 
    id: 'r204', 
    roomNumber: '204', 
    floor: 2, 
    type: 'DOBLE_CORPORATIVA', 
    typeName: 'Doble para Contratistas', 
    basePrice: 190, 
    corporatePrice: 145, 
    status: 'DISPONIBLE', 
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['2 Camas 1.5 plazas', 'Wi-Fi 200Mbps', 'Cochera Techada 4x4'] 
  },

  { 
    id: 'r301', 
    roomNumber: '301', 
    floor: 3, 
    type: 'SIMPLE_EJECUTIVA', 
    typeName: 'Simple Ejecutiva', 
    basePrice: 110, 
    corporatePrice: 85, 
    status: 'DISPONIBLE', 
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    amenities: ['Wi-Fi 200Mbps', 'Baño Privado'] 
  },
  { 
    id: 'r302', 
    roomNumber: '302', 
    floor: 3, 
    type: 'SIMPLE_EJECUTIVA', 
    typeName: 'Simple Ejecutiva', 
    basePrice: 110, 
    corporatePrice: 85, 
    status: 'MANTENIMIENTO', 
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    amenities: ['En remodelación de pintura'] 
  },
  { 
    id: 'r303', 
    roomNumber: '303', 
    floor: 3, 
    type: 'SUITE_NELLY', 
    typeName: 'Suite Nelly Presidencial', 
    basePrice: 280, 
    corporatePrice: 220, 
    status: 'DISPONIBLE', 
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Cama King', 'Sala de Reuniones de Obra', 'Kitchenette'] 
  },
  { 
    id: 'r304', 
    roomNumber: '304', 
    floor: 3, 
    type: 'SUITE_NELLY', 
    typeName: 'Suite Nelly Presidencial', 
    basePrice: 280, 
    corporatePrice: 220, 
    status: 'OCUPADA', 
    currentGuest: 'Gerencia Minera Chinalco', 
    checkIn: '2026-10-26', 
    checkOut: '2026-11-04', 
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    amenities: ['Cama King', 'Sala Ejecutiva'] 
  },
];

const INITIAL_INVOICES: Invoice[] = [
  { id: 'inv1', number: 'F001-0004520', type: 'FACTURA', docNumber: '20512345678', clientName: 'CONSORCIO VIAL DEL NORTE S.A.C.', businessUnit: 'SANITARIOS', amount: 3040, igv: 547.20, total: 3587.20, date: '2026-10-01', sunatStatus: 'ACEPTADO_SUNAT' },
  { id: 'inv2', number: 'F001-0004521', type: 'FACTURA', docNumber: '20100070970', clientName: 'CONSTRUCTORA COSAPI INGENIERÍA S.A.', businessUnit: 'CONVENIO_INTEGRAL', amount: 4850, igv: 873.00, total: 5723.00, date: '2026-10-10', sunatStatus: 'ACEPTADO_SUNAT' },
  { id: 'inv3', number: 'B001-0001289', type: 'BOLETA', docNumber: '44556677', clientName: 'MENDOZA ROBLES CARLOS ALBERTO', businessUnit: 'HOTEL', amount: 440, igv: 79.20, total: 519.20, date: '2026-10-25', sunatStatus: 'ACEPTADO_SUNAT' },
];

const INITIAL_COMPANY_INFO: CompanyInfo = {
  ruc: '20608945123',
  businessName: 'INVERSIONES NELLY S.A.C.',
  tradeName: 'Inversiones Nelly - Eco-Sanitarios & Hotel Ejecutivo',
  fiscalAddress: 'Jr. Las Palmeras N° 245, Chosica, Lima, Perú',
  operationalBase: 'Km 42.5 Carretera Central, San Mateo de Huanchor / Lima Este',
  legalRepresentative: 'Nelly Gladys Huamán de Bacilio',
  representativeDni: '09876543',
  phoneCentral: '(01) 719-8420',
  emergencyWhatsapp: '+51 998 675 270',
  billingEmail: 'facturacion@inversionesnelly.com',
  digesaAuthorization: 'Resolución Directoral Nº DIG-2024-EP (Saneamiento Ambiental)',
  eorsMinamRegistry: 'EO-RS-0042-2024-MINAM (Empresa Operadora de Residuos)',
  bankAccounts: [
    {
      bank: 'Banco de Crédito del Perú (BCP)',
      accountType: 'Cuenta Corriente MN (Soles)',
      accountNumber: '191-94827104-0-32',
      cci: '002-191-0094827104032-55',
      currency: 'PEN',
    },
    {
      bank: 'BBVA Perú',
      accountType: 'Cuenta Corriente MN (Soles)',
      accountNumber: '0011-0320-0100492837',
      cci: '011-320-000100492837-18',
      currency: 'PEN',
    },
    {
      bank: 'Banco de la Nación (SUNAT Detracciones)',
      accountType: 'Cuenta de Detracciones (Servicios de Saneamiento 10% - 12%)',
      accountNumber: '00-068-194820',
      cci: '018-068-000068194820-77',
      currency: 'PEN',
    },
  ],
};

const INITIAL_USERS: SystemUser[] = [
  {
    id: 'usr-1',
    name: 'Nelly Gladys Huamán',
    email: 'gerencia@inversionesnelly.com',
    role: 'SUPER_ADMIN',
    roleLabel: 'Super Administrador (Gerencia General)',
    status: 'ACTIVO',
    phone: '+51 998 675 270',
    lastLogin: 'Hace 5 minutos (Sesión Activa)',
  },
  {
    id: 'usr-2',
    name: 'Ing. Carlos Bacilio H.',
    email: 'operaciones@inversionesnelly.com',
    role: 'JEFE_OPERACIONES',
    roleLabel: 'Jefe de Operaciones & Logística de Sanitarios',
    status: 'ACTIVO',
    phone: '+51 987 654 321',
    lastLogin: 'Hoy 14:15 hrs',
  },
  {
    id: 'usr-3',
    name: 'Patricia Morales Soto',
    email: 'recepcion@inversionesnelly.com',
    role: 'RECEPCION_HOTEL',
    roleLabel: 'Recepción & Reservas Hotel Nelly',
    status: 'ACTIVO',
    phone: '+51 976 543 210',
    lastLogin: 'Hoy 08:30 hrs',
  },
  {
    id: 'usr-4',
    name: 'C.P.C. Luis Enrique Alarcón',
    email: 'contabilidad@inversionesnelly.com',
    role: 'FACTURACION_CONTABILIDAD',
    roleLabel: 'Facturación Electrónica SUNAT & Cobranzas',
    status: 'ACTIVO',
    phone: '+51 965 432 109',
    lastLogin: 'Ayer 18:40 hrs',
  },
  {
    id: 'usr-5',
    name: 'Manuel Cárdenas (Operador Cisterna)',
    email: 'flota.succion@inversionesnelly.com',
    role: 'JEFE_OPERACIONES',
    roleLabel: 'Conductor Camión Succionador Certificado',
    status: 'ACTIVO',
    phone: '+51 954 321 098',
    lastLogin: 'Hoy 06:10 hrs',
  },
  {
    id: 'usr-6',
    name: 'Asistente de Guardia Nocturna',
    email: 'guardia@inversionesnelly.com',
    role: 'RECEPCION_HOTEL',
    roleLabel: 'Turno Nocturno - Hospedaje',
    status: 'INACTIVO',
    phone: '+51 943 210 987',
    lastLogin: '24/10/2026',
  },
];

export const useAppStore = create<AppState>((set) => ({
  contracts: INITIAL_CONTRACTS,
  rooms: INITIAL_ROOMS,
  invoices: INITIAL_INVOICES,
  companyInfo: INITIAL_COMPANY_INFO,
  users: INITIAL_USERS,
  toasts: [],
  language: 'ES',

  setLanguage: (lang) => set({ language: lang }),

  updateCompanyInfo: (info) =>
    set((state) => ({
      companyInfo: { ...state.companyInfo, ...info },
    })),

  addUser: (userData) =>
    set((state) => {
      const newUser: SystemUser = {
        ...userData,
        id: `usr-${Date.now()}`,
        lastLogin: 'Recién registrado',
      };
      return {
        users: [newUser, ...state.users],
      };
    }),

  toggleUserStatus: (id) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO' }
          : u
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),

  addContract: (contract) =>
    set((state) => ({
      contracts: [contract, ...state.contracts],
    })),

  updateSuction: (contractId, certNumber, dateStr) =>
    set((state) => ({
      contracts: state.contracts.map((c) =>
        c.id === contractId
          ? { ...c, lastSuctionDate: dateStr, digesaCertNumber: certNumber }
          : c
      ),
    })),

  updateRoomStatus: (roomId, newStatus, guest) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              status: newStatus,
              currentGuest: newStatus === 'DISPONIBLE' ? undefined : guest ?? r.currentGuest,
            }
          : r
      ),
    })),

  bookRoom: (roomId, guest, doc, checkIn, checkOut) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              status: 'OCUPADA',
              currentGuest: guest,
              guestDoc: doc,
              checkIn,
              checkOut,
            }
          : r
      ),
    })),

  addInvoice: (invoice) =>
    set((state) => ({
      invoices: [invoice, ...state.invoices],
    })),

  showToast: (title, message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, title, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 5500);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
