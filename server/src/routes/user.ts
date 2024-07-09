import express, { Application } from "express";
const userController = require("../controllers/userController");
const editController = require("../controllers/editController");
const mail = require("../utils/sendMail");

const router: Application = express();

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);

router.put("/api/edit", editController.editUserInfo);

router.post("/api/send-mail", mail.sendMail);
export default router;
