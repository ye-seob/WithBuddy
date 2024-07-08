import { Request, Response } from "express";
import collection from "../models/userModel";
import { code, codeTimestamp } from "../utils/sendMail";
const bcrypt = require("bcrypt");

const CODE_LIMIT_TIME = 3 * 60 * 1000; // 3분

// 로그인 처리 함수
export const login = async (req: Request, res: Response) => {
  try {
    const { studentId, pin } = req.body;
    const user = await collection.findOne({ studentId });

    if (!user) return res.status(404).send("등록되지 않은 학번입니다.");

    const passwordMatching = await bcrypt.compare(pin, user.pin);

    if (passwordMatching) {
      res.status(200).send(user);
    } else {
      res.status(401).send("비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    res.status(500).json({ error: "서버 문제 발생" });
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
