"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import CreateDriver from "./dialogs/create-driver";
import Modal from "./modal";
import { CreateType } from "@/types/enums";
import CreateVehicle from "./dialogs/create-vehicle";
import { Driver } from "@/types/drivers";
import { Vehicle } from "@/types/vehicles";
import CreateAssignment from "./dialogs/create-assignment";

interface CreateDialogProps {
  id?: string;
  type: CreateType;
  to: string;
  drivers?: Driver[];
}

function GenericModal(props: CreateDialogProps) {
  const router = useRouter();
  const { to } = props;

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.push(to);
    }
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      defaultOpen
      className={cn(
        "mt-10 max-h-screen overflow-y-scroll shadow-md shadow-muted"
      )}
    >
      <DialogContent {...props} />
    </Modal>
  );
}

const DialogContent = ({
  type,
  id,
  drivers,
  vehicles,
}: {
  type: CreateType;
  id?: string;
  drivers?: Driver[];
  vehicles?: Vehicle[];
}) => {
  if (type === CreateType.CreateDriver) {
    return <CreateDriver />;
  }
  if (type === CreateType.CreateVehicle) {
    return <CreateVehicle />;
  }
  if (type === CreateType.CreateTrip) {
    return <CreateVehicle />;
  }
  if (type === CreateType.CreateAssignment) {
    return <CreateAssignment drivers={drivers} />;
  }

  return <div>DEFAULT CASE</div>;
};

export default GenericModal;
