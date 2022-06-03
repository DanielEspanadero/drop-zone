import { Request, Response, NextFunction } from 'express';

import multer from 'multer';
import path from 'path';

// Defining storage of files 
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

// Filterting by mimetypes
const fileFilter = (req: Request, file: any, cb: (a:any, b:boolean) => void) => {
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    if (fileTypes.some(fileType => fileType === file.mimetype)) return cb(null, true);

    return cb(new Error('Only .jpeg/.jpg, .png and .gif formats can be used!'), false);
}

const maxSize = 1 * 1000 * 1000;

export const upload = (req: Request, res: Response, next: NextFunction) => {
    return multer({
        storage,
        limits: { fileSize: maxSize },
        fileFilter
    }).single('image')(req, res, (err) => {

        // File size error
        if (err instanceof multer.MulterError) return res.status(500).json('Max file size 2MB allowed!');

        // Invalid file type, message will return from fileFilter callback
        if (err) return res.status(500).json(err.message);

        // File not selected
        if (!req.file) return res.status(500).json({
            msg: 'File is required!'
        });

        // Success
        next();
    });
};