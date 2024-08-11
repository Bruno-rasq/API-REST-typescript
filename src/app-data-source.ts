import { DataSource } from "typeorm";

export const ProdutionDataSource = new DataSource({
	type: "sqlite",
	database: "./src/database/database.sqlite",
	entities: ["src/entities/*.ts"],
	logging: false,
	synchronize: true,
});

export const TestDataSource = new DataSource({
	type: "sqlite",
	database: ":memory:",
	//database: "./src/database/testDB.sqlite",
	entities: ["src/entities/*.ts"],
	logging: false,
	synchronize: true,
});
