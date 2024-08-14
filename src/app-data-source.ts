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
