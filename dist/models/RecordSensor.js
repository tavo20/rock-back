"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recordSenserSchema = new mongoose_1.Schema({
    sensor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Sensor",
        required: true,
    },
    timestamp: {
        type: Date,
        require: true,
        default: Date.now
    },
    temperature: {
        type: Number,
        require: true
    },
    humidity: {
        type: Number,
        require: true
    },
    pressure: {
        type: Number,
        require: true
    },
    wind_speed: {
        type: Number,
        require: true
    },
    noise_level: {
        type: Number,
        require: true
    },
    air_quality: {
        type: String,
        enum: ['Buena', 'Moderada', 'Mala', 'Muy mala', 'Extremadamente mala'],
        require: true
    }
});
exports.default = (0, mongoose_1.model)('record', recordSenserSchema);
