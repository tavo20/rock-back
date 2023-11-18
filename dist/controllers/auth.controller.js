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
        let userFound = yield User_1.default.findOne({ user });
        if (!userFound) {
            return res.json({ msg: "Usuario no encontrado", success: false, code: 'no-found' });
        }
        let correctPassword = yield (userFound === null || userFound === void 0 ? void 0 : userFound.validatePassword(password, userFound.password));
        if (!correctPassword) {
            return res.json({ msg: "Contraseña incorrecta", success: false, code: 'no-password' });
        }
        const token = createTokenJWT(userFound);
        const response = {
            token,
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email,
        };
        return res.json({ success: true, data: response });
    }
    catch (error) {
        const err = error instanceof Error ? error.message : error;
        console.error("error login controller user", err);
        res.status(400).json({ message: err, success: false });
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
        const token = createTokenJWT(saveUser);
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
        res.status(400).json({ message: "error", success: false, error: err });
    }
});
exports.signup = signup;
const getTokenJWT = (req) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return null;
    }
    return token;
};
const createTokenJWT = (user) => {
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET_JWT || "holamundo");
    return token;
};
