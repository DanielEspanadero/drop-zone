import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import { generateAccessToken } from '../helpers/generateJWT';

export const signUp = async (req: Request, res: Response) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        // Create User
        const newUser = new User({ firstName, lastName, email, password });

        // Check if the email exists.

        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                msg: 'That email is already registered.'
            });
        };

        // Encrypt the password.
        const salt = bcryptjs.genSaltSync(10);
        newUser.password = bcryptjs.hashSync(password, salt);

        // Save to DB.
        await newUser.save();

        // Get Token
        const token = await generateAccessToken(newUser.id);

        res.status(200).json({
            newUser,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}