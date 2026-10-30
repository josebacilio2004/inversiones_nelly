import { NextResponse } from 'next/server';
import { lookupSunatRuc, validatePeruvianRuc } from '@/lib/sunat';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ruc: string }> }
) {
  const { ruc } = await params;

  if (!ruc || (!validatePeruvianRuc(ruc) && ruc.length !== 8 && ruc.length !== 11)) {
    return NextResponse.json(
      { error: 'RUC o DNI inválido. Ingrese un RUC de 11 dígitos o DNI de 8 dígitos.' },
      { status: 400 }
    );
  }

  try {
    const data = await lookupSunatRuc(ruc);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al consultar padrón de contribuyentes' },
      { status: 500 }
    );
  }
}
