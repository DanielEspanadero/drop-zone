"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../controllers/upload");
const upload_2 = require("../middlewares/upload");
const router = (0, express_1.Router)();
router.post('/', upload_2.upload, upload_1.uploadPost);
exports.default = router;
//# sourceMappingURL=upload.js.map