import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRouter from "./router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Number.POSITIVE_INFINITY,
        retry: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full w-full">
        <AppRouter />
      </div>
    </QueryClientProvider>
  );
}

export default App;
