import { CustomInput } from "@/_components/adm/CustomInput";
import { CustomMaskedInput } from "@/_components/adm/CustomMaskedInput";
import { CustomForm } from "@/_components/adm/form/Form";
import { usersFormSchema } from "@/_components/adm/FormSchemas";
import { GetCEPInfo } from "@/_components/adm/GetCEPInfo";
import { GetCNPJInfo } from "@/_components/adm/GetCNPJInfo";
import { Button } from "@/_components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
import { Label } from "@/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { Skeleton } from "@/_components/ui/skeleton";
import { Switch } from "@/_components/ui/switch";
import { Textarea } from "@/_components/ui/textarea";
import { usePerson } from "@/hooks/Person/usePerson";
import { useSystem } from "@/hooks/Systems/useSystem";
import { Person, PersonFormData } from "@/types/Person";
import { System } from "@/types/System";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Edit, FileX, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CustomDialog } from "../CustomDialog/CustomDialog";
import UpdateDialog from "../UpdateDialog";

type Props = {
  user: Person;
};

export default function UsersUpdateDialog({ user }: Props) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [type, _setType] = useState(user.tipo);

  const { get: getSys } = useSystem();
  const {
    data: sysData,
    isLoading: isSysLoading,
    isError: isSysError,
    error: sysError,
  } = getSys();

  const { get: getAcc, getById, update } = usePerson();

  const {
    data: accData,
    isLoading: isAccLoading,
    isError: isAccError,
    error: accError,
  } = getAcc({ type: "contador", status: "ativo" });
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = getById(String(user?.cod_pes), { enabled: updateOpen });

  const {
    mutate: updateUser,
    isPending,
    isSuccess,
    isError: isUpdateError,
    error: updateError,
  } = update;

  useEffect(() => {
    if (isSuccess) {
      setUpdateOpen(false);
    }

    if (isUpdateError) {
      setUpdateOpen(false);
    }
  }, [isSuccess, isUpdateError]);

  const setType = (value: string) => {
    _setType(value as "cliente" | "contador");

    form.setValue("tipo", value);
  };

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

  useEffect(() => {
    if (updateOpen && !isLoading && userData) {
      form.reset({
        nome: userData.data.nome || "",
        razao: userData.data.razao || "",
        logradouro: userData.data.logradouro || "",
        numero: userData.data.numero || "",
        bairro: userData.data.bairro || "",
        cidade: userData.data.cidade || "",
        cep: userData.data.cep || "",
        uf: userData.data.uf || "",
        cnpj: userData.data.cnpj || "",
        ie: userData.data.ie || "",
        contato: userData.data.contato || "",
        sistema: userData.data.sistema || "",
        serial: userData.data.serial || "",
        obs: userData.data.obs || "",
        ven_cert: userData.data.ven_cert || "",
        email: userData.data.email || "",
        email_backup: userData.data.email_backup || "",
        senha_backup: userData.data.senha_backup || "",
        tipo: userData.data.tipo || "",
        senha: userData.data.senha || "",
        situacao: userData.data.situacao == "ativo" ? true : false,
        nfe: userData.data.nfe == "sim" ? true : false,
        tef: userData.data.tef == "sim" ? true : false,
        sped: userData.data.sped == "sim" ? true : false,
        contador: userData.data.contador || "",
      });
      _setType(userData.data.tipo);
    }
  }, [updateOpen, isLoading, userData]);

  const onSubmit = async ({
    sped,
    tef,
    nfe,
    situacao,
    tipo,
    uf,
    ...values
  }: z.infer<typeof usersFormSchema>) => {
    const payload: Partial<PersonFormData> = {
      ...values,
      situacao: situacao ? "ativo" : "inativo",
      tef: tef ? "sim" : "nao",
      nfe: nfe ? "sim" : "nao",
      sped: sped ? "sim" : "nao",
      tipo: tipo as "cliente" | "contador",
      uf: uf.toUpperCase(),
    };

    try {
      updateUser({
        id: String(user.cod_pes),
        currentType: String(user.tipo),
        data: payload,
      });
    } catch (error) {
      console.error("Error in mutation call:", error);
      // Even though we're using mutate instead of mutateAsync,
      // we add this catch as an extra safety net
    }
  };

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
      <UpdateDialog dialogOpen={updateOpen} setDialogOpen={setUpdateOpen}>
        <div className="flex flex-col justify-center text-red-550">
          <FileX className="mb-4 h-16 w-16 self-center" />
          <p className="text-center text-lg font-medium">
            Erro ao carregar os dados, tente novamente mais tarde.
          </p>
        </div>
      </UpdateDialog>
    );
  }

  if (isLoading || isAccLoading || isSysLoading) {
    return (
      <UpdateDialog
        dialogOpen={updateOpen}
        setDialogOpen={setUpdateOpen}
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
        <div className="flex w-full flex-row-reverse">
          <Skeleton className="h-10 w-32" />
        </div>
      </UpdateDialog>
    );
  }

  return (
    <UpdateDialog
      dialogOpen={updateOpen}
      setDialogOpen={setUpdateOpen}
      contentClassName="max-w-[calc(100vw-20vw)]"
    >
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
      <CustomForm.Root
        form={form}
        onSubmit={onSubmit}
        wrapperClassName="w-full"
      >
        <div className="relative flex flex-col flex-wrap gap-y-2 rounded-md border-2 border-neutral-400 p-4 py-6">
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
                    <CustomInput
                      text="Nome Fantasia"
                      field={field}
                      required={user.tipo === "contador"}
                      isError={
                        type === "contador" && !!form.formState.errors.nome
                      }
                    />
                  </FormControl>
                  <FormMessage />
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
                      text="Razão"
                      field={field}
                      required={true}
                      isError={!!form.formState.errors.razao}
                    />
                  </FormControl>
                  <FormMessage />
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
                <FormItem className="w-full">
                  <div className="flex flex-row items-center gap-2">
                    <FormControl>
                      <CustomMaskedInput
                        text="CNPJ"
                        field={field}
                        mask="99.999.999/9999-99"
                        maskChar={""}
                        isError={!!form.formState.errors.cnpj}
                      />
                    </FormControl>
                    <Button
                      variant={"ghost"}
                      className="cursor-pointer hover:bg-neutral-500 hover:text-neutral-100"
                      size={"icon"}
                      aria-label="Pesquisar CNPJ"
                      title="Pesquisar CNPJ"
                      onClick={async (e) => {
                        e.preventDefault();

                        const cnpjSchema = z
                          .string()
                          .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
                            message: "CNPJ inválido",
                          });

                        const parsedCNPJ = cnpjSchema.safeParse(field.value);

                        if (!parsedCNPJ.success) {
                          form.setError("cnpj", {
                            type: "manual",
                            message: parsedCNPJ.error.errors[0].message,
                          });
                          return;
                        } else {
                          form.clearErrors("cnpj");
                        }

                        let cnpj = field.value.replaceAll(".", "");
                        cnpj = cnpj.replaceAll("/", "");
                        cnpj = cnpj.replace("-", "");

                        try {
                          const cnpjInfo = await GetCNPJInfo(cnpj);

                          if (cnpjInfo.status == 200) {
                            form.clearErrors("cnpj");
                            form.setValue("nome", cnpjInfo?.data?.nome);
                            form.setValue("razao", cnpjInfo?.data?.razao);
                            form.setValue(
                              "logradouro",
                              cnpjInfo?.data?.logradouro,
                            );
                            form.setValue("numero", cnpjInfo?.data?.numero);
                            form.setValue("bairro", cnpjInfo?.data?.bairro);
                            form.setValue("uf", cnpjInfo?.data?.uf);
                            form.setValue("cep", cnpjInfo?.data?.cep);
                            form.setValue("cidade", cnpjInfo?.data?.municipio);
                          }
                        } catch (error) {
                          if (error instanceof AxiosError) {
                            if (
                              error.response?.data?.error === "CNPJ not found"
                            ) {
                              form.setError("cnpj", {
                                type: "manual",
                                message: "CNPJ não encontrado",
                              });
                            }
                          }
                        }
                      }}
                    >
                      <Search className="text-neutral-100" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
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
                      isError={
                        type === "contador" && !!form.formState.errors.senha
                      }
                    />
                  </FormControl>
                  <FormMessage />
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
                  {isAccLoading ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
                          <SelectValue placeholder="Selecione o Contador" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                        {accData.data.map((acc: Person) => (
                          <SelectItem
                            key={acc.cod_pes}
                            value={String(acc.nome)}
                          >
                            {acc.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {isAccError && accError && (
                    <FormMessage className="text-red-500">
                      {"Erro ao carregar contadores"}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <CustomForm.Field
              form={form}
              name="sistema"
              render={({ field }) => (
                <FormItem className="w-full">
                  {isSysLoading ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:normal-case placeholder:text-neutral-400">
                          <SelectValue placeholder="Selecione o Sistema" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                        {sysData.data.map((sys: System) => (
                          <SelectItem key={sys.id} value={String(sys.nome)}>
                            {sys.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {isSysError && sysError && (
                    <FormMessage className="text-red-500">
                      {"Erro ao carregar sistemas"}
                    </FormMessage>
                  )}
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
                    <CustomMaskedInput
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

        <div className="relative flex flex-row flex-wrap gap-4 rounded-md border-2 border-neutral-400 p-4 py-6">
          <FormDescription className="absolute -top-4 bg-zinc-750 px-2 text-lg text-neutral-100">
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
              <FormItem className="flex-grow">
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
            name="uf"
            render={({ field }) => (
              <FormItem className="max-w-20">
                <FormControl>
                  <CustomMaskedInput
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
              <FormItem>
                <div className="flex flex-row items-center gap-2">
                  <FormControl>
                    <CustomMaskedInput
                      text="CEP"
                      field={field}
                      mask="99999-999"
                      maskChar=""
                      isError={!!form.formState.errors.cep}
                    />
                  </FormControl>
                  <Button
                    variant={"ghost"}
                    className="cursor-pointer hover:bg-neutral-500 hover:text-neutral-100"
                    size={"icon"}
                    aria-label="Pesquisar CEP"
                    title="Pesquisar CEP"
                    onClick={async (e) => {
                      e.preventDefault();

                      try {
                        let cep = form.getValues("cep").replace("-", "");

                        const cepInfo = await GetCEPInfo(cep);

                        if (cepInfo.status == 200) {
                          form.clearErrors("cep");
                          form.setValue(
                            "logradouro",
                            cepInfo?.data?.logradouro,
                          );
                          form.setValue("numero", cepInfo?.data?.numero);
                          form.setValue("bairro", cepInfo?.data?.bairro);
                          form.setValue("cidade", cepInfo?.data?.localidade);
                          form.setValue("uf", cepInfo?.data?.uf);
                        }
                      } catch (error) {
                        if (error instanceof AxiosError) {
                          if (error.response?.data?.error) {
                            form.setError("cep", {
                              type: "manual",
                              message: "CEP não encontrado",
                            });
                          } else {
                            form.setError("cep", {
                              type: "manual",
                              message:
                                "Um erro inesperado ocorreu! Tente novamente",
                            });
                          }
                        }
                      }
                    }}
                  >
                    <Search className="text-neutral-100" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                    className="min-h-32 border-2 border-neutral-400 text-lg text-neutral-100"
                  ></Textarea>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <div className="flex w-full flex-row-reverse">
          <CustomDialog.CustomCloseBtn
            className="gap-2 text-lg"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Edit />
                <p>Editar</p>
              </>
            )}
          </CustomDialog.CustomCloseBtn>
        </div>
      </CustomForm.Root>
    </UpdateDialog>
  );
}
