import express, { Application } from 'express';
import path from 'path';
import { container } from 'tsyringe';
import { PacienteController } from './feature/paciente/paciente.controller';

export function configRoutes(app: Application) {
    container.resolve(PacienteController);
    app.use('/site', express.static(path.join(__dirname, "./../static-files")));
}