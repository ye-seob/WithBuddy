import { Request, Response } from "express";
import collection from "../models/userModel";

const match = async (req: Request, res: Response) => {
  const studentId = req.query.studentId as string | undefined;
  console.log(`match get요청: ${studentId}`);
  if (!studentId) {
    res.status(400).send("로그인 후 다시 이용해주세요.");
    return;
  }
  const commonNumber = studentId.substring(4, 10);

  const buddy = await collection
    .find({ commonNumber }, { name: 1, studentId: 1, commonNumber: 1 })
    .sort({ studentId: 1 });

  res.status(200).send(buddy);
};

module.exports = {
  match,
};
