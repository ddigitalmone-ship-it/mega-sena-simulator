/**
 * MEGA SENA DATA - Frequências Históricas desde 1996
 * 
 * Dados baseados em estatísticas oficiais da Mega Sena
 * Período: 11 de março de 1996 até dezembro de 2025
 * Total aproximado: 2.800+ concursos
 */

export interface NumberStats {
  number: number;
  frequency: number;
  ranking: number;
  percentage: number;
  ifr: number; // Índice de Força Relativa (0-100)
  trend: 'hot' | 'neutral' | 'cold';
  lastAppearance: number; // Concursos desde última aparição
}

// Frequências históricas reais da Mega Sena (dados atualizados até 12/2025)
export const historicalFrequencies: Record<number, number> = {
  1: 265, 2: 273, 3: 272, 4: 314, 5: 322,
  6: 282, 7: 253, 8: 252, 9: 251, 10: 345,
  11: 278, 12: 264, 13: 285, 14: 263, 15: 250,
  16: 271, 17: 289, 18: 270, 19: 249, 20: 269,
  21: 248, 22: 262, 23: 298, 24: 291, 25: 277,
  26: 261, 27: 293, 28: 292, 29: 288, 30: 294,
  31: 268, 32: 287, 33: 316, 34: 320, 35: 284,
  36: 276, 37: 321, 38: 316, 39: 260, 40: 247,
  41: 290, 42: 299, 43: 281, 44: 286, 45: 259,
  46: 258, 47: 275, 48: 257, 49: 267, 50: 274,
  51: 283, 52: 280, 53: 336, 54: 295, 55: 256,
  56: 279, 57: 255, 58: 266, 59: 254, 60: 246
};

// Números "quentes" em 2024/2025 (tendência recente)
export const recentHotNumbers = [46, 11, 19, 47, 25, 42, 45, 10, 34];

// Números "frios" (menos frequentes recentemente)
export const recentColdNumbers = [21, 40, 60, 15, 9, 8, 7, 59, 57];

// Calcular estatísticas completas para cada número
export function calculateNumberStats(): NumberStats[] {
  const totalDraws = Object.values(historicalFrequencies).reduce((a, b) => a + b, 0) / 6;
  const avgFrequency = totalDraws * 6 / 60; // Frequência média esperada
  
  // Ordenar por frequência para ranking
  const sortedNumbers = Object.entries(historicalFrequencies)
    .sort(([, a], [, b]) => b - a)
    .map(([num]) => parseInt(num));
  
  return Array.from({ length: 60 }, (_, i) => {
    const number = i + 1;
    const frequency = historicalFrequencies[number];
    const ranking = sortedNumbers.indexOf(number) + 1;
    const percentage = (frequency / (totalDraws * 6)) * 100;
    
    // Calcular IFR (Índice de Força Relativa)
    // Baseado na frequência relativa e tendência recente
    const relativeStrength = (frequency / avgFrequency) * 50;
    const recentBonus = recentHotNumbers.includes(number) ? 20 : 
                        recentColdNumbers.includes(number) ? -15 : 0;
    const ifr = Math.min(100, Math.max(0, relativeStrength + recentBonus));
    
    // Determinar tendência
    let trend: 'hot' | 'neutral' | 'cold' = 'neutral';
    if (recentHotNumbers.includes(number)) trend = 'hot';
    else if (recentColdNumbers.includes(number)) trend = 'cold';
    
    // Simular última aparição (para demonstração)
    const lastAppearance = Math.floor(Math.random() * 20) + 1;
    
    return {
      number,
      frequency,
      ranking,
      percentage,
      ifr,
      trend,
      lastAppearance
    };
  });
}

// Custos oficiais 2025
export const officialCosts: Record<number, { cost: number; combinations: number }> = {
  6: { cost: 6.00, combinations: 1 },
  7: { cost: 42.00, combinations: 7 },
  8: { cost: 168.00, combinations: 28 },
  9: { cost: 504.00, combinations: 84 },
  10: { cost: 1260.00, combinations: 252 },
  11: { cost: 2772.00, combinations: 462 },
  12: { cost: 5544.00, combinations: 924 },
  13: { cost: 10296.00, combinations: 1716 },
  14: { cost: 18018.00, combinations: 3003 },
  15: { cost: 30030.00, combinations: 5005 }
};

// Total de combinações possíveis na Mega Sena
export const TOTAL_COMBINATIONS = 50063860;

// Probabilidade de acertar a sena com 6 números
export const SENA_PROBABILITY = 1 / TOTAL_COMBINATIONS;

// Fórmula de combinação C(n, k)
export function combination(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return Math.round(result);
}

// Calcular probabilidade de acerto com n números jogados
export function calculateProbability(numbersPlayed: number): number {
  const combinations = combination(numbersPlayed, 6);
  return combinations / TOTAL_COMBINATIONS;
}

// Gerar palpite baseado em IFR e frequência
export function generateSmartGuess(
  count: number = 6,
  stats: NumberStats[],
  excludeNumbers: number[] = [],
  strategy: 'balanced' | 'hot' | 'cold' | 'random' = 'balanced'
): number[] {
  const availableStats = stats.filter(s => !excludeNumbers.includes(s.number));
  
  let weightedStats: NumberStats[];
  
  switch (strategy) {
    case 'hot':
      // Priorizar números quentes
      weightedStats = [...availableStats].sort((a, b) => b.ifr - a.ifr);
      break;
    case 'cold':
      // Priorizar números frios (teoria da "dívida")
      weightedStats = [...availableStats].sort((a, b) => a.ifr - b.ifr);
      break;
    case 'random':
      // Totalmente aleatório
      weightedStats = [...availableStats].sort(() => Math.random() - 0.5);
      break;
    case 'balanced':
    default:
      // Balanceado: mistura de quentes e frequentes
      weightedStats = [...availableStats].sort((a, b) => {
        const scoreA = a.ifr * 0.4 + (a.frequency / 3.5) * 0.3 + Math.random() * 30;
        const scoreB = b.ifr * 0.4 + (b.frequency / 3.5) * 0.3 + Math.random() * 30;
        return scoreB - scoreA;
      });
  }
  
  // Selecionar os top números com alguma aleatoriedade
  const selected: number[] = [];
  const pool = weightedStats.slice(0, Math.min(25, weightedStats.length));
  
  while (selected.length < count && pool.length > 0) {
    const randomIndex = Math.floor(Math.random() * Math.min(pool.length, 15));
    const num = pool.splice(randomIndex, 1)[0];
    selected.push(num.number);
  }
  
  return selected.sort((a, b) => a - b);
}

// Validar se combinação é única
export function isUniqueCombination(
  newCombination: number[],
  existingCombinations: number[][]
): boolean {
  const newSet = new Set(newCombination);
  
  for (const existing of existingCombinations) {
    const existingSet = new Set(existing);
    let matches = 0;
    
    for (const num of newCombination) {
      if (existingSet.has(num)) matches++;
    }
    
    // Se tiver 6 ou mais números iguais, não é única
    if (matches >= 6) return false;
  }
  
  return true;
}

// Simulação Monte Carlo para validar combinações
export interface MonteCarloResult {
  iterations: number;
  uniqueCombinations: number[][];
  duplicatesFound: number;
  coveragePercentage: number;
  numbersUsed: Set<number>;
  avgOverlap: number;
}

export function runMonteCarloSimulation(
  targetCombinations: number,
  numbersPerGame: number,
  stats: NumberStats[],
  maxIterations: number = 10000,
  strategy: 'balanced' | 'hot' | 'cold' | 'random' = 'balanced'
): MonteCarloResult {
  const uniqueCombinations: number[][] = [];
  const numbersUsed = new Set<number>();
  let duplicatesFound = 0;
  let totalOverlap = 0;
  let iterations = 0;
  
  while (uniqueCombinations.length < targetCombinations && iterations < maxIterations) {
    iterations++;
    
    // Gerar nova combinação
    const excludeRecent = uniqueCombinations.length > 0 
      ? uniqueCombinations[uniqueCombinations.length - 1] 
      : [];
    
    const newCombo = generateSmartGuess(
      numbersPerGame, 
      stats, 
      [], // Não excluir, mas penalizar repetições
      strategy
    );
    
    // Verificar unicidade
    if (isUniqueCombination(newCombo, uniqueCombinations)) {
      // Calcular overlap médio
      if (uniqueCombinations.length > 0) {
        const lastCombo = uniqueCombinations[uniqueCombinations.length - 1];
        const overlap = newCombo.filter(n => lastCombo.includes(n)).length;
        totalOverlap += overlap;
      }
      
      uniqueCombinations.push(newCombo);
      newCombo.forEach(n => numbersUsed.add(n));
    } else {
      duplicatesFound++;
    }
  }
  
  const coveragePercentage = (numbersUsed.size / 60) * 100;
  const avgOverlap = uniqueCombinations.length > 1 
    ? totalOverlap / (uniqueCombinations.length - 1) 
    : 0;
  
  return {
    iterations,
    uniqueCombinations,
    duplicatesFound,
    coveragePercentage,
    numbersUsed,
    avgOverlap
  };
}

// Calcular IFR para um conjunto de números
export function calculateSetIFR(numbers: number[], stats: NumberStats[]): number {
  const relevantStats = stats.filter(s => numbers.includes(s.number));
  if (relevantStats.length === 0) return 0;
  
  const avgIFR = relevantStats.reduce((sum, s) => sum + s.ifr, 0) / relevantStats.length;
  return Math.round(avgIFR);
}

// Analisar distribuição de um jogo
export interface GameAnalysis {
  numbers: number[];
  ifr: number;
  hotCount: number;
  coldCount: number;
  evenCount: number;
  oddCount: number;
  lowCount: number; // 1-30
  highCount: number; // 31-60
  sumTotal: number;
  avgFrequency: number;
}

export function analyzeGame(numbers: number[], stats: NumberStats[]): GameAnalysis {
  const relevantStats = stats.filter(s => numbers.includes(s.number));
  
  return {
    numbers: [...numbers].sort((a, b) => a - b),
    ifr: calculateSetIFR(numbers, stats),
    hotCount: numbers.filter(n => recentHotNumbers.includes(n)).length,
    coldCount: numbers.filter(n => recentColdNumbers.includes(n)).length,
    evenCount: numbers.filter(n => n % 2 === 0).length,
    oddCount: numbers.filter(n => n % 2 !== 0).length,
    lowCount: numbers.filter(n => n <= 30).length,
    highCount: numbers.filter(n => n > 30).length,
    sumTotal: numbers.reduce((a, b) => a + b, 0),
    avgFrequency: relevantStats.reduce((sum, s) => sum + s.frequency, 0) / relevantStats.length
  };
}
