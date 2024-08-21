import request from "supertest";
import app from "../src/app";

import { TestDataSource } from "../src/app-data-source";


beforeEach(async () => {
	if (!TestDataSource.isInitialized) {
		await TestDataSource.initialize();
	}
});

afterEach(async () => {
	await TestDataSource.destroy();
});


describe("POST /users/", () => {

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

		test("should return a new user if success case", async () => {
			const response = await request(app).post("/users").send(validInput)
			expect(response.body).toEqual(validIO)
		})

		test("should return status 201 for success case", async () => {
			const response = await request(app).post("/users").send(validInput)
			expect(response.status).toBe(201)
		})
	})

	describe("fail cases: ", () => {

		const invalidInput = { "name": 123, "email": 123}
		const inputWithoutEmail = { "name": "test name"}

		test("should return status 400 for request without email", async () => {
			const response = await request(app).post("/users/").send(inputWithoutEmail)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({"message": [ 
				{
					"message": "Required",
					"path": "email",
				},
			]})
		})

		test("should return status 400 if the input types are different from 'string' ", async () => {
			const response = await request(app).post("/users/").send(invalidInput)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({"message": [
				{
					"message": "Expected string, received number",
					"path": "name",
				},
				{
					"message": "Expected string, received number",
					"path": "email",
				},
			]})
		})
	})
})


describe("GET /users/", () => {

	describe("success cases: ", () => {

		test("should return status code HTTP_200_OK", async () => {
			const response = await request(app).get("/users/");
			expect(response.status).toBe(200);
		})

		test("should return a empty list of users", async () => {
			const response = await request(app).get("/users/");
			expect(response.body).toEqual({"users": [], "meta": {
					"path":"/users/",
					"page":1,
					"next":0,
					"prev":1,
					"last":0,
					"total":0
				}
			})
		});

		test("meta data should be next and prev properties", async () => {
			const response = await request(app).get("/users?page=1");
			expect(response.body.meta).toHaveProperty("next", 0)
			expect(response.body.meta).toHaveProperty("prev", 1)
		})
	})
})


describe("GET /users/:ID", () => {

	beforeEach(async () => {
		await request(app).post("/users/").send({
			"name": "test name",
			"email": "test@email.com"
		})
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
			expect(response.body).toEqual({ "message": "User not found!" })
		})
	})
})


describe("PUT /users/:ID", () => {

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
		const validInput = { "name": "12", "email": "12@email.com" }

		test("should return status 400 for invalid input", async () => {
			const response = await request(app).put("/users/1").send(invalidInput)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({ "message": [
				{
					"message": "Required",
					"path": "email",
				},
			]})
		})

		test("should return status 400 for invalid types in input", async () => {
			const response = await request(app).put("/users/1").send(invalidTypesInput)
			expect(response.status).toBe(400)
			expect(response.body).toEqual({"message": [
				{
				  "message": "Expected string, received number",
				  "path": "name",
				},
				{
				  "message": "Expected string, received number",
				  "path": "email",
				}
			]})
		})

		test("should return status 404 if the user is not found", async () => {
			const response = await request(app).put("/users/23").send(validInput)
			expect(response.status).toBe(404)
			expect(response.body).toEqual({ "message": "User not found" })
		})
	})
})