import { Router } from "express";
import { AccountController } from "../controller/AccountController";

const router = Router();

const accountController = new AccountController();

router.post("/register", accountController.register);
router.post("/login", accountController.login);

export default router;
