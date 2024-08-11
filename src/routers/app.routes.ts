import { Router } from "express"
import { rootpath } from "../controllers/app.controllers"

const router = Router()

router.get("/", rootpath)

export { router };