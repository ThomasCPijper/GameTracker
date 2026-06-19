"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const player_controller_1 = __importDefault(require("./modules/players/player.controller"));
const error_service_1 = require("./shared/error/error.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/players', player_controller_1.default);
app.use((err, req, res, next) => {
    return (0, error_service_1.mapErrorToHttpResponse)(err, res);
});
exports.default = app;
