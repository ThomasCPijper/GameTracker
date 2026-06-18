import path from "node:path";
import dotenv from 'dotenv';
import z from "zod";

const root = process.cwd();
dotenv.config({
    path: [path.join(root, '.env'), path.join(root, '.env.local')],
    override: false
});

const envSchema = z.object({
    // Server
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PLATFORM: z.string().default(process.platform),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().min(1),

    // Logging
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
    QUERY_LOGGING: z.string().default('false'),
    QUERY_LOG_THRESHOLD_MS: z.coerce.number().default(100),
});

export type Env = z.infer<typeof envSchema>;
export const env: Env = envSchema.parse(process.env);