import { DataSource } from "typeorm";


export const DevDataSource = new DataSource({
	type: "sqlite",
	database: "./src/database/database.sqlite",
	entities: ["src/entities/*.ts"],
	logging: false,
	synchronize: true,
});

export const TestDataSource = new DataSource({
	type: "sqlite",
	database: ":memory:",
	entities: ["src/entities/*.ts"],
	logging: false,
	synchronize: true,
});

export const getDataSource = (): DataSource => {
	const isTest = process.env.NODE_ENV === "test"
	/* istanbul ignore next */
	return isTest ? TestDataSource : DevDataSource 
};