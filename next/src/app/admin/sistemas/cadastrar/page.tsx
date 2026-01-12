"use client";

import { CustomInput } from "@/_components/adm/CustomInput";
import { CustomForm } from "@/_components/adm/form/Form";
import { systemFormSchema as formSchema } from "@/_components/adm/FormSchemas";
import { Section } from "@/_components/adm/section/Section";
import { FormItem } from "@/_components/ui/form";
import { useSystem } from "@/hooks/Systems/useSystem";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function Cadastrar({}: Props) {
  const { create } = useSystem();
  const { mutateAsync: createSystem, isPending, isSuccess } = create();

  useEffect(() => {
    if (isSuccess) {
      redirect("/admin/sistemas");
    }
  }, [isSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createSystem(values);
  };

  return (
    <Section.Root>
      <CustomForm.Root form={form} onSubmit={onSubmit}>
        <CustomForm.Field
          form={form}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <CustomInput text="Nome" field={field} required={true} />
            </FormItem>
          )}
        />
        <CustomForm.SubmitBtn
          icon={isPending ? <Loader2 className="animate-spin" /> : <FilePlus />}
          disabled={isPending}
        >
          {isPending ? "" : "Cadastrar"}
        </CustomForm.SubmitBtn>
      </CustomForm.Root>
    </Section.Root>
  );
}
