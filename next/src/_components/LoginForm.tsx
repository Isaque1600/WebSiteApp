"use client";

import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { InputToggle } from "./ui/inputToggle";

export function LoginForm() {
  const { login, me, loading, error } = useAuth();
  const router = useRouter();

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting login form with values:", values);
    const isLogged = await login(values.login, values.password);
    if (!isLogged) {
      return;
    }
    const user = await me();
    if (!user) {
      return;
    }
    if (user.type === "admin") {
      router.push("/admin");
    }
    if (user.type === "accountant") {
      router.push("/contador");
    }
  };

  const inputClassName = "bg-slate-300 text-slate-800 border-slate-300";

  return (
    <Form {...form}>
      <form
        className="flex w-3/5 flex-col items-center space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-red-750 text-3xl font-bold">Área Restrita</h1>
        {error && (
          <p className="text-sm text-red-600">
            {error || "Erro ao fazer login"}
          </p>
        )}
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
        <Button className="w-fit bg-red-650 hover:bg-red-700" type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
