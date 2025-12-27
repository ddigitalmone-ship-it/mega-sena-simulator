/**
 * Hook para gerenciar Google Analytics com respeito às preferências de cookies
 * Integra com o CookieConsentContext para controle LGPD
 */

import { useEffect, useCallback, useRef } from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Substituir pelo ID real quando disponível

// Declaração global para gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function useAnalytics() {
  const { preferences, hasConsented } = useCookieConsent();
  const isInitialized = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Verificar se analytics está habilitado
  const isAnalyticsEnabled = useCallback(() => {
    return hasConsented && preferences.analytics;
  }, [hasConsented, preferences.analytics]);

  // Inicializar Google Analytics
  const initGA = useCallback(() => {
    if (!isAnalyticsEnabled()) return;
    if (isInitialized.current) return;
    if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
      console.log("[Analytics] GA não configurado - usando ID placeholder");
      return;
    }

    // Criar dataLayer se não existir
    window.dataLayer = window.dataLayer || [];
    
    // Definir função gtag
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true, // LGPD compliance
      cookie_flags: "SameSite=None;Secure",
    });

    // Carregar script do GA
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    scriptRef.current = script;
    isInitialized.current = true;

    console.log("[Analytics] Google Analytics inicializado com sucesso");
  }, [isAnalyticsEnabled]);

  // Desabilitar Google Analytics
  const disableGA = useCallback(() => {
    if (!isInitialized.current) return;

    // Remover script do GA
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // Limpar dataLayer
    window.dataLayer = [];
    
    // Desabilitar gtag
    window.gtag = () => {};
    
    isInitialized.current = false;
    console.log("[Analytics] Google Analytics desabilitado");
  }, []);

  // Rastrear evento
  const trackEvent = useCallback((
    eventName: string,
    eventParams?: Record<string, unknown>
  ) => {
    if (!isAnalyticsEnabled() || !window.gtag) {
      console.log(`[Analytics] Evento ignorado (analytics desabilitado): ${eventName}`);
      return;
    }
    
    window.gtag("event", eventName, eventParams);
    console.log(`[Analytics] Evento rastreado: ${eventName}`, eventParams);
  }, [isAnalyticsEnabled]);

  // Rastrear visualização de página
  const trackPageView = useCallback((pagePath?: string) => {
    if (!isAnalyticsEnabled() || !window.gtag) return;
    
    window.gtag("event", "page_view", {
      page_path: pagePath || window.location.pathname,
    });
  }, [isAnalyticsEnabled]);

  // Eventos específicos do simulador
  const trackSimulatorEvent = useCallback((action: string, details?: Record<string, unknown>) => {
    trackEvent("simulator_action", {
      action,
      ...details,
    });
  }, [trackEvent]);

  // Reagir a mudanças no consentimento
  useEffect(() => {
    if (hasConsented) {
      if (preferences.analytics) {
        initGA();
      } else {
        disableGA();
      }
    }
  }, [hasConsented, preferences.analytics, initGA, disableGA]);

  // Ouvir evento de atualização de consentimento
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      const newPrefs = event.detail;
      if (newPrefs?.analytics) {
        initGA();
      } else {
        disableGA();
      }
    };

    window.addEventListener("cookieConsentUpdated", handleConsentUpdate as EventListener);
    return () => {
      window.removeEventListener("cookieConsentUpdated", handleConsentUpdate as EventListener);
    };
  }, [initGA, disableGA]);

  return {
    isAnalyticsEnabled,
    trackEvent,
    trackPageView,
    trackSimulatorEvent,
    isInitialized: isInitialized.current,
  };
}

// Eventos predefinidos do simulador
export const SIMULATOR_EVENTS = {
  GENERATE_BALANCED: "generate_balanced",
  GENERATE_HOT: "generate_hot",
  GENERATE_COLD: "generate_cold",
  GENERATE_RANDOM: "generate_random",
  MONTE_CARLO_RUN: "monte_carlo_run",
  EXPORT_GAMES: "export_games",
  VIEW_HISTORY: "view_history",
  COMPARE_RESULT: "compare_result",
} as const;
