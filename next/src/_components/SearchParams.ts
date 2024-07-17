"use client";

import { useSearchParams } from "next/navigation";

export function getSearchParams(): string {
  const searchParams = useSearchParams();
  let params = "";

  searchParams.forEach((element, key) => {
    params += key == "page" ? "" : `${key}=${element}&`;
  });

  params = params.slice(0, -1);

  return params;
}
