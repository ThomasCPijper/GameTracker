"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapErrorToHttpResponse = mapErrorToHttpResponse;
const zod_1 = require("zod");
const env_1 = require("../../config/env");
const logger_1 = require("../logger");
const prisma_1 = require("../../generated/prisma");
function zodToPayload(error) {
    return {
        error: 'bad_request',
        code: 400,
        message: 'Validation error',
        details: error.flatten(),
    };
}
function mapErrorToHttpResponse(err, res) {
    logger_1.logger.error({ err });
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json(zodToPayload(err));
    }
    if (err instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            return res.status(409).json({ message: 'Unique constraint violated' });
        }
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Instance not found' });
        }
        if (err.code === 'P1001' || err.code === 'P1002') {
            return res.status(503).json({ message: 'Database unavailable' });
        }
    }
    if (err instanceof prisma_1.Prisma.PrismaClientInitializationError) {
        return res.status(503).json({
            message: 'Database connection failed',
        });
    }
    if (err instanceof prisma_1.Prisma.PrismaClientUnknownRequestError) {
        return res.status(500).json({
            message: 'Unknown database error',
        });
    }
    if (err instanceof prisma_1.Prisma.PrismaClientRustPanicError) {
        return res.status(500).json({
            message: 'Database client crashed',
        });
    }
    if (env_1.env.NODE_ENV != 'test') {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
    else {
        return res.status(500).json({
            message: 'Internal server error',
            err
        });
    }
}
