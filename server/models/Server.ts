import express, { Application } from 'express';

import routerError from '../routes/error404';
import routerUpload from '../routes/upload';

class Server {
    private readonly app: Application;
    private readonly port: string;
    private readonly path = {
        error404: '*',
        upload: '/api/upload'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT as string;

        this.routes();
        this.listen();
    };

    routes(){
        this.app.use(this.path.upload, routerUpload);
        this.app.use(this.path.error404, routerError);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listenner on port ${this.port}`);
        });
    };
};

export default Server;