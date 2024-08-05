import express, { Request, Response }from "express";
import { User } from "./schemas"

const app = express()
const port = 3000

let FAKEBD: User[] = []

// Middleware para parsear json
app.use(express.json())

// endpoits
app.get("/", (request: Request, response: Response) => {
	return response.json({ "message": "ok"})
})

app.get("/users",  (request: Request, response: Response) => {
	return response.json({ "users": FAKEBD })
})

app.post("/users", (request: Request, response: Response) => {
	const { name, email } = request.body

	if( !name || !email ){
		// status code 400 bad request
		return response.status(400).json({"message": "bad request"})
	}

	if( typeof name !== "string" || typeof email != "string"){
		// status code 400 bad request
		return response.status(400).json({"message": "name or email must be string"})
	}
	
	const newUser = new User(FAKEBD.length + 1, name, email)

	FAKEBD.push(newUser)

	// status code 201 created
	return response.status(201).json(newUser)
})

// Inicia o servidor
app.listen(port, () => console.log(`Server running on port: ${port}`))