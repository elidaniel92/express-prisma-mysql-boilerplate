import express, { Application, Request, Response } from 'express';
import { configRoutes } from './routes';
import { settingBodyParser } from './body-parser';
import { inject, injectable, singleton } from 'tsyringe';

@singleton()
@injectable()
export class Server {
    constructor(
        @inject("Application")
        private app: Application
    ) {}

    public listen(port: number) {
        settingBodyParser(this.app);
        configRoutes(this.app);

        this.app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
            console.log(`Example app listening at http://localhost:${port}`)
        });
    }
}
