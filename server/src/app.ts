import express, { Application } from "express";
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

app.listen(process.env.PORT, function () {
  console.log(` ${process.env.PORT}포트 실행 중`);
});
