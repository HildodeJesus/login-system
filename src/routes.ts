import { Router } from "express";

const router = Router();

import { AccountController } from "./controller/AccountController";
import { HomeController } from "./controller/HomeController";

const homeController = new HomeController();
const accountController = new AccountController();

router.get("/", homeController.index);
router.get("/register", accountController.registerPage);
router.get("/login", accountController.loginPage);

router.post("/register", accountController.register);
router.post("/login", accountController.login);

export default router;
