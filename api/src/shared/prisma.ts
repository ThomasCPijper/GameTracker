import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg';
import { logger } from './logger';
import { env } from '../config/env';
import { Prisma, PrismaClient } from '../generated/prisma';

type PrismaWithEvents = PrismaClient<Prisma.PrismaClientOptions, 'query' | 'warn' | 'error'>;

const globalForPrisma = globalThis as { prisma?: PrismaWithEvents };

const isProd = env.NODE_ENV === 'production';

const shouldLogQueries = env.QUERY_LOGGING === 'true';
const logThresholdMs = env.QUERY_LOG_THRESHOLD_MS;

const MAX_QUERY_LEN = 800;

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

function redactParams(params: string) {
  try {
    const arr = JSON.parse(params);

    const masked = arr.map((v: unknown) => {
      if (typeof v !== 'string') return v;

      // Bearer/JWT/opaque tokens
      if (v.startsWith('Bearer ') || v.split('.').length === 3) return '[REDACTED_TOKEN]';

      // API keys (pk_..., sk_...)
      if (/^(pk|sk)_[A-Za-z0-9_-]{8,}/.test(v)) return '[REDACTED_API_KEY]';

      // sha256/hmac hashes (64 hex chars)
      if (/^[a-f0-9]{64}$/i.test(v)) return '[REDACTED_HASH]';

      return v;
    });

    return JSON.stringify(masked);
  } catch {
    return '[UNPARSEABLE_PARAMS]';
  }
}

export const prisma: PrismaWithEvents =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'stdout', level: 'warn' },
      { emit: 'stdout', level: 'error' },
    ],
  });

if (shouldLogQueries) {
  prisma.$on('query', (e) => {
    if (e.duration < logThresholdMs) return;

    const query = e.query.length > MAX_QUERY_LEN ? e.query.slice(0, MAX_QUERY_LEN) + '…' : e.query;

    const slowMeta = getSlowQueryMeta(e.duration, logThresholdMs);

    const payload: Record<string, unknown> = isProd
      ? {
          durationMs: e.duration,
          thresholdMs: logThresholdMs,
          percentSlower: slowMeta.percentSlower,
          severity: slowMeta.severity,
          query,
        }
      : {
          durationMs: e.duration,
          thresholdMs: logThresholdMs,
          percentSlower: slowMeta.percentSlower,
          severity: slowMeta.severity,
          query,
          params: redactParams(e.params),
        };

    logger[slowMeta.level](payload, '[prisma:query]');
  });
}

function getSlowQueryMeta(durationMs: number, thresholdMs: number) {
  const ratio = durationMs / thresholdMs;
  const percentSlower = Math.round((ratio - 1) * 100);

  if (ratio >= 2) {
    return {
      level: 'error' as const,
      severity: 'critical',
      percentSlower,
    };
  }

  if (ratio >= 1.4) {
    return {
      level: 'warn' as const,
      severity: 'very_slow',
      percentSlower,
    };
  }

  if (ratio >= 1.2) {
    return {
      level: 'warn' as const,
      severity: 'slow',
      percentSlower,
    };
  }

  return {
    level: 'info' as const,
    severity: 'slightly_slow',
    percentSlower,
  };
}

if (!isProd) globalForPrisma.prisma = prisma;