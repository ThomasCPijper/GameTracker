import { Router } from "express";
import { createPlayer, deletePlayer, findPlayerById, updatePlayer } from "./player.service";
import { validateBody } from "../../middleware/validate.middleware";
import { baseSchema, updatePlayerSchema } from "./player.schema";

const playerRouter = Router()

playerRouter.post('/', validateBody(baseSchema), async (req, res) => {
    const player = await createPlayer(req.body);

    res.status(201).json({
        message: "Player created successfully",
        player
    });
});

playerRouter.get('/:id', async (req, res) => {
    const player = await findPlayerById(req.params.id);
    res.status(200).json({ player })
});

playerRouter.patch('/:id', validateBody(updatePlayerSchema), async (req, res) => {
    const player = await updatePlayer(req.params.id as string, req.body);

    res.status(200).json({
        message: "Player updated successfully",
        player
    });
});

playerRouter.delete('/:id', async (req, res) => {
    await deletePlayer(req.params.id);

    res.json({
        message: "Player deleted succesfully"
    });
});

export default playerRouter;