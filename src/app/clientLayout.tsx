'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000
    }
  }
});
export function ClientLayout({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
