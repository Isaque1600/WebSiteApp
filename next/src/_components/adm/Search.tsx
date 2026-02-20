"use client";

import { formattedColumns } from "@/types/Columns";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  search: string;
  filter: string;
  columns: string[];
};

export default function Search({ search, filter, columns }: Props) {
  const per_page = useSearchParams().get("per_page") || null;
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const filters = new URLSearchParams();
    filters.set("filter", filter);
    if (searchRef.current?.value)
      filters.set("search", searchRef.current.value);
    if (per_page) filters.set("per_page", per_page);

    router.push(`/admin/usuarios?${filters.toString()}`);
  };

  return (
    <div className="flex w-min items-center gap-8">
      <div className="flex gap-2">
        <Input
          type="text"
          name="search"
          placeholder="Pesquisar"
          defaultValue={search}
          ref={searchRef}
          className="min-w-56 border-none bg-neutral-600 text-neutral-100 shadow placeholder:text-neutral-400"
        />
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="px-2 text-neutral-100 hover:bg-neutral-600 hover:text-neutral-300"
          onClick={handleClick}
        >
          <SearchIcon />
        </Button>
      </div>
      <Select
        defaultValue={filter}
        onValueChange={(e) => {
          filter = e;
          handleClick();
        }}
      >
        <SelectTrigger className="min-w-36 border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
          <SelectValue placeholder={filter} />
        </SelectTrigger>
        <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
          {columns.map((column) => (
            <SelectItem className="capitalize" key={column} value={column}>
              {formattedColumns[column as keyof typeof formattedColumns]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
