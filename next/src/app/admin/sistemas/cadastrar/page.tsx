"use client";

import { CustomInput } from "@/_components/adm/CustomInput";
import { CustomForm } from "@/_components/adm/form/Form";
import { formSchema } from "@/_components/adm/FormSchemas";
import { Section } from "@/_components/adm/section/Section";
import { FormItem } from "@/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function Cadastrar({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
        <CustomForm.SubmitBtn icon={<FilePlus />}>
          Cadastrar
        </CustomForm.SubmitBtn>
      </CustomForm.Root>
    </Section.Root>
  );
}
