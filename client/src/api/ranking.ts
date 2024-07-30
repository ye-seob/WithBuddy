import instance from "./API";

export const laodRanking = async () => {
  try {
    const response = await instance.get(
      "http://localhost:3000/api/ranking/loadRanking"
    );
    return response.data;
  } catch (error) {
    console.error("불러오기 실패:", error);
    throw error;
  }
};
