import { z } from 'zod';

export const HotelBookingSchema = z.object({
  roomId: z.string().min(1, 'Debe seleccionar una habitación válida'),
  guestName: z.string().min(3, 'El nombre completo del huésped es requerido'),
  docNumber: z.string().min(8, 'DNI de 8 dígitos o RUC de 11 dígitos').max(11),
  companyName: z.string().optional().default('Particular'),
  isCorporate: z.boolean().default(false),
  checkIn: z.string().min(10, 'Seleccione fecha de check-in válida'),
  checkOut: z.string().min(10, 'Seleccione fecha de check-out válida'),
  nights: z.number().int().min(1, 'La estadía mínima es de 1 noche').max(60),
});

export type HotelBookingValues = z.infer<typeof HotelBookingSchema>;
