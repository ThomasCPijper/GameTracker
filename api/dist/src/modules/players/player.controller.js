"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const player_service_1 = require("./player.service");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const player_schema_1 = require("./player.schema");
const playerRouter = (0, express_1.Router)();
playerRouter.post('/', (0, validate_middleware_1.validateBody)(player_schema_1.baseSchema), async (req, res) => {
    const player = await (0, player_service_1.createPlayer)(req.body);
    res.status(201).json({
        message: "Player created successfully",
        player
    });
});
playerRouter.get('/:id', async (req, res) => {
    const player = await (0, player_service_1.findPlayerById)(req.params.id);
    res.status(200).json({ player });
});
playerRouter.patch('/:id', (0, validate_middleware_1.validateBody)(player_schema_1.updatePlayerSchema), async (req, res) => {
    const player = await (0, player_service_1.updatePlayer)(req.params.id, req.body);
    res.status(200).json({
        message: "Player updated successfully",
        player
    });
});
playerRouter.delete('/:id', async (req, res) => {
    await (0, player_service_1.deletePlayer)(req.params.id);
    res.json({
        message: "Player deleted succesfully"
    });
});
exports.default = playerRouter;
