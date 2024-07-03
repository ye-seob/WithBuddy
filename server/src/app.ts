import express, { Application, Request, Response } from "express";
import user from "./routes/user";
import connectDB from "./db";
const cors = require("cors");

const app: Application = express();

const port: number = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req: Request, res: Response) {
  res.send("루트 페이지입니다");
});

app.use(user);

app.listen(port, function () {
  console.log(` ${port}포트 실행 중`);
});
