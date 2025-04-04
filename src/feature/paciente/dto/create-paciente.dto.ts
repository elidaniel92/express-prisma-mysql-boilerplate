import { z } from "zod";
import { pacienteSchema } from "../pacientes.entity";

export const createOnePacienteDTOScheme = pacienteSchema.omit({ id: true }).strict();
export type CreateOnePacienteDTO = z.infer<typeof createOnePacienteDTOScheme>;

export const createManyPacienteDTOScheme = z.array(createOnePacienteDTOScheme);
export type CreateManyPacienteDTO = z.infer<typeof createManyPacienteDTOScheme>;

export const createPacienteDTOScheme = z.union([createOnePacienteDTOScheme, createManyPacienteDTOScheme])
export type CreatePacienteDTO = z.infer<typeof createPacienteDTOScheme>;