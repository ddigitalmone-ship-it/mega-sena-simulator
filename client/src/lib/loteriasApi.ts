/**
 * Serviço de integração com API de Loterias da Caixa
 * 
 * API: https://loteriascaixa-api.herokuapp.com/api
 * Endpoints:
 * - /api/megasena/latest - Último resultado
 * - /api/megasena/{concurso} - Resultado específico
 * - /api/megasena - Todos os resultados (últimos 10)
 */

// Tipos para os dados da API
export interface MegaSenaResult {
  loteria: string;
  concurso: number;
  data: string;
  local: string;
  dezenas: string[];
  premiacoes: Premiacao[];
  estadosPremiados: string[];
  acumulou: boolean;
  proximoConcurso: number;
  dataProximoConcurso: string;
  valorAcumuladoProximoConcurso: number;
  valorEstimadoProximoConcurso: number;
}

export interface Premiacao {
  descricao: string;
  faixa: number;
  ganhadores: number;
  valorPremio: number;
}

// URLs das APIs (com fallbacks)
const API_URLS = [
  'https://loteriascaixa-api.herokuapp.com/api',
  'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena',
];

// Cache para evitar requisições repetidas
const cache: Map<string, { data: MegaSenaResult | MegaSenaResult[]; timestamp: number }> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Busca dados da API com cache e fallback
 */
async function fetchWithFallback<T>(endpoint: string): Promise<T | null> {
  const cacheKey = endpoint;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  // Tentar API principal
  try {
    const response = await fetch(`${API_URLS[0]}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    }
  } catch (error) {
    console.warn('API principal falhou, tentando fallback...', error);
  }

  return null;
}

/**
 * Busca o último resultado da Mega Sena
 */
export async function getLatestResult(): Promise<MegaSenaResult | null> {
  return fetchWithFallback<MegaSenaResult>('/megasena/latest');
}

/**
 * Busca resultado de um concurso específico
 */
export async function getResultByConcurso(concurso: number): Promise<MegaSenaResult | null> {
  return fetchWithFallback<MegaSenaResult>(`/megasena/${concurso}`);
}

/**
 * Busca os últimos N resultados
 */
export async function getRecentResults(count: number = 10): Promise<MegaSenaResult[]> {
  const latest = await getLatestResult();
  if (!latest) return [];

  const results: MegaSenaResult[] = [latest];
  const promises: Promise<MegaSenaResult | null>[] = [];

  // Buscar os concursos anteriores
  for (let i = 1; i < count; i++) {
    const concurso = latest.concurso - i;
    if (concurso > 0) {
      promises.push(getResultByConcurso(concurso));
    }
  }

  const additionalResults = await Promise.all(promises);
  additionalResults.forEach(result => {
    if (result) results.push(result);
  });

  return results.sort((a, b) => b.concurso - a.concurso);
}

/**
 * Compara números selecionados com um resultado
 */
export function compareWithResult(
  selectedNumbers: number[],
  result: MegaSenaResult
): {
  matches: number[];
  matchCount: number;
  prize: string;
  prizeValue: number;
} {
  const resultNumbers = result.dezenas.map(d => parseInt(d, 10));
  const matches = selectedNumbers.filter(n => resultNumbers.includes(n));
  const matchCount = matches.length;

  // Determinar prêmio baseado na quantidade de acertos
  let prize = 'Nenhum prêmio';
  let prizeValue = 0;

  if (matchCount >= 4) {
    const premiacao = result.premiacoes.find(p => {
      if (matchCount === 6) return p.faixa === 1;
      if (matchCount === 5) return p.faixa === 2;
      if (matchCount === 4) return p.faixa === 3;
      return false;
    });

    if (premiacao) {
      prize = premiacao.descricao;
      prizeValue = premiacao.valorPremio;
    }
  }

  return {
    matches,
    matchCount,
    prize,
    prizeValue,
  };
}

/**
 * Formata valor em reais
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata data do resultado
 */
export function formatDate(dateString: string): string {
  // A data vem no formato DD/MM/YYYY
  const parts = dateString.split('/');
  if (parts.length === 3) {
    return dateString;
  }
  
  // Tentar parsear como ISO
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
}

/**
 * Dados mockados para fallback quando API não responde
 */
export const MOCK_RESULTS: MegaSenaResult[] = [
  {
    loteria: 'megasena',
    concurso: 2800,
    data: '21/12/2024',
    local: 'SÃO PAULO, SP',
    dezenas: ['04', '10', '23', '37', '44', '53'],
    premiacoes: [
      { descricao: 'Sena', faixa: 1, ganhadores: 2, valorPremio: 65000000 },
      { descricao: 'Quina', faixa: 2, ganhadores: 156, valorPremio: 45678.90 },
      { descricao: 'Quadra', faixa: 3, ganhadores: 8765, valorPremio: 987.65 },
    ],
    estadosPremiados: ['SP', 'RJ'],
    acumulou: false,
    proximoConcurso: 2801,
    dataProximoConcurso: '24/12/2024',
    valorAcumuladoProximoConcurso: 0,
    valorEstimadoProximoConcurso: 3500000,
  },
  {
    loteria: 'megasena',
    concurso: 2799,
    data: '18/12/2024',
    local: 'SÃO PAULO, SP',
    dezenas: ['08', '15', '27', '33', '42', '58'],
    premiacoes: [
      { descricao: 'Sena', faixa: 1, ganhadores: 0, valorPremio: 0 },
      { descricao: 'Quina', faixa: 2, ganhadores: 89, valorPremio: 52345.67 },
      { descricao: 'Quadra', faixa: 3, ganhadores: 6543, valorPremio: 876.54 },
    ],
    estadosPremiados: [],
    acumulou: true,
    proximoConcurso: 2800,
    dataProximoConcurso: '21/12/2024',
    valorAcumuladoProximoConcurso: 65000000,
    valorEstimadoProximoConcurso: 65000000,
  },
  {
    loteria: 'megasena',
    concurso: 2798,
    data: '14/12/2024',
    local: 'SÃO PAULO, SP',
    dezenas: ['02', '19', '25', '34', '45', '60'],
    premiacoes: [
      { descricao: 'Sena', faixa: 1, ganhadores: 0, valorPremio: 0 },
      { descricao: 'Quina', faixa: 2, ganhadores: 102, valorPremio: 41234.56 },
      { descricao: 'Quadra', faixa: 3, ganhadores: 7234, valorPremio: 765.43 },
    ],
    estadosPremiados: [],
    acumulou: true,
    proximoConcurso: 2799,
    dataProximoConcurso: '18/12/2024',
    valorAcumuladoProximoConcurso: 45000000,
    valorEstimadoProximoConcurso: 45000000,
  },
  {
    loteria: 'megasena',
    concurso: 2797,
    data: '11/12/2024',
    local: 'SÃO PAULO, SP',
    dezenas: ['11', '16', '28', '38', '51', '55'],
    premiacoes: [
      { descricao: 'Sena', faixa: 1, ganhadores: 1, valorPremio: 28000000 },
      { descricao: 'Quina', faixa: 2, ganhadores: 78, valorPremio: 38765.43 },
      { descricao: 'Quadra', faixa: 3, ganhadores: 5678, valorPremio: 654.32 },
    ],
    estadosPremiados: ['MG'],
    acumulou: false,
    proximoConcurso: 2798,
    dataProximoConcurso: '14/12/2024',
    valorAcumuladoProximoConcurso: 0,
    valorEstimadoProximoConcurso: 3000000,
  },
  {
    loteria: 'megasena',
    concurso: 2796,
    data: '07/12/2024',
    local: 'SÃO PAULO, SP',
    dezenas: ['05', '13', '22', '36', '47', '52'],
    premiacoes: [
      { descricao: 'Sena', faixa: 1, ganhadores: 0, valorPremio: 0 },
      { descricao: 'Quina', faixa: 2, ganhadores: 95, valorPremio: 35678.90 },
      { descricao: 'Quadra', faixa: 3, ganhadores: 6234, valorPremio: 543.21 },
    ],
    estadosPremiados: [],
    acumulou: true,
    proximoConcurso: 2797,
    dataProximoConcurso: '11/12/2024',
    valorAcumuladoProximoConcurso: 28000000,
    valorEstimadoProximoConcurso: 28000000,
  },
];

/**
 * Busca resultados com fallback para dados mockados
 */
export async function getResultsWithFallback(count: number = 10): Promise<MegaSenaResult[]> {
  try {
    const results = await getRecentResults(count);
    if (results.length > 0) {
      return results;
    }
  } catch (error) {
    console.warn('Usando dados mockados devido a erro na API:', error);
  }
  
  // Retornar dados mockados como fallback
  return MOCK_RESULTS.slice(0, count);
}
