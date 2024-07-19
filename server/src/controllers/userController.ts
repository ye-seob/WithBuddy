import { Request, Response } from "express";
import collection from "../models/userModel";
import major from "../models/majorModel";
import { getMajorName } from "../utils/major";
import { code, codeTimestamp } from "../utils/sendMail";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CODE_LIMIT_TIME = 3 * 60 * 1000; // 3분

// 로그인 처리 함수
export const login = async (req: Request, res: Response) => {
  try {
    const { studentId, pin }: { studentId: string; pin: string } = req.body;
    const user = await collection.findOne({ studentId });

    if (!user) return res.status(404).send("등록되지 않은 학번입니다");
    const passwordMatching = await bcrypt.compare(pin, user.pin);

    if (passwordMatching) {
      const accessToken: string = jwt.sign(
        {
          studentId: user.studentId,
          userName: user.name,
          email: user.email,
          commonNumber: user.commonNumber,
        },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m", issuer: "About Tech" }
      );

      const refreshToken: string = jwt.sign(
        {
          id: user._id,
          userName: user.name,
          email: user.email,
        },
        process.env.REFRESH_SECRET,
        { expiresIn: "24h", issuer: "About Tech" }
      );

      res.cookie("accessToken", accessToken, {
        secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      const response = {
        studentId: user.studentId,
        name: user.name,
        commonNumber: user.commonNumber,
        matchedAt: user.matchedAt,
      };

      res.status(200).send(response);
    } else {
      res.status(401).send("비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    res.status(500).json({ error: "서버 문제 발생" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      message: "로그아웃 성공",
    });
  } catch (error) {
    res.status(500).json({ error: "서버 문제 발생" });
    console.error(error);
  }
};

// 회원가입 처리 함수
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, studentId, pin, pinConfirm, email, authCode } = req.body;
    const existingUser = await collection.findOne({ studentId });

    if (pin != pinConfirm) {
      return res.status(500).json("pin번호 불일치");
    }

    if (existingUser) {
      return res.status(500).json("이미 가입된 학번입니다.");
    }

    // 현재 시간에서 코드에 저장된 시간을 빼서 3분이 넘어가면 실패 리턴
    if (Date.now() - codeTimestamp > CODE_LIMIT_TIME) {
      return res.status(500).json("인증번호가 만료되었습니다.");
    }

    if (authCode != code) {
      return res.status(500).json("인증번호가 일치하지 않습니다");
    }

    const hashingPassword = await bcrypt.hash(pin, 5);
    const commonNumber = studentId.substring(4, 10);
    const majorCode = studentId.substring(4, 7);
    const majorName = getMajorName(majorCode);

    // 학과코드에 해당하는 Major document 업데이트
    await major.findOneAndUpdate(
      { name: majorName, code: majorCode },
      { $inc: { number: 1 } },
      { new: true, upsert: true }
    );

    await collection.create({
      name,
      studentId,
      pin: hashingPassword,
      email,
      commonNumber,
    });

    res.status(200).send("회원가입 성공했습니다.");
  } catch (error) {
    res.status(500).json({ error: "서버 문제 발생" });
  }
};
