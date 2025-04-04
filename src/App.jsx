
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "@/store";
import { AuthProvider } from "@/context/AuthContext";
import { RoleProvider } from "@/context/RoleContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import LeaveManagementPage from "./pages/LeaveManagementPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import TeamPage from "./pages/TeamPage";
import PayrollPage from "./pages/PayrollPage";
import ExpensePage from "./pages/ExpensePage";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <RoleProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="employees" element={<EmployeesPage />} />
                  <Route path="attendance" element={<AttendancePage />} />
                  <Route path="leave" element={<LeaveManagementPage />} />
                  <Route path="team-member/:memberId" element={<TeamMemberPage />} />
                  <Route path="team" element={<TeamPage />} />
                  <Route path="expenses" element={<ExpensePage />} />
                  <Route path="payroll" element={<PayrollPage />} />
                  <Route path="reports" element={<Dashboard />} />
                  <Route path="users" element={<Dashboard />} />
                  <Route path="tasks" element={<Dashboard />} />
                  <Route path="updates" element={<Dashboard />} />
                  <Route path="settings" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RoleProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
