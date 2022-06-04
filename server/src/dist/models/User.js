"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
;
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required.'],
    }
}, {
    versionKey: false,
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=User.js.map