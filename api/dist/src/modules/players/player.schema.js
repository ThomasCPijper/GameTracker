"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerSchema = exports.baseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.baseSchema = zod_1.default.object({
    name: zod_1.default.string({ message: "Player name is required" })
        .trim()
        .min(1, "Player name should not be empty"),
    email: zod_1.default.email({ message: "Email is required" })
        .trim()
        .min(1, "Email should not be empty")
});
exports.updatePlayerSchema = exports.baseSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
    path: []
});
