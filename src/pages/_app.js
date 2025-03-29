
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { RoleProvider } from "@/context/RoleContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <RoleProvider>
              <Toaster />
              <Sonner />
              <Component {...pageProps} />
            </RoleProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}
