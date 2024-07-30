// src/api/mail.ts
import axios from "axios";

export const sendMail = async (email: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/send-mail", {
      email,
    });
    return response.status;
  } catch (error) {
    console.error("메일 전송 실패:", error);
    throw new Error("메일 전송에 실패했습니다. 다시 시도해 주세요.");
  }
};
export const sendFindMail = async (email: string, studentId: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/mail/send-findPin-mail",
      {
        email,
        studentId,
      }
    );
    return response.status;
  } catch (error) {
    console.error("메일 전송 실패:", error);
    throw new Error("메일 전송에 실패했습니다. 다시 시도해 주세요.");
  }
};
export const checkAuthCode = async (
  email: string,
  authCode: string
): Promise<string> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/mail/checkAuthCode",
      {
        email,
        authCode,
      }
    );

    return response.status.toString();
  } catch (error) {
    console.error("인증코드 확인 실패:", error);
    throw new Error("인증코드 확인에 실패했습니다. 다시 시도해 주세요.");
  }
};
