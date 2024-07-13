import express, { Application } from "express";
const userController = require("../controllers/userController");
const editController = require("../controllers/editController");
const rankingController = require("../controllers/rankingController");
const mail = require("../utils/sendMail");
const checkAuth = require("../utils/checkAuth");

const router: Application = express();

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);
router.post("/api/logout", userController.logout);

router.get("/api/edit", checkAuth);
router.put("/api/edit", checkAuth, editController.editUserInfo);
router.get("/api/ranking", checkAuth, rankingController.laodRanking);

router.post("/api/send-mail", mail.sendMail);

export default router;
