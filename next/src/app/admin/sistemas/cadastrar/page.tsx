"use client";

import CustomInput from "@/_components/adm/CustomInput";
import { Section } from "@/_components/adm/section/Section";
import SubmitBtn from "@/_components/adm/SubmitBtn";
import { Form, FormField, FormItem } from "@/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function Cadastrar({}: Props) {
  const formSchema = z.object({
    nome: z.string({
      required_error: "Nome é obrigatório",
    }),
  });

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
      <div className="flex w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <CustomInput text="Nome" field={field} required={true} />
                </FormItem>
              )}
            />
            <SubmitBtn icon={<FilePlus />} />
          </form>
        </Form>
      </div>
    </Section.Root>
  );
}
