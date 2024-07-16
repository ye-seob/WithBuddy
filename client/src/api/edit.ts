import axios from "axios";

export const editUserInfo = async (
  studentId: string,
  newName: string,
  newPin?: string
): Promise<void> => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/edit",
      {
        newName,
        newPin: newPin || undefined,
        studentId,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to update user information");
    }
  } catch (error) {
    console.error("정보 수정 실패:", error);
    throw error;
  }
};
