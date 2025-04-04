import express, { Application } from 'express';
import bodyParser from 'body-parser';


export function settingBodyParser(app: Application) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}