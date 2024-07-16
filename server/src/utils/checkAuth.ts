import { Request, Response, NextFunction } from "express";
import collection from "../models/userModel";
const jwt = require("jsonwebtoken");

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).send("토큰이 누락되었습니다");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(500).send("서버 오류: " + error);
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const data = jwt.verify(token, process.env.REFRESH_SECRET);
    const user = await collection.findOne({ email: data.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      {
        studentId: user.studentId,
        userName: user.name,
        email: user.email,
        commonNumber: user.commonNumber,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "1m", issuer: "About Tech" }
    );
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

(module.exports = checkAuth), refreshToken;
