"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = exports.getAllSensors = void 0;
const Sensor_1 = __importDefault(require("../models/Sensor"));
const getAllSensors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sensors = yield Sensor_1.default.find();
        res.json(sensors);
    }
    catch (error) {
        const err = error.message || error;
        res.status(400).json({ message: err, success: false });
        console.error(err);
    }
});
exports.getAllSensors = getAllSensors;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sensor = yield Sensor_1.default.findById(id);
        res.json(sensor);
    }
    catch (error) {
        const err = error.message || error;
        res.status(400).json({ message: err, success: false });
        console.error(err);
    }
});
exports.getOne = getOne;
