import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  // Server
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // WhatsApp Cloud API
  WHATSAPP_ACCESS_TOKEN: z
    .string()
    .min(1, 'WHATSAPP_ACCESS_TOKEN is required'),

  WHATSAPP_PHONE_NUMBER_ID: z
    .string()
    .min(1, 'WHATSAPP_PHONE_NUMBER_ID is required'),

  WHATSAPP_VERIFY_TOKEN: z
    .string()
    .min(1, 'WHATSAPP_VERIFY_TOKEN is required'),

  WHATSAPP_APP_SECRET: z
    .string()
    .min(1, 'WHATSAPP_APP_SECRET is required'),

  WHATSAPP_API_VERSION: z.string().default('v23.0'),

  // Scheduler
  TIMEZONE: z.string().default('Asia/Kolkata'),
  MORNING_PROMPT_HOUR: z.coerce.number().min(0).max(23).default(7),
  MORNING_PROMPT_MINUTE: z.coerce.number().min(0).max(59).default(0),

  // Logging
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('\n❌ Environment validation failed:\n');
  console.error(JSON.stringify(result.error.format(), null, 2));
  process.exit(1);
}

export const env = result.data;
export type Env = z.infer<typeof envSchema>;