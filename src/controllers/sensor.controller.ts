import { Request, Response } from "express";
import  SensorM  from "../models/Sensor";

export const getAllSensors = async (req: Request, res: Response) => {
    try {
        const sensors = await SensorM.find();
        res.json(sensors);

    } catch (error: any) {
        const err = error.message || error;
        res.status(400).json({ message: err, success: false });
        console.error(err)
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sensor = await SensorM.findById(id);
        res.json(sensor);

    } catch (error: any) {
        const err = error.message || error;
        res.status(400).json({ message: err, success: false });
        console.error(err)
    }
}

