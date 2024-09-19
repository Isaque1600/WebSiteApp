"use client";

import { DialogDescription } from "@/_components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { CustomDialog } from "./CustomDialog/CustomDialog";
import CustomDialogHeader from "./CustomDialog/CustomDialogHeader";
import CustomDialogTrigger from "./CustomDialog/CustomDialogTrigger";

type Props = {
  user: any;
};

export default function DeleteDialog({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <CustomDialog.Root open={open} onOpenChange={setOpen}>
      <CustomDialogTrigger className="p-2 px-4">
        <Trash2 />
      </CustomDialogTrigger>
      <CustomDialog.Content>
        <CustomDialogHeader text="Você tem certeza que deseja deletar esse registro?" />
        <DialogDescription>
          Essa ação é irreversível, não pode ser desfeita!
        </DialogDescription>

        <div className="flex w-full justify-end">
          <CustomDialog.CustomCloseBtn
            className="gap-2 bg-red-650 text-lg hover:bg-red-700"
            onClick={() => {
              console.log(user);

              setLoading(true);

              setTimeout(() => {
                setOpen(false);
                setLoading(false);

                return;
              }, 2000);
            }}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Trash2 />
                <p>Deletar</p>
              </>
            )}
          </CustomDialog.CustomCloseBtn>
        </div>
      </CustomDialog.Content>
    </CustomDialog.Root>
  );
}
