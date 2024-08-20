import { Router } from "express";

import { userControllers } from "../controllers/users.controllers";

const router = Router();

router.get("/", userControllers.get);
router.post("/", userControllers.post);
router.get("/:id", userControllers.getWithID);
router.delete("/:id", userControllers.delete);
router.put("/:id", userControllers.update);

export { router };