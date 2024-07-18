import express from "express";
const userController = require("../controllers/userController");
const editController = require("../controllers/editController");
const rankingController = require("../controllers/rankingController");
const mail = require("../utils/sendMail");
import { checkAuth, refreshToken } from "../utils/checkAuth";

const router = express();

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);
router.post("/api/logout", userController.logout);

router.put("/api/edit", checkAuth, editController.editUserInfo);
router.get("/api/ranking", checkAuth, rankingController.loadRanking);

router.post("/api/send-mail", mail.sendMail);
router.post("/api/refreshToken", refreshToken);

export default router;
