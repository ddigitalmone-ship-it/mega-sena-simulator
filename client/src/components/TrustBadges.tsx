/**
 * Trust Badges - Selos de Segurança e Confiança
 * Design: Quantum Probability - Neomorfismo futurista
 * 
 * Aumenta a confiança do usuário e ajuda na aprovação do Google Ads
 */

import { Shield, Lock, CheckCircle, Award, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

interface TrustBadgeProps {
  variant?: "horizontal" | "vertical" | "compact";
  showAll?: boolean;
}

const badges = [
  {
    id: "lgpd",
    icon: Shield,
    title: "LGPD Compliant",
    description: "Em conformidade com a Lei Geral de Proteção de Dados",
    color: "emerald",
  },
  {
    id: "secure",
    icon: Lock,
    title: "Site Seguro",
    description: "Conexão criptografada SSL/TLS",
    color: "blue",
  },
  {
    id: "verified",
    icon: CheckCircle,
    title: "Dados Verificados",
    description: "Informações baseadas em resultados oficiais",
    color: "indigo",
  },
  {
    id: "educational",
    icon: Award,
    title: "Fins Educacionais",
    description: "Ferramenta para análise estatística",
    color: "amber",
  },
  {
    id: "privacy",
    icon: FileCheck,
    title: "Privacidade",
    description: "Seus dados nunca são compartilhados",
    color: "purple",
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    title: "text-emerald-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-700",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    icon: "text-indigo-600",
    title: "text-indigo-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
    title: "text-amber-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-600",
    title: "text-purple-700",
  },
};

export default function TrustBadges({ variant = "horizontal", showAll = true }: TrustBadgeProps) {
  const displayBadges = showAll ? badges : badges.slice(0, 3);

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {displayBadges.map((badge, index) => {
          const colors = colorClasses[badge.color as keyof typeof colorClasses];
          const Icon = badge.icon;
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border`}
              title={badge.description}
            >
              <Icon className={`w-4 h-4 ${colors.icon}`} />
              <span className={`text-xs font-medium ${colors.title}`}>{badge.title}</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="space-y-3">
        {displayBadges.map((badge, index) => {
          const colors = colorClasses[badge.color as keyof typeof colorClasses];
          const Icon = badge.icon;
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${colors.bg} ${colors.border} border`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <div>
                <p className={`font-semibold text-sm ${colors.title}`}>{badge.title}</p>
                <p className="text-xs text-slate-500">{badge.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Horizontal (default)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {displayBadges.map((badge, index) => {
        const colors = colorClasses[badge.color as keyof typeof colorClasses];
        const Icon = badge.icon;
        
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col items-center text-center p-4 rounded-xl ${colors.bg} ${colors.border} border
              shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 
              bg-white/60 shadow-inner`}>
              <Icon className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <p className={`font-semibold text-sm ${colors.title}`}>{badge.title}</p>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{badge.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

// Componente simplificado para o footer
export function TrustBadgesFooter() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
      <div className="flex items-center gap-1.5">
        <Shield className="w-4 h-4 text-emerald-500" />
        <span>LGPD Compliant</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Lock className="w-4 h-4 text-blue-500" />
        <span>Site Seguro</span>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle className="w-4 h-4 text-indigo-500" />
        <span>Dados Verificados</span>
      </div>
    </div>
  );
}
