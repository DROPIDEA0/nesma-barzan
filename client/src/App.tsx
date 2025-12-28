import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminContent = lazy(() => import("./pages/admin/Content"));
const AdminProjects = lazy(() => import("./pages/admin/Projects"));
const AdminImages = lazy(() => import("./pages/admin/Images"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route path="/admin/content" component={AdminContent} />
        <Route path="/admin/projects" component={AdminProjects} />
        <Route path="/admin/images" component={AdminImages} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
