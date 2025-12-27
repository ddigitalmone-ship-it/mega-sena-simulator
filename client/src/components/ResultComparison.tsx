/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * 
 * Componente para comparar palpites gerados com resultados oficiais
 */

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  compareWithResult,
  formatCurrency,
  formatDate,
  getResultsWithFallback,
  MegaSenaResult,
} from "@/lib/loteriasApi";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Check,
  ChevronRight,
  Loader2,
  Search,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ResultComparisonProps {
  selectedNumbers: number[];
  generatedCombinations?: number[][];
}

export function ResultComparison({
  selectedNumbers,
  generatedCombinations = [],
}: ResultComparisonProps) {
  const [results, setResults] = useState<MegaSenaResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcurso, setSelectedConcurso] = useState<string>("");
  const [comparisonMode, setComparisonMode] = useState<'single' | 'batch'>('single');

  // Combinar números selecionados com combinações geradas
  const allCombinations = useMemo(() => {
    const combos: { id: string; numbers: number[]; label: string }[] = [];
    
    if (selectedNumbers.length >= 6) {
      combos.push({
        id: 'selected',
        numbers: selectedNumbers.slice(0, 6),
        label: 'Seleção Atual',
      });
    }

    generatedCombinations.forEach((combo, idx) => {
      combos.push({
        id: `gen-${idx}`,
        numbers: combo,
        label: `Jogo ${idx + 1}`,
      });
    });

    return combos;
  }, [selectedNumbers, generatedCombinations]);

  // Buscar resultados
  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getResultsWithFallback(20);
      setResults(data);
      if (data.length > 0 && !selectedConcurso) {
        setSelectedConcurso(data[0].concurso.toString());
      }
    } catch (err) {
      console.error('Erro ao buscar resultados:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedConcurso]);

  useEffect(() => {
    fetchResults();
  }, []);

  // Resultado selecionado
  const selectedResult = useMemo(() => {
    return results.find(r => r.concurso.toString() === selectedConcurso);
  }, [results, selectedConcurso]);

  // Comparações
  const comparisons = useMemo(() => {
    if (!selectedResult) return [];

    return allCombinations.map(combo => ({
      ...combo,
      comparison: compareWithResult(combo.numbers, selectedResult),
    }));
  }, [allCombinations, selectedResult]);

  // Melhor resultado
  const bestResult = useMemo(() => {
    if (comparisons.length === 0) return null;
    return comparisons.reduce((best, current) => 
      current.comparison.matchCount > best.comparison.matchCount ? current : best
    );
  }, [comparisons]);

  if (allCombinations.length === 0) {
    return (
      <div className="neo-card p-6 text-center">
        <Search className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="font-semibold mb-2">Nenhum Palpite para Comparar</h3>
        <p className="text-sm text-muted-foreground">
          Selecione pelo menos 6 números ou gere combinações via Monte Carlo
          para comparar com os resultados oficiais.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Seletor de Concurso */}
      <div className="neo-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Comparar com Resultado
          </h3>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        </div>

        <div className="flex gap-3">
          <Select
            value={selectedConcurso}
            onValueChange={setSelectedConcurso}
            disabled={loading}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Selecione um concurso" />
            </SelectTrigger>
            <SelectContent>
              {results.map(result => (
                <SelectItem key={result.concurso} value={result.concurso.toString()}>
                  #{result.concurso} - {formatDate(result.data)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-1">
            <Button
              variant={comparisonMode === 'single' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonMode('single')}
            >
              Individual
            </Button>
            <Button
              variant={comparisonMode === 'batch' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonMode('batch')}
              disabled={allCombinations.length <= 1}
            >
              Todos
            </Button>
          </div>
        </div>
      </div>

      {/* Resultado Oficial */}
      {selectedResult && (
        <div className="neo-card p-4">
          <p className="text-xs text-muted-foreground mb-2">Resultado Oficial</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedResult.dezenas.map((dezena, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 
                           text-white font-bold flex items-center justify-center shadow-md"
              >
                {dezena}
              </motion.div>
            ))}
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {selectedResult.acumulou ? (
              <span className="text-amber-600">
                Acumulou: {formatCurrency(selectedResult.valorAcumuladoProximoConcurso)}
              </span>
            ) : (
              <span className="text-green-600">
                Prêmio: {formatCurrency(selectedResult.premiacoes[0]?.valorPremio || 0)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Comparações */}
      <AnimatePresence mode="wait">
        {comparisonMode === 'single' ? (
          <motion.div
            key="single"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-3"
          >
            {comparisons.map((item, idx) => (
              <ComparisonCard
                key={item.id}
                label={item.label}
                numbers={item.numbers}
                comparison={item.comparison}
                resultNumbers={selectedResult?.dezenas.map(d => parseInt(d, 10)) || []}
                delay={idx * 0.05}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="batch"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <BatchComparisonSummary
              comparisons={comparisons}
              bestResult={bestResult}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Card de comparação individual
 */
interface ComparisonCardProps {
  label: string;
  numbers: number[];
  comparison: ReturnType<typeof compareWithResult>;
  resultNumbers: number[];
  delay?: number;
}

function ComparisonCard({
  label,
  numbers,
  comparison,
  resultNumbers,
  delay = 0,
}: ComparisonCardProps) {
  const { matches, matchCount } = comparison;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "neo-card-inset p-4",
        matchCount >= 4 && "ring-2 ring-green-400",
        matchCount >= 6 && "ring-4 ring-green-500 bg-green-50"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium">{label}</span>
        <MatchBadge count={matchCount} />
      </div>

      <div className="flex flex-wrap gap-2">
        {numbers.map((num, idx) => {
          const isMatch = matches.includes(num);
          return (
            <motion.div
              key={idx}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + idx * 0.03 }}
              className={cn(
                "w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center",
                "transition-all duration-300",
                isMatch
                  ? "bg-green-500 text-white shadow-lg shadow-green-200"
                  : "bg-gray-200 text-gray-600"
              )}
            >
              {num.toString().padStart(2, '0')}
              {isMatch && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Check className="w-3 h-3 text-green-600" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {matchCount >= 4 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t"
        >
          <div className="flex items-center gap-2 text-green-600">
            <Award className="w-4 h-4" />
            <span className="font-medium">{comparison.prize}</span>
            {comparison.prizeValue > 0 && (
              <span className="ml-auto font-bold">
                {formatCurrency(comparison.prizeValue)}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Badge de acertos
 */
function MatchBadge({ count }: { count: number }) {
  const config = {
    6: { bg: 'bg-green-500', text: 'SENA!', icon: Sparkles },
    5: { bg: 'bg-green-400', text: 'QUINA!', icon: Trophy },
    4: { bg: 'bg-amber-400', text: 'QUADRA!', icon: Award },
    3: { bg: 'bg-blue-400', text: '3 acertos', icon: Check },
    2: { bg: 'bg-gray-400', text: '2 acertos', icon: Check },
    1: { bg: 'bg-gray-300', text: '1 acerto', icon: Check },
    0: { bg: 'bg-gray-200', text: 'Nenhum', icon: X },
  }[count] || { bg: 'bg-gray-200', text: `${count}`, icon: Check };

  const Icon = config.icon;

  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1",
      config.bg,
      count >= 4 ? "text-white" : "text-gray-700"
    )}>
      <Icon className="w-3 h-3" />
      {config.text}
    </span>
  );
}

/**
 * Resumo de comparação em lote
 */
interface ComparisonItem {
  id: string;
  label: string;
  numbers: number[];
  comparison: ReturnType<typeof compareWithResult>;
}

interface BatchComparisonSummaryProps {
  comparisons: ComparisonItem[];
  bestResult: ComparisonItem | null;
}

function BatchComparisonSummary({ comparisons, bestResult }: BatchComparisonSummaryProps) {
  // Estatísticas
  const stats = useMemo(() => {
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    comparisons.forEach(c => {
      const key = Math.min(c.comparison.matchCount, 6) as keyof typeof counts;
      counts[key]++;
    });
    return counts;
  }, [comparisons]);

  return (
    <div className="neo-card p-4 space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <Search className="w-4 h-4 text-primary" />
        Resumo de {comparisons.length} Jogos
      </h4>

      {/* Distribuição de acertos */}
      <div className="grid grid-cols-7 gap-1">
        {[6, 5, 4, 3, 2, 1, 0].map(count => (
          <div key={count} className="text-center">
            <div className={cn(
              "text-lg font-bold",
              count >= 4 ? "text-green-600" : count >= 2 ? "text-amber-600" : "text-gray-400"
            )}>
              {stats[count as keyof typeof stats]}
            </div>
            <div className="text-xs text-muted-foreground">
              {count === 6 ? 'Sena' : count === 5 ? 'Quina' : count === 4 ? 'Quadra' : `${count}`}
            </div>
          </div>
        ))}
      </div>

      {/* Melhor resultado */}
      {bestResult && bestResult.comparison.matchCount > 0 && (
        <div className="neo-card-inset p-3">
          <p className="text-xs text-muted-foreground mb-2">Melhor Resultado</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{bestResult.label}</span>
              <div className="flex gap-1 mt-1">
                {bestResult.numbers.map((n: number, i: number) => (
                  <span
                    key={i}
                    className={cn(
                      "w-6 h-6 rounded-full text-xs flex items-center justify-center",
                      bestResult.comparison.matches.includes(n)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    )}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <MatchBadge count={bestResult.comparison.matchCount} />
          </div>
        </div>
      )}

      {/* Lista compacta */}
      <div className="max-h-48 overflow-y-auto space-y-1">
        {comparisons
          .sort((a, b) => b.comparison.matchCount - a.comparison.matchCount)
          .map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded"
            >
              <span className="text-sm">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">
                  {item.numbers.map(n => n.toString().padStart(2, '0')).join('-')}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <MatchBadge count={item.comparison.matchCount} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ResultComparison;
