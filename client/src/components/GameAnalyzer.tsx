/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * Componente para análise detalhada de um jogo/combinação
 */

import {
  analyzeGame,
  calculateProbability,
  GameAnalysis,
  NumberStats,
  officialCosts,
  TOTAL_COMBINATIONS,
} from "@/lib/megaSenaData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calculator,
  CircleDot,
  Flame,
  Hash,
  Percent,
  Snowflake,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";
import { IFRGauge } from "./IFRGauge";
import { LotteryBall } from "./LotteryBall";

interface GameAnalyzerProps {
  numbers: number[];
  stats: NumberStats[];
}

export function GameAnalyzer({ numbers, stats }: GameAnalyzerProps) {
  const analysis = useMemo(() => {
    if (numbers.length < 6) return null;
    return analyzeGame(numbers, stats);
  }, [numbers, stats]);

  const probability = useMemo(() => {
    if (numbers.length < 6) return 0;
    return calculateProbability(numbers.length);
  }, [numbers.length]);

  const cost = useMemo(() => {
    return officialCosts[numbers.length]?.cost || 0;
  }, [numbers.length]);

  const combinations = useMemo(() => {
    return officialCosts[numbers.length]?.combinations || 0;
  }, [numbers.length]);

  if (!analysis || numbers.length < 6) {
    return (
      <div className="neo-card p-6 text-center">
        <CircleDot className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
        <p className="text-muted-foreground">
          Selecione pelo menos 6 números para ver a análise
        </p>
      </div>
    );
  }

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    subValue,
    color = "text-primary"
  }: {
    icon: any;
    label: string;
    value: string | number;
    subValue?: string;
    color?: string;
  }) => (
    <div className="neo-card-inset p-4 text-center">
      <Icon className={cn("w-5 h-5 mx-auto mb-2", color)} />
      <p className="text-2xl font-bold font-mono">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {subValue && (
        <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header with selected numbers */}
      <div className="neo-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Jogo Selecionado ({numbers.length} números)
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {analysis.numbers.map((num, idx) => {
            const stat = stats.find(s => s.number === num);
            return (
              <motion.div
                key={num}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <LotteryBall
                  number={num}
                  selected
                  trend={stat?.trend}
                  size="md"
                  animate={false}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* IFR Gauge and main stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neo-card p-6 flex justify-center items-center">
          <IFRGauge value={analysis.ifr} size="lg" label="IFR do Jogo" />
        </div>

        <div className="neo-card p-4 col-span-1 md:col-span-2">
          <h4 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Estatísticas do Jogo
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={Flame}
              label="Quentes"
              value={analysis.hotCount}
              color="text-orange-500"
            />
            <StatCard
              icon={Snowflake}
              label="Frios"
              value={analysis.coldCount}
              color="text-teal-500"
            />
            <StatCard
              icon={Hash}
              label="Pares"
              value={analysis.evenCount}
              color="text-purple-500"
            />
            <StatCard
              icon={Hash}
              label="Ímpares"
              value={analysis.oddCount}
              color="text-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Distribution analysis */}
      <div className="neo-card p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Distribuição
        </h4>
        
        <div className="space-y-4">
          {/* Low vs High */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Baixos (1-30): {analysis.lowCount}</span>
              <span>Altos (31-60): {analysis.highCount}</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden flex">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-400 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: `${(analysis.lowCount / numbers.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${(analysis.highCount / numbers.length) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Even vs Odd */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Pares: {analysis.evenCount}</span>
              <span>Ímpares: {analysis.oddCount}</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden flex">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(analysis.evenCount / numbers.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${(analysis.oddCount / numbers.length) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Probability and cost */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="neo-card p-4 text-center">
          <Percent className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-xs text-muted-foreground mb-1">Probabilidade</p>
          <p className="text-lg font-bold font-mono">
            1 em {Math.round(1 / probability).toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {(probability * 100).toFixed(6)}%
          </p>
        </div>

        <div className="neo-card p-4 text-center">
          <Calculator className="w-6 h-6 mx-auto mb-2 text-secondary" />
          <p className="text-xs text-muted-foreground mb-1">Custo do Jogo</p>
          <p className="text-lg font-bold font-mono text-secondary">
            R$ {cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {combinations} combinação(ões)
          </p>
        </div>

        <div className="neo-card p-4 text-center">
          <Hash className="w-6 h-6 mx-auto mb-2 text-accent" />
          <p className="text-xs text-muted-foreground mb-1">Soma Total</p>
          <p className="text-lg font-bold font-mono">
            {analysis.sumTotal}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Média: {(analysis.sumTotal / numbers.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Fun fact */}
      <div className="neo-card-inset p-4 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Curiosidade:</span> Para garantir a sena jogando todas as {TOTAL_COMBINATIONS.toLocaleString('pt-BR')} combinações, 
          você gastaria <span className="font-bold text-primary">R$ {(TOTAL_COMBINATIONS * 6).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </p>
      </div>
    </motion.div>
  );
}
