import express, { Application, Request, Response } from "express";

const app: Application = express();

const port: number = 3001;

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(` ${port}포트 실행 중`);
});
