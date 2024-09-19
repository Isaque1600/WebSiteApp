"use client";

import { Eye } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { CustomDialog } from "./CustomDialog/CustomDialog";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: (value: any) => void;
  children: React.ReactNode;
  contentClassName?: string;
};

export default function VisualizeDialog({
  dialogOpen,
  setDialogOpen,
  children,
  contentClassName,
}: Props) {
  return (
    <CustomDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <CustomDialog.Trigger className="rounded-md bg-blue-600 p-2 px-4 hover:bg-blue-700">
        <Eye />
      </CustomDialog.Trigger>
      <CustomDialog.Content
        className={twMerge(
          "w-screen border-zinc-750 bg-zinc-750 text-neutral-100",
          contentClassName,
        )}
      >
        <CustomDialog.Header text="Visualizar" />
        {children}
      </CustomDialog.Content>
    </CustomDialog.Root>
  );
}
