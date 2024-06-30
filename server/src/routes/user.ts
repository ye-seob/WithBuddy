import express, { Application, Request, Response } from "express";

const router: Application = express();

router.post("/api/login", (req: Request, res: Response) => {
  res.send("login post요청입니다");
});
router.post("/api/signup", (req: Request, res: Response) => {
  res.send("signup post요청입니다");
});

export default router;
