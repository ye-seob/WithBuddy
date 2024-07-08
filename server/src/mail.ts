import * as nodeMailer from "nodemailer";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const myEmail = process.env.EMAIL;
const password = process.env.PASSWORD;

const sendMail = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;
  console.log(email);

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
    text: "메일인증 번호 : 1026",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("실패");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("성공");
    }
  });
};

export { sendMail };
