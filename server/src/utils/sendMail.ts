import * as nodeMailer from "nodemailer";
import { Request, Response } from "express";
import dotenv from "dotenv";
import collection from "../models/userModel";
const crypto = require("crypto");

// 환경변수 설정
dotenv.config();
const myEmail = process.env.EMAIL;
const password = process.env.PASSWORD;

const makeCode = () => {
  return crypto.randomBytes(3).toString("hex");
};

// 인증 코드를 저장할 객체
const authCodes: { [key: string]: string } = {};

const sendMail = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  try {
    const existingUser = await collection.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json("이미 가입된 이메일입니다.");
    }

    const code = makeCode();
    authCodes[email] = code;
    console.log(code);

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: password,
      },
    });

    const mailOptions = {
      from: { name: "WithBuddy", address: `${myEmail}` },
      to: email,
      subject: "WithBuddy 가입 인증 메일",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>WithBuddy 가입 인증 메일</h2>
          <p>안녕하세요,</p>
          <p>가입을 환영합니다 아래의 인증 번호를 사용하여 이메일 인증을 완료해주세요.</p>
          <h3 style="color: #0066cc;">인증 번호: ${code}</h3>
          <p>감사합니다<br>WithBuddy </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("이메일 전송 성공");
  } catch (error) {
    console.log(error);
    res.status(500).send("이메일 전송 실패");
  }
};

const checkAuthCode = async (req: Request, res: Response) => {
  const { email, authCode } = req.body;

  try {
    const storedCode = authCodes[email];
    if (!storedCode) {
      return res.status(400).send("인증 코드가 없습니다.");
    }

    if (authCode !== storedCode) {
      return res.status(400).send("불일치");
    }
    delete authCodes[email];

    res.status(200).send("일치");
  } catch (error) {
    res.status(500).send("서버 오류");
  }
};

export { sendMail, checkAuthCode };
