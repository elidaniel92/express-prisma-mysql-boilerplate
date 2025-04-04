import express, { Express, Request, Response } from 'express';
import { inject, injectable, singleton } from 'tsyringe';
import { PacienteService } from './paciente.service';
import { Paciente } from './pacientes.entity';
import { number, z } from 'zod';
import { createManyPacienteDTOScheme, createOnePacienteDTOScheme, CreatePacienteDTO, createPacienteDTOScheme } from './dto/create-paciente.dto';
import { PartialFilterPacienteDTO, partialFilterPacienteDTOScheme } from './dto/partial-filter-paciente.dto';
import { PartialUpdatePacienteDTO, partialUpdatePacienteDTOScheme } from './dto/partial-update-paciente.dto';
import { UpdatePacienteDTO, updatePacienteDTOScheme } from './dto/update-paciente.dto';

@singleton()
@injectable()
export class PacienteController {

    constructor(
        @inject(PacienteService)
        private pacienteService: PacienteService,
        @inject("Express")
        private app: Express,
    ) {
        this.app.post('/api/pacientes', async (req, res) => { return this.post(req, res) });
        this.app.get('/api/pacientes/:id', async (req, res) => { return this.getById(req, res) });
        this.app.get('/api/pacientes?', async (req, res) => { return this.getByQueryParameters(req, res) });
        this.app.get('/api/pacientes', async (req, res) => { return this.get(req, res) });
        this.app.put('/api/pacientes/:id', async (req, res) => { return this.putById(req, res) });
        this.app.patch('/api/pacientes/:id', async (req, res) => { return this.patchById(req, res) });
        this.app.delete('/api/pacientes/:id', async (req, res) => { return this.deleteById(req, res) });
        this.app.delete('/api/pacientes', async (req, res) => { return this.deleteAll(req, res) });
        this.app.delete('/api/pacientes?', async (req, res) => { return this.deleteAll(req, res) });
    }

    public async post(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        if(Array.isArray(req.body)) {
            const pacienteCreated: Paciente = await this.pacienteService.createOne(createOnePacienteDTOScheme.parse(req.body));
            return res.status(201).send(pacienteCreated);
        } 
        const createCount = await this.pacienteService.createMany(createManyPacienteDTOScheme.parse(req.body));
        return res.status(201).send(createCount);
    };

    public async get(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const pacientes: Paciente[] = await this.pacienteService.findAll();
        return res.status(200).send(pacientes);
    };

    public async getById(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const pacienteId = z.coerce.number().parse(req.params.id)
        const paciente: Paciente | null = await this.pacienteService.findOne(pacienteId);
        if (paciente) {
            return res.status(200).send(paciente);
        } else {
            return res.status(204).send();
        }
    };

    public async getByQueryParameters(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const partialFilterPacienteDTO: PartialFilterPacienteDTO = partialFilterPacienteDTOScheme.parse(req.query);
        const pacientes: Paciente[] = await this.pacienteService.findAllFilterBy(partialFilterPacienteDTO);
        return res.status(200).send(pacientes);
    };

    public async putById(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const pacienteId = z.coerce.number().parse(req.params.id)
        const updatePacienteDTO: UpdatePacienteDTO = updatePacienteDTOScheme.parse(req.body);
        const paciente: Paciente = await this.pacienteService.update(pacienteId, updatePacienteDTO);
        return res.status(200).send(paciente);
    };

    public async patchById(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const pacienteId = z.coerce.number().parse(req.params.id)
        const partialUpdatePacienteDTO: PartialUpdatePacienteDTO = partialUpdatePacienteDTOScheme.parse(req.body);
        const paciente: Paciente = await this.pacienteService.update(pacienteId, partialUpdatePacienteDTO);
        return res.status(200).send(paciente);
    };

    public async deleteById(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const pacienteId = z.coerce.number().parse(req.params.id)        
        const paciente: Paciente = await this.pacienteService.delete(pacienteId);
        return res.status(200).send(paciente);
    };

    public async deleteAll(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const pacienteId = z.coerce.number().parse(req.params.id)        
        const deleteCount = await this.pacienteService.deleteAll();
        return res.status(200).send(deleteCount);
    };

    public async deleteByQueryParameters(req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> {
        const partialFilterPacienteDTO: PartialFilterPacienteDTO = partialFilterPacienteDTOScheme.parse(req.query);
        const pacienteId = z.coerce.number().parse(req.params.id)        
        const deleteCount = await this.pacienteService.deleteAllFilterBy(partialFilterPacienteDTO);
        return res.status(200).send(deleteCount);
    };
}