/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * Componente de simulação Monte Carlo para validação de combinações únicas
 */

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  MonteCarloResult,
  NumberStats,
  officialCosts,
  runMonteCarloSimulation,
} from "@/lib/megaSenaData";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, CheckCircle2, Dices, Sparkles, Target, Zap } from "lucide-react";
import { useCallback, useState } from "react";
import { LotteryBall } from "./LotteryBall";

interface MonteCarloSimulatorProps {
  stats: NumberStats[];
  onResultsGenerated?: (combinations: number[][]) => void;
}

type Strategy = 'balanced' | 'hot' | 'cold' | 'random';

export function MonteCarloSimulator({ stats, onResultsGenerated }: MonteCarloSimulatorProps) {
  const [targetGames, setTargetGames] = useState(7);
  const [numbersPerGame, setNumbersPerGame] = useState(6);
  const [strategy, setStrategy] = useState<Strategy>('balanced');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<MonteCarloResult | null>(null);
  const [expandedGame, setExpandedGame] = useState<number | null>(null);

  const runSimulation = useCallback(async () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);

    // Simular progresso visual
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 15, 90));
    }, 100);

    // Executar simulação (com pequeno delay para UX)
    await new Promise(resolve => setTimeout(resolve, 500));

    const simulationResult = runMonteCarloSimulation(
      targetGames,
      numbersPerGame,
      stats,
      10000,
      strategy
    );

    clearInterval(progressInterval);
    setProgress(100);

    await new Promise(resolve => setTimeout(resolve, 300));

    setResult(simulationResult);
    setIsRunning(false);

    if (onResultsGenerated) {
      onResultsGenerated(simulationResult.uniqueCombinations);
    }
  }, [targetGames, numbersPerGame, strategy, stats, onResultsGenerated]);

  const getCost = () => {
    const costInfo = officialCosts[numbersPerGame];
    if (!costInfo) return 0;
    return costInfo.cost * targetGames;
  };

  const strategyOptions: { value: Strategy; label: string; icon: React.ReactNode; description: string }[] = [
    { 
      value: 'balanced', 
      label: 'Balanceado', 
      icon: <Target className="w-4 h-4" />,
      description: 'Mix de frequência histórica e tendência recente'
    },
    { 
      value: 'hot', 
      label: 'Números Quentes', 
      icon: <Zap className="w-4 h-4" />,
      description: 'Prioriza números com maior IFR'
    },
    { 
      value: 'cold', 
      label: 'Números Frios', 
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Teoria da "dívida" estatística'
    },
    { 
      value: 'random', 
      label: 'Aleatório', 
      icon: <Dices className="w-4 h-4" />,
      description: 'Distribuição totalmente aleatória'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Simulação Monte Carlo</h2>
          <p className="text-sm text-muted-foreground">
            Gere combinações únicas validadas estatisticamente
          </p>
        </div>
      </div>

      {/* Configuration */}
      <div className="neo-card p-6 space-y-6">
        {/* Number of games */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Quantidade de Jogos</label>
            <span className="text-2xl font-mono font-bold text-primary">{targetGames}</span>
          </div>
          <Slider
            value={[targetGames]}
            onValueChange={([v]) => setTargetGames(v)}
            min={1}
            max={20}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 jogo</span>
            <span>20 jogos</span>
          </div>
        </div>

        {/* Numbers per game */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Números por Jogo</label>
            <span className="text-2xl font-mono font-bold text-primary">{numbersPerGame}</span>
          </div>
          <Slider
            value={[numbersPerGame]}
            onValueChange={([v]) => setNumbersPerGame(v)}
            min={6}
            max={15}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>6 números (R$ 6,00)</span>
            <span>15 números (R$ 30.030,00)</span>
          </div>
        </div>

        {/* Strategy selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Estratégia de Geração</label>
          <div className="grid grid-cols-2 gap-3">
            {strategyOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setStrategy(opt.value)}
                className={cn(
                  "p-3 rounded-xl text-left transition-all",
                  strategy === opt.value
                    ? "neo-card-inset border-2 border-primary"
                    : "neo-card hover:scale-[1.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "p-1.5 rounded-lg",
                    strategy === opt.value ? "bg-primary text-white" : "bg-muted"
                  )}>
                    {opt.icon}
                  </span>
                  <span className="font-medium text-sm">{opt.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Cost summary */}
        <div className="neo-card-inset p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Custo Total Estimado</p>
            <p className="text-2xl font-bold text-primary">
              R$ {getCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Combinações</p>
            <p className="text-lg font-mono">
              {(officialCosts[numbersPerGame]?.combinations || 1) * targetGames}
            </p>
          </div>
        </div>

        {/* Run button */}
        <Button
          onClick={runSimulation}
          disabled={isRunning}
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {isRunning ? (
            <>
              <Activity className="w-5 h-5 mr-2 animate-spin" />
              Simulando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Gerar Palpites
            </>
          )}
        </Button>

        {/* Progress bar */}
        <AnimatePresence>
          {isRunning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground mt-2">
                Validando combinações únicas...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Stats summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="neo-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">
                  {result.uniqueCombinations.length}
                </p>
                <p className="text-xs text-muted-foreground">Jogos Gerados</p>
              </div>
              <div className="neo-card p-4 text-center">
                <p className="text-2xl font-bold text-accent">
                  {result.coveragePercentage.toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground">Cobertura</p>
              </div>
              <div className="neo-card p-4 text-center">
                <p className="text-2xl font-bold text-secondary">
                  {result.iterations}
                </p>
                <p className="text-xs text-muted-foreground">Iterações</p>
              </div>
              <div className="neo-card p-4 text-center">
                <p className="text-2xl font-bold text-muted-foreground">
                  {result.avgOverlap.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Sobreposição Média</p>
              </div>
            </div>

            {/* Generated combinations */}
            <div className="neo-card p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Combinações Geradas
              </h3>
              <div className="space-y-3">
                {result.uniqueCombinations.map((combo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "neo-card-inset p-3 cursor-pointer transition-all",
                      expandedGame === idx && "ring-2 ring-primary"
                    )}
                    onClick={() => setExpandedGame(expandedGame === idx ? null : idx)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Jogo {idx + 1}
                      </span>
                      <div className="flex gap-1.5">
                        {combo.map(num => (
                          <LotteryBall
                            key={num}
                            number={num}
                            selected
                            size="sm"
                            animate={false}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Numbers coverage visualization */}
            <div className="neo-card p-4">
              <h3 className="font-semibold mb-4">Números Utilizados ({result.numbersUsed.size}/60)</h3>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                  <div
                    key={num}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono",
                      result.numbersUsed.has(num)
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
