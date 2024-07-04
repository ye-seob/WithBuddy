import express, { Application } from "express";
const userController = require("../controllers/userController");

const router: Application = express();

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);

export default router;
