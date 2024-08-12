import { Router } from "express";

import { 
	get_all_users, 
	get_user_by_id, 
	create_user, 
	update_user, 
	delete_user 
} from "../controllers/users.controllers";

const router = Router();

router.get("/", get_all_users);
router.post("/", create_user);
router.get("/:id", get_user_by_id);
router.put("/:id", update_user);
router.delete("/:id", delete_user);


export { router };