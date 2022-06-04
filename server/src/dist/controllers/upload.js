"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPost = void 0;
const uploadPost = (req, res) => {
    try {
        res.status(201).json({
            msg: 'File uploaded successfully!',
            file: req.file
        });
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
    ;
};
exports.uploadPost = uploadPost;
//# sourceMappingURL=upload.js.map