import { Request, Response, NextFunction } from "express";
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

module.exports = checkAuth;
