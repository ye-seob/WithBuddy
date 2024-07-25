import instance from "./API";

export const loadBuddy = async (major: string, studentId: string) => {
  try {
    console.log("loadBuddy 실행");
    const response = await instance.get("http://localhost:3000/api/match", {
      params: { major, studentId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Buddy 불러오기 실패:", error);
    throw error;
  }
};
