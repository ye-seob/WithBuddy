import { Request, Response } from "express";
import collection from "../models/userModel";
import major from "../models/majorModel";
import { getMajorName } from "../utils/major";

const match = async (req: Request, res: Response) => {
  const studentId = req.query.studentId as string | undefined; //현재 가입된 유저의 학번

  if (!studentId) {
    res.status(400).send("로그인 후 다시 이용해주세요.");
    return;
  }

  //2023216049에서 216049 공통번호 분리
  const commonNumber = studentId.substring(4, 10);
  const majorCode = studentId.substring(4, 7); // 학과코드 추출
  const majorName = getMajorName(majorCode);
  //공통 번호로 찾고 name, studentId,commonNumber,matchedAt을 가져온다
  //그리고 오름차순으로 정리해서 두 명을 buddy에 담는다
  const buddy = await collection
    .find(
      { commonNumber },
      { name: 1, studentId: 1, commonNumber: 1, matchedAt: 1 }
    )
    .sort({ studentId: 1 });

  if (buddy.length > 1) {
    const notMatchedBuddies = buddy.filter((user: any) => !user.matchedAt);
    if (notMatchedBuddies.length > 0) {
      await collection.updateMany(
        { commonNumber, matchedAt: null },
        { $set: { matchedAt: new Date() } }
      );

      await major.findOneAndUpdate(
        { name: majorName },
        { $inc: { matches: 1 } },
        { new: true, upsert: true }
      );
    }
  }

  res.status(200).send({ buddy, majorName });
};

module.exports = {
  match,
};
