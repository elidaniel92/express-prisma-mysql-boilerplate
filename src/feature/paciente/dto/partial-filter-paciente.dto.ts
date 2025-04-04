import { z } from "zod";
import { pacienteSchema } from "../pacientes.entity";

export const partialFilterPacienteDTOScheme = pacienteSchema.omit({ id: true }).strict();

export type PartialFilterPacienteDTO = z.infer<typeof partialFilterPacienteDTOScheme>;