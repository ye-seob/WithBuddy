import axios from "axios";

interface SignupData {
  name: string;
  studentId: string;
  major: string;
  pin: string;
  pinConfirm: string;
  email: string;
  snsIds: {
    instaId?: string;
    kakaoId?: string;
  };
  mbti: string;
}

interface LoginData {
  studentId: string;
  pin: string;
}

interface LoginResponse {
  userName: string;
  major: string;
  snsIds: string[];
  mbti: string;
}

export const signup = async (data: SignupData): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:3000/api/signup", data);
    return response.data;
  } catch (error) {
    console.error("가입 실패:", error);
    throw new Error("가입에 실패했습니다. 다시 시도해 주세요.");
  }
};
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post("http://localhost:3000/api/login", data);
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw new Error("로그인에 실패했습니다. 다시 시도해 주세요.");
  }
};
