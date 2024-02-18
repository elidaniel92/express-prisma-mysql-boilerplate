import express, { Application } from 'express';
import path from 'path';
import { configAPIRoutes } from './api';

export function configRoutes(app: Application) {
    console.log('Config routes...')

    app.use('/site', express.static(path.join(__dirname, "./../static-files")));

    configAPIRoutes(app);
}