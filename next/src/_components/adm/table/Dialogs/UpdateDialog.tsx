"use client";

import { Edit } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { CustomDialog } from "./CustomDialog/CustomDialog";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: (value: any) => void;
  children: React.ReactNode;
  contentClassName?: string;
};

export default function UpdateDialog({
  dialogOpen,
  setDialogOpen,
  children,
  contentClassName,
}: Props) {
  return (
    <CustomDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <CustomDialog.Trigger className="rounded-md bg-emerald-400 p-2 px-4 hover:bg-emerald-500">
        <Edit />
      </CustomDialog.Trigger>
      <CustomDialog.Content
        className={twMerge(
          "w-screen border-zinc-750 bg-zinc-750 text-neutral-100",
          contentClassName,
        )}
      >
        <CustomDialog.Header text="Editar" />
        {children}
      </CustomDialog.Content>
    </CustomDialog.Root>
  );
}
