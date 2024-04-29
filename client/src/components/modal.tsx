"use client";

import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps extends React.ComponentProps<typeof Dialog> {
  trigger?: ReactNode;
  children: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  wrapper?: boolean;
  onClick?: any;
  className?: string;
}

function Modal({
  trigger,
  title,
  description,
  children,
  className,
  ...props
}: ModalProps) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={className}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
