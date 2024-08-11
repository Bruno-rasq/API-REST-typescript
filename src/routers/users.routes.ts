import { Router } from "express";
import * as controllers from "../controllers/users.controllers"

import { setDataSource } from "../middlewares/setdatasource"
import { ProdutionDataSource, TestDataSource } from "../app-data-source"


const router = Router()


router.get("/", setDataSource(ProdutionDataSource), controllers.get_all_users)
router.post("/", setDataSource(ProdutionDataSource), controllers.create_user)
router.get("/:id", setDataSource(ProdutionDataSource), controllers.get_user_by_id)
router.put("/:id", setDataSource(ProdutionDataSource), controllers.update_user)
router.delete("/:id", setDataSource(ProdutionDataSource), controllers.delete_user)

//isso claramente é uma gambiarra pesada. perdâo se ofendi vcs
router.get("/test", setDataSource(TestDataSource), controllers.get_all_users)

export { router };