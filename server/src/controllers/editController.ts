import { Request, Response } from "express";
import collection from "../models/userModel";
const bcrypt = require("bcrypt");

const editUserInfo = async (req: Request, res: Response) => {
  try {
    const { newName, newPin, pinConfirm, studentId } = req.body;
    const user = await collection.findOne({ studentId });

    if (!user) {
      return res.status(404).send("로그인 후 다시 이용해주세요");
    }
    if (isNaN(newPin)) {
      return res.status(400).json({ error: "PIN 번호는 숫자여야 합니다." });
    }
    if (newPin !== pinConfirm) {
      return res.status(400).json("PIN 번호가 일치하지 않습니다.");
    }

    const hashedNewPin = await bcrypt.hash(newPin, 5);

    user.name = newName;
    user.pin = hashedNewPin;

    await user.save();

    return res.status(200).send("사용자 정보가 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error("사용자 정보 수정 실패:", error);
    return res.status(500).json({ error: "서버 문제 발생" });
  }
};

module.exports = {
  editUserInfo,
};