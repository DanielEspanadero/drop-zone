import { Request, Response } from 'express';

export const uploadPost = (req: Request, res: Response) => {
    try {
        res.status(201).json({
            msg: 'File uploaded successfully!',
            file: req.file
        });
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    };
};