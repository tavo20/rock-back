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
    type: {
        type: String,
        enum: ['Temperatura', 'Humedad', 'Presión', 'Velocidad del viento', 'Nivel de ruido', 'Calidad del aire', 'Meteorológico', 'Clima', 'Ambiental'],
        require: true
    }
},{
    timestamps: true,
});

// haz un watcher para los cambios en el modelo
sensorSchema.post('save', function(doc, next) {});

export default model('Sensor', sensorSchema);
