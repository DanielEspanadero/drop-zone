"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../controllers/upload");
const router = (0, express_1.Router)();
router.post('/', upload_1.uploadPost);
exports.default = router;
//# sourceMappingURL=upload.js.map