import { Request, Response } from "express";
import  RecordSensor  from "../models/RecordSensor";

export const create = async (req: Request, res: Response) => {
  try {

    const body = req.body;
    const record = new RecordSensor(body);
    await record.save();
    res.json({ success: true, data: record });

  } catch (error: any) {
    res.json({ message: error.message, success: false });
  }
};