import React, { ReactNode } from "react";
import Link from "next/link";

import { Icons } from "@/components/icons";

export function NavLogo({ href }: { href: string }) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    if (!href) {
      return <span className="items-center space-x-2 md:flex">{children}</span>;
    } else {
      return (
        <Link href={href ?? "/"} className="items-center space-x-2 md:flex">
          {children}
        </Link>
      );
    }
  };
  return (
    <div className="flex shrink-0 basis-[2.5rem] gap-6 md:gap-10">
      <Wrapper>
        <Icons.logo className="size-10 basis-[2.5rem]" />
      </Wrapper>
    </div>
  );
}
