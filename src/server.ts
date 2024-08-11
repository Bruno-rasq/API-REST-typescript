import app from "./app"
import { ProdutionDataSource } from "./app-data-source"

/**
 * @description Função que inicia a api e o data source.
 */
const startServer = async () => {
	try {
		await ProdutionDataSource.initialize()

		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`Server running on port: ${port}`))

	} catch (err) {
		console.error("Error during Data Source initialization:", err)
	}
}

startServer()