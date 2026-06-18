import type { Response } from 'express';
import { ZodError } from 'zod';
import { env } from '../../config/env';
import { logger } from '../logger';
import { Prisma } from '../../generated/prisma';

function zodToPayload(error: ZodError) {
  return {
    error: 'bad_request',
    code: 400,
    message: 'Validation error',
    details: error.flatten(),
  };
}

export function mapErrorToHttpResponse(err: unknown, res: Response) {
  logger.error({ err });

  if (err instanceof ZodError) {
    return res.status(400).json(zodToPayload(err));
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
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

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(503).json({
      message: 'Database connection failed',
    });
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(500).json({
      message: 'Unknown database error',
    });
  }

  if (err instanceof Prisma.PrismaClientRustPanicError) {
    return res.status(500).json({
      message: 'Database client crashed',
    });
  }

  if(env.NODE_ENV != 'test') {
    return res.status(500).json({
      message: 'Internal server error',
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      err
    });
  }
}