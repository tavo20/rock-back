import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';


const app: Application = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello World!');
})


//middlewares
if(!process.env.PRODUCTIO_MODE) {
    app.use(morgan('dev'));
}
app.use(express.json());



const corsOptions ={
    origin:'http://localhost:8100', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors());


export default app;
