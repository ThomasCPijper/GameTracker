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