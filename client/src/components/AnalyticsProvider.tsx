/**
 * Analytics Provider Component
 * Inicializa e gerencia Google Analytics baseado no consentimento de cookies
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsProvider() {
  const [location] = useLocation();
  const { trackPageView, isAnalyticsEnabled } = useAnalytics();

  // Rastrear mudanças de página
  useEffect(() => {
    if (isAnalyticsEnabled()) {
      trackPageView(location);
    }
  }, [location, trackPageView, isAnalyticsEnabled]);

  // Este componente não renderiza nada visualmente
  return null;
}
