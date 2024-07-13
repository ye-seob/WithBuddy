import express, { Application } from "express";
const matchController = require("../controllers/matchController");
const checkAuth = require("../utils/checkAuth");
const router: Application = express();

router.get("/api/match", checkAuth, matchController.match);

export default router;
