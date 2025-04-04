import { Paciente } from './pacientes.entity';
import { inject, injectable, singleton } from 'tsyringe';
import { PrismaClient, Prisma } from '@prisma/client';
import { CreateManyPacienteDTO, CreateOnePacienteDTO, CreatePacienteDTO } from './dto/create-paciente.dto';
import { PartialUpdatePacienteDTO } from './dto/partial-update-paciente.dto';
import { PartialFilterPacienteDTO } from './dto/partial-filter-paciente.dto';

@singleton()
@injectable()
export class PacienteService {

    constructor(
        @inject(PrismaClient)
        private prismaClient: PrismaClient,
    ) { }

    public async createOne(createOnePacienteDTO: CreateOnePacienteDTO): Promise<Paciente> {
        return this.prismaClient.pacientes.create({
            data: createOnePacienteDTO,
        });
    };

    public async createMany(createManyPacienteDTO: CreateManyPacienteDTO): Promise<Prisma.BatchPayload> {
        return this.prismaClient.pacientes.createMany({
            data: createManyPacienteDTO,
        });
    };

    public async findAll(): Promise<Paciente[]> {
        return this.prismaClient.pacientes.findMany();
    };

    public async findAllFilterBy(partialFilterPacienteDTO: PartialFilterPacienteDTO): Promise<Paciente[]> {
        return this.prismaClient.pacientes.findMany({
            where: partialFilterPacienteDTO
        })
    };

    public async findOne(pacienteId: number): Promise<Paciente | null> {
        return this.prismaClient.pacientes.findUnique({
            where: {
                id: pacienteId,
            },
        });
    };

    public async update(pacienteId: number, partialUpdatePacienteDTO: PartialUpdatePacienteDTO): Promise<Paciente> {
        return this.prismaClient.pacientes.update({
            where: {
                id: pacienteId,
            },
            data: partialUpdatePacienteDTO,
        });
    }

    public async delete(pacienteId: number): Promise<Paciente> {
        return this.prismaClient.pacientes.delete({
            where: {
                id: pacienteId,
            },
        });
    }

    public async deleteAllFilterBy(partialPacienteDTO: PartialUpdatePacienteDTO): Promise<Prisma.BatchPayload> {
        return this.prismaClient.pacientes.deleteMany({
            where: partialPacienteDTO
        });
    }

    public async deleteAll(): Promise<Prisma.BatchPayload> {
        return this.prismaClient.pacientes.deleteMany();
    }
}