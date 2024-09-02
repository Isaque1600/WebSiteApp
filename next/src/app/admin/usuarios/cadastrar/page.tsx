"use client";

import { CustomInput } from "@/_components/adm/CustomInput";
import { CustomForm } from "@/_components/adm/form/Form";
import { GetCNPJInfo } from "@/_components/adm/GetCNPJInfo";
import { Section } from "@/_components/adm/section/Section";
import { Button } from "@/_components/ui/button";
import { FormControl, FormDescription, FormItem } from "@/_components/ui/form";
import { Label } from "@/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { Switch } from "@/_components/ui/switch";
import { Textarea } from "@/_components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormGroup } from "@mui/material";
import { Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function Cadastrar({}: Props) {
  const [type, setType] = useState("cliente");

  useEffect(() => {
    return () => {};
  }, []);

  const formSchema = z.object({
    nome: z.string(),
    razao: z.string().min(1, "Razão social obrigatória"),
    logradouro: z.string(),
    numero: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    cep: z.string(),
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
    senha: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      razao: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      cep: "",
      uf: "",
      cnpj: "",
      ie: "",
      contato: "",
      sistema: "",
      serial: "",
      obs: "",
      ven_cert: "",
      email: "",
      email_backup: "",
      senha_backup: "",
      tipo: "",
      senha: "",
      situacao: true,
      nfe: false,
      tef: false,
      sped: false,
      contador: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Section.Root className="space-y-6">
      <Section.Title>Cadastrar Usuário</Section.Title>
      <div className="flex justify-center">
        <Select defaultValue="cliente" value={type} onValueChange={setType}>
          <SelectTrigger className="w-32 border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
            <SelectItem value="cliente">Cliente</SelectItem>
            <SelectItem value="contador">Contador</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <CustomForm.Root
          form={form}
          onSubmit={onSubmit}
          formClassName="space-y-10"
        >
          <FormGroup className="relative flex flex-row gap-y-2 rounded-md border-2 border-neutral-400 p-4 py-6">
            <FormDescription className="absolute -top-4 bg-neutral-700 px-2 text-lg text-neutral-100">
              Dados do Cliente
            </FormDescription>
            <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
              <CustomForm.Field
                form={form}
                name="nome"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput text="Nome Fantasia" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="razao"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput text="Razão" field={field} required={true} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="contato"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput text="Contato" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="cnpj"
                render={({ field }) => (
                  <div className="flex flex-row items-center gap-2">
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput text="CNPJ" field={field} />
                      </FormControl>
                    </FormItem>
                    <Button
                      variant={"ghost"}
                      className="cursor-pointer hover:bg-neutral-500 hover:text-neutral-100"
                      size={"icon"}
                      aria-label="Pesquisar CNPJ"
                      title="Pesquisar CNPJ"
                      onClick={(e) => {
                        e.preventDefault();

                        let cnpj = field.value.replaceAll(".", "");
                        cnpj = cnpj.replaceAll("/", "");
                        cnpj = cnpj.replace("-", "");

                        console.log(GetCNPJInfo(cnpj));
                      }}
                    >
                      <Search className="text-neutral-100" />
                    </Button>
                  </div>
                )}
              />
            </div>
          </FormGroup>

          <FormGroup className="relative flex flex-row gap-y-4 rounded-md border-2 border-neutral-400 p-4 py-6 transition duration-100 ease-in-out">
            <FormDescription className="absolute -top-4 bg-neutral-700 px-2 text-lg text-neutral-100">
              Cadastro
            </FormDescription>
            <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
              <CustomForm.Field
                form={form}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput text="Email" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="email_backup"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput text="Email de Backup" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="senha"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput
                        text="Senha"
                        field={field}
                        required={type == "contador"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="senha_backup"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput text="Senha de Backup" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
              <CustomForm.Field
                form={form}
                name="contador"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
                          <SelectValue placeholder="Selecione o Contador" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="contador">Contador</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="sistema"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:normal-case placeholder:text-neutral-400">
                          <SelectValue placeholder="Selecione o Sistema" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="contador">Contador</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid-flow-cols grid w-full grid-cols-5">
              <CustomForm.Field
                form={form}
                name="situacao"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center justify-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className=""
                          id={field.name}
                        />
                      </FormControl>
                      <Label
                        htmlFor={field.name}
                        className="cursor-pointer text-lg text-neutral-100"
                      >
                        Ativo
                      </Label>
                    </div>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="tef"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center justify-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className=""
                          id={field.name}
                        />
                      </FormControl>
                      <Label
                        htmlFor={field.name}
                        className="cursor-pointer text-lg text-neutral-100"
                      >
                        TEF
                      </Label>
                    </div>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="sped"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center justify-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className=""
                          id={field.name}
                        />
                      </FormControl>
                      <Label
                        htmlFor={field.name}
                        className="cursor-pointer text-lg text-neutral-100"
                      >
                        SPED
                      </Label>
                    </div>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="nfe"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center justify-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className=""
                          id={field.name}
                        />
                      </FormControl>
                      <Label
                        htmlFor={field.name}
                        className="cursor-pointer text-lg text-neutral-100"
                      >
                        NFE
                      </Label>
                    </div>
                  </FormItem>
                )}
              />
              <CustomForm.Field
                form={form}
                name="ven_cert"
                render={({ field }) => (
                  <FormItem
                    className={`w-full ${form.watch("sped").valueOf() || form.watch("nfe").valueOf() ? "" : "opacity-0"} transition duration-300 ease-in`}
                  >
                    <FormControl>
                      <CustomInput
                        text="Vencimento de Certificado"
                        field={field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </FormGroup>

          <FormGroup className="relative flex flex-row gap-4 rounded-md border-2 border-neutral-400 p-4 py-6">
            <FormDescription className="absolute -top-4 bg-neutral-700 px-2 text-lg text-neutral-100">
              Endereço
            </FormDescription>
            <CustomForm.Field
              form={form}
              name="logradouro"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <CustomInput text="Logradouro" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomForm.Field
              form={form}
              name="numero"
              render={({ field }) => (
                <FormItem className="max-w-20">
                  <FormControl>
                    <CustomInput text="Número" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomForm.Field
              form={form}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput text="Bairro" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomForm.Field
              form={form}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput text="Cidade" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomForm.Field
              form={form}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput text="CEP" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomForm.Field
              form={form}
              name="uf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      text="UF"
                      className="uppercase"
                      field={field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <CustomForm.Field
            form={form}
            name="obs"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Label className="absolute -top-4 left-5 bg-neutral-700 px-2 text-lg text-neutral-100">
                    Observação
                  </Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="border-2 border-neutral-400 text-lg text-neutral-100"
                    ></Textarea>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <CustomForm.SubmitBtn icon={<UserPlus />}>
            Cadastrar
          </CustomForm.SubmitBtn>
        </CustomForm.Root>
      </div>
    </Section.Root>
  );
}
