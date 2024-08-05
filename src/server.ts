import express, { Request, Response } from "express";
import { User } from "./schemas"

const app = express()
const port = process.env.PORT || 3000;

let FAKEDB: User[] = []

// Middleware para parsear json
app.use(express.json())


// endpoits
app.get("/", (request: Request, response: Response) => {
	return response.status(200).json({ "message": "ok"})
})

app.get("/users",  (request: Request, response: Response) => {
	return response.json({ "users": FAKEDB })
})

app.get("/users/:id", (request: Request, response: Response) => {
	const user = FAKEDB.find((user) => user.id === parseInt(request.params.id))

	if(!user){
		return response.status(404).json({"message": "user not found"})
	}
	return response.status(200).json(user)
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
	
	const newUser = new User(
		FAKEDB.length + 1, 
		name, 
		email
	)

	FAKEDB.push(newUser)

	// status code 201 created
	return response.status(201).json(newUser)
})

app.delete("/users/:id", (request: Request, response: Response) => {
	const index = FAKEDB.findIndex((user) => user.id === parseInt(request.params.id))

	if(index === -1){
		return response.status(404).json({"message": "user not found"})
	}
	FAKEDB.splice(index, 1)
	return response.status(204).send()
})

app.put("/users/:id", (request: Request, response: Response) => {
	const userID = parseInt(request.params.id)
	const { name, email } = request.body

	if(!name || typeof name !== "string" || !email || typeof email !== "string"){
		return response.status(400).json({"message": "email and name must be provided as string"})
	}

	const userIndex = FAKEDB.findIndex((user) => user.id === userID)

	if(userIndex === -1){
		return response.status(404).json({"message": "user not found"})
	}

	const userUpdated = new User(userID, name, email)

	FAKEDB[userIndex] = userUpdated

	return response.status(200).json({"message": "user updated"})
})


// Inicia o servidor
app.listen(port, () => console.log(`Server running on port: ${port}`))