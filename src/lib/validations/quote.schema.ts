import { z } from 'zod';

// Validador de RUC / DNI peruano
const peruvianDocRegex = /^(10|20|15|17)\d{9}$|^\d{8}$/;

export const QuoteFormSchema = z.object({
  docNumber: z
    .string()
    .min(8, 'El documento debe tener al menos 8 dígitos (DNI) o 11 dígitos (RUC)')
    .max(11, 'El documento no puede exceder los 11 dígitos')
    .regex(peruvianDocRegex, 'Debe ingresar un RUC válido (11 dígitos que inicien con 10 o 20) o un DNI válido (8 dígitos)'),
  companyName: z
    .string()
    .min(3, 'La Razón Social o Nombre debe contener al menos 3 caracteres'),
  contactName: z
    .string()
    .min(3, 'El nombre de contacto es obligatorio'),
  phone: z
    .string()
    .min(7, 'Ingrese un teléfono de contacto válido'),
  email: z
    .string()
    .email('Ingrese un correo electrónico corporativo válido'),
  projectName: z
    .string()
    .min(3, 'El nombre de la obra o proyecto es requerido'),
  location: z
    .string()
    .min(3, 'Indique la ubicación exacta de entrega'),
  modelCode: z
    .string()
    .min(1, 'Seleccione un modelo del catálogo'),
  unitsCount: z
    .number()
    .int()
    .min(1, 'Debe cotizar al menos 1 unidad')
    .max(100, 'Para solicitudes mayores a 100 unidades contacte directamente a gerencia'),
  monthsCount: z
    .number()
    .int()
    .min(1, 'El periodo mínimo de alquiler es de 1 mes')
    .max(36, 'El periodo máximo en cotizador directo es de 36 meses'),
  cleaningFrequency: z
    .string()
    .min(1, 'Seleccione la frecuencia de succión'),
});

export type QuoteFormValues = z.infer<typeof QuoteFormSchema>;
