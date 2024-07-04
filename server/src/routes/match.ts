import express, { Application } from "express";
const matchController = require("../controllers/matchController");

const router: Application = express();

router.get("/api/match", matchController.match);

export default router;
