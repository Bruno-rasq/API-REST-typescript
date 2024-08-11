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

//https://2762c49a-d183-427b-9c82-6a6f643b372a-00-xygj8i6kk4j5.spock.replit.dev/