import { Schema, model } from 'mongoose';

const sensorSchema = new Schema({
    sensor_id: {
        type: Number,
        require: true,
    },
    sensor_name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
});

export default model('Sensor', sensorSchema);
