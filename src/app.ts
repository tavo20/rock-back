import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from "http";

// Routes
import authRoutes from './routes/auth.route';
import recordSenserRoutes from './routes/recordSensor.route';
import sensorRoutes from './routes/sensor.route';

const app: Application = express();
let server = createServer(app);

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

//middlewares
if(!process.env.PRODUCTION_MODE) {
    app.use(morgan('dev'));
}
app.use(express.json());

const corsOptions ={
    origin:'http://localhost:8100', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/record/sensor', recordSenserRoutes);
app.use('/api/sensor', sensorRoutes);

export { app, server };
