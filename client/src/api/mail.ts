// src/api/mail.ts
import axios from "axios";

export const sendMail = async (email: string): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:3000/api/send-mail", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("메일 전송 실패:", error);
    throw new Error("메일 전송에 실패했습니다. 다시 시도해 주세요.");
  }
};