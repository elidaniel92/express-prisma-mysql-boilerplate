import { Paciente } from './paciente.entity';
import { inject, injectable, singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { PartialUpdatePacienteDTO } from './dto/partial-update-paciente.dto';

@singleton()
@injectable()
export class PacienteService {

    constructor(
        @inject(PrismaClient)
        private prismaClient: PrismaClient,
    ) { }

    public async create(createPacienteDTO: CreatePacienteDTO): Promise<Paciente> {
        return this.prismaClient.pacientes.create({
            data: createPacienteDTO,
        });
    };

    public async findAll(): Promise<Paciente[]> {
        return this.prismaClient.pacientes.findMany();
    };

    public async findAllFilterBy(partialPacienteDTO: PartialUpdatePacienteDTO): Promise<Paciente[]> {
        return this.prismaClient.pacientes.findMany({
            where: partialPacienteDTO
        })
    };

    public async findOne(pacienteId: number): Promise<Paciente | null> {
        return this.prismaClient.pacientes.findUnique({
            where: {
                id: pacienteId,
            },
        });
    };

    public async update(pacienteId: number, paciente: PartialUpdatePacienteDTO): Promise<Paciente> {
        return this.prismaClient.pacientes.update({
            where: {
                id: pacienteId,
            },
            data: paciente,
        });
    }

    public async delete(pacienteId: number): Promise<Paciente> {
        return this.prismaClient.pacientes.delete({
            where: {
                id: pacienteId,
            },
        });
    }
}