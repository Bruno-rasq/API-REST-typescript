import request from "supertest";
import app from "../src/app";

import { TestDataSource } from "../src/app-data-source";

describe("GET /", () => {
	beforeAll(async () => {
		if(!TestDataSource.isInitialized){
			await TestDataSource.initialize()
		}
	})

	afterAll(async () => {
		await TestDataSource.destroy()
	})

	test('should return a message "ok" ', async () => {
		const response = await request(app).get("/")
		expect(response.body).toEqual({ "message": "ok" })
	})
})