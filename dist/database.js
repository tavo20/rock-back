"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DATABASE_CONECTION = process.env.DATABASE_CONECTION || "";
mongoose_1.default
    .connect(DATABASE_CONECTION, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
})
    .then((db) => {
    console.log("DB conectada");
})
    .catch((err) => console.log(`error al conectar la BD ${err}`, err));
