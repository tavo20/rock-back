import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header('Authorization') || '';
        console.log(token);
        console.log('process.env.TOKEN_SECRET_JWT', process.env.TOKEN_SECRET_JWT);
        if(!token) res.status(401).json('Access denied');
    
        const payload = jwt.verify(token, process.env.TOKEN_SECRET_JWT || '') as IPayload;
        console.log('payload', payload)
    
        // declaration mergin
        req.userId = payload._id;
        next();

    } catch (error: any) {
        console.error(error.message);
        res.status(401).json('Access denied');

    }

}