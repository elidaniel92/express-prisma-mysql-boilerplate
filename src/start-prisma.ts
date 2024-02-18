import { PrismaClient } from '@prisma/client'

export function connectMySQLPrisma() {
    const prisma = new PrismaClient()
    return prisma;
}