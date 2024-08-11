import { Request, Response } from "express"
import { DataSource } from "typeorm"

import { User } from "../entities/users"

export const get_all_users = async (request: Request, response: Response) => {
	const datasource = request.app.locals.dataSource as DataSource

	if (!datasource.isInitialized){
		return response.status(500).json({"message": "data source not initialized"})	
	}

	const users = await datasource.getRepository(User).find()

	return response.status(200).json({ "users": users })
}

export const create_user = async (request: Request, response: Response) => {
	const datasource = request.app.locals.dataSource as DataSource
	const { name, email } = request.body

	if (!datasource.isInitialized){
		return response.status(500).json({"message": "data source not initialized"})	
	}

	if( !name || !email ){
		return response.status(400).json({"message": "bad request"})
	}

	if( typeof name !== "string" || typeof email != "string"){
		return response.status(400).json({"message": "name or email must be string"})
	}

	const user = await datasource.getRepository(User).create({name, email})
	const result = await datasource.getRepository(User).save(user)

	return response.status(201).json(result)
}

export const get_user_by_id = async (request: Request, response: Response) => {
	const datasource =  request.app.locals.dataSource as DataSource
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
}

export const update_user = async (request: Request, response: Response) => {
	const datasource = request.app.locals.dataSource as DataSource;

    if (!datasource.isInitialized) {
        return response.status(500).json({ "message": "data source not initialized" });
    }

    const userId = request.params.id;
    const { name, email } = request.body;

    if (!name || !email) {
        return response.status(400).json({ "message": "Name and email are required" });
    }

	if( typeof name !== "string" || typeof email != "string"){
		return response.status(400).json({"message": "name or email must be string"})
	}

    try {
        const userRepository = datasource.getRepository(User);
        const user = await userRepository.findOneBy({ id: Number(userId) });

        if (!user) {
            return response.status(404).json({ "message": "User not found" });
        }

        user.name = name;
        user.email = email;

        await userRepository.save(user);

        return response.status(200).json({ "message": "User updated successfully", "user": user });
    } catch (error) {
        return response.status(500).json({ "message": "Error updating user", "error": error });
	}
}

export const delete_user = async (request: Request, response: Response) => {
	const datasource = request.app.locals.dataSource as DataSource;

    if (!datasource.isInitialized) {
        return response.status(500).json({ "message": "data source not initialized" });
    }

    const userId = request.params.id;

    try {
        const userRepository = datasource.getRepository(User);
        const user = await userRepository.findOneBy({ id: Number(userId) });

        if (!user) {
            return response.status(404).json({ "message": "User not found" });
        }

        await userRepository.remove(user);

        return response.status(200).json({ "message": "User deleted successfully" });
    } catch (error) {
        return response.status(500).json({ "message": "Error deleting user", "error": error });
	}
}