"use client";

import { useSearchParams } from "next/navigation";

export function getSearchParams(exclude: string): string {
  const searchParams = useSearchParams();
  let params = "";

  searchParams.forEach((element, key) => {
    params += key == exclude ? "" : `${key}=${element}&`;
  });

  params = params.slice(0, -1);

  return params;
}
