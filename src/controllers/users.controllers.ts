import { Request, Response } from "express"
import { DataSource } from 'typeorm'
import { z } from "zod"

import { User } from "../entities/users"
import { userSchemaInput } from "../schemas/user.schemas"

export const userControllers = {
	
	post: async (request: Request, response: Response) => {
		const datasource = request.app.locals.datasource as DataSource

		try {
			const { name, email } = userSchemaInput.parse(request.body)
			const user = await datasource.getRepository(User).create({name, email})
			const result = await datasource.getRepository(User).save(user)

			return response.status(201).json(result)
			
		} 
		catch (err) {
			if (err instanceof z.ZodError) {
				const validationError = err.errors.map(err => ({
					path: err.path.join('.'),
					message: err.message
				}));

				return response.status(400).json({message: validationError})
			}
		}
		return response.status(500).json({ message: "Internal server error"})
	},

	get: async (request: Request, response: Response) => {
		const datasource = request.app.locals.datasource as DataSource
		const users = await datasource.getRepository(User).find()
		return response.status(200).json({ "users": users })
	},

	getWithID: async (request: Request, response: Response) => {
		const datasource = request.app.locals.datasource as DataSource
		const userID = parseInt(request.params.id)

		const user = await datasource.createQueryBuilder()
			.select("user")
			.from(User, "user")
			.where("user.id = :id", { id: userID })
			.getOne()

		if(!user){
			return response.status(404).json({"message": "user not found!"})
		}
		return response.status(200).json(user)
	},

	delete: async (request: Request, response: Response) => {
		const datasource = request.app.locals.datasource as DataSource
		const userId = parseInt(request.params.id);

		try {
			const userRepository = datasource.getRepository(User);
			const user = await userRepository.findOneBy({ id: userId });

			if (!user) {
				return response.status(404).json({ "message": "User not found!" });
			}

			await userRepository.remove(user);

			return response.status(200).json({ "message": "User deleted successfully" });
		} catch (error) {
			return response.status(500).json({ "message": "Error deleting user"});
		}
	},

	update: async (request: Request, response: Response) => {
		const datasource = request.app.locals.datasource as DataSource

		try {
			const userId = parseInt(request.params.id);
			const { name, email } = userSchemaInput.parse(request.body);

			const userRepository = datasource.getRepository(User);
			const user = await userRepository.findOneBy({ id: userId });

			if (!user) {
				return response.status(404).json({ "message": "User not found" });
			}

			user.name = name;
			user.email = email;
			await userRepository.save(user);
			
			return response.status(200).json({ "message": "User updated successfully", "user": user });
		}
		catch (err) {
			if (err instanceof z.ZodError) {
				const validationError = err.errors.map(err => ({
					path: err.path.join('.'),
					message: err.message
				}));

				return response.status(400).json({message: validationError})
			}
		}
		return response.status(500).json({ message: "Internal server error"})
	},
}