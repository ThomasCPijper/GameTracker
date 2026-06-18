import pino from 'pino';
import { env } from '../config/env';

const isProduction = env.NODE_ENV === 'production';
const isTest = env.NODE_ENV === 'test';
const isWindows = env.PLATFORM === 'win32';

export const logger = pino({
  level: isTest ? 'silent' : process.env.LOG_LEVEL || 'info',
  redact: ['request.headers.cookie', 'request.headers.referer', 'request.headers.authorization'],
  formatters: {
    bindings: (bindings) => ({
      pid: bindings.pid,
      host: bindings.hostname,
    }),
  },
  ...(isProduction || isWindows
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      }),
});