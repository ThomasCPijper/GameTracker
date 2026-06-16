import express from "express";
import customerRouter from "./modules/customers/customers.controller";

const app = express();

app.use(customerRouter);

export default app;
