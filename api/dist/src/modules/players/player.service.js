"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayer = createPlayer;
exports.findPlayerById = findPlayerById;
exports.updatePlayer = updatePlayer;
exports.deletePlayer = deletePlayer;
const prisma_1 = require("../../shared/prisma");
async function createPlayer(data) {
    return await prisma_1.prisma.player.create({
        data: {
            name: data.name,
            email: data.email
        }
    });
}
async function findPlayerById(playerId) {
    return await prisma_1.prisma.player.findUniqueOrThrow({
        where: {
            id: playerId,
            deletedAt: null
        }
    });
}
async function updatePlayer(id, data) {
    return await prisma_1.prisma.player.update({
        where: {
            id,
            deletedAt: null
        },
        data: {
            name: data.name,
            email: data.email
        }
    });
}
async function deletePlayer(id) {
    return await prisma_1.prisma.player.update({
        where: {
            id,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    });
}
