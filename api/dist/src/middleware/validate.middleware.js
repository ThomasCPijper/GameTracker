"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
function validateBody(schema) {
    return (req, _res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
function validateQuery(schema) {
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
        }
        catch (err) {
            next(err);
        }
    };
}
