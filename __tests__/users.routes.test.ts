import request from "supertest";
import app from "../src/app";

import { TestDataSource } from "../src/app-data-source";

test.todo("GET /users/");
test.todo("GET /users/:ID");
test.todo("POST /users/");
test.todo("PUT /users/:ID");
test.todo("DELETE /users/:ID");

describe("GET /users/test", () => {
	beforeAll(async () => {
		if (!TestDataSource.isInitialized) {
			await TestDataSource.initialize();
		}
	});

	afterAll(async () => {
		await TestDataSource.destroy();
	});

	test("should return a empty list of users", async () => {
		const response = await request(app).get("/users/test");

		expect(response.status).toBe(200);
	});
});
