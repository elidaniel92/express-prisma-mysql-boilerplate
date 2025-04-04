import express, { Application } from 'express';
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

const prisma: PrismaClient = new PrismaClient();
if (prisma == undefined) { console.log("undefined"); } else { console.log("NOT undefined") };

container.register<PrismaClient>(PrismaClient, {
    useValue: prisma,
});

const app: Application = express();
container.register<Application>("Application", {
    useValue: app,
});
