import { Request, Response } from "express";
import collection from "../models/userModel";

const bcrypt = require("bcrypt");

const login = async (req: Request, res: Response) => {
  try {
    const { studentId, pin } = req.body;
    const user = await collection.findOne({ studentId });
    if (!user) return res.status(404).send("등록되지 않은 학번입니다.");

    const passwordMatching = await bcrypt.compare(pin, user.pin);

    if (passwordMatching) {
      res.status(200).send("로그인 성공");
    } else {
      res.status(401).send("비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    res.status(500).json({ error: "서버 문제 발생" });
  }
};

async function signup(req: Request, res: Response) {
  try {
    const { name, studentId, pin, pinConfirm, email } = req.body;

    console.log(name);
    console.log(studentId);
    console.log(pin);
    console.log(pinConfirm);
    console.log(email);
    const existingUser = await collection.findOne({ studentId });

    if (existingUser) {
      return res.status(500).json("이미 가입된 학번입니다.");
    }

    const hashingPassword = await bcrypt.hash(pin, 5);

    await collection.create({
      name,
      studentId,
      pin: hashingPassword,
      email,
    });
    res.status(200).send("회원가입 성공했습니다.");
  } catch (error) {
    res.status(500).json({ error: "서버 문제 발생" });
  }
}
module.exports = {
  login,
  signup,
};
