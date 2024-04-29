import { ComponentProps } from "react";
import Link from "next/link";

export const LinkWrapper = ({
  children,
  href,
  prefetch = false,
  scroll = false,
  ...rest
}: Partial<ComponentProps<typeof Link>>) => {
  if (!href) return children;
  return (
    <Link href={href} className="cursor-pointer" {...rest}>
      {children}
    </Link>
  );
};
