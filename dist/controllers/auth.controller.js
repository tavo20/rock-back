"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user, password } = req.body;
        let userFond = yield User_1.default.findOne({ user });
        if (!userFond) {
            return res.json({ msg: "Usuario no encontrado", success: false, code: 'no-found' });
        }
        let correctPassword = yield (userFond === null || userFond === void 0 ? void 0 : userFond.validatePassword(password, userFond.password));
        if (!correctPassword) {
            return res.json({ msg: "Contraseña incorrecta", success: false, code: 'no-password' });
        }
        const token = jsonwebtoken_1.default.sign({ _id: userFond._id }, process.env.TOKEN_SECRET_JWT || "holamundo", {
        // expiresIn: 60 * 60 * 24 // El token servira para siempre...
        });
        const response = {
            token,
            _id: userFond._id,
            name: userFond.name,
            email: userFond.email,
        };
        return res.json({ success: true, data: response });
    }
    catch (error) {
        res.json({ message: error.message, success: false });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, email, password, user } = req.body;
        const validEmail = yield User_1.default.findOne({ email });
        if (validEmail) {
            return res.json({
                message: "The user is already registered",
                code: "auth-already-register",
                success: false,
            });
        }
        let userBody = new User_1.default({
            name,
            email,
            password,
            user,
        });
        userBody.password = yield userBody.encryptPassword(password);
        // Save user in the database.
        const saveUser = yield userBody.save();
        const token = jsonwebtoken_1.default.sign({ _id: saveUser._id }, process.env.TOKEN_SECRET_JWT || "holamundo");
        const response = {
            _id: saveUser._id,
            name: saveUser.name,
            email: saveUser.email,
            user: saveUser.user,
            token,
        };
        res.json({ response, success: true });
    }
    catch (error) {
        const err = error instanceof Error ? error.message : error;
        console.error("error signup controller user", err.message);
        res.json({ message: "error", success: false, error: err });
    }
});
exports.signup = signup;
