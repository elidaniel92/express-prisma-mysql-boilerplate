import { z } from "zod";
import { pacienteSchema } from "../paciente.entity";

export const partialFilterPacienteDTOScheme = pacienteSchema.omit({ id: true }).strict();

export type PartialFilterPacienteDTO = z.infer<typeof partialFilterPacienteDTOScheme>;