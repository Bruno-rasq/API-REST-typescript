import { Router } from "express";
import * as controllers from "../controllers/users.controllers";

import { setDataSource } from "../middlewares/setdatasource";
import { ProdutionDataSource, TestDataSource } from "../app-data-source";

const router = Router();

router.get("/", setDataSource(ProdutionDataSource), controllers.get_all_users);
router.post("/", setDataSource(ProdutionDataSource), controllers.create_user);
router.get(
	"/:id",
	setDataSource(ProdutionDataSource),
	controllers.get_user_by_id,
);
router.put("/:id", setDataSource(ProdutionDataSource), controllers.update_user);
router.delete(
	"/:id",
	setDataSource(ProdutionDataSource),
	controllers.delete_user,
);

/*

	ALERTA!  -- ALTOS NIVEIS DE GAMBIARRa

	obs: prometo remover isso imediatamente assim que descobrir
	uma foram melhor de fazer os testes.
	
*/
router.get("/test", setDataSource(TestDataSource), controllers.get_all_users);
router.post("/test", setDataSource(TestDataSource), controllers.create_user);
router.get(
	"/test/:id",
	setDataSource(TestDataSource),
	controllers.get_user_by_id,
);
router.put("/test/:id", setDataSource(TestDataSource), controllers.update_user);
router.delete(
	"/test/:id",
	setDataSource(TestDataSource),
	controllers.delete_user,
);

export { router };