import express, { Application, Request, Response } from 'express';
import { Paciente } from './paciente';
import { container, inject, injectable, singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

@singleton()
@injectable()
export class PacienteController {

    constructor(
        @inject(PrismaClient)
        private prismaClient: PrismaClient,
        @inject("Application")
        private app: Application
    ) {
        this.app.post('/api/pacientes', (req, res) => { return this.create(req, res) });
    }

    public async create(req: Request, res: Response):  Promise<express.Response<any, Record<string, any>>> {
        console.log(req.body);
        const paciente: Paciente = req.body;

        paciente.dataNascimento = new Date(paciente.dataNascimento);
        paciente.cpf = '123';

        const pacienteCreated = await this.prismaClient.pacientes.create({
            data: paciente,
        });

        return res.status(201).send(`Paciente criado com o id ${pacienteCreated.id}`);
    };
}