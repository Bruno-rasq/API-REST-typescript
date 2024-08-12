import { Router } from "express";

import { Controllers } from "../controllers/users.controllers";
import { TestDataSource, ProdutionDataSource } from '../app-data-source'
import { setDataSource } from "../middlewares/setdatasource"

const isTest = process.env.NODE_ENV === 'test'
const data_source = isTest ? TestDataSource : ProdutionDataSource


const router = Router();

router.get("/", setDataSource(data_source), Controllers.get_all_users);
router.post("/", setDataSource(data_source), Controllers.create_user);
router.get("/:id", setDataSource(data_source), Controllers.get_user_by_id);
router.put("/:id", setDataSource(data_source), Controllers.update_user);
router.delete("/:id", setDataSource(data_source), Controllers.delete_user);


export { router };