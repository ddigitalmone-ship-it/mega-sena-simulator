# Prompt para tile.dev - Simulador de Palpites Mega Sena

## Descrição do Projeto

Crie um **Simulador de Palpites para Mega Sena** com análise estatística avançada, incluindo IFR (Índice de Força Relativa) e validação de combinações únicas via Monte Carlo.

---

## Especificações Técnicas

### Stack Tecnológico
- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Componentes UI**: shadcn/ui + Radix UI
- **Gráficos**: Recharts para visualização de frequências
- **Animações**: Framer Motion
- **Gerenciamento de Estado**: React hooks (useState, useMemo, useCallback)

### Funcionalidades Principais

#### 1. Seleção de Números
- Grade interativa com 60 números (1-60)
- Seleção de 6 a 15 números por jogo
- Indicadores visuais de IFR por número (cores: quente/neutro/frio)
- Feedback visual ao selecionar/desselecionar

#### 2. Índice de Força Relativa (IFR)
O IFR combina frequência histórica com tendência recente:

```typescript
// Fórmula do Score
score = frequência_histórica × 0.4 + tendência_recente × 0.3 + aleatoriedade × 0.3

// Classificação IFR
- IFR >= 70: "QUENTE" (cor laranja/vermelho)
- IFR 40-69: "NEUTRO" (cor azul)
- IFR < 40: "FRIO" (cor verde/turquesa)
```

#### 3. Simulação Monte Carlo
- Geração de múltiplas combinações únicas (1-20 jogos)
- Suporte a 6-15 números por jogo
- Estratégias de geração:
  - **Balanceado**: Mix de frequência histórica e tendência recente
  - **Números Quentes**: Prioriza números com maior IFR
  - **Números Frios**: Teoria da "dívida" estatística
  - **Aleatório**: Distribuição totalmente aleatória
- Validação de unicidade (penalidade de 1000 pontos por repetição)
- Métricas: cobertura, iterações, sobreposição média

#### 4. Estatísticas e Visualizações
- Gráfico de barras com frequência de todos os 60 números
- Top 10 mais sorteados e Top 10 menos sorteados
- Filtros: ordenar por número, frequência ou IFR
- Filtros: mostrar todos, quentes ou frios

#### 5. Análise de Jogo
Para cada combinação selecionada, exibir:
- IFR do conjunto (gauge circular animado)
- Distribuição: baixos (1-30) vs altos (31-60)
- Distribuição: pares vs ímpares
- Contagem de números quentes/frios
- Probabilidade matemática (1 em 50.063.860)
- Custo do jogo (R$ 6,00 base)
- Soma total dos números

#### 6. Exportação
- Exportar palpites em formato texto (.txt)
- Formato: "Jogo X: 01 - 12 - 23 - 34 - 45 - 56"

---

## Dados Históricos

Incluir frequências históricas dos 60 números desde 1996 (aproximadamente 2.800 concursos):

```typescript
const historicalFrequencies: Record<number, number> = {
  1: 266, 2: 273, 3: 270, 4: 314, 5: 322, 6: 278, 7: 253, 8: 252,
  9: 251, 10: 345, 11: 295, 12: 289, 13: 296, 14: 269, 15: 250,
  16: 281, 17: 292, 18: 276, 19: 249, 20: 271, 21: 248, 22: 256,
  23: 298, 24: 295, 25: 258, 26: 263, 27: 285, 28: 296, 29: 294,
  30: 287, 31: 277, 32: 291, 33: 316, 34: 320, 35: 288, 36: 292,
  37: 321, 38: 316, 39: 256, 40: 247, 41: 293, 42: 299, 43: 291,
  44: 289, 45: 272, 46: 285, 47: 274, 48: 259, 49: 267, 50: 290,
  51: 295, 52: 289, 53: 336, 54: 305, 55: 257, 56: 268, 57: 255,
  58: 274, 59: 254, 60: 246
};
```

---

## Design Visual

### Estilo: "Quantum Probability" - Neomorfismo Futurista

#### Paleta de Cores
- **Background**: Lavanda suave (`oklch(0.95 0.015 286.375)`)
- **Primary**: Índigo profundo (`oklch(0.45 0.25 270)`)
- **Secondary**: Turquesa (`oklch(0.65 0.15 180)`)
- **Accent**: Coral (`oklch(0.70 0.20 25)`)
- **Sombras neomórficas**: 
  - Luz: `oklch(0.98 0.01 286.375)`
  - Sombra: `oklch(0.85 0.02 286.375)`

#### Tipografia
- **Títulos**: Plus Jakarta Sans (700, 800)
- **Headers**: DM Sans (500, 600)
- **Números/Dados**: IBM Plex Mono (400, 500)

#### Componentes Visuais
- Cards neomórficos com sombras suaves
- Bolas de loteria com gradientes e sombras
- Gauge circular animado para IFR
- Gráficos de barras com cores por categoria
- Animações de entrada e hover suaves

---

## Estrutura de Componentes

```
src/
├── components/
│   ├── LotteryBall.tsx       # Bola individual + Grid de seleção
│   ├── IFRGauge.tsx          # Indicador circular de IFR
│   ├── MonteCarloSimulator.tsx # Gerador de combinações
│   ├── FrequencyChart.tsx    # Gráfico de frequências
│   └── GameAnalyzer.tsx      # Análise estatística do jogo
├── lib/
│   └── megaSenaData.ts       # Dados históricos e funções de cálculo
└── pages/
    └── Home.tsx              # Página principal com tabs
```

---

## Funções Principais

```typescript
// Calcular estatísticas de cada número
function calculateNumberStats(): NumberStats[]

// Calcular IFR de um conjunto de números
function calculateSetIFR(numbers: number[], stats: NumberStats[]): number

// Gerar palpite inteligente
function generateSmartGuess(
  count: number,
  stats: NumberStats[],
  exclude: number[],
  strategy: 'balanced' | 'hot' | 'cold' | 'random'
): number[]

// Validar unicidade de combinação
function isUniqueCombination(
  newCombo: number[],
  existingCombos: number[][]
): boolean

// Simulação Monte Carlo
function runMonteCarloSimulation(
  numGames: number,
  numbersPerGame: number,
  strategy: string,
  stats: NumberStats[]
): { combinations: number[][], metrics: SimulationMetrics }
```

---

## Avisos e Disclaimers

Incluir aviso educacional no rodapé:

> ⚠️ **Aviso:** Este simulador é apenas para fins educacionais e de entretenimento. A probabilidade matemática de cada número ser sorteado é sempre a mesma (1/60). Dados históricos não garantem resultados futuros.

---

## Responsividade

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid adaptativo para bolas de loteria
- Tabs navegáveis em mobile

---

## Recursos Adicionais

- Fonte de dados: Caixa Econômica Federal (loterias.caixa.gov.br)
- Probabilidade da Sena: 1 em 50.063.860
- Custo mínimo: R$ 6,00 (6 números)
- Máximo de números: 15 (R$ 30.030,00)

---

## Exemplo de Uso

1. **Aba Simulador**: Selecione números manualmente ou use geração rápida
2. **Aba Monte Carlo**: Configure quantidade de jogos e estratégia, gere combinações únicas
3. **Aba Estatísticas**: Analise frequências históricas e identifique padrões
4. **Exportar**: Baixe seus palpites em arquivo texto

---

*Prompt criado para uso com tile.dev ou assistentes de código similares.*
