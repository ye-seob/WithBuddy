import express, { Application } from "express";
const userController = require("../controllers/userController");
const mail = require("../mail");

const router: Application = express();

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);
router.post("/api/send-mail", mail.sendMail);

export default router;
