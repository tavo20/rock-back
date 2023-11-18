import { Schema, model } from 'mongoose';

const recordSenserSchema = new Schema({
    sensor: {
        type: Schema.Types.ObjectId,
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
},{
    timestamps: true,
});

export default model('record', recordSenserSchema);
