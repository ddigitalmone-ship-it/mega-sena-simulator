/**
 * Cookie Consent Context - LGPD Compliance
 * Gerencia estado de consentimento de cookies em toda a aplicação
 * Integra com useAnalytics para controle do Google Analytics
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

const COOKIE_CONSENT_KEY = "mega-sena-cookie-consent";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentData {
  preferences: CookiePreferences;
  timestamp: string;
  version: string;
}

interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  isLoading: boolean;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: () => void;
  resetConsent: () => void;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar preferências do localStorage no mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        const data: CookieConsentData = JSON.parse(stored);
        setPreferences(data.preferences);
        setHasConsented(true);
      }
    } catch (error) {
      console.error("Erro ao carregar preferências de cookies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salvar preferências no localStorage
  const saveToStorage = useCallback((prefs: CookiePreferences) => {
    const data: CookieConsentData = {
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));
    setHasConsented(true);

    // Disparar evento customizado para notificar outros componentes
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: prefs }));
  }, []);

  // Atualizar preferências parcialmente
  const updatePreferences = useCallback((prefs: Partial<CookiePreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...prefs,
      necessary: true, // Sempre ativo
    }));
  }, []);

  // Aceitar todos os cookies
  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveToStorage(allAccepted);
  }, [saveToStorage]);

  // Rejeitar cookies não essenciais
  const rejectNonEssential = useCallback(() => {
    const essentialOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    saveToStorage(essentialOnly);
  }, [saveToStorage]);

  // Salvar preferências atuais
  const savePreferences = useCallback(() => {
    saveToStorage(preferences);
  }, [preferences, saveToStorage]);

  // Resetar consentimento (para testes ou revogação)
  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setPreferences(defaultPreferences);
    setHasConsented(false);
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: null }));
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsented,
        isLoading,
        updatePreferences,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

// Hook helper para verificar se analytics está habilitado
export function useAnalyticsConsent() {
  const { preferences, hasConsented } = useCookieConsent();
  return hasConsented && preferences.analytics;
}

// Hook helper para verificar se marketing está habilitado
export function useMarketingConsent() {
  const { preferences, hasConsented } = useCookieConsent();
  return hasConsented && preferences.marketing;
}
