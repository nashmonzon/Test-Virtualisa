import {
  LucideIcon,
  LucideProps,
  Moon,
  SunMedium,
  ArrowUpDown,
  MoreHorizontal,
  Wrench,
  DownloadCloud,
} from "lucide-react";
import Image from "next/image";

export type Icon = LucideIcon;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  logo: (props: LucideProps) => (
    <Image
      src={"/virtualisa.png"}
      //@ts-expect-error
      width={120}
      //@ts-expect-error
      height={120}
      alt="Logo"
      {...props}
    />
  ),
  MoreHorizontal: MoreHorizontal,
  arrowSort: ArrowUpDown,
  wrench: Wrench,
  downloadCloud: DownloadCloud,
};
