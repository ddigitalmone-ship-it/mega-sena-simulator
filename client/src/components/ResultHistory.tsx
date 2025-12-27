/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * 
 * Componente para exibir histórico de resultados da Mega Sena
 * com integração à API da Caixa
 */

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatCurrency,
  formatDate,
  getResultsWithFallback,
  MegaSenaResult,
} from "@/lib/loteriasApi";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  RefreshCw,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface ResultHistoryProps {
  onSelectResult?: (result: MegaSenaResult) => void;
  selectedResultId?: number;
}

export function ResultHistory({ onSelectResult, selectedResultId }: ResultHistoryProps) {
  const [results, setResults] = useState<MegaSenaResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getResultsWithFallback(10);
      setResults(data);
    } catch (err) {
      setError('Erro ao carregar resultados. Usando dados de exemplo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const toggleExpand = (concurso: number) => {
    setExpandedId(prev => prev === concurso ? null : concurso);
  };

  if (loading) {
    return (
      <div className="neo-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="neo-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Últimos Resultados
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchResults}
          disabled={loading}
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-amber-600 mb-4 p-2 bg-amber-50 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        <AnimatePresence>
          {results.map((result, index) => (
            <motion.div
              key={result.concurso}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "neo-card-inset p-3 cursor-pointer transition-all",
                selectedResultId === result.concurso && "ring-2 ring-primary",
                "hover:shadow-md"
              )}
              onClick={() => onSelectResult?.(result)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">
                    #{result.concurso}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(result.data)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(result.concurso);
                  }}
                >
                  {expandedId === result.concurso ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Dezenas */}
              <div className="flex flex-wrap gap-2 mb-2">
                {result.dezenas.map((dezena, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 
                               text-white font-bold text-sm flex items-center justify-center
                               shadow-md"
                  >
                    {dezena}
                  </motion.div>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-xs">
                {result.acumulou ? (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Acumulou
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {result.premiacoes[0]?.ganhadores || 0} ganhador(es)
                  </span>
                )}
                {result.estadosPremiados.length > 0 && (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {result.estadosPremiados.join(', ')}
                  </span>
                )}
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedId === result.concurso && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 pt-3 border-t overflow-hidden"
                  >
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Local: {result.local}
                      </p>
                      
                      <div className="text-xs space-y-1">
                        <p className="font-medium">Premiações:</p>
                        {result.premiacoes.map((p, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{p.descricao} ({p.ganhadores} ganhadores)</span>
                            <span className="font-mono">
                              {formatCurrency(p.valorPremio)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {result.valorEstimadoProximoConcurso > 0 && (
                        <div className="mt-2 p-2 bg-primary/5 rounded-lg">
                          <p className="text-xs">
                            <span className="text-muted-foreground">Próximo concurso #{result.proximoConcurso}:</span>
                            <br />
                            <span className="font-bold text-primary">
                              {formatCurrency(result.valorEstimadoProximoConcurso)}
                            </span>
                            <span className="text-muted-foreground"> estimado</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Componente para exibir um único resultado de forma destacada
 */
interface ResultCardProps {
  result: MegaSenaResult;
  highlightNumbers?: number[];
  className?: string;
}

export function ResultCard({ result, highlightNumbers = [], className }: ResultCardProps) {
  const resultNumbers = result.dezenas.map(d => parseInt(d, 10));
  const matchCount = highlightNumbers.filter(n => resultNumbers.includes(n)).length;

  return (
    <div className={cn("neo-card p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-bold text-lg">Concurso #{result.concurso}</h4>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(result.data)}
          </p>
        </div>
        {result.acumulou ? (
          <div className="text-right">
            <span className="text-xs text-amber-600">Acumulou para</span>
            <p className="font-bold text-amber-600">
              {formatCurrency(result.valorAcumuladoProximoConcurso)}
            </p>
          </div>
        ) : (
          <div className="text-right">
            <span className="text-xs text-green-600">Prêmio principal</span>
            <p className="font-bold text-green-600">
              {formatCurrency(result.premiacoes[0]?.valorPremio || 0)}
            </p>
          </div>
        )}
      </div>

      {/* Dezenas com destaque */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {result.dezenas.map((dezena, idx) => {
          const num = parseInt(dezena, 10);
          const isMatch = highlightNumbers.includes(num);
          
          return (
            <motion.div
              key={idx}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring' }}
              className={cn(
                "w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center shadow-lg",
                isMatch
                  ? "bg-gradient-to-br from-green-400 to-green-600 text-white ring-2 ring-green-300"
                  : "bg-gradient-to-br from-primary to-primary/80 text-white"
              )}
            >
              {dezena}
            </motion.div>
          );
        })}
      </div>

      {/* Resumo de acertos */}
      {highlightNumbers.length > 0 && (
        <div className={cn(
          "text-center p-3 rounded-lg",
          matchCount >= 4 ? "bg-green-100" : matchCount >= 2 ? "bg-amber-100" : "bg-gray-100"
        )}>
          <p className={cn(
            "font-bold",
            matchCount >= 4 ? "text-green-700" : matchCount >= 2 ? "text-amber-700" : "text-gray-700"
          )}>
            {matchCount === 6 && "🎉 SENA! Todos os 6 números!"}
            {matchCount === 5 && "🎊 QUINA! 5 números acertados!"}
            {matchCount === 4 && "👏 QUADRA! 4 números acertados!"}
            {matchCount === 3 && "Terno! 3 números acertados"}
            {matchCount === 2 && "Duque! 2 números acertados"}
            {matchCount === 1 && "1 número acertado"}
            {matchCount === 0 && "Nenhum número acertado"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ResultHistory;
