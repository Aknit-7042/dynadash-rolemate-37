
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="leave" element={<Dashboard />} />
              <Route path="expenses" element={<Dashboard />} />
              <Route path="reports" element={<Dashboard />} />
              <Route path="users" element={<Dashboard />} />
              <Route path="tasks" element={<Dashboard />} />
              <Route path="team" element={<Dashboard />} />
              <Route path="attendance" element={<Dashboard />} />
              <Route path="payroll" element={<Dashboard />} />
              <Route path="updates" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
