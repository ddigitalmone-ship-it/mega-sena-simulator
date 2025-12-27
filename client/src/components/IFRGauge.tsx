/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * Gauge circular para exibir IFR (Índice de Força Relativa)
 */

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface IFRGaugeProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

export function IFRGauge({
  value,
  size = 'md',
  label = "IFR",
  showValue = true,
  animated = true
}: IFRGaugeProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const sizeConfig = {
    sm: { width: 80, strokeWidth: 6, fontSize: 'text-lg' },
    md: { width: 140, strokeWidth: 8, fontSize: 'text-3xl' },
    lg: { width: 200, strokeWidth: 10, fontSize: 'text-5xl' }
  };
  
  const { width, strokeWidth, fontSize } = sizeConfig[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference * 0.75; // 270 degrees
  
  // Cor baseada no valor
  const getColor = () => {
    if (clampedValue >= 70) return '#f97316'; // Coral - Quente
    if (clampedValue >= 40) return '#4f46e5'; // Índigo - Neutro
    return '#14b8a6'; // Turquesa - Frio
  };
  
  const getLabel = () => {
    if (clampedValue >= 70) return 'Quente';
    if (clampedValue >= 40) return 'Neutro';
    return 'Frio';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        {/* Background track */}
        <svg
          className="absolute inset-0 -rotate-[135deg]"
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
        >
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            className="text-muted/30"
          />
        </svg>
        
        {/* Value arc */}
        <svg
          className="absolute inset-0 -rotate-[135deg]"
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
        >
          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            initial={animated ? { strokeDashoffset: circumference * 0.75 } : { strokeDashoffset }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${getColor()}50)`
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <motion.span
              className={cn("font-mono font-bold", fontSize)}
              style={{ color: getColor() }}
              initial={animated ? { opacity: 0, scale: 0.5 } : undefined}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {Math.round(clampedValue)}
            </motion.span>
          )}
          <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            {getLabel()}
          </span>
        </div>
        
        {/* Glow effect for high values */}
        {clampedValue >= 70 && (
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, ${getColor()}20 0%, transparent 70%)`
            }}
          />
        )}
      </div>
      
      {label && (
        <span className="mt-2 text-sm font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}

// Mini IFR indicator para uso em listas
interface MiniIFRProps {
  value: number;
  showLabel?: boolean;
}

export function MiniIFR({ value, showLabel = true }: MiniIFRProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const getColor = () => {
    if (clampedValue >= 70) return 'bg-orange-500';
    if (clampedValue >= 40) return 'bg-indigo-500';
    return 'bg-teal-500';
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getColor())}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono text-muted-foreground w-8">
          {Math.round(clampedValue)}
        </span>
      )}
    </div>
  );
}

// IFR Legend component
export function IFRLegend() {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-orange-500" />
        <span className="text-muted-foreground">Quente (70-100)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-500" />
        <span className="text-muted-foreground">Neutro (40-69)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-teal-500" />
        <span className="text-muted-foreground">Frio (0-39)</span>
      </div>
    </div>
  );
}
