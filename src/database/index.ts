import { TestDataSource, ProdutionDataSource } from "../app-data-source"

const create_db = async () => {
	try {
		await TestDataSource.initialize()
		await ProdutionDataSource.initialize()

		console.log("data sources has been initialized")
	}
	catch (err) {
		console.error("Error during Data Source initialization:", err)
	}
}

create_db()