import { z } from "zod";

export const systemFormSchema = z.object({
  nome: z.string({
    required_error: "Nome é obrigatório",
  }),
});

export const usersFormSchema = z
  .object({
    nome: z.string(),
    razao: z.string().min(1, "Razão social obrigatória"),
    logradouro: z.string(),
    numero: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    cep: z.string().refine(
      (val) => {
        if (val === "") return true;
        if (val.trim() !== "" && val.replace("-", "").length === 8) return true;
        return false;
      },
      { message: "CEP inválido" },
    ),
    uf: z.string(),
    cnpj: z.string(),
    ie: z.string(),
    contato: z.string(),
    sistema: z.string(),
    serial: z.string(),
    obs: z.string(),
    ven_cert: z.string(),
    email: z.string(),
    situacao: z.boolean(),
    tef: z.boolean(),
    nfe: z.boolean(),
    sped: z.boolean(),
    contador: z.string(),
    email_backup: z.string(),
    senha_backup: z.string(),
    tipo: z.string(),
    senha: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.tipo === "contador") {
        return data.senha && data.senha.length > 0 && data.senha.trim() !== "";
      }
      return true;
    },
    {
      message: "Senha é obrigatória para contadores",
      path: ["senha"],
    },
  )
  .refine(
    (data) => {
      if (data.tipo === "contador") {
        return data.nome && data.nome.length > 0 && data.nome.trim() !== "";
      }
      return true;
    },
    {
      message: "Nome Fantasia é obrigatório para contadores",
      path: ["nome"],
    },
  );
