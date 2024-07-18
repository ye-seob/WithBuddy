import axios from "axios";

export const refreshToken = async () => {
  try {
    await axios.post("http://localhost:3000/api/refreshToken", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("토큰 재발급 실패", error);
    throw error;
  }
};
