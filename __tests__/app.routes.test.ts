import request from "supertest";
import app from "../src/app";

import { ProdutionDataSource } from "../src/app-data-source";

describe("GET /", () => {
	beforeAll(async () => {
		if(!ProdutionDataSource.isInitialized){
			await ProdutionDataSource.initialize()
		}
	})

	afterAll(async () => {
		await ProdutionDataSource.destroy()
	})

	test('should return a message "ok" ', async () => {
		const response = await request(app).get("/")
		expect(response.body).toEqual({ "message": "ok" })
	})
})