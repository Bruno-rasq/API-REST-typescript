import request from "supertest"
import app from "../../src/app"
import { User } from "../../src/schemas"
import FAKEDB from "../../src/database"


describe("GET /users/", () => {

	beforeAll(() => {
		FAKEDB.pop()
	})
	
	test("should returns status code 200 and users list", async () => {
		const response = await request(app).get("/users/")

		expect(response.status).toBe(200)
		expect(response.body).toEqual({"users": []})
	})
})

describe("GET /users/:id", () => {

	const ID = 1
	const name = "testeUser"
	const email = "test@mail.com"

	beforeAll(() => {
		FAKEDB.pop()

		const userTest = new User(ID, name, email)
		FAKEDB.push(userTest)
	})
	
	test("should return status code 404 and message 'user not found'.", async () => {
		const userId = 3 // id inesistente
		const response = await request(app).get(`/users/${userId}`)

		expect(response.status).toBe(404)
		expect(response.body).toEqual({"message": "user not found"})
	})

	test("should return status code 200 and user test.", async () => {
		const response = await request(app).get(`/users/${ID}`)

		expect(response.status).toBe(200)
		expect(response.body).toEqual(
			{
				"id": 1,
				"name":  "testeUser",
				"email": "test@mail.com"
			}
		)
	})
	
})

describe("POST /users/", () => {

	const userInput = {
		"name": "userName",
		"email": "user@mail.com"
	}

	const userOutput = {
		"id": 1,
		"name": "userName",
		"email": "user@mail.com"
	}

	const WithoutEmail = {
		"name": "invalid"
	}

	const invalidInput = {
		"name": 123,
		"email": 111
	}
	
	beforeAll(() => {
		FAKEDB.pop()
	})

	afterAll(() => {
		FAKEDB.pop()
	})


	test("should create a new user with valid input", async () => {
		const response = await request(app).post("/users/").send(userInput)

		expect(response.status).toBe(201) // created
		expect(response.body).toEqual(userOutput)
	})

	
	test("should return status 400 for create a new user without field 'email'", async () => {
		const response = await request(app).post("/users/").send(WithoutEmail)

		expect(response.status).toBe(400) // bad request
		expect(response.body).toEqual({"message": "bad request"})
	})

	
	test("should return status 400 for create a new user with invalid input", async () => {
		const response = await request(app).post("/users/").send(invalidInput)

		expect(response.status).toBe(400) // bad request
		expect(response.body).toEqual({"message": "name or email must be string"})
	})
})

describe("PUT /users/:id", () => {

	const validInput = {
		"name": "nameUpdated",
		"email": "updated@email.com"
	}

	const invalidInput = { "name": "new name" }
	
	const ID = 1
	const name = "testeUser"
	const email = "test@mail.com"

	beforeAll(() => {
		FAKEDB.pop()

		const userTest = new User(ID, name, email)
		FAKEDB.push(userTest)
	})

	afterAll(() => {
		FAKEDB.pop()
	})

	test("should return a message 'user updated' and status 200", async () => {
		const response = await request(app).put(`/users/${ID}`).send(validInput)

		expect(response.status).toBe(200)
		expect(response.body).toEqual({"message": "user updated"})
	})

	test("should return a message 'user not found' and status 404 by invalid ID", async () => {
		const userValidId = 4
		const response = await request(app).put(`/users/${userValidId}`).send(validInput)

		expect(response.status).toBe(404)
		expect(response.body).toEqual({"message": "user not found"})
	})

	test("should return status code 400 for invalid input", async () => {
		const userValidId = 1
		const response = await request(app).put(`/users/${userValidId}`).send(invalidInput)

		expect(response.status).toBe(400)
		expect(response.body).toEqual({"message": "email and name must be provided as string"})
	})
})

describe("DELETE /users/:id", () => {

	const ID = 1
	const name = "testeUser"
	const email = "test@mail.com"
	
	beforeAll(() => {
		FAKEDB.pop()
		
		const userTest = new User(ID, name, email)
		FAKEDB.push(userTest)
	})

	test("should return status code 204 for succcess case", async () => {
		const response = await request(app).delete(`/users/${ID}`)

		expect(response.status).toBe(204)
	})
	
	test("should return status code 404 for user ID not found", async () => {
		const response = await request(app).delete(`/users/${ID + 1}`)

		expect(response.status).toBe(404)
		expect(response.body).toEqual({"message": "user not found"})
	})
})