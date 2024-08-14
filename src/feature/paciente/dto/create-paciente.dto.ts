import { z } from "zod";
import { pacienteSchema } from "../paciente.entity";

export const createPacienteDTOScheme = pacienteSchema.omit({ id: true }).strict();

export type CreatePacienteDTO = z.infer<typeof createPacienteDTOScheme>;