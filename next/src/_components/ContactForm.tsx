"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function ContactForm() {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .trim(),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .email(),
    message: z
      .string({
        required_error: "Mensagem é obrigatória",
      })
      .trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const inputClassName = "bg-slate-200 text-slate-800 border-slate-200";

  return (
    <Form {...form}>
      <form
        className="flex h-full w-3/5 flex-col items-center space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-red-750 text-3xl font-bold">Fale Conosco</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Nome"
                  className={inputClassName}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Email"
                  className={inputClassName}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="h-[256px] w-full max-md:h-[250px]">
              <FormControl className="">
                <Textarea
                  placeholder="Mensagem"
                  className="h-full border-slate-200 bg-slate-200 text-slate-800"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-red-750 w-fit hover:bg-red-800">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
