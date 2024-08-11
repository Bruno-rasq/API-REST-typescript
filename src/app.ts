import express, { Application } from "express";

import { router as UserRouters } from "./routers/users.routes";
import { router as appRouters } from "./routers/app.routes";

const app: Application = express()

// Middleware para parsear json
app.use(express.json())

// adicionando as rotas
app.use("/", appRouters)
app.use("/users", UserRouters)

export default app;