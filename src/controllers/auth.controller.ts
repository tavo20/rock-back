import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const login = async (req: Request, res: Response) => {
  try {
    let { user, password } = req.body;
    let userFond = await User.findOne({ user });
    if (!userFond) {
      return res.json({ msg: "Usuario no encontrado", success: false, code: 'no-found' });
    }

    let correctPassword = await userFond?.validatePassword(password, userFond.password);
    if (!correctPassword) {
        return res.json({ msg: "Contraseña incorrecta", success: false, code:'no-password' });
    }

    const token: string = jwt.sign(
        { _id: userFond._id },
        process.env.TOKEN_SECRET_JWT || "holamundo",
        {
          // expiresIn: 60 * 60 * 24 // El token servira para siempre...
        }
    );

    const response = {
        token,
        _id: userFond._id,
        name: userFond.name,
        email: userFond.email,
      };

    return res.json({ success: true, data: response });

  } catch (error: any) {
    res.json({ message: error.message, success: false });
    
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

    const token: string = jwt.sign(
      { _id: saveUser._id },
      process.env.TOKEN_SECRET_JWT || "holamundo",
    //   { expiresIn: "h" }
    );

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
    res.json({ message: "error", success: false, error: err });
    
  }
}
