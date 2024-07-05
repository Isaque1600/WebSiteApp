"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { InputToggle } from "./ui/inputToggle";

export function LoginForm() {
  const formSchema = z.object({
    login: z
      .string({
        required_error: "Login é obrigatório",
      })
      .toLowerCase()
      .trim(),
    password: z.string({
      required_error: "Senha é obrigatória",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const inputClassName = "bg-slate-300 text-slate-800 border-slate-300";

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center space-y-6 w-3/5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold text-red-750">Área Restrita</h1>
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Usuário"
                  className={inputClassName}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputToggle
                  placeholder="Senha"
                  className={inputClassName}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-fit bg-red-750 hover:bg-red-800" type="submit">
          Acessar
        </Button>
      </form>
    </Form>
  );
}
