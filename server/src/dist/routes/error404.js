"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error404_1 = require("../controllers/error404");
const router = (0, express_1.Router)();
router.get('/', error404_1.error404);
router.post('/', error404_1.error404);
router.put('/', error404_1.error404);
router.delete('/', error404_1.error404);
exports.default = router;
//# sourceMappingURL=error404.js.map