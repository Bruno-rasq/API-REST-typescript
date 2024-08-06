import request from "supertest"
import app from "../../src/app"

describe("GET /users/", () => {
	test("should returns status code 200 and users list", async () => {
		const response = await request(app).get("/users/")

		expect(response.status).toBe(200)
		expect(response.body).toEqual({"users": []})
	})
})