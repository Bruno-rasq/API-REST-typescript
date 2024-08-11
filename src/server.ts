import app from "./app"
import { ProdutionDataSource, TestDataSource } from "./app-data-source"

const isTestEnv = process.env.NODE_ENV ===  'test'
let dataSource = isTestEnv ? TestDataSource : ProdutionDataSource


const startServer = async () => {
	try {
		await dataSource.initialize()

		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`Server running on port: ${port}`))

	} catch (err) {
		console.error("Error during Data Source initialization:", err)
	}
}

startServer()