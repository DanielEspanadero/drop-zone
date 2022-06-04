"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
;
const validateToken = (req, res, next) => {
    try {
        const token = req.header('authorization');
        if (!token) {
            return res.status(403).json({
                ok: false,
                msg: 'No token provided.'
            });
        }
        ;
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.SECRETORPRIVATEKEY);
        req.uid = payload.uid;
        next();
    }
    catch (error) {
        return res.status(403).json({
            of: false,
            msg: 'Invalid token'
        });
    }
    ;
};
exports.validateToken = validateToken;
//# sourceMappingURL=validateJWT.js.map