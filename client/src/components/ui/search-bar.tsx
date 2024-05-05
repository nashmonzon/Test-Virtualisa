"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, X } from "lucide-react";

import { Input } from "@/components/ui/inputs/input";

const SearchBar = ({
  to,
  placeholder,
}: {
  to: string;
  placeholder: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const handlePageChange = (value: string) => {
    setSearchValue(value);
  };

  const clearResearch = () => {
    router.push(to);
    setSearchValue(null);
  };

  useEffect(() => {
    let delay: NodeJS.Timeout;
    if (searchValue && !searchParams?.has("id")) {
      delay = setTimeout(() => {
        startTransition(() => router.push(`${to}?searchBy=${searchValue}`));
      }, 300);
    } else {
      if (searchValue === "") {
        clearResearch();
      }
    }

    return () => delay && clearTimeout(delay);
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue && searchParams.has("searchBy")) {
      setSearchValue(searchParams.get("searchBy"));
    }
  }, []);

  return (
    <div className="relative flex flex-row items-center justify-end shadow-md">
      <Input
        id="search-input"
        className="w-[150px] sm:w-[300px]"
        onChange={(e) => handlePageChange(e.target.value)}
        value={searchValue || ""}
        type="text"
        placeholder={placeholder}
      />
      <span className="absolute right-2">
        {searchValue && searchValue?.length > 0 && !isPending && (
          <X onClick={clearResearch} className="ml-2 cursor-pointer" />
        )}
        {isPending && (
          <Loader2 className="ml-2 size-6 animate-spin text-primary" />
        )}
      </span>
    </div>
  );
};
export default SearchBar;
