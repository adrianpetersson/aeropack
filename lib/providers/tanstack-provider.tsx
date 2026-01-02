"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../get-query-client";

export function TanstackProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
