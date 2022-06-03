"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Defining storage of files 
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../../uploads'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
// Filterting by mimetypes
const fileFilter = (req, file, cb) => {
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    if (fileTypes.some(fileType => fileType === file.mimetype))
        return cb(null, true);
    return cb(new Error('Only .jpeg/.jpg, .png and .gif formats can be used!'), false);
};
const maxSize = 1 * 1000 * 1000;
const upload = (req, res, next) => {
    return (0, multer_1.default)({
        storage,
        limits: { fileSize: maxSize },
        fileFilter
    }).single('image')(req, res, (err) => {
        // File size error
        if (err instanceof multer_1.default.MulterError)
            return res.status(500).json('Max file size 2MB allowed!');
        // Invalid file type, message will return from fileFilter callback
        if (err)
            return res.status(500).json(err.message);
        // File not selected
        if (!req.file)
            return res.status(500).json({
                msg: 'File is required!'
            });
        // Success
        next();
    });
};
exports.upload = upload;
//# sourceMappingURL=upload.js.map