import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
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
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Edit, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../CustomInput";
import { CustomMaskedInput } from "../CustomMaskedInput";
import { CustomForm } from "../form/Form";
import { usersFormSchema } from "../FormSchemas";
import { GetCEPInfo } from "../GetCEPInfo";
import { GetCNPJInfo } from "../GetCNPJInfo";
import { CustomDialog } from "./Dialogs/CustomDialog/CustomDialog";
import DeleteDialog from "./Dialogs/DeleteDialog";
import UpdateDialog from "./Dialogs/UpdateDialog";
import VisualizeDialog from "./Dialogs/VisualizeDialog";

export type Users = {
  cod_pes?: string;
  nome?: string;
  razao?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  uf?: string;
  ie?: string;
  contato?: string;
  sistema?: string;
  serial?: string;
  obs?: string;
  ven_cert?: string;
  email?: string;
  situacao?: string;
  tef?: string;
  nfe?: string;
  sped?: string;
  contador?: string;
  email_backup?: string;
  senha_backup?: string;
  tipo?: string;
};

const columnsSelected = [
  "cod_pes",
  "nome",
  "razao",
  "logradouro",
  "numero",
  "bairro",
  "cidade",
  "cep",
  "uf",
  "ie",
  "contato",
  "sistema",
  "serial",
  "obs",
  "ven_cert",
  "email",
  "situacao",
  "tef",
  "nfe",
  "sped",
  "contador",
  "email_backup",
  "senha_backup",
  "tipo",
  "senha",
  "ações",
];

export const columnsSchema: ColumnDef<Users>[] = columnsSelected.map(
  (element) => {
    if (element == "cod_pes") {
      return {
        accessorKey: element,
        header: ({ column }: any) => (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775"
          >
            <Button
              variant={"ghost"}
              className="flex w-full cursor-pointer flex-row items-center justify-center text-lg text-neutral-100 hover:bg-transparent hover:text-neutral-100"
            >
              <span className="capitalize">{column.id}</span>
              {column.getIsSorted() == "asc" ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        ),
        cell: ({ cell }: any) => (
          <div className="h-full bg-zinc-750 p-5 text-lg text-neutral-100">
            {cell.getValue()}
          </div>
        ),
        enableHiding: false,
      };
    }

    if (element == "senha" || element == "senha_backup") {
      return {
        accessorKey: element,
        header: ({ column }: any) => (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775"
          >
            <Button
              variant={"ghost"}
              className="flex w-full cursor-pointer flex-row items-center justify-center text-lg text-neutral-100 hover:bg-transparent hover:text-neutral-100"
            >
              <span className="capitalize">{column.id}</span>
              {column.getIsSorted() == "asc" ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        ),
        cell: ({ cell }: any) => (
          <div className="h-full bg-zinc-750 p-5 text-lg text-neutral-100">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {cell.getValue() ? "********" : ""}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none bg-neutral-600 shadow">
                <DropdownMenuItem
                  className="cursor-pointer capitalize text-neutral-100"
                  onClick={() => navigator.clipboard.writeText(cell.getValue())}
                >
                  Copiar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      };
    }

    if (element == "ações") {
      return {
        accessorKey: element,
        header: ({ column }: any) => (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex h-full w-full min-w-96 items-center justify-center bg-zinc-775"
          >
            <span className="text-lg capitalize text-neutral-100">
              {column.id}
            </span>
          </div>
        ),
        cell: ({ cell }: any) => {
          const user = cell.row.original;

          const [updateOpen, setUpdateOpen] = useState(false);
          const [visuOpen, setVisuOpen] = useState(false);
          const [type, setType] = useState(user.type);

          const form = useForm<z.infer<typeof usersFormSchema>>({
            resolver: zodResolver(usersFormSchema),
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

          const onSubmit = (values: z.infer<typeof usersFormSchema>) => {
            console.log(values);

            setUpdateOpen(false);

            // setTimeout(() => {
            //   setUpdateOpen(false);

            //   return;
            // }, 2000);
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

          return (
            <div className="flex h-full items-center justify-center gap-2 bg-zinc-750 p-4 text-lg text-neutral-100">
              <VisualizeDialog
                dialogOpen={visuOpen}
                setDialogOpen={setVisuOpen}
                contentClassName="max-w-[calc(100vw-20vw)]"
              >
                <div className="flex justify-center">
                  <Select
                    defaultValue="cliente"
                    value={type}
                    onValueChange={setType}
                    disabled
                  >
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
                  <FormGroup className="relative flex flex-row gap-y-2 rounded-md border-2 border-neutral-400 p-4 py-6">
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
                                readOnly
                                text="Nome Fantasia"
                                field={field}
                              />
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
                              <CustomInput
                                readOnly
                                text="Contato"
                                field={field}
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

                                let cnpj = field.value.replaceAll(".", "");
                                cnpj = cnpj.replaceAll("/", "");
                                cnpj = cnpj.replace("-", "");

                                const cnpjInfo = await GetCNPJInfo(cnpj);

                                if (cnpjInfo.status == 200) {
                                  form.setValue("nome", cnpjInfo?.data?.nome);
                                  form.setValue("razao", cnpjInfo?.data?.razao);
                                  form.setValue(
                                    "logradouro",
                                    cnpjInfo?.data?.logradouro,
                                  );
                                  form.setValue(
                                    "numero",
                                    cnpjInfo?.data?.numero,
                                  );
                                  form.setValue(
                                    "bairro",
                                    cnpjInfo?.data?.bairro,
                                  );
                                  form.setValue("uf", cnpjInfo?.data?.uf);
                                  form.setValue("cep", cnpjInfo?.data?.cep);
                                  form.setValue(
                                    "cidade",
                                    cnpjInfo?.data?.municipio,
                                  );
                                }
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
                              <CustomInput
                                readOnly
                                text="Email"
                                field={field}
                              />
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
                              defaultValue={field.value}
                              disabled
                            >
                              <FormControl>
                                <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
                                  <SelectValue placeholder="Selecione o Contador" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                                <SelectItem value="cliente">Cliente</SelectItem>
                                <SelectItem value="contador">
                                  Contador
                                </SelectItem>
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
                              disabled
                            >
                              <FormControl>
                                <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:normal-case placeholder:text-neutral-400">
                                  <SelectValue placeholder="Selecione o Sistema" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                                <SelectItem value="cliente">Cliente</SelectItem>
                                <SelectItem value="contador">
                                  Contador
                                </SelectItem>
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
                                beforeMaskedValueChange={
                                  beforeMaskedValueChangeDate
                                }
                                field={field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="relative flex max-h-24 flex-row flex-nowrap gap-4 rounded-md border-2 border-neutral-400 p-4 py-6">
                    <FormDescription className="absolute -top-4 bg-zinc-750 px-2 text-lg text-neutral-100">
                      Endereço
                    </FormDescription>
                    <CustomForm.Field
                      form={form}
                      name="logradouro"
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <CustomInput
                              readOnly
                              text="Logradouro"
                              field={field}
                            />
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

                              let cep = form.getValues("cep").replace("-", "");

                              const cepInfo = await GetCEPInfo(cep);

                              if (cepInfo.status == 200) {
                                form.setValue(
                                  "logradouro",
                                  cepInfo?.data?.logradouro,
                                );
                                form.setValue("numero", cepInfo?.data?.numero);
                                form.setValue("bairro", cepInfo?.data?.bairro);
                                form.setValue(
                                  "cidade",
                                  cepInfo?.data?.localidade,
                                );
                                form.setValue("uf", cepInfo?.data?.uf);
                              }
                            }}
                          >
                            <Search className="text-neutral-100" />
                          </Button>
                        </div>
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
              <UpdateDialog
                dialogOpen={updateOpen}
                setDialogOpen={setUpdateOpen}
                contentClassName="max-w-[calc(100vw-20vw)]"
              >
                <div className="flex justify-center">
                  <Select
                    defaultValue="cliente"
                    value={type}
                    onValueChange={setType}
                  >
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
                  <FormGroup className="relative flex flex-row gap-y-2 rounded-md border-2 border-neutral-400 p-4 py-6">
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
                              <CustomInput
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
                                <CustomMaskedInput
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

                                let cnpj = field.value.replaceAll(".", "");
                                cnpj = cnpj.replaceAll("/", "");
                                cnpj = cnpj.replace("-", "");

                                const cnpjInfo = await GetCNPJInfo(cnpj);

                                if (cnpjInfo.status == 200) {
                                  form.setValue("nome", cnpjInfo?.data?.nome);
                                  form.setValue("razao", cnpjInfo?.data?.razao);
                                  form.setValue(
                                    "logradouro",
                                    cnpjInfo?.data?.logradouro,
                                  );
                                  form.setValue(
                                    "numero",
                                    cnpjInfo?.data?.numero,
                                  );
                                  form.setValue(
                                    "bairro",
                                    cnpjInfo?.data?.bairro,
                                  );
                                  form.setValue("uf", cnpjInfo?.data?.uf);
                                  form.setValue("cep", cnpjInfo?.data?.cep);
                                  form.setValue(
                                    "cidade",
                                    cnpjInfo?.data?.municipio,
                                  );
                                }
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
                              <CustomInput
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
                              <CustomInput
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
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
                                  <SelectValue placeholder="Selecione o Contador" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
                                <SelectItem value="cliente">Cliente</SelectItem>
                                <SelectItem value="contador">
                                  Contador
                                </SelectItem>
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
                                <SelectItem value="contador">
                                  Contador
                                </SelectItem>
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
                              <CustomMaskedInput
                                text="Vencimento do Certificado"
                                mask="Dd/Mm/9999"
                                maskChar=""
                                formatChars={formatCharsDate}
                                beforeMaskedValueChange={
                                  beforeMaskedValueChangeDate
                                }
                                field={field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="relative flex max-h-24 flex-row flex-nowrap gap-4 rounded-md border-2 border-neutral-400 p-4 py-6">
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
                        <div className="flex flex-row items-center gap-2">
                          <FormItem>
                            <FormControl>
                              <CustomMaskedInput
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

                              let cep = form.getValues("cep").replace("-", "");

                              const cepInfo = await GetCEPInfo(cep);

                              if (cepInfo.status == 200) {
                                form.setValue(
                                  "logradouro",
                                  cepInfo?.data?.logradouro,
                                );
                                form.setValue("numero", cepInfo?.data?.numero);
                                form.setValue("bairro", cepInfo?.data?.bairro);
                                form.setValue(
                                  "cidade",
                                  cepInfo?.data?.localidade,
                                );
                                form.setValue("uf", cepInfo?.data?.uf);
                              }
                            }}
                          >
                            <Search className="text-neutral-100" />
                          </Button>
                        </div>
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
                              className="min-h-44 border-2 border-neutral-400 text-lg text-neutral-100"
                            ></Textarea>
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full flex-row-reverse">
                    <CustomDialog.CustomCloseBtn className="gap-2 text-lg">
                      <Edit />
                      <p>Editar</p>
                    </CustomDialog.CustomCloseBtn>
                  </div>
                </CustomForm.Root>
              </UpdateDialog>
              <DeleteDialog user={user} />
            </div>
          );
        },
        enableSorting: false,
      };
    }

    return {
      accessorKey: element,
      header: ({ column }: any) => (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775"
        >
          <Button
            variant={"ghost"}
            className="flex w-full cursor-pointer flex-row items-center justify-center text-lg text-neutral-100 hover:bg-transparent hover:text-neutral-100"
          >
            <span className="capitalize">{column.id}</span>
            {column.getIsSorted() == "asc" ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      ),
      cell: ({ cell }: any) => (
        <div className="h-full bg-zinc-750 p-5 text-lg text-neutral-100">
          <DropdownMenu>
            <DropdownMenuTrigger>{cell.getValue()}</DropdownMenuTrigger>
            <DropdownMenuContent className="border-none bg-neutral-600 shadow">
              <DropdownMenuItem
                className="cursor-pointer capitalize text-neutral-100"
                onClick={() => navigator.clipboard.writeText(cell.getValue())}
              >
                Copiar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    };
  },
);
