/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * Gráficos de frequência histórica usando Recharts
 */

import { NumberStats } from "@/lib/megaSenaData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MiniIFR } from "./IFRGauge";

interface FrequencyChartProps {
  stats: NumberStats[];
  onNumberClick?: (number: number) => void;
  selectedNumbers?: number[];
}

type SortMode = 'number' | 'frequency' | 'ifr';
type FilterMode = 'all' | 'hot' | 'cold';

export function FrequencyChart({ 
  stats, 
  onNumberClick,
  selectedNumbers = []
}: FrequencyChartProps) {
  const [sortMode, setSortMode] = useState<SortMode>('number');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);

  const processedData = useMemo(() => {
    let filtered = [...stats];
    
    // Filtrar
    if (filterMode === 'hot') {
      filtered = filtered.filter(s => s.trend === 'hot');
    } else if (filterMode === 'cold') {
      filtered = filtered.filter(s => s.trend === 'cold');
    }
    
    // Ordenar
    switch (sortMode) {
      case 'frequency':
        filtered.sort((a, b) => b.frequency - a.frequency);
        break;
      case 'ifr':
        filtered.sort((a, b) => b.ifr - a.ifr);
        break;
      default:
        filtered.sort((a, b) => a.number - b.number);
    }
    
    return filtered;
  }, [stats, sortMode, filterMode]);

  const getBarColor = (entry: NumberStats) => {
    if (selectedNumbers.includes(entry.number)) return '#4f46e5';
    if (entry.trend === 'hot') return '#f97316';
    if (entry.trend === 'cold') return '#14b8a6';
    return '#a78bfa';
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    
    const data = payload[0].payload as NumberStats;
    
    return (
      <div className="neo-card p-3 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-mono font-bold text-primary">
            {data.number.toString().padStart(2, '0')}
          </span>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            data.trend === 'hot' && "bg-orange-100 text-orange-700",
            data.trend === 'cold' && "bg-teal-100 text-teal-700",
            data.trend === 'neutral' && "bg-purple-100 text-purple-700"
          )}>
            {data.trend === 'hot' ? 'Quente' : data.trend === 'cold' ? 'Frio' : 'Neutro'}
          </span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Frequência:</span>
            <span className="font-mono font-medium">{data.frequency}x</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Ranking:</span>
            <span className="font-mono font-medium">#{data.ranking}</span>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <span className="text-muted-foreground">IFR:</span>
            <MiniIFR value={data.ifr} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Frequências Históricas</h3>
        </div>
        
        {/* Controls */}
        <div className="flex gap-2">
          {/* Sort buttons */}
          <div className="flex rounded-lg overflow-hidden neo-card-inset">
            {(['number', 'frequency', 'ifr'] as SortMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setSortMode(mode)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  sortMode === mode 
                    ? "bg-primary text-white" 
                    : "hover:bg-muted"
                )}
              >
                {mode === 'number' ? 'Nº' : mode === 'frequency' ? 'Freq' : 'IFR'}
              </button>
            ))}
          </div>
          
          {/* Filter buttons */}
          <div className="flex rounded-lg overflow-hidden neo-card-inset">
            {(['all', 'hot', 'cold'] as FilterMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1",
                  filterMode === mode 
                    ? "bg-primary text-white" 
                    : "hover:bg-muted"
                )}
              >
                {mode === 'hot' && <TrendingUp className="w-3 h-3" />}
                {mode === 'cold' && <TrendingDown className="w-3 h-3" />}
                {mode === 'all' ? 'Todos' : mode === 'hot' ? 'Quentes' : 'Frios'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="neo-card p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={processedData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4f0" />
            <XAxis 
              dataKey="number" 
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickFormatter={(v) => v.toString().padStart(2, '0')}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#64748b' }}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="frequency" 
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={(data) => onNumberClick?.(data.number)}
              onMouseEnter={(data) => setHoveredNumber(data.number)}
              onMouseLeave={() => setHoveredNumber(null)}
            >
              {processedData.map((entry) => (
                <Cell 
                  key={entry.number}
                  fill={getBarColor(entry)}
                  opacity={hoveredNumber === null || hoveredNumber === entry.number ? 1 : 0.5}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 10 list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="neo-card p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            Top 10 Mais Sorteados
          </h4>
          <div className="space-y-2">
            {stats
              .sort((a, b) => b.frequency - a.frequency)
              .slice(0, 10)
              .map((s, idx) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                    selectedNumbers.includes(s.number) 
                      ? "bg-primary/10 border border-primary" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => onNumberClick?.(s.number)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">
                      {idx + 1}.
                    </span>
                    <span className="font-mono font-bold text-lg">
                      {s.number.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {s.frequency}x
                    </span>
                    <MiniIFR value={s.ifr} showLabel={false} />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        <div className="neo-card p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-teal-500" />
            Top 10 Menos Sorteados
          </h4>
          <div className="space-y-2">
            {stats
              .sort((a, b) => a.frequency - b.frequency)
              .slice(0, 10)
              .map((s, idx) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                    selectedNumbers.includes(s.number) 
                      ? "bg-primary/10 border border-primary" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => onNumberClick?.(s.number)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">
                      {idx + 1}.
                    </span>
                    <span className="font-mono font-bold text-lg">
                      {s.number.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {s.frequency}x
                    </span>
                    <MiniIFR value={s.ifr} showLabel={false} />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
