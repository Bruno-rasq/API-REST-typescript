import { Request, Response, NextFunction } from "express"
import { DataSource } from "typeorm"

/*
	Função responsavel por configurar de qual data source 
	os controladores devem gerenciar os dados
*/
export const setDataSource = (datasource: DataSource) => {
	return (request: Request, response: Response, next: NextFunction) => {
		request.app.locals.dataSource = datasource;
		next();
	}
}