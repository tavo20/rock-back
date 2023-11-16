import { Schema, model } from 'mongoose';

const recordSenserSchema = new Schema({
    sensor: {
        type: Schema.Types.ObjectId,
        ref: "Sensor",
        required: true,
      },
    timestamp: {
        type: Date,
        require: true
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
        type: Number,
        require: true
    }
});

export default model('Sensor', recordSenserSchema);
