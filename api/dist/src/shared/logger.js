"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const env_1 = require("../config/env");
const isProduction = env_1.env.NODE_ENV === 'production';
const isTest = env_1.env.NODE_ENV === 'test';
const isWindows = env_1.env.PLATFORM === 'win32';
exports.logger = (0, pino_1.default)({
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
