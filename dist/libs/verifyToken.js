"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    const token = req.header('Authorization') || '';
    console.log(token);
    console.log('process.env.TOKEN_SECRET_JWT', process.env.TOKEN_SECRET_JWT);
    if (!token)
        res.status(401).json('Access denied');
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_JWT || '');
    // declaration mergin
    req.userId = payload._id;
    next();
};
exports.TokenValidation = TokenValidation;
