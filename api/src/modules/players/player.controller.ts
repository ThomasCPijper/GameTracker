import { Router } from "express";
import { createPlayer } from "./player.service";

const playerRouter = Router()

playerRouter.post('/', (req, res) => {
    const player = createPlayer(req.body);

    res.json({
        message: "Player created successfully",
        player
    });
});

export default playerRouter;