"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const logger_1 = require("./logger");
const env_1 = require("../config/env");
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
const isProd = env_1.env.NODE_ENV === 'production';
const shouldLogQueries = env_1.env.QUERY_LOGGING === 'true';
const logThresholdMs = env_1.env.QUERY_LOG_THRESHOLD_MS;
const MAX_QUERY_LEN = 800;
const pool = new pg_1.Pool({
    connectionString: env_1.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
function redactParams(params) {
    try {
        const arr = JSON.parse(params);
        const masked = arr.map((v) => {
            if (typeof v !== 'string')
                return v;
            // Bearer/JWT/opaque tokens
            if (v.startsWith('Bearer ') || v.split('.').length === 3)
                return '[REDACTED_TOKEN]';
            // API keys (pk_..., sk_...)
            if (/^(pk|sk)_[A-Za-z0-9_-]{8,}/.test(v))
                return '[REDACTED_API_KEY]';
            // sha256/hmac hashes (64 hex chars)
            if (/^[a-f0-9]{64}$/i.test(v))
                return '[REDACTED_HASH]';
            return v;
        });
        return JSON.stringify(masked);
    }
    catch {
        return '[UNPARSEABLE_PARAMS]';
    }
}
exports.prisma = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        adapter,
        log: [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'warn' },
            { emit: 'stdout', level: 'error' },
        ],
    });
if (shouldLogQueries) {
    exports.prisma.$on('query', (e) => {
        if (e.duration < logThresholdMs)
            return;
        const query = e.query.length > MAX_QUERY_LEN ? e.query.slice(0, MAX_QUERY_LEN) + '…' : e.query;
        const slowMeta = getSlowQueryMeta(e.duration, logThresholdMs);
        const payload = isProd
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
        logger_1.logger[slowMeta.level](payload, '[prisma:query]');
    });
}
function getSlowQueryMeta(durationMs, thresholdMs) {
    const ratio = durationMs / thresholdMs;
    const percentSlower = Math.round((ratio - 1) * 100);
    if (ratio >= 2) {
        return {
            level: 'error',
            severity: 'critical',
            percentSlower,
        };
    }
    if (ratio >= 1.4) {
        return {
            level: 'warn',
            severity: 'very_slow',
            percentSlower,
        };
    }
    if (ratio >= 1.2) {
        return {
            level: 'warn',
            severity: 'slow',
            percentSlower,
        };
    }
    return {
        level: 'info',
        severity: 'slightly_slow',
        percentSlower,
    };
}
if (!isProd)
    globalForPrisma.prisma = exports.prisma;
