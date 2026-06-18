import { prisma } from "../../shared/prisma";
import { CreatePlayerInput, UpdatePlayerInput } from "./player.schema";

export async function createPlayer(data: CreatePlayerInput) {
    return await prisma.player.create({
        data: {
            name: data.name,
            email: data.email
        }
    });
}

export async function findPlayerById(playerId: string) {
    return await prisma.player.findUniqueOrThrow({
        where: {
            id: playerId,
            deletedAt: null
        }
    });
}

export async function updatePlayer(id: string, data: UpdatePlayerInput) {
    return await prisma.player.update({
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

export async function deletePlayer(id: string) {
  return await prisma.player.update({
    where: {
      id,
      deletedAt: null
    },
    data: {
      deletedAt: new Date()
    }
  });
}
