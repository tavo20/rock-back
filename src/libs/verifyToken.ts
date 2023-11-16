import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}


export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.header('Authorization') || '';
    if(!token) res.status(401).json('Access denied');

    const payload = jwt.verify(token, process.env.TOKEN_SECRET_JWT || '') as IPayload;

    // declaration mergin
    req.userId = payload._id;

    next();

}