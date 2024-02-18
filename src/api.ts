import express, { Application, Request, Response } from 'express';
import { connectMySQLPrisma } from './start-prisma';
import { Paciente } from './paciente';

export function configAPIRoutes(app: Application) {
    const prismaMySQLConn = connectMySQLPrisma();

    app.post('/api/pacientes', async (req: Request, res: Response): Promise<Response> => {
        console.log(req.body);

        const paciente: Paciente = req.body;

        paciente.dataNascimento = new Date(paciente.dataNascimento);
        paciente.cpf = '123';
        
        const pacienteCreated = await prismaMySQLConn.pacientes.create({
            data: paciente,
        });
        return res.status(201).send(`Paciente criado com o id ${pacienteCreated.id}`);
    });

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