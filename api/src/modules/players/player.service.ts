import { prisma } from "../../shared/prisma";
import { CreatePlayerInput } from "./player.schema";

export async function createPlayer(data: CreatePlayerInput) {
    return await prisma.player.create({
        data: {
            name: data.name,
            email: data.email
        }
    })
}

export async function findPlayerById(playerId: string) {
    return await prisma.player.findUniqueOrThrow({
        where: {
            id: playerId,
            deletedAt: null
        }
    })
}