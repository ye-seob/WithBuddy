import express, { Application, Request, Response } from "express";
import user from "./routes/user";
import connectDB from "./db";

const app: Application = express();

const port: number = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(user);

app.listen(port, function () {
  console.log(` ${port}포트 실행 중`);
});
