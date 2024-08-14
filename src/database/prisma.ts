import { PrismaClient } from '@prisma/client'
import { inject, injectable, singleton } from 'tsyringe';

@singleton()
@injectable()
export class Prisma {
    constructor(
        @inject('PrismaClient')
        private prismaClient: PrismaClient
    ) { }

    getConnection() {
        return this.prismaClient;
    }

}
