"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { FormItem } from "@/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../../CustomInput";
import { formSchema } from "../../SystemsForm";
import { CustomForm } from "../../form/Form";

type Props = {
  user: any;
};

export default function UpdateDialog({ user }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: user.name,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-md bg-emerald-400 p-2 px-4 hover:bg-emerald-500">
        <Edit />
      </DialogTrigger>
      <DialogContent className="border-zinc-750 bg-zinc-750 text-neutral-100">
        <DialogHeader>
          <DialogTitle className="mb-4">Editar</DialogTitle>
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

            <DialogFooter>
              <CustomForm.SubmitBtn
                icon={<Edit />}
                className="gap-2 text-lg"
                onClick={() => setOpen(false)}
              >
                Editar
              </CustomForm.SubmitBtn>
            </DialogFooter>
          </CustomForm.Root>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
