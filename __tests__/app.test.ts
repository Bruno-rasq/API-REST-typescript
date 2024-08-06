import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
	test("should return status code 200 and message 'ok' ", async () => {
		const response = await request(app).get("/");

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ "message": "ok" });
	});
});
