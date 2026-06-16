import express from "express";
import playerRouter from "./modules/players/player.controller";

const app = express();

app.use('/api/v1/player', playerRouter);

export default app;
