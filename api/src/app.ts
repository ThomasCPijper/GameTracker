import express from "express";
import type { Request, Response, NextFunction } from 'express';
import playerRouter from "./modules/players/player.controller";
import { mapErrorToHttpResponse } from "./shared/error/error.service";

const app = express();
app.use(express.json());

app.use('/api/v1/players', playerRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  return mapErrorToHttpResponse(err, res);
});

export default app;
