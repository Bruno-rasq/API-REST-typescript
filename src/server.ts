import app from "./app"
import { ProdutionDataSource, TestDataSource } from "./app-data-source"

const isTest = process.env.NODE_ENV === 'test'
const data_source = isTest ? TestDataSource : ProdutionDataSource
const port = process.env.PORT || 3000;

/**
 * @description Função que inicia a api e o data source.
 */
const startServer = async () => {
	try {
		await data_source.initialize()

		app.listen(port, () => console.log(`Server running on port: ${port}`))

	} catch (err) {
		console.error("Error during Data Source initialization:", err)
	}
}

startServer()