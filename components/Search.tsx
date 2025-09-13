"use client";
import React, { Suspense, useCallback, useMemo } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

function SearchMovie() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(window.location.search);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      router.push(`/dashboard?${params.toString()}`);
    },
    [router]
  );

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 400),
    [handleSearch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return (
    <div>
      <Input
        onChange={handleChange}
        defaultValue={searchParams.get("search")?.toString() ?? ""}
        className="w-[200px]"
        placeholder="Search..."
      />
    </div>
  );
}

export default function Search() {
  return (
    <Suspense>
      <SearchMovie />
    </Suspense>
  );
}
