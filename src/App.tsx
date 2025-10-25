import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";

// Eager load homepage for fast FCP
import Index from "./pages/Index";
import IndexNew from "./pages/IndexNew";

// Lazy load non-critical UI components
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

// Lazy load non-critical routes to reduce initial bundle
const Storytelling = lazy(() => import("./pages/Storytelling"));
const About = lazy(() => import("./pages/About"));
const Terminal = lazy(() => import("./pages/Terminal"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy wrapper that only loads QueryClient when needed
const QueryWrapper = lazy(() =>
  import("@tanstack/react-query").then(({ QueryClient, QueryClientProvider }) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          gcTime: 5 * 60 * 1000,
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
    
    return {
      default: ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    };
  })
);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <TooltipProvider>
      <Suspense fallback={null}>
        <Toaster />
        <Sonner />
      </Suspense>
      <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new" element={<IndexNew />} />
          <Route path="/storytelling" element={<Storytelling />} />
          <Route path="/about" element={<About />} />
          <Route path="/terminal" element={<QueryWrapper><Terminal /></QueryWrapper>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
