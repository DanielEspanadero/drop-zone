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
const express_1 = __importDefault(require("express"));
const error404_1 = __importDefault(require("../routes/error404"));
const upload_1 = __importDefault(require("../routes/upload"));
const auth_1 = __importDefault(require("../routes/auth"));
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.path = {
            error404: '*',
            upload: '/api/upload',
            auth: '/api/auth'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.dbConnect();
        this.middlewares();
        this.routes();
        this.listen();
    }
    ;
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.connectDB)();
        });
    }
    ;
    middlewares() {
        this.app.use(express_1.default.json());
    }
    ;
    routes() {
        this.app.use(this.path.upload, upload_1.default);
        this.app.use(this.path.auth, auth_1.default);
        this.app.use(this.path.error404, error404_1.default);
    }
    ;
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listenner on port ${this.port}`);
        });
    }
    ;
}
;
exports.default = Server;
//# sourceMappingURL=Server.js.map