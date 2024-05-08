import Link from "next/link";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Separator } from "@radix-ui/react-separator";

export default async function NotFound() {
  return (
    <Container className="flex min-h-[100dvh] items-center justify-center">
      <div className="flex items-center">
        <h2 className="mx-4">Not Found</h2>
        <div className="h-12">
          <Separator orientation="vertical" className="my-2" />
        </div>
        <div>
          <p className="px-3 text-sm">Could not find requested resource</p>
          <Link href="/">
            <Button variant={"link"} className="h-full p-0 px-3">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
