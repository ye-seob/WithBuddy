import instance from "./API";

export const editUserInfo = async (
  studentId: string,
  newName: string,
  newPin?: string,
  newInstaId?: string,
  newKakaoId?: string
): Promise<void> => {
  try {
    const response = await instance.put("http://localhost:3000/api/user/edit", {
      newName,
      newPin: newPin || undefined,
      studentId,
      newInstaId,
      newKakaoId,
    });
    if (response.status !== 200) {
      throw new Error("정보 수정 실패");
    }
  } catch (error) {
    console.error("정보 수정 실패:", error);
    throw error;
  }
};
