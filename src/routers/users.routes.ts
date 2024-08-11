import { Router } from "express";

import { setDataSource } from "../middlewares/setdatasource";
import { ProdutionDataSource, TestDataSource } from "../app-data-source";
import { 
	get_all_users, 
	get_user_by_id, 
	create_user, 
	update_user, 
	delete_user 
} from "../controllers/users.controllers";

const router = Router();

router.get("/", setDataSource(ProdutionDataSource), get_all_users);
router.post("/", setDataSource(ProdutionDataSource), create_user);
// router.get("/:id",setDataSource(ProdutionDataSource), get_user_by_id);
// router.put("/:id", setDataSource(ProdutionDataSource), update_user);
// router.delete("/:id",setDataSource(ProdutionDataSource), delete_user);

/*

	ALERTA!  -- ALTOS NIVEIS DE GAMBIARRa

	obs: prometo remover isso imediatamente assim que descobrir
	uma foram melhor de fazer os testes.
	
*/
router.get("/test", setDataSource(TestDataSource), get_all_users);
router.post("/test", setDataSource(TestDataSource), create_user);
// router.get("/test/:id",setDataSource(TestDataSource), get_user_by_id);
// router.put("/test/:id", setDataSource(TestDataSource), update_user);
// router.delete("/test/:id",setDataSource(TestDataSource), delete_user);

export { router };