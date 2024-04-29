"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import CreateDriver from "./dialogs/create-driver";
import Modal from "./modal";

export enum CreateType {
  CreateDriver = "create-driver",
}

interface ProjectDialogProps {
  id?: string;
  type: CreateType;
}

function GenericModal(props: ProjectDialogProps) {
  const router = useRouter();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`/drivers`);
    }
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      defaultOpen
      className={cn("mt-10 max-h-screen overflow-y-scroll ")}
    >
      <DialogContent {...props} />
    </Modal>
  );
}

const DialogContent = ({ type, id }: { type: CreateType; id?: string }) => {
  if (type === CreateType.CreateDriver) {
    return <CreateDriver />;
  }

  return <div>DEFAULT CASE</div>;
};

export default GenericModal;
