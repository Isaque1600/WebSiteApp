"use client";

import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  user: any;
};

export default function DeleteDialog({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-md bg-red-500 p-2 px-4 hover:bg-red-600">
        <Trash2 />
      </DialogTrigger>
      <DialogContent className="border-zinc-750 bg-zinc-750 text-neutral-100">
        <DialogHeader>
          <DialogTitle className="mb-4">
            Você tem certeza que deseja deletar esse registro?
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Essa ação é irreversível, não pode ser desfeita!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              console.log(user);

              setLoading(true);

              setTimeout(() => {
                setOpen(false);
                setLoading(false);

                return;
              }, 2000);
            }}
            type="submit"
            variant={"destructive"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
