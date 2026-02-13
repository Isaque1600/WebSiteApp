"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useState } from "react";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              if (error instanceof AxiosError) {
                if (
                  error.response?.status === 404 ||
                  error.response?.status === 400
                ) {
                  return false;
                }
              }
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
    </>
  );
}
