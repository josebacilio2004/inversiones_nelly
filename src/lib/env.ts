import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().default('postgresql://nelly_admin:NellySecret2026!@localhost:5432/inversiones_nelly_db?schema=public'),
  REDIS_URL: z.string().optional().default('redis://:NellyRedis2026!@localhost:6379'),
  NEXT_PUBLIC_COMPANY_NAME: z.string().default('Inversiones Nelly S.A.C.'),
  NEXT_PUBLIC_RUC: z.string().default('20608945123'),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
  NEXT_PUBLIC_RUC: process.env.NEXT_PUBLIC_RUC,
});
