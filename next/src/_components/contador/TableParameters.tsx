"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TableParametersProps = {
  setYear: (year: string) => void;
  setMonth: (month: string) => void;
  setName: (name: string) => void;
};

export function TableParameters({
  setYear,
  setMonth,
  setName,
}: TableParametersProps) {
  const [years, setYears]: [number[], any] = useState([]);
  const [names, setNames]: [string[], any] = useState([]);

  useEffect(() => {
    setYears([2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]);
    setNames(["test"]);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Select defaultValue="null" onValueChange={setMonth}>
        <SelectTrigger className="capitalize w-36 outline-none text-lg border-0 border-b-2 shadow-none rounded-none rounded-t-md border-gray-800 hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="null">Todos</SelectItem>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <SelectItem key={i} value={(i + 1).toString()}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="null" onValueChange={setYear}>
        <SelectTrigger className="capitalize w-36 outline-none text-lg border-0 border-b-2 shadow-none rounded-none rounded-t-md border-gray-800 hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="null">Todos</SelectItem>
          {years.map((i) => (
            <SelectItem key={i} value={i.toString()}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="null" onValueChange={setName}>
        <SelectTrigger className="capitalize min-w-96 w-fit space-x-2 outline-none text-lg border-0 border-b-2 shadow-none rounded-none rounded-t-md border-gray-800 hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="null">Todos</SelectItem>
          {names.map((i) => (
            <SelectItem key={i} value={i.toString()}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
