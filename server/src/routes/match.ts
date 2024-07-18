import express, { Application } from "express";
const matchController = require("../controllers/matchController");
import { checkAuth } from "../utils/checkAuth";
const router: Application = express();

router.get("/api/match", checkAuth, matchController.match);

export default router;
