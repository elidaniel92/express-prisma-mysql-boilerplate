import { Response, Request, NextFunction, Express } from 'express';
import { injectable, singleton } from 'tsyringe';
require('express-async-errors');


@singleton()
@injectable()
export class ErrorHandlerMiddleware {

    public setExpress(app: Express) {
        console.log("error");
        app.use((
            err: unknown,
            req: Request,
            res: Response,
            next: NextFunction) => {
            if (!res.headersSent) {
                res.status(500).send({
                    errorName: "Internal Server Error",
                    message: (err as any).message
                });
            }
            next();
        });
    }
}