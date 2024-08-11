import { Request, Response } from "express"

export const rootpath = (request: Request, response: Response) => {
	return response.status(200).json({ "message": "ok"})
}