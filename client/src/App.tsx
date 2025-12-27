import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Estatisticas from "./pages/Estatisticas";
import Contato from "./pages/Contato";
import Sobre from "./pages/Sobre";
import AnalyticsProvider from "./components/AnalyticsProvider";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/estatisticas" component={Estatisticas} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/contato" component={Contato} />
      <Route path={"/about"} component={About} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * DESIGN: Hybrid Quantum Tropical - Neomorfismo Futurista com Identidade Brasileira
 * 
 * Base: Quantum Probability (lavanda, índigo, coral, turquesa)
 * Elementos: Brazilian Tropical Modernism (cores vibrantes, tipografia bold)
 * Tipografia: Plus Jakarta Sans (principal), Archivo Black (títulos), DM Mono (código)
 * 
 * LGPD: CookieConsentProvider gerencia estado de consentimento
 * Analytics: Integrado com preferências de cookies
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CookieConsentProvider>
          <TooltipProvider>
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: 'oklch(0.95 0.015 286.375)',
                  border: '1px solid oklch(0.85 0.03 286.375)',
                  boxShadow: '8px 8px 16px oklch(0.85 0.02 286.375), -8px -8px 16px oklch(0.98 0.01 286.375)',
                },
              }}
            />
            {/* Provider de Analytics - reage às mudanças de consentimento */}
            <AnalyticsProvider />
            <Router />
            {/* Banner de Consentimento de Cookies - LGPD */}
            <CookieConsent />
          </TooltipProvider>
        </CookieConsentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
