import { TestDataSource, DevDataSource, getDataSource } from "../src/app-data-source"

describe("get data source", () => {
	
	test("should use testDataSource when getDataSource is set to true", () => {
		const datasource = getDataSource()
		expect(datasource).toBe(TestDataSource)
	})

	test("should use DevDataSource when getDataSource is not set to true", () => {
		const isTest = process.env.NODE_ENV != "test"
		const datasource = isTest? TestDataSource: DevDataSource
		expect(datasource).toBe(DevDataSource)
	})
})