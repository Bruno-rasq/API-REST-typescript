import { Application } from "express"

import app from "./app"
import { getDataSource } from "./app-data-source"

const port = process.env.PORT || 3000;
const data_source = getDataSource()

const startServer = async (application: Application) => {
	try {
		await data_source.initialize()
		application.listen(port, () => console.log(`Server running on port: ${port}`))

	} catch (err) {
		console.error("Error during Data Source initialization:", err)
	}
}

startServer(app)