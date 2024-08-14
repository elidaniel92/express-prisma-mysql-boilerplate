import { z } from "zod";
import { pacienteSchema } from "../paciente.entity";

export const updatePacienteDTOScheme = pacienteSchema.omit({ id: true, cpf: true }).strict();

export type UpdatePacienteDTO = z.infer<typeof updatePacienteDTOScheme>;