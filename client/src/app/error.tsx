"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Separator } from "@radix-ui/react-separator";

export default function Error({ reset }: { reset: () => void }) {
  const { back } = useRouter();

  return (
    <Container className="flex min-h-[100dvh] items-center justify-center">
      <div className="flex items-center">
        <h1 className="mx-4">Error</h1>
        <div className="h-12">
          <Separator orientation="vertical" className="my-2" />
        </div>
        <div>
          <p className="px-3 text-sm">Something went wrong!</p>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={"link"}
              className="h-full p-0 px-3"
              onClick={() => reset()}
            >
              Retry
            </Button>
            <Separator orientation="vertical" className="h-[1em]" />
            <Button variant={"link"} className="h-full p-0 px-3" onClick={back}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
