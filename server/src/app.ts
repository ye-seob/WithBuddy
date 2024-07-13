import express, { Application, Request, Response } from "express";
import user from "./routes/user";
import match from "./routes/match";
import connectDB from "./db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//환경변수 설정
dotenv.config();

const cors = require("cors");

const app: Application = express();

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  withCredentials: true,
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(user);
app.use(match);
app.use((req: Request, res: Response) => {
  // 모든 도메인에서 이 서버에 접근할 수 있도록 허용
  res.setHeader("Access-Control-Allow-Origin", "*");

  // 특정 헤더들을 허용하도록 설정
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // 허용할 HTTP 메소드들을 설정 (PUT 추가됨)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );

  // 다음 미들웨어로 넘어가도록 next() 호출
});

app.listen(process.env.PORT, function () {
  console.log(` ${process.env.PORT}포트 실행 중`);
});
