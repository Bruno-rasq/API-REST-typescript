import express, { Request, Response, Application } from "express";
import { router as UserRouters } from "./routers/users.routes"

const app: Application = express()

// Middleware para parsear json
app.use(express.json())

// adicionando as rotas
app.use("/users", UserRouters)

// endpoit raiz
app.get("/", (request: Request, response: Response) => {
	return response.status(200).json({ "message": "ok"})
})

export default app;