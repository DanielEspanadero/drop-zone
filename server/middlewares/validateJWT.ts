import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

interface UserPayload {
    uid: string;
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('authorization');

        if (!token) {
            return res.status(403).json({
                ok: false,
                msg: 'No token provided.'
            });
        };

        const payload = verify(token!, process.env.SECRETORPRIVATEKEY as string) as UserPayload;

        req.uid = payload.uid;

        next();

    } catch (error) {
        return res.status(403).json({
            of: false,
            msg: 'Invalid token'
        });
    };
};