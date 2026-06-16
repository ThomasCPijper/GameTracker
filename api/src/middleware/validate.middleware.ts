import type { RequestHandler } from 'express';
import type { ZodTypeAny, z } from 'zod';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

export function validateBody<
  T extends ZodTypeAny,
  P extends ParamsDictionary = ParamsDictionary,
  Q extends ParsedQs = ParsedQs,
>(schema: T): RequestHandler<P, any, z.infer<T>, Q> {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export function validateQuery<
  T extends ZodTypeAny,
  P extends ParamsDictionary = ParamsDictionary,
  B = any,
>(schema: T): RequestHandler<P, any, B, z.infer<T>> {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req.query);

      Object.defineProperty(req, 'query', {
        // Express exposes `req.query` via a getter that re-parses the URL.
        // Mutating or assigning to it does not persist between middleware.
        // We override it with the validated (Zod-parsed) value so downstream
        // handlers receive the typed query object.
        value: parsed,
        writable: true,
        configurable: true,
        enumerable: true,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
}