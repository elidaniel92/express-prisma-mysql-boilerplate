import { inject, injectable, singleton } from 'tsyringe';
import { ExpressWrapper } from './express-wrapper';

@singleton()
@injectable()
export class Server {
    constructor(
        @inject(ExpressWrapper)
        private expressWrapper: ExpressWrapper
    ) {}

    public listen(port: number) {
        this.expressWrapper.setExpress();

        this.expressWrapper.app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
            console.log(`Example app listening at http://localhost:${port}`);
        });
    }
}
