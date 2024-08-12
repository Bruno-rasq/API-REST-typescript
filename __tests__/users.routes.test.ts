import request from "supertest";
import app from "../src/app";

import { TestDataSource } from "../src/app-data-source";


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
			const response = await request(app).get("/users/");
			expect(response.status).toBe(200);
		})

		test("should return a empty list of users", async () => {
			const response = await request(app).get("/users/");
			expect(response.body).toEqual({"users": []})
		});
	})

	describe("fail cases: ", () => {
		test.todo("should return status 500 if the data source is not initialized")
	})
})

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
			const response = await request(app).post("/users/").send(validInput)

			expect(response.status).toBe(201)
			expect(response.body).toEqual(validIO)
		})
	})

	describe("fail cases: ", () => {
		
		const invalidInput = { "name": 123, "email": 123}
		const inputWithoutEmail = { "name": "test name"}

		test("should return status 400 for request without email", async () => {
			const response = await request(app).post("/users/").send(inputWithoutEmail)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({"message": "bad request"})
		})

		test("should return status 400 for bad request", async () => {
			const response = await request(app).post("/users/").send(invalidInput)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({"message": "name or email must be string"})
		})

		test.todo("should return status 500 if the data source is not initialized")
	})
})

describe("GET /users/:ID", () => {

	beforeAll(async () => {
		if (!TestDataSource.isInitialized) {
			await TestDataSource.initialize();
		}
	});

	afterAll(async () => {
		await TestDataSource.destroy();
	});

	beforeEach(async () => {
		await request(app).post("/users/").send({
			"name": "test name",
			"email": "test@email.com"
		})
	})

	afterEach(async () => {
		await request(app).delete("/users/1")
	})

	describe("success cases: ", () => {
		
		test("should return status 200 if the user is found.", async () => {
			const ID = 1
			const response = await request(app).get(`/users/${ID}`)

			expect(response.status).toBe(200)
			expect(response.body).toEqual(
				{
					"id": 1,
					"name": "test name",
					"email": "test@email.com"
				}
			)
		})
	})

	describe("fail cases: ", () => {
		
		test("should return status 404 if the user is not found.", async () => {
			const userId = 3 // id inesistente
			const response = await request(app).get(`/users/${userId}`)

			expect(response.status).toBe(404)
			expect(response.body).toEqual({"message": "user not found!"})
		})
	})
})

describe("DELETE /users/:ID", () => {
	
	beforeAll(async () => {
		if (!TestDataSource.isInitialized) {
			await TestDataSource.initialize();
		}
	});

	afterAll(async () => {
		await TestDataSource.destroy();
	});

	beforeEach(async () => {
		await request(app).post("/users/").send({
			"name": "test name",
			"email": "test@email.com"
		})
	})

	describe("success cases: ", () => {

		test("should return status 200 if the user deleted successlyful", async () => {
			const response = await request(app).delete("/users/1")

			expect(response.status).toBe(200)
			expect(response.body).toEqual({ "message": "User deleted successfully" })
		})
	})

	describe("fail cases: ", () => {

		test("should return status 404 if the user is not found", async () => {
			const response = await request(app).delete("/users/3")

			expect(response.status).toBe(404)
			expect(response.body).toEqual({ "message": "User not found" })
		})

		test.todo("should return status 500 if there is an error when deleting the user")
		test.todo("should return status 500 if the data source is not initialized")
	})
})

describe("PUT /users/:ID", () => {

	beforeAll(async () => {
		if (!TestDataSource.isInitialized) {
			await TestDataSource.initialize();
		}
	});

	afterAll(async () => {
		await TestDataSource.destroy();
	});

	beforeEach(async () => {
		await request(app).post("/users/").send({
			"name": "test name",
			"email": "test@email.com"
		})
	})

	describe("success cases: ", () => {

		const input = {"name": "new name", "email": "newemail@email.com"}
		const output = {"name": "new name", "email": "newemail@email.com", "id": 1}

		test("should return status 200 and user updated", async () => {
			const response = await request(app).put("/users/1").send(input)
			expect(response.status).toBe(200)
			expect(response.body).toEqual({ "message": "User updated successfully", "user": output })
		})
	})
	
	describe("fail cases: ", () => {

		const invalidInput = { "name": "testing..."}
		const invalidTypesInput = { "name": 12, "email": 12 }
		const validInput = { "name": "12", "email": "12" }

		test("should return status 400 for invalid input", async () => {
			const response = await request(app).put("/users/1").send(invalidInput)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({ "message": "Name and email are required" })
		})

		test("should return status 400 for invalid types in input", async () => {
			const response = await request(app).put("/users/1").send(invalidTypesInput)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({"message": "name or email must be string"})
		})

		test("should return status 404 if the user is not found", async () => {
			const response = await request(app).put("/users/23").send(validInput)
			expect(response.status).toBe(404)
			expect(response.body).toEqual({ "message": "User not found" })
		})
		
		test.todo("should return status 500 if there is an error when updating the user")
		test.todo("should return status 500 if the data source is not initialized")
	})
});