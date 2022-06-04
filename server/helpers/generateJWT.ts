import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/User';


export const generateAccessToken = (uid = '', role = ''): Promise<string> => {
    return new Promise((resolve, reject) => {
        const user = { uid };

        jwt.sign(user, process.env.SECRETORPRIVATEKEY as string, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Failed to generate JWT');
            } else {
                resolve(token as string);
            };
        });
    });
};

export const checkJWT = async (token = '') => {
    try {
        if (token.length < 10) {
            return null;
        };

        const uid: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY as string);

        await User.findById(uid);

    } catch (error) {
        return null;
    };
};