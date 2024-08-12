import { Router } from "express";

import { 
	get_all_users, 
	get_user_by_id, 
	create_user, 
	update_user, 
	delete_user 
} from "../controllers/users.controllers";
import { TestDataSource, ProdutionDataSource } from '../app-data-source'
import { setDataSource } from "../middlewares/setdatasource"

const isTest = process.env.NODE_ENV === 'test'
const data_source = isTest ? TestDataSource : ProdutionDataSource


const router = Router();

router.get("/", setDataSource(data_source), get_all_users);
router.post("/", setDataSource(data_source), create_user);
router.get("/:id", setDataSource(data_source), get_user_by_id);
router.put("/:id", setDataSource(data_source), update_user);
router.delete("/:id", setDataSource(data_source), delete_user);


export { router };