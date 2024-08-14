import express, { Application, Express } from 'express';
import { singleton, injectable, inject } from 'tsyringe';
import { ErrorHandlerMiddleware } from './error-handler/error-handler-middleware';
import { configRoutes } from '../routes';
import { settingBodyParser } from './body-parser';

@singleton()
@injectable()
export class ExpressWrapper {
    constructor(
        @inject("Express")
        public app: Express,
        @inject(ErrorHandlerMiddleware)
        public errorHandlerMiddleware: ErrorHandlerMiddleware,        
    ) { }

    public setExpress() {
        settingBodyParser(this.app);
        configRoutes(this.app);
        this.errorHandlerMiddleware.setExpress(this.app);
    }
}