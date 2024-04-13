import dotenv from 'dotenv';
import { Server } from "socket.io";
dotenv.config();

import { app, server } from './app';

// Nos conectamos a a DB
import './database';
import { set } from 'mongoose';




function main() {
    const httpServer = server.listen(app.get('port'));
    console.info(`Port connection in port ${app.get('port')}`);

    // Socket.io
    const io = new Server(httpServer);
    console.log('Socket.io listening on port 3000');

    setInterval(() => {
        io.emit('server:test01', { message: 'Hola desde el servidor', date: Date.now() });
    }, 3000)

    // http://localhost:4200
    // var socket = io.c
    // io.on("connection", (socket) => {
    //     console.log("nuevo socket connectado:", socket.id);

    //     socket.on('disconnect', () => {
    //         console.log('Socket desconectado');
    //     });

    //     setInterval(() => {
    //         console.log('Emitiendo mensaje desde el servidor');
    //         socket.emit('server:test01', { message: 'Hola desde el servidor', date: Date.now() });
    //     }, 5000);
    // });
}

main();