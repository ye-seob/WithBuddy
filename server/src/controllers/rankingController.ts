import { Request, Response } from "express";
import major from "../models/majorModel";

const laodRanking = async (req: Request, res: Response) => {
  try {
    const majors = await major.find();
    console.log(majors);
    return res.status(200).json(majors);
  } catch (error) {
    console.error("불러오기 실패:", error);
    return res.status(500).json({ error: "서버 문제 발생" });
  }
};

module.exports = {
  laodRanking,
};
