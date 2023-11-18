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
    type: {
        type: String,
        enum: ['Temperatura', 'Humedad', 'Presión', 'Velocidad del viento', 'Nivel de ruido', 'Calidad del aire', 'Meteorológico', 'Clima', 'Ambiental'],
        require: true
    }
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Sensor', sensorSchema);
