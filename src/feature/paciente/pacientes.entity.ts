import { z } from 'zod';

export const pacienteSchema = z.object({
    id: z.number(),
    nome: z.string(),
    dataNascimento: z.coerce.date(),
    cpf: z.string(),
    telefone: z.string(),
    email: z.string().email(),
    endereco: z.string(),
    contatoEmergencia: z.string(),
    telefoneEmergencia: z.string(),
    cadastro: z.string(),
});

export type Paciente = z.infer<typeof pacienteSchema>;