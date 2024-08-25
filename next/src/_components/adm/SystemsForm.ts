import { z } from "zod";

export const formSchema = z.object({
  nome: z.string({
    required_error: "Nome é obrigatório",
  }),
});
