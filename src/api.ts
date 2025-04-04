import express, { Application, Request, Response } from 'express';
import { Paciente } from './paciente';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { PacienteController } from './paciente.controller';

export function configAPIRoutes(app: Application) {
    const c = container.resolve(PacienteController);
    
    const prismaMySQLConn = container.resolve<PrismaClient>(PrismaClient);


    app.get('/api/pacientes', async (req: Request, res: Response): Promise<Response> => {
        const pacientes = await prismaMySQLConn.pacientes.findMany()
        return res.status(200).send(pacientes);
    });

    app.get('/api/pacientes/:id', async (req: Request, res: Response): Promise<Response> => {
        const pacienteId = parseInt(req.params.id);

        const paciente = await prismaMySQLConn.pacientes.findUnique({
            where: {
                id: pacienteId,
            },
        });

        if (paciente) {
            return res.status(200).send(paciente);
        } else {
            return res.status(404).send({
                message: "Not Found"
            });
        }
    });

    app.put('/api/pacientes/:id', async (req: Request, res: Response): Promise<Response> => {
        const pacienteId = parseInt(req.params.id);

        const paciente: Paciente = req.body;

        paciente.dataNascimento = new Date(paciente.dataNascimento);

        const pacienteUpdated = await prismaMySQLConn.pacientes.update({
            where: {
                id: pacienteId,
            },
            data: paciente,
        });

        return res.status(200).send(pacienteUpdated);
    });

    app.delete('/api/pacientes/:id', async (req: Request, res: Response): Promise<Response> => {
        const pacienteId = parseInt(req.params.id);

        const paciente = await prismaMySQLConn.pacientes.delete({
            where: {
                id: pacienteId,
            },
        });

        return res.status(204).send();
    });
}

// // String original no formato "DD-MM-AAAA"
// function convertStrToDate(strDate: any): Date {
//     // Divida a string nos hífens
//     const partes = strDate.split("-");
//     // Reorganize as partes no formato "MM-DD-AAAA"
//     const dataReorganizada = partes[2] + "-" + partes[1] + "-" + partes[0];
//     // Crie um objeto Date usando a string reorganizada
//     const data = new Date(dataReorganizada);
//     return data;
// }