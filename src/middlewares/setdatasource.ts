import {Request, Response, NextFunction} from "express"
import {DataSource} from "typeorm"

export const setDataSource = (datasource: DataSource) => {
	return (request: Request, response: Response, next: NextFunction) => {
		request.app.locals.datasource = datasource;
		next()
	}
}