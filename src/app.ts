import express, { Application } from "express";

import { router as UserRouters } from "./routers/users.routes";
import { router as appRouters } from "./routers/app.routes";
import { router as swaggerDocs } from './routers/docs.routes'

import { setDataSource } from "./middlewares/setdatasource"
import { getDataSource } from "./app-data-source"

const app: Application = express()

// set Middlewares
app.use(express.json())
app.use(setDataSource(getDataSource()))

// set routers
app.use("/", appRouters)
app.use("/users", UserRouters)
app.use("/docs", swaggerDocs)

export default app;