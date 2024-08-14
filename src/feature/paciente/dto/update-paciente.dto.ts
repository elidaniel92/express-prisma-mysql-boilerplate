import { z } from "zod";
import { pacienteSchema } from "../pacientes.entity";

export const updatePacienteDTOScheme = pacienteSchema.omit({ id: true, cpf: true }).strict();

export type UpdatePacienteDTO = z.infer<typeof updatePacienteDTOScheme>;