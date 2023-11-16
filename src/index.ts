import dotenv from 'dotenv';
dotenv.config();

import app from './app';

// Nos conectamos a a DB
import './database';


function main() {
    app.listen(app.get('port'))
    console.info(`Port connection in port ${app.get('port')}`);
}

main();