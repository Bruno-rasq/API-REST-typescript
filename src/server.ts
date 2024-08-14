import app from "./app"
import { DevDataSource, TestDataSource } from "./app-data-source"

const isTest = process.env.NODE_ENV === 'test'
const data_source = isTest ? TestDataSource : DevDataSource
const port = process.env.PORT || 3000;


const startServer = async () => {
	try {
		await data_source.initialize()

		app.listen(port, () => console.log(`Server running on port: ${port}`))

	} catch (err) {
		console.error("Error during Data Source initialization:", err)
	}
}

startServer()