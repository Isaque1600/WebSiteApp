"use client";

import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { InputToggle } from "./ui/inputToggle";

export function LoginForm() {
  const { login: loginMutation, me } = useAuth();
  const {
    mutateAsync: login,
    isSuccess,
    isPending,
    error,
    isError,
  } = loginMutation();
  const { data: userData, isLoading } = me();

  const router = useRouter();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success("Login realizado com sucesso!", {
        id: "success",
        position: "top-center",
      });
      toast.dismiss("loading");
      if (userData?.type === "admin") {
        router.push("/admin");
      } else if (userData?.type === "contador") {
        router.push("/contador");
      }
    }

    if (isError) {
      toast.dismiss("loading");
    }
  }, [isSuccess, userData, isLoading, isError]);

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
    await login({
      email: values.login,
      password: values.password,
    });
  };

  const inputClassName = "bg-slate-300 text-slate-800 border-slate-300";

  return (
    <Form {...form}>
      <form
        className="flex w-3/5 flex-col items-center space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-red-750 text-3xl font-bold">Área Restrita</h1>
        {isError && (
          <p className="text-sm text-red-600">
            {error.message || "Erro ao fazer login"}
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
        <Button
          className="w-fit bg-red-650 hover:bg-red-700"
          type="submit"
          onClick={(e) => {
            toast.loading("Entrando...", {
              id: "loading",
              position: "top-center",
            });
          }}
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
