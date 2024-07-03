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
        className="flex flex-col items-center space-y-6 w-3/5 h-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold text-red-750">Fale Conosco</h1>
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
            <FormItem className="w-full min-h-[256px]">
              <FormControl>
                <Textarea
                  placeholder="Mensagem"
                  className="bg-slate-200 border-slate-200 text-slate-800 h-full"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit bg-red-750 hover:bg-red-800">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
