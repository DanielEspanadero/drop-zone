"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error404_1 = __importDefault(require("../routes/error404"));
const upload_1 = __importDefault(require("../routes/upload"));
class Server {
    constructor() {
        this.path = {
            error404: '*',
            upload: '/api/upload'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.routes();
        this.listen();
    }
    ;
    routes() {
        this.app.use(this.path.upload, upload_1.default);
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