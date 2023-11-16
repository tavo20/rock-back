import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";


export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      return res.json({ msg: "Usuario no encontrado", success: false, code: 'no-found' });
    }

    let correctPassword = await user?.validatePassword(password, user.password);
    if (!correctPassword) {
        return res.json({ msg: "Contraseña incorrecta", success: false, code:'no-password' });
    }

    const token: string = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET_JWT || "holamundo",
        {
          // expiresIn: 60 * 60 * 24 // El token servira para siempre...
        }
    );

    const response = {
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

    return res.json({ success: true, data: response });

  } catch (error: any) {
    res.json({ message: error.message, success: false });
    
  }
};
