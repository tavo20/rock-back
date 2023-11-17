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


export const getDataBySensor = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const sensor = await RecordSensor.find({ sensor: id }).limit(10).sort({ timestamp: -1 });
      res.json(sensor);

  } catch (error: any) {
      const err = error.message || error;
      res.status(400).json({ message: err, success: false });
      console.error(err)
  }
}