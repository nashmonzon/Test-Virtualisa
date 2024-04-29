import {
  LucideIcon,
  LucideProps,
  Moon,
  SunMedium,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

export type Icon = LucideIcon;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  logo: (props: LucideProps) => (
    <Image
      src={
        "https://www.virtualisa.com/wp-content/uploads/sites/2/2021/09/logo-virtualisa.png"
      }
      //@ts-expect-error SafeNumber wierd error
      width={100}
      //@ts-expect-error SafeNumber wierd error
      height={100}
      alt="Logo"
      {...props}
    />
  ),
  MoreHorizontal: MoreHorizontal,
  arrowSort: ArrowUpDown,
};
