"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const generateJWT_1 = require("../helpers/generateJWT");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Create User
        const newUser = new User_1.User({ firstName, lastName, email, password });
        // Check if the email exists.
        const existEmail = yield User_1.User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                msg: 'That email is already registered.'
            });
        }
        ;
        // Encrypt the password.
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        // Save to DB.
        yield newUser.save();
        // Get Token
        const token = yield (0, generateJWT_1.generateAccessToken)(newUser.id);
        res.status(200).json({
            newUser,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
    ;
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if the user exists with the email
        const userDB = yield User_1.User.findOne({ email });
        if (!userDB) {
            res.status(403).json({
                msg: 'Email doesn`t exist.'
            });
        }
        ;
        // Validate password
        const validPassword = bcryptjs_1.default.compareSync(password, userDB === null || userDB === void 0 ? void 0 : userDB.password);
        if (!validPassword) {
            res.status(403).json({
                msg: 'The password you entered is not correct.'
            });
        }
        ;
        // Get Token
        const token = yield (0, generateJWT_1.generateAccessToken)(userDB === null || userDB === void 0 ? void 0 : userDB.id);
        res.status(200).json({
            user: userDB,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
    ;
});
exports.login = login;
//# sourceMappingURL=auth.js.map