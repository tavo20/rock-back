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
exports.getDataBySensor = exports.create = void 0;
const RecordSensor_1 = __importDefault(require("../models/RecordSensor"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const record = new RecordSensor_1.default(body);
        yield record.save();
        res.json({ success: true, data: record });
    }
    catch (error) {
        res.json({ message: error.message, success: false });
    }
});
exports.create = create;
const getDataBySensor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { limit } = req.query;
        const limitQuery = limit ? Number(limit) : 25;
        const sensor = yield RecordSensor_1.default.find({ sensor: id }).limit(limitQuery).sort({ timestamp: -1 });
        res.json(sensor.reverse());
    }
    catch (error) {
        const err = error.message || error;
        res.status(400).json({ message: err, success: false });
        console.error(err);
    }
});
exports.getDataBySensor = getDataBySensor;
