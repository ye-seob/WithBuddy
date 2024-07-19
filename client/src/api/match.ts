import instance from "./API";

export const loadBuddy = async (studentId: string) => {
  try {
    const response = await instance.get("http://localhost:3000/api/match", {
      params: { studentId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Buddy 불러오기 실패:", error);
    throw error;
  }
};
