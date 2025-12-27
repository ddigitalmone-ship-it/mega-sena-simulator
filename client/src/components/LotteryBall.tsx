/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * Componente de bola de loteria com efeitos visuais baseados em IFR e tendência
 */

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LotteryBallProps {
  number: number;
  selected?: boolean;
  trend?: 'hot' | 'neutral' | 'cold';
  ifr?: number;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showIFR?: boolean;
  disabled?: boolean;
  animate?: boolean;
}

export function LotteryBall({
  number,
  selected = false,
  trend = 'neutral',
  ifr = 50,
  onClick,
  size = 'md',
  showIFR = false,
  disabled = false,
  animate = true
}: LotteryBallProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-lg',
    lg: 'w-20 h-20 text-2xl'
  };

  const getVariantClass = () => {
    if (selected) return 'lottery-ball-selected';
    if (trend === 'hot') return 'lottery-ball-hot';
    if (trend === 'cold') return 'lottery-ball-cold';
    return 'lottery-ball-default';
  };

  const ballContent = (
    <div
      className={cn(
        "lottery-ball relative",
        sizeClasses[size],
        getVariantClass(),
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && onClick && "cursor-pointer",
        ifr > 70 && !selected && "ifr-high"
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <span className="relative z-10 font-mono font-bold">
        {number.toString().padStart(2, '0')}
      </span>
      
      {/* IFR indicator ring */}
      {showIFR && !selected && (
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${ifr * 2.89} 289`}
            className={cn(
              "opacity-40",
              ifr > 70 ? "text-coral-500" : ifr > 40 ? "text-indigo-500" : "text-turquoise-500"
            )}
            style={{
              stroke: ifr > 70 ? '#f97316' : ifr > 40 ? '#4f46e5' : '#14b8a6'
            }}
          />
        </svg>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        whileHover={!disabled ? { scale: 1.05 } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {ballContent}
      </motion.div>
    );
  }

  return ballContent;
}

// Grid de todas as bolas (1-60)
interface LotteryBallGridProps {
  selectedNumbers: number[];
  onToggle: (number: number) => void;
  stats?: Array<{ number: number; ifr: number; trend: 'hot' | 'neutral' | 'cold' }>;
  maxSelection?: number;
  showIFR?: boolean;
}

export function LotteryBallGrid({
  selectedNumbers,
  onToggle,
  stats = [],
  maxSelection = 15,
  showIFR = false
}: LotteryBallGridProps) {
  const getNumberStats = (num: number) => {
    const stat = stats.find(s => s.number === num);
    return stat || { ifr: 50, trend: 'neutral' as const };
  };

  const canSelect = selectedNumbers.length < maxSelection;

  return (
    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 sm:gap-3 p-4">
      {Array.from({ length: 60 }, (_, i) => i + 1).map(num => {
        const { ifr, trend } = getNumberStats(num);
        const isSelected = selectedNumbers.includes(num);
        
        return (
          <LotteryBall
            key={num}
            number={num}
            selected={isSelected}
            trend={trend}
            ifr={ifr}
            showIFR={showIFR}
            onClick={() => {
              if (isSelected || canSelect) {
                onToggle(num);
              }
            }}
            disabled={!isSelected && !canSelect}
            size="md"
          />
        );
      })}
    </div>
  );
}

// Display de números selecionados
interface SelectedNumbersDisplayProps {
  numbers: number[];
  onRemove?: (number: number) => void;
  label?: string;
}

export function SelectedNumbersDisplay({
  numbers,
  onRemove,
  label = "Números Selecionados"
}: SelectedNumbersDisplayProps) {
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  return (
    <div className="neo-card p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">{label}</h3>
      <div className="flex flex-wrap gap-2 min-h-[60px]">
        {sortedNumbers.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            Selecione os números no grid acima
          </p>
        ) : (
          sortedNumbers.map(num => (
            <motion.div
              key={num}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              layout
            >
              <LotteryBall
                number={num}
                selected
                size="sm"
                onClick={onRemove ? () => onRemove(num) : undefined}
                animate={false}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
