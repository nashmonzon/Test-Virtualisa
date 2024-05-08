"use client";

import { cn, fireErrorToast, fireSuccessToast } from "@/lib/utils";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import Tooltip from "./ui/tooltip";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { revalidateTags } from "@/service/action.service";

function RevalidateBtn({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  const [loading, setLoading] = useState<boolean>();

  const handleRefresh = async () => {
    try {
      setLoading(true);
      revalidateTags(tags);
      window.location.reload();
      fireSuccessToast("Stats list refreshed!");
    } catch (e) {
      //@ts-expect-error
      fireErrorToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip content="Click to fetch latest data">
      <Button
        className={cn(className)}
        onClick={handleRefresh}
        type={"button"}
        variant={"outline"}
      >
        {loading ? (
          <Loader2 className="size-6 animate-spin text-primary" />
        ) : (
          <Icons.refresh />
        )}
      </Button>
    </Tooltip>
  );
}

export default RevalidateBtn;
