import express, { Application, Express } from 'express';
import { PrismaClient } from "@prisma/client";
import { container, delay, inject, injectable, singleton } from "tsyringe";

const prisma: PrismaClient = new PrismaClient();
container.register<PrismaClient>(PrismaClient, {
    useValue: prisma,
});

const app: Express = express();
container.register<Express>("Express", {
    useValue: app,
});

