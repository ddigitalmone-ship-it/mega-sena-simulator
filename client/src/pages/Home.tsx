/**
 * DESIGN: Quantum Probability - Neomorfismo Futurista
 * 
 * Página principal do Simulador de Palpites Mega Sena
 * Features: IFR, Monte Carlo, Frequências Históricas, Histórico de Resultados
 */

import AuthGuard from "@/components/AuthGuard";
import Footer from "@/components/Footer";
import { FileManager } from "@/components/FileManager";
import UserMenu from "@/components/UserMenu";
import { FrequencyChart } from "@/components/FrequencyChart";
import { GameAnalyzer } from "@/components/GameAnalyzer";
import { IFRGauge, IFRLegend } from "@/components/IFRGauge";
import { LotteryBallGrid, SelectedNumbersDisplay } from "@/components/LotteryBall";
import { MonteCarloSimulator } from "@/components/MonteCarloSimulator";
import { ResultComparison } from "@/components/ResultComparison";
import { ResultHistory } from "@/components/ResultHistory";
import { SavedGamesManager } from "@/components/SavedGamesManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  calculateNumberStats,
  calculateSetIFR,
  generateSmartGuess,
} from "@/lib/megaSenaData";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  CircleDot,
  Dices,
  Download,
  Files,
  History,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
  Zap,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [generatedCombinations, setGeneratedCombinations] = useState<number[][]>([]);
  const [activeTab, setActiveTab] = useState("simulator");
  const [currentStrategy, setCurrentStrategy] = useState<string>("");

  // Calcular estatísticas dos números
  const stats = useMemo(() => calculateNumberStats(), []);

  // IFR do conjunto selecionado
  const currentIFR = useMemo(() => {
    if (selectedNumbers.length === 0) return 0;
    return calculateSetIFR(selectedNumbers, stats);
  }, [selectedNumbers, stats]);

  // Toggle número selecionado
  const toggleNumber = useCallback((num: number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(num)) {
        return prev.filter(n => n !== num);
      }
      if (prev.length >= 15) {
        toast.error("Máximo de 15 números permitido");
        return prev;
      }
      return [...prev, num].sort((a, b) => a - b);
    });
  }, []);

  // Limpar seleção
  const clearSelection = useCallback(() => {
    setSelectedNumbers([]);
    toast.info("Seleção limpa");
  }, []);

  // Gerar palpite automático
  const generateQuickGuess = useCallback((strategy: 'balanced' | 'hot' | 'cold' | 'random' = 'balanced') => {
    const guess = generateSmartGuess(6, stats, [], strategy);
    setSelectedNumbers(guess);
    setCurrentStrategy(strategy);
    toast.success(`Palpite ${strategy === 'balanced' ? 'balanceado' : strategy === 'hot' ? 'quente' : strategy === 'cold' ? 'frio' : 'aleatório'} gerado!`);
  }, [stats]);

  // Carregar jogo salvo
  const loadSavedGame = useCallback((numbers: number[]) => {
    setSelectedNumbers(numbers);
    setCurrentStrategy("");
  }, []);

  // Exportar combinações
  const exportCombinations = useCallback(() => {
    const allCombos = generatedCombinations.length > 0 
      ? generatedCombinations 
      : selectedNumbers.length >= 6 
        ? [selectedNumbers] 
        : [];
    
    if (allCombos.length === 0) {
      toast.error("Nenhuma combinação para exportar");
      return;
    }

    const content = allCombos
      .map((combo, idx) => `Jogo ${idx + 1}: ${combo.map(n => n.toString().padStart(2, '0')).join(' - ')}`)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mega-sena-palpites-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("Palpites exportados!");
  }, [generatedCombinations, selectedNumbers]);

  return (
    <div className="min-h-screen">
      {/* Header with User Menu */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg hidden sm:inline">Mega Sena Simulator</span>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/hero-background.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        {/* Content */}
        <div className="relative container py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Simulador Avançado com IFR & Monte Carlo
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Simulador de Palpites</span>
              <br />
              <span className="text-foreground">Mega Sena</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Gere palpites inteligentes baseados em frequências históricas desde 1996, 
              análise IFR (Índice de Força Relativa) e validação de combinações únicas via Monte Carlo.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="neo-card p-4">
                <p className="text-2xl font-bold text-primary">2.800+</p>
                <p className="text-xs text-muted-foreground">Concursos Analisados</p>
              </div>
              <div className="neo-card p-4">
                <p className="text-2xl font-bold text-secondary">60</p>
                <p className="text-xs text-muted-foreground">Números Rastreados</p>
              </div>
              <div className="neo-card p-4">
                <p className="text-2xl font-bold text-accent">50M+</p>
                <p className="text-xs text-muted-foreground">Combinações Possíveis</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 max-w-2xl mx-auto neo-card p-1">
            <TabsTrigger value="simulator" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Simulador</span>
            </TabsTrigger>
            <TabsTrigger value="montecarlo" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Monte Carlo</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Estatísticas</span>
            </TabsTrigger>
          </TabsList>

          {/* Simulator Tab */}
          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Ball Grid */}
              <div className="lg:col-span-2 space-y-4">
                <div className="neo-card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <CircleDot className="w-5 h-5 text-primary" />
                      Selecione seus Números
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedNumbers.length}/15
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSelection}
                        disabled={selectedNumbers.length === 0}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <IFRLegend />
                  
                  <LotteryBallGrid
                    selectedNumbers={selectedNumbers}
                    onToggle={toggleNumber}
                    stats={stats}
                    maxSelection={15}
                    showIFR
                  />
                </div>

                {/* Quick generate buttons */}
                <div className="neo-card p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Geração Rápida
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateQuickGuess('balanced')}
                      className="flex items-center gap-2"
                    >
                      <Target className="w-4 h-4" />
                      Balanceado
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateQuickGuess('hot')}
                      className="flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-orange-500" />
                      Quentes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateQuickGuess('cold')}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-teal-500" />
                      Frios
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateQuickGuess('random')}
                      className="flex items-center gap-2"
                    >
                      <Dices className="w-4 h-4" />
                      Aleatório
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedNumbers([]);
                        generateQuickGuess('balanced');
                      }}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Novo
                    </Button>
                  </div>
                </div>

                {/* Saved Games & Files Management - Protected by Auth */}
                <AuthGuard
                  title="Salve seus Jogos"
                  description="Faça login para salvar seus palpites e acessá-los de qualquer dispositivo."
                  fallback={
                    <div className="neo-card p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Gerenciamento
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Faça login para salvar seus jogos e exportar arquivos.
                      </p>
                    </div>
                  }
                >
                  <div className="neo-card p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Gerenciamento
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <SavedGamesManager
                        selectedNumbers={selectedNumbers}
                        currentIFR={currentIFR}
                        strategy={currentStrategy}
                        onLoadGame={loadSavedGame}
                      />
                      <FileManager />
                    </div>
                  </div>
                </AuthGuard>

                {/* Selected numbers display */}
                <SelectedNumbersDisplay
                  numbers={selectedNumbers}
                  onRemove={toggleNumber}
                />
              </div>

              {/* Right: Analysis */}
              <div className="space-y-4">
                {/* Current IFR */}
                <div className="neo-card p-6 flex flex-col items-center">
                  <IFRGauge 
                    value={currentIFR} 
                    size="lg" 
                    label="IFR da Seleção"
                    animated
                  />
                </div>

                {/* Game Analysis */}
                <AnimatePresence mode="wait">
                  {selectedNumbers.length >= 6 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <GameAnalyzer numbers={selectedNumbers} stats={stats} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Export button */}
                {selectedNumbers.length >= 6 && (
                  <Button
                    onClick={exportCombinations}
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Palpite
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Monte Carlo Tab */}
          <TabsContent value="montecarlo">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonteCarloSimulator
                stats={stats}
                onResultsGenerated={setGeneratedCombinations}
              />
              
              {/* Monte Carlo visualization */}
              <div className="space-y-4">
                <div className="neo-card p-4 overflow-hidden">
                  <img
                    src="/images/monte-carlo-visualization.png"
                    alt="Visualização Monte Carlo"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">O que é Monte Carlo?</h3>
                    <p className="text-sm text-muted-foreground">
                      A simulação Monte Carlo é um método estatístico que usa amostragem 
                      aleatória repetida para obter resultados numéricos. No contexto da 
                      Mega Sena, utilizamos para gerar combinações únicas e validar que 
                      não há sobreposição excessiva entre os jogos.
                    </p>
                  </div>
                </div>

                <div className="neo-card p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Como Funciona
                  </h3>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-muted-foreground">Define-se a quantidade de jogos e números por jogo desejados</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                      <span className="text-muted-foreground">O algoritmo gera combinações baseadas na estratégia escolhida (IFR, frequência, etc.)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
                      <span className="text-muted-foreground">Cada combinação é validada para garantir unicidade</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">4</span>
                      <span className="text-muted-foreground">O processo repete até atingir o número desejado de jogos únicos</span>
                    </li>
                  </ol>
                </div>

                {generatedCombinations.length > 0 && (
                  <Button
                    onClick={exportCombinations}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar {generatedCombinations.length} Jogos
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          {/* History Tab - NEW */}
          <TabsContent value="history">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Result History */}
              <ResultHistory />
              
              {/* Right: Comparison */}
              <div className="space-y-4">
                <ResultComparison
                  selectedNumbers={selectedNumbers}
                  generatedCombinations={generatedCombinations}
                />
                
                {/* Instructions */}
                <div className="neo-card p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Como Usar
                  </h3>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Selecione números na aba Simulador ou gere jogos via Monte Carlo
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      Escolha um concurso passado para comparar
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      Veja quantos números você teria acertado
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">4.</span>
                      Use o modo "Todos" para comparar múltiplos jogos de uma vez
                    </li>
                  </ol>
                </div>

                {/* Disclaimer */}
                <div className="neo-card-inset p-3 text-xs text-muted-foreground">
                  <p>
                    <strong>Nota:</strong> Os dados são obtidos de uma API pública. 
                    Em caso de indisponibilidade, dados de exemplo são exibidos. 
                    Para resultados oficiais, consulte{' '}
                    <a 
                      href="https://loterias.caixa.gov.br" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      loterias.caixa.gov.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <div className="space-y-6">
              {/* Lottery balls hero image */}
              <div className="neo-card p-0 overflow-hidden">
                <div className="relative h-48 md:h-64">
                  <img
                    src="/images/lottery-balls-hero.png"
                    alt="Bolas da Mega Sena"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-foreground">
                      Frequências Históricas
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Dados de todos os concursos desde 1996
                    </p>
                  </div>
                </div>
              </div>

              <FrequencyChart
                stats={stats}
                onNumberClick={toggleNumber}
                selectedNumbers={selectedNumbers}
              />

              {/* IFR explanation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="neo-card p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="/images/ifr-indicator.png"
                      alt="Indicador IFR"
                      className="w-24 h-24 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold mb-2">O que é IFR?</h3>
                      <p className="text-sm text-muted-foreground">
                        O Índice de Força Relativa (IFR) é uma métrica que combina a 
                        frequência histórica de um número com sua tendência recente. 
                        Números com IFR alto estão "quentes" (aparecendo mais), enquanto 
                        IFR baixo indica números "frios".
                      </p>
                    </div>
                  </div>
                </div>

                <div className="neo-card p-4">
                  <h3 className="font-semibold mb-3">Fórmula do Score</h3>
                  <div className="neo-card-inset p-4 font-mono text-sm">
                    <code>
                      score = frequência_histórica × 0.4 + tendência_recente × 0.3 + aleatoriedade × 0.3
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    A penalidade por repetição é de 1000 pontos, garantindo máxima 
                    diversificação nos palpites gerados.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer com Compliance Google Ads */}
      <Footer />
    </div>
  );
}
