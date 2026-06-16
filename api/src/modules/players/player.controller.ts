import { Router } from "express";
import { createPlayer, findPlayerById } from "./player.service";
import { validateBody } from "../../middleware/validate.middleware";
import { baseSchema } from "./player.schema";

const playerRouter = Router()

playerRouter.post('/', validateBody(baseSchema), (req, res) => {
    const player = createPlayer(req.body);

    res.status(201).json({
        message: "Player created successfully",
        player
    });
});

playerRouter.get('/:id', (req, res) => {
    const player = findPlayerById(req.params.id);
    res.status(200).json({ player })
});

export default playerRouter;