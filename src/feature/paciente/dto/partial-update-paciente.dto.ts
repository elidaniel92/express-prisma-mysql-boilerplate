import { z } from "zod";
import { updatePacienteDTOScheme } from "./update-paciente.dto";

export const partialUpdatePacienteDTOScheme = updatePacienteDTOScheme.partial().strict();

export type PartialUpdatePacienteDTO = z.infer<typeof partialUpdatePacienteDTOScheme>;