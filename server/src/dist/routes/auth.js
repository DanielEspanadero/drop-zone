"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post('/signup', [
    (0, express_validator_1.check)('firstName', 'The firstName is required.').not().isEmpty(),
    (0, express_validator_1.check)('lastName', 'The lastName is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'This email is not valid.').isEmail(),
    (0, express_validator_1.check)('password', 'The password must have more than 6 letters.').isLength({ min: 6 }),
    validate_fields_1.validateFields
], auth_1.signUp);
router.post('/login', auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map