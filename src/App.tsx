import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import Experiments from "./pages/Experiments";
import PolicyDashboard from "./pages/PolicyDashboard";
import FedRAMPSandbox from "./pages/FedRAMPSandbox";
import PQCModule from "./pages/PQCModule";
import QuantumNavigator from "./pages/QuantumNavigator";
import Sandboxverse from "./pages/Sandboxverse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/quantum-navigator" element={<QuantumNavigator />} />
          <Route path="/sandboxverse" element={<Sandboxverse />} />
          <Route path="/policy-dashboard" element={<PolicyDashboard />} />
          <Route path="/fedramp-sandbox" element={<FedRAMPSandbox />} />
          <Route path="/pqc-module" element={<PQCModule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
