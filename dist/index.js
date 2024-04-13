"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app_1 = require("./app");
// Nos conectamos a a DB
require("./database");
function main() {
    const httpServer = app_1.server.listen(app_1.app.get('port'));
    console.info(`Port connection in port ${app_1.app.get('port')}`);
    // Socket.io
    const io = new socket_io_1.Server(httpServer);
    console.log('Socket.io listening on port 3000');
    setInterval(() => {
        io.emit('server:test01', { message: 'Hola desde el servidor', date: Date.now() });
    }, 3000);
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
