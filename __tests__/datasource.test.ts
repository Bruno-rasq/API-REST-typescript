import { TestDataSource, DevDataSource } from "../src/app-data-source"

describe("", () => {
	test("should use testDataSource when NODE_ENV is set to test", () => {
		const isTest = process.env.NODE_ENV === "test"
		const datasource = isTest ? TestDataSource : DevDataSource

		expect(datasource).toBe(TestDataSource)
	})

	test("should use DevDataSource when NODE_ENV is not set to test", () => {
		const isTest = process.env.NODE_ENV !== "test"
		const datasource = isTest ? TestDataSource : DevDataSource

		expect(datasource).toBe(DevDataSource)
	})
})