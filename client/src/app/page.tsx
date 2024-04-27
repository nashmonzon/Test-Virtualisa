import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ToggelDark";

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <Button variant={"destructive"}>click</Button>
    </div>
  );
}
