/**
 * Cookie Consent Banner - LGPD Compliance
 * Design: Quantum Probability - Neomorfismo futurista
 * Integrado com CookieConsentContext e useAnalytics
 */

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, X, Settings, Check, BarChart3, Megaphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function CookieConsent() {
  const {
    preferences,
    hasConsented,
    isLoading,
    updatePreferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
  } = useCookieConsent();

  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Mostrar banner se não tiver consentido ainda
    if (!isLoading && !hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, hasConsented]);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    rejectNonEssential();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    savePreferences();
    setIsVisible(false);
  };

  const handleClose = () => {
    // Ao fechar sem escolher, considera como rejeição de não essenciais
    rejectNonEssential();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      >
        <div className="container max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Política de Cookies</h3>
                    <p className="text-xs text-slate-500">Sua privacidade é importante para nós</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e 
                personalizar conteúdo. Ao clicar em "Aceitar Todos", você concorda com o uso de 
                todos os cookies. Você pode gerenciar suas preferências ou saber mais em nossa{" "}
                <Link href="/privacy" className="text-indigo-600 hover:underline font-medium">
                  Política de Privacidade
                </Link>.
              </p>

              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-3">
                      {/* Necessary Cookies */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="font-medium text-slate-800 text-sm">Cookies Essenciais</p>
                            <p className="text-xs text-slate-500">Necessários para o funcionamento do site</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-emerald-600 font-medium">Sempre ativo</span>
                          <div className="w-10 h-6 bg-emerald-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full shadow" />
                          </div>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-indigo-500" />
                          <div>
                            <p className="font-medium text-slate-800 text-sm">Cookies de Análise</p>
                            <p className="text-xs text-slate-500">Google Analytics - ajudam a entender como você usa o site</p>
                          </div>
                        </div>
                        <button
                          onClick={() => updatePreferences({ analytics: !preferences.analytics })}
                          className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.analytics ? "bg-indigo-500 justify-end" : "bg-slate-300 justify-start"
                          }`}
                          aria-label={preferences.analytics ? "Desativar analytics" : "Ativar analytics"}
                        >
                          <motion.div 
                            className="w-4 h-4 bg-white rounded-full shadow"
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                          <Megaphone className="w-5 h-5 text-amber-500" />
                          <div>
                            <p className="font-medium text-slate-800 text-sm">Cookies de Marketing</p>
                            <p className="text-xs text-slate-500">Usados para publicidade personalizada</p>
                          </div>
                        </div>
                        <button
                          onClick={() => updatePreferences({ marketing: !preferences.marketing })}
                          className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.marketing ? "bg-indigo-500 justify-end" : "bg-slate-300 justify-start"
                          }`}
                          aria-label={preferences.marketing ? "Desativar marketing" : "Ativar marketing"}
                        >
                          <motion.div 
                            className="w-4 h-4 bg-white rounded-full shadow"
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      {/* Status Info */}
                      <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                        <p className="text-xs text-indigo-700">
                          <strong>Status atual:</strong>{" "}
                          Analytics {preferences.analytics ? "✓ Ativo" : "✗ Inativo"} | 
                          Marketing {preferences.marketing ? "✓ Ativo" : "✗ Inativo"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-slate-600"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showSettings ? "Ocultar Preferências" : "Gerenciar Preferências"}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectNonEssential}
                  className="border-slate-300"
                >
                  Rejeitar Não Essenciais
                </Button>

                {showSettings && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSavePreferences}
                    className="border-indigo-300 text-indigo-600"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Salvar Preferências
                  </Button>
                )}
                
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Aceitar Todos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
