import express, { Application } from 'express';
import cors from 'cors';

import routerError from '../routes/error404';
import routerUpload from '../routes/upload';
import routerAuth from '../routes/auth';

import { connectDB } from '../database/config';

class Server {
    private readonly app: Application;
    private readonly port: string;
    private readonly path = {
        error404: '*',
        upload: '/api/upload',
        auth: '/api/auth'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT as string;

        this.dbConnect();
        this.middlewares();
        this.routes();
        this.listen();
    };

    async dbConnect() {
        await connectDB();
    };

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: '*',
            preflightContinue: false,
        }));
    };

    routes() {
        this.app.use(this.path.upload, routerUpload);
        this.app.use(this.path.auth, routerAuth);
        this.app.use(this.path.error404, routerError);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listenner on port ${this.port}`);
        });
    };
};

export default Server;