import { Schema, model } from 'mongoose';

const sensorSchema = new Schema({
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

export default model('Sensor', sensorSchema);
