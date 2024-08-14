import { Router } from "express";

import { TestDataSource, DevDataSource } from '../app-data-source';
import { userControllers } from "../controllers/users.controllers";
import { setDataSource } from "../middlewares/setdatasource";

const isTest = process.env.NODE_ENV === 'test'
/* istanbul ignore next */
const data_source = isTest ? TestDataSource : DevDataSource


const router = Router();


//router = method => path, middleware, controller
router.get("/", setDataSource(data_source), userControllers.get);
router.post("/", setDataSource(data_source), userControllers.post);
router.get("/:id", setDataSource(data_source), userControllers.getWithID);
router.delete("/:id", setDataSource(data_source), userControllers.delete);
router.put("/:id", setDataSource(data_source), userControllers.update);


export { router };