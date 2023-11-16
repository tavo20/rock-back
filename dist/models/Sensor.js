"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sensorSchema = new mongoose_1.Schema({
    sensor_id: {
        type: String,
        require: true,
    },
    sensor_name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
});
exports.default = (0, mongoose_1.model)('Sensor', sensorSchema);
