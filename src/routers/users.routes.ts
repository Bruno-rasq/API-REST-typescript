import { Router, Request, Response } from "express";
import { User } from "../schemas"
import FAKEDB from "../database"


const router = Router()


router.get("/",  (request: Request, response: Response) => {
	return response.status(200).json({ "users": FAKEDB })
})

router.get("/:id", (request: Request, response: Response) => {
	const user = FAKEDB.find((user) => user.id === parseInt(request.params.id))

	if(!user){
		return response.status(404).json({"message": "user not found"})
	}
	return response.status(200).json(user)
})

router.post("/", (request: Request, response: Response) => {
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

router.delete("/:id", (request: Request, response: Response) => {
	const index = FAKEDB.findIndex((user) => user.id === parseInt(request.params.id))

	if(index === -1){
		return response.status(404).json({"message": "user not found"})
	}
	FAKEDB.splice(index, 1)
	return response.status(204).send()
})

router.put("/:id", (request: Request, response: Response) => {
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


export { router };