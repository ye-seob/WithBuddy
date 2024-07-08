import * as nodeMailer from "nodemailer";
import { Request, Response } from "express";
import dotenv from "dotenv";
import collection from "../models/userModel";

//환경변수 설정
dotenv.config();
const myEmail = process.env.EMAIL;
const password = process.env.PASSWORD;

//메일 인증번호 생성 함수
function makeCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

let code: string; // 인증번호
let codeTimestamp: number; // 타임스탬프

const sendMail = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  try {
    const existingUser = await collection.findOne({ email }); //가입된 학번인지 확인

    if (existingUser) {
      return res.status(500).json("이미 가입된 이메일입니다.");
    }

    code = makeCode(); // 코드 생성 및 저장
    codeTimestamp = Date.now(); // 타임스탬프 저장

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: password,
      },
    });

    const mailOptions = {
      from: { name: "ByBuddy", address: `${myEmail}` },
      to: email,
      subject: "가입 인증 메일",
      text: `메일인증 번호 : ${code}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("이메일 전송 성공");
  } catch (error) {
    console.log(error);
    res.status(500).send("이메일 전송 실패");
  }
};

export { sendMail, code, codeTimestamp };
