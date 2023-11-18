import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const login = async (req: Request, res: Response) => {
  try {
    let { user, password } = req.body;
    
    let userFound = await User.findOne({ user });
    if (!userFound) {
      return res.json({ msg: "Usuario no encontrado", success: false, code: 'no-found' });
    }

    let correctPassword = await userFound?.validatePassword(password, userFound.password);
    if (!correctPassword) {
      return res.json({ msg: "Contraseña incorrecta", success: false, code: 'no-password' });
    }

    const token: string = createTokenJWT(userFound);
    const response = {
      token,
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    };

    return res.json({ success: true, data: response });

  } catch (error: any) {
    const err = error instanceof Error ? error.message : error;
    console.error("error login controller user", err);
    res.status(400).json({ message: err, success: false });

  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    let { name, email, password, user } = req.body;

    const validEmail = await User.findOne({ email });
    if (validEmail) {
      return res.json({
        message: "The user is already registered",
        code: "auth-already-register",
        success: false,
      });
    }

    let userBody: IUser = new User({
      name,
      email,
      password,
      user,
    });
    userBody.password = await userBody.encryptPassword(password);

    // Save user in the database.
    const saveUser = await userBody.save();
    const token: string = createTokenJWT(saveUser);

    const response = {
      _id: saveUser._id,
      name: saveUser.name,
      email: saveUser.email,
      user: saveUser.user,
      token,
    };

    res.json({ response, success: true });

  } catch (error: any) {
    const err = error instanceof Error ? error.message : error;
    console.error("error signup controller user", err.message);
    res.status(400).json({ message: "error", success: false, error: err });

  }
}

const getTokenJWT = (req: Request) => {
  const token = req.headers["x-access-token"] as string;
  if (!token) {
    return null;
  }
  return token;
}

const createTokenJWT = (user: IUser) => {
  const token = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET_JWT || "holamundo",
    // expiresIn: 60 * 60 * 24 // El token servira para siempre...
  );
  return token;
}
