import { NextResponse } from 'next/server';
import { QuoteFormSchema } from '@/lib/validations/quote.schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = QuoteFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Datos de cotización inválidos',
          issues: validation.error.format(),
        },
        { status: 422 }
      );
    }

    const data = validation.data;
    const contractCode = `CTR-2026-${Math.floor(100 + Math.random() * 900)}`;
    const series = Array.from(
      { length: data.unitsCount },
      () => `IN-BP-${Math.floor(100 + Math.random() * 899)}`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Cotización B2B registrada exitosamente',
        contractCode,
        assignedSeries: series,
        estimatedMonthlyRate: 380 * data.unitsCount,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar cotización' },
      { status: 500 }
    );
  }
}
