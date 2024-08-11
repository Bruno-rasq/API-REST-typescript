import request from "supertest";
import app from "../src/app";

import { TestDataSource } from "../src/app-data-source";

/*
	OBSERVAÇÂO:
		-- todos os test vem do endpoint /test, isso se deve
		por eu ainda não ter implementado uma forma de alterar 
		o data source durante os testes.
*/
describe("GET /users/", () => {
	
	beforeAll(async () => {
		if (!TestDataSource.isInitialized) {
			await TestDataSource.initialize();
		}
	});

	afterAll(async () => {
		await TestDataSource.destroy();
	});

	describe("success cases: ", () => {
		
		test("should return status code HTTP_200_OK", async () => {
			const response = await request(app).get("/users/test");
			expect(response.status).toBe(200);
		})

		test("should return a empty list of users", async () => {
			const response = await request(app).get("/users/test");
			expect(response.body).toEqual({"users": []})
		});
	})

	test.todo("error cases: ")
});

describe("POST /users/", () => {

	beforeAll(async () => {
		if (!TestDataSource.isInitialized) {
			await TestDataSource.initialize();
		}
	});

	afterAll(async () => {
		await TestDataSource.destroy();
	});

	describe("success cases: ", () => {

		const validInput = {
			"name": "client",
			"email": "client@email.com"
		}

		const validIO = {
			"name": "client",
			"email": "client@email.com",
			"id": 1
		}
		
		test("should create a new user with valid input", async () => {
			const response = await request(app).post("/users/test").send(validInput)

			expect(response.status).toBe(201)
			expect(response.body).toEqual(validIO)
		})
	})
})

test.todo("GET /users/:ID");
test.todo("POST /users");
test.todo("PUT /users/:ID");
test.todo("DELETE /users/:ID");