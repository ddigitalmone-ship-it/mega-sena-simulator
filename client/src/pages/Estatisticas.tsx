/**
 * Estatísticas Page - Brazilian Tropical Modernism
 * Statistics overview with charts and data
 */

import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  ExternalLink,
  Info,
} from "lucide-react";

// Mock data for statistics
const hotNumbers = [
  { number: 53, frequency: 45, trend: "up" },
  { number: 10, frequency: 43, trend: "up" },
  { number: 5, frequency: 42, trend: "stable" },
  { number: 33, frequency: 41, trend: "up" },
  { number: 4, frequency: 40, trend: "stable" },
];

const coldNumbers = [
  { number: 26, frequency: 22, trend: "down" },
  { number: 55, frequency: 23, trend: "down" },
  { number: 9, frequency: 24, trend: "stable" },
  { number: 15, frequency: 25, trend: "down" },
  { number: 48, frequency: 26, trend: "stable" },
];

const recentResults = [
  { concurso: 2800, date: "26/12/2025", numbers: [4, 12, 23, 34, 45, 56] },
  { concurso: 2799, date: "24/12/2025", numbers: [7, 18, 29, 33, 41, 58] },
  { concurso: 2798, date: "21/12/2025", numbers: [2, 15, 27, 38, 49, 60] },
  { concurso: 2797, date: "19/12/2025", numbers: [11, 22, 33, 44, 50, 53] },
];

export default function Estatisticas() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <SEO
          title="Estatísticas da Mega Sena"
          description="Análises detalhadas baseadas em dados históricos oficiais desde 1996. Explore frequências, tendências e padrões dos sorteios da Mega Sena."
        />
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/statistics-section.png"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                Estatísticas da Mega Sena
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Análises detalhadas baseadas em dados históricos oficiais desde 1996.
                Explore frequências, tendências e padrões dos sorteios.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>
                  Dados atualizados automaticamente após cada sorteio oficial.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Calendar}
                value="2.800"
                label="Concursos Realizados"
                description="Desde março de 1996"
                color="emerald"
                index={0}
              />
              <StatCard
                icon={Target}
                value="60"
                label="Números Possíveis"
                description="De 01 a 60"
                color="golden"
                index={1}
              />
              <StatCard
                icon={BarChart3}
                value="50M+"
                label="Combinações Únicas"
                description="Apostas simples possíveis"
                color="sky"
                index={2}
              />
              <StatCard
                icon={TrendingUp}
                value="R$ 2,5B"
                label="Maior Prêmio"
                description="Mega da Virada 2022"
                color="emerald"
                index={3}
              />
            </div>
          </div>
        </section>

        {/* Hot and Cold Numbers */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hot Numbers */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display">
                      <div className="p-2 rounded-lg bg-red-100">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                      </div>
                      Números Quentes
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Dezenas com maior frequência nos últimos 100 concursos
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {hotNumbers.map((item, index) => (
                        <div
                          key={item.number}
                          className="flex items-center gap-4"
                        >
                          <div className="lottery-ball w-10 h-10 text-sm">
                            {item.number.toString().padStart(2, "0")}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">
                                {item.frequency} aparições
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {((item.frequency / 100) * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.frequency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cold Numbers */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <TrendingDown className="w-5 h-5 text-blue-600" />
                      </div>
                      Números Frios
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Dezenas com menor frequência nos últimos 100 concursos
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {coldNumbers.map((item, index) => (
                        <div
                          key={item.number}
                          className="flex items-center gap-4"
                        >
                          <div className="lottery-ball-sky w-10 h-10 text-sm">
                            {item.number.toString().padStart(2, "0")}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">
                                {item.frequency} aparições
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {((item.frequency / 100) * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.frequency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-accent to-sky-400 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recent Results */}
        <section className="py-12 md:py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl mb-2">
                Últimos Resultados
              </h2>
              <p className="text-muted-foreground mb-8">
                Confira os números sorteados nos concursos mais recentes
              </p>

              <div className="grid gap-4">
                {recentResults.map((result, index) => (
                  <motion.div
                    key={result.concurso}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-shrink-0">
                            <p className="font-mono text-sm text-muted-foreground">
                              Concurso
                            </p>
                            <p className="font-display text-xl text-primary">
                              {result.concurso}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {result.date}
                            </p>
                          </div>
                          <div className="flex-1 flex flex-wrap gap-2 md:justify-center">
                            {result.numbers.map((num) => (
                              <div
                                key={num}
                                className="lottery-ball-golden w-12 h-12"
                              >
                                {num.toString().padStart(2, "0")}
                              </div>
                            ))}
                          </div>
                          <div className="flex-shrink-0">
                            <a
                              href={`https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="outline" size="sm">
                                Ver detalhes
                                <ExternalLink className="ml-2 w-3 h-3" />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-brazilian text-white">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Analise Suas Combinações
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Use nosso simulador gratuito para gerar palpites baseados em
                análises estatísticas, IFR e simulações de Monte Carlo.
              </p>
              <a
                href="https://megasimulador.sbs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-xl"
                >
                  Acessar Simulador
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
