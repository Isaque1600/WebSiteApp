import { CustomInput } from "@/_components/adm/CustomInput";
import { CustomMaskedInput } from "@/_components/adm/CustomMaskedInput";
import { CustomForm } from "@/_components/adm/form/Form";
import { usersFormSchema } from "@/_components/adm/FormSchemas";
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
import { usePerson } from "@/hooks/Person/usePerson";
import { Person } from "@/types/Person";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@mui/material";
import { FileX, Search } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import VisualizeDialog from "../VisualizeDialog";

type Props = {
  user: Person;
};

export default function UserVisualizeDialog({ user }: Props) {
  const [visuOpen, setVisuOpen] = React.useState(false);

  const { getById } = usePerson();
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = getById(String(user.cod_pes!), { enabled: visuOpen });

  useEffect(() => {
    if (!isLoading && !isError && userData) {
      user = userData;
    }
  }, [isLoading, isError, userData]);

  const form = useForm<z.infer<typeof usersFormSchema>>({
    resolver: zodResolver(usersFormSchema),
    defaultValues: {
      nome: user.nome || "",
      razao: user.razao || "",
      logradouro: user.logradouro || "",
      numero: user.numero || "",
      bairro: user.bairro || "",
      cidade: user.cidade || "",
      cep: user.cep || "",
      uf: user.uf || "",
      cnpj: user.cnpj || "",
      ie: user.ie || "",
      contato: user.contato || "",
      sistema: user.sistema || "",
      serial: user.serial || "",
      obs: user.obs || "",
      ven_cert: user.ven_cert || "",
      email: user.email || "",
      email_backup: user.email_backup || "",
      senha_backup: user.senha_backup || "",
      tipo: user.tipo || "",
      senha: user.senha || "",
      situacao: user.situacao == "ativo" ? true : false,
      nfe: user.nfe == "sim" ? true : false,
      tef: user.tef == "sim" ? true : false,
      sped: user.sped == "sim" ? true : false,
      contador: user.contador || "",
    },
  });

  const onSubmit = () => {};

  let formatCharsDate = {
    D: "[0-3]",
    d: "[0-9]",
    m: "[0-9]",
    M: "[01]",
    9: "[0-9]",
  };

  const beforeMaskedValueChangeDate = (
    newState: {
      value: string;
      selection: { start: number; end: number } | null;
    },
    oldState: {
      value: string;
      selection: { start: number; end: number } | null;
    },
    userInput: string,
  ) => {
    let { value } = newState;
    const selection = newState.selection;
    const cursorPosition = selection ? selection.start : null;

    if (value.startsWith("0")) {
      formatCharsDate["d"] = "[1-9]";
    }

    if (value.endsWith("0")) {
      formatCharsDate["m"] = "[1-9]";
    }

    if (value.startsWith("3")) {
      formatCharsDate["d"] = "[01]";
    }

    if (value.endsWith("1")) {
      formatCharsDate["m"] = "[012]";
    }

    if (value[0] >= "3" && value[1] >= "0") {
      formatCharsDate["m"] = "[012456789]";
      if (value[3] == "0") {
        formatCharsDate["m"] = "[12456789]";
      }
    }

    return { value, selection: newState.selection };
  };

  if (isError && error) {
    return (
      <VisualizeDialog dialogOpen={visuOpen} setDialogOpen={setVisuOpen}>
        <div className="flex flex-col justify-center text-red-550">
          <FileX className="mb-4 h-16 w-16 self-center" />
          <p className="text-center text-lg font-medium">
            Erro ao carregar os dados, tente novamente mais tarde.
          </p>
        </div>
      </VisualizeDialog>
    );
  }

  if (isLoading) {
    return (
      <VisualizeDialog
        dialogOpen={visuOpen}
        setDialogOpen={setVisuOpen}
        contentClassName="max-w-[calc(100vw-20vw)]"
      >
        <div className="flex justify-center">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex flex-row gap-y-2 rounded-md border-2 border-neutral-400 p-4 py-6">
            <Skeleton className="absolute -top-4 h-6 w-32 bg-zinc-750" />
            <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <div className="flex flex-row items-center gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col flex-wrap gap-y-4 rounded-md border-2 border-neutral-400 p-4 py-6">
            <Skeleton className="absolute -top-4 h-6 w-24 bg-zinc-750" />
            <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid w-full grid-flow-col grid-cols-5">
              <Skeleton className="mx-auto h-6 w-20" />
              <Skeleton className="mx-auto h-6 w-20" />
              <Skeleton className="mx-auto h-6 w-20" />
              <Skeleton className="mx-auto h-6 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="relative flex max-h-36 flex-row flex-wrap gap-4 rounded-md border-2 border-neutral-400 p-4 py-6">
            <Skeleton className="absolute -top-4 h-6 w-24 bg-zinc-750" />
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-20" />
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="relative">
            <Skeleton className="absolute -top-4 left-5 h-6 w-28 bg-zinc-750" />
            <Skeleton className="min-h-44 w-full rounded-md" />
          </div>
        </div>
      </VisualizeDialog>
    );
  }

  return (
    <VisualizeDialog
      dialogOpen={visuOpen}
      setDialogOpen={setVisuOpen}
      contentClassName="max-w-[calc(100vw-20vw)]"
    >
      <div className="flex justify-center">
        <Select defaultValue="cliente" value={user.tipo} disabled>
          <SelectTrigger className="w-32 border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
            <SelectItem value="cliente">Cliente</SelectItem>
            <SelectItem value="contador">Contador</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CustomForm.Root
        form={form}
        onSubmit={onSubmit}
        wrapperClassName="w-full"
      >
        <div className="relative flex flex-row gap-y-2 rounded-md border-2 border-neutral-400 p-4 py-6">
          <FormDescription className="absolute -top-4 bg-zinc-750 px-2 text-lg text-neutral-100">
            Dados do Cliente
          </FormDescription>
          <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
            <CustomForm.Field
              form={form}
              name="nome"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInput readOnly text="Nome Fantasia" field={field} />
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
                    <CustomInput
                      readOnly
                      text="Razão"
                      field={field}
                      required={true}
                    />
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
                    <CustomInput readOnly text="Contato" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomForm.Field
              form={form}
              name="ie"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomMaskedInput
                      text="IE"
                      field={field}
                      mask="99999999-9"
                      maskChar={""}
                    />
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
                      <CustomMaskedInput
                        readOnly
                        text="CNPJ"
                        field={field}
                        mask="99.999.999/9999-99"
                        maskChar={""}
                      />
                    </FormControl>
                  </FormItem>
                  <Button
                    variant={"ghost"}
                    className="cursor-pointer hover:bg-neutral-500 hover:text-neutral-100"
                    size={"icon"}
                    aria-label="Pesquisar CNPJ"
                    title="Pesquisar CNPJ"
                    onClick={async (e) => {
                      e.preventDefault();
                    }}
                    disabled
                  >
                    <Search className="text-neutral-100" />
                  </Button>
                </div>
              )}
            />
          </div>
        </div>

        <div className="relative flex flex-col flex-wrap gap-y-4 rounded-md border-2 border-neutral-400 p-4 py-6 transition duration-100 ease-in-out">
          <FormDescription className="absolute -top-4 bg-zinc-750 px-2 text-lg text-neutral-100">
            Cadastro
          </FormDescription>
          <div className="grid w-full grid-flow-col grid-cols-4 gap-4">
            <CustomForm.Field
              form={form}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInput readOnly text="Email" field={field} />
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
                    <CustomInput
                      readOnly
                      text="Email de Backup"
                      field={field}
                    />
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
                      readOnly
                      text="Senha"
                      field={field}
                      required={user.tipo == "contador"}
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
                    <CustomInput
                      readOnly
                      text="Senha de Backup"
                      field={field}
                    />
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
                    defaultValue={"default"}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
                        <SelectValue placeholder="Selecione o Contador" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                      <SelectItem value="default">{user.contador}</SelectItem>
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
                    defaultValue={"default"}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:normal-case placeholder:text-neutral-400">
                        <SelectValue placeholder="Selecione o Sistema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                      <SelectItem value="default">{user.sistema}</SelectItem>
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                    <CustomMaskedInput
                      readOnly
                      text="Vencimento do Certificado"
                      mask="Dd/Mm/9999"
                      maskChar=""
                      formatChars={formatCharsDate}
                      beforeMaskedValueChange={beforeMaskedValueChangeDate}
                      field={field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="relative flex max-h-36 flex-row flex-wrap gap-4 rounded-md border-2 border-neutral-400 p-4 py-6">
          <FormDescription className="absolute -top-4 bg-zinc-750 px-2 text-lg text-neutral-100">
            Endereço
          </FormDescription>
          <CustomForm.Field
            form={form}
            name="logradouro"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <CustomInput readOnly text="Logradouro" field={field} />
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
                  <CustomInput readOnly text="Número" field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <CustomForm.Field
            form={form}
            name="bairro"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <CustomInput readOnly text="Bairro" field={field} />
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
                  <CustomInput readOnly text="Cidade" field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <CustomForm.Field
            form={form}
            name="uf"
            render={({ field }) => (
              <FormItem className="max-w-20">
                <FormControl>
                  <CustomMaskedInput
                    readOnly
                    text="UF"
                    field={field}
                    mask="aa"
                    maskChar=""
                    className="uppercase"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <CustomForm.Field
            form={form}
            name="cep"
            render={({ field }) => (
              <div className="flex flex-row items-center gap-2">
                <FormItem>
                  <FormControl>
                    <CustomMaskedInput
                      readOnly
                      text="CEP"
                      field={field}
                      mask="99999-999"
                      maskChar=""
                    />
                  </FormControl>
                </FormItem>
                <Button
                  variant={"ghost"}
                  className="cursor-pointer hover:bg-neutral-500 hover:text-neutral-100"
                  size={"icon"}
                  aria-label="Pesquisar CEP"
                  title="Pesquisar CEP"
                  onClick={async (e) => {
                    e.preventDefault();
                  }}
                  disabled
                >
                  <Search className="text-neutral-100" />
                </Button>
              </div>
            )}
          />
        </div>
        <CustomForm.Field
          form={form}
          name="obs"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Label className="absolute -top-4 left-5 bg-zinc-750 px-2 text-lg text-neutral-100">
                  Observação
                </Label>
                <FormControl>
                  <Textarea
                    readOnly
                    {...field}
                    className="min-h-44 border-2 border-neutral-400 text-lg text-neutral-100"
                  ></Textarea>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </CustomForm.Root>
    </VisualizeDialog>
  );
}
