"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = __importDefault(require("zod"));
const root = process.cwd();
dotenv_1.default.config({
    path: [node_path_1.default.join(root, '.env'), node_path_1.default.join(root, '.env.local')],
    override: false
});
const envSchema = zod_1.default.object({
    // Server
    NODE_ENV: zod_1.default.enum(['development', 'production', 'test']),
    PLATFORM: zod_1.default.string().default(process.platform),
    PORT: zod_1.default.coerce.number().default(3000),
    DATABASE_URL: zod_1.default.string().min(1),
    // Logging
    LOG_LEVEL: zod_1.default.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
    QUERY_LOGGING: zod_1.default.string().default('false'),
    QUERY_LOG_THRESHOLD_MS: zod_1.default.coerce.number().default(100),
});
exports.env = envSchema.parse(process.env);
