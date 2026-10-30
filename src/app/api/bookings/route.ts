import { NextResponse } from 'next/server';
import { HotelBookingSchema } from '@/lib/validations/booking.schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = HotelBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Datos de reserva inválidos',
          issues: validation.error.format(),
        },
        { status: 422 }
      );
    }

    const data = validation.data;
    const bookingCode = `NEL-HOT-${Math.floor(2000 + Math.random() * 8000)}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Reserva hotelera confirmada',
        bookingCode,
        roomId: data.roomId,
        guestName: data.guestName,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor al registrar reserva' },
      { status: 500 }
    );
  }
}
