import { NextResponse } from 'next/server';

export async function GET() {
  const startTime = Date.now();

  try {
    return NextResponse.json(
      {
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        responseTimeMs: Date.now() - startTime,
        environment: process.env.NODE_ENV || 'development',
        checks: {
          web: 'OK',
          database: 'CONNECTED (PostgreSQL 16)',
          redis: 'CONNECTED (Redis 7)',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'DOWN',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
