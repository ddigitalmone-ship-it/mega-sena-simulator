/**
 * FAQ Page - Perguntas Frequentes
 * Design: Quantum Probability - Neomorfismo futurista
 * 
 * Explica IFR, Monte Carlo e metodologia do simulador
 */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  HelpCircle, 
  TrendingUp, 
  Shuffle, 
  BarChart3, 
  Calculator,
  AlertTriangle,
  Target,
  Lightbulb,
  BookOpen
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";

const faqCategories = [
  {
    id: "general",
    title: "Sobre o Simulador",
    icon: HelpCircle,
    color: "indigo",
    questions: [
      {
        q: "O que é o Simulador de Palpites Mega Sena?",
        a: "É uma ferramenta educacional que utiliza análise estatística para gerar palpites baseados em frequências históricas dos números sorteados desde 1996. O simulador aplica conceitos como IFR (Índice de Força Relativa) e simulação Monte Carlo para criar combinações únicas e analisá-las estatisticamente."
      },
      {
        q: "O simulador garante que eu vou ganhar na loteria?",
        a: "Não. Este simulador é uma ferramenta exclusivamente educacional e de entretenimento. Cada sorteio da Mega Sena é um evento independente e aleatório, com probabilidade fixa de 1 em 50.063.860 para acertar os 6 números. Nenhuma ferramenta ou método pode alterar essas probabilidades. Jogue com responsabilidade."
      },
      {
        q: "De onde vêm os dados utilizados?",
        a: "Os dados são obtidos de APIs públicas que compilam os resultados oficiais da Caixa Econômica Federal. Analisamos mais de 2.800 concursos realizados desde março de 1996, totalizando milhões de números sorteados para calcular as frequências históricas."
      },
      {
        q: "O simulador é gratuito?",
        a: "Sim, o simulador é completamente gratuito. Não cobramos nenhuma taxa para gerar palpites ou acessar as estatísticas. Nosso objetivo é fornecer uma ferramenta educacional para quem deseja entender melhor a análise estatística aplicada a jogos de loteria."
      }
    ]
  },
  {
    id: "ifr",
    title: "IFR - Índice de Força Relativa",
    icon: TrendingUp,
    color: "emerald",
    questions: [
      {
        q: "O que é o IFR (Índice de Força Relativa)?",
        a: "O IFR é um indicador adaptado do mercado financeiro para análise de frequências. No contexto da loteria, ele mede a 'temperatura' de cada número baseado em sua frequência de sorteio. Números com IFR alto (70-100) são considerados 'quentes' (sorteados com mais frequência), enquanto números com IFR baixo (0-39) são 'frios' (menos frequentes)."
      },
      {
        q: "Como o IFR é calculado?",
        a: "O cálculo considera a frequência absoluta de cada número em todos os concursos, normalizada em uma escala de 0 a 100. A fórmula leva em conta: (1) quantas vezes o número foi sorteado, (2) o total de concursos realizados, e (3) a média esperada de sorteios. Números acima da média recebem IFR mais alto."
      },
      {
        q: "Devo escolher apenas números 'quentes'?",
        a: "Não necessariamente. Embora números quentes tenham sido sorteados mais vezes historicamente, cada sorteio é independente. Muitos jogadores preferem uma combinação balanceada entre números quentes, neutros e frios. O modo 'Balanceado' do simulador cria exatamente esse tipo de combinação."
      },
      {
        q: "O IFR prevê o próximo sorteio?",
        a: "Não. O IFR é uma análise histórica, não preditiva. Ele mostra tendências passadas, mas não pode prever eventos futuros. Cada sorteio da Mega Sena é completamente aleatório e independente dos anteriores."
      }
    ]
  },
  {
    id: "montecarlo",
    title: "Simulação Monte Carlo",
    icon: Shuffle,
    color: "purple",
    questions: [
      {
        q: "O que é a Simulação Monte Carlo?",
        a: "É um método estatístico que usa amostragem aleatória para resolver problemas. No nosso simulador, utilizamos Monte Carlo para gerar múltiplas combinações únicas de números, garantindo que não haja repetições e que a distribuição seja estatisticamente diversificada."
      },
      {
        q: "Como funciona a validação de combinações únicas?",
        a: "O algoritmo gera combinações aleatórias e verifica se cada nova combinação já existe no conjunto. Se existir, uma nova é gerada. Isso garante que todos os jogos produzidos sejam únicos. Também calculamos métricas de sobreposição para mostrar quantos números são compartilhados entre os jogos."
      },
      {
        q: "Por que usar Monte Carlo ao invés de simplesmente gerar números aleatórios?",
        a: "Monte Carlo oferece vantagens: (1) garante unicidade das combinações, (2) permite aplicar pesos baseados no IFR, (3) calcula métricas de cobertura e diversificação, e (4) pode ser configurado para diferentes estratégias (mais quentes, mais frios, balanceado)."
      },
      {
        q: "Quantos jogos posso gerar de uma vez?",
        a: "O simulador permite gerar de 1 a 20 jogos por vez, com 6 a 15 números cada. Isso possibilita desde apostas simples até bolões com maior cobertura. O sistema calcula automaticamente o custo total baseado na tabela de preços da Caixa."
      }
    ]
  },
  {
    id: "statistics",
    title: "Estatísticas e Análises",
    icon: BarChart3,
    color: "blue",
    questions: [
      {
        q: "O que significa a 'cobertura' nos jogos Monte Carlo?",
        a: "Cobertura indica quantos números únicos estão presentes no conjunto de jogos gerados. Por exemplo, se você gerar 5 jogos de 6 números e a cobertura for 25, significa que 25 números diferentes foram utilizados no total. Maior cobertura = maior diversificação."
      },
      {
        q: "O que é a 'sobreposição média'?",
        a: "É a média de números que se repetem entre os jogos gerados. Uma sobreposição de 2.5 significa que, em média, cada par de jogos compartilha 2 a 3 números. Sobreposição baixa indica maior diversificação."
      },
      {
        q: "Como interpretar o gráfico de frequências?",
        a: "O gráfico mostra quantas vezes cada número (de 01 a 60) foi sorteado historicamente. Barras mais altas indicam números mais frequentes. As cores indicam a classificação IFR: verde para quentes, azul para neutros e vermelho para frios."
      },
      {
        q: "A distribuição par/ímpar importa?",
        a: "Estatisticamente, a maioria dos sorteios tem uma distribuição equilibrada entre pares e ímpares (como 3-3 ou 4-2). Combinações extremas (6-0 ou 0-6) são raras. O simulador mostra essa distribuição para cada jogo gerado."
      }
    ]
  },
  {
    id: "usage",
    title: "Como Usar",
    icon: Target,
    color: "amber",
    questions: [
      {
        q: "Como gerar um palpite rapidamente?",
        a: "Use os botões de 'Geração Rápida' na aba Simulador: 'Balanceado' cria uma combinação equilibrada, 'Quentes' prioriza números frequentes, 'Frios' escolhe números menos sorteados, e 'Aleatório' gera uma combinação puramente randômica."
      },
      {
        q: "Posso selecionar meus próprios números?",
        a: "Sim! Clique diretamente nos números no grid para selecioná-los. Você pode escolher de 6 a 15 números. O simulador mostrará em tempo real o IFR da sua seleção e análises como distribuição par/ímpar e baixos/altos."
      },
      {
        q: "Como comparar meus palpites com resultados anteriores?",
        a: "Na aba 'Histórico', você pode ver os últimos sorteios e comparar com seus números selecionados. O sistema mostra quantos números você teria acertado em cada concurso."
      },
      {
        q: "Como exportar os jogos gerados?",
        a: "Na aba 'Monte Carlo', após gerar os jogos, clique em 'Exportar Jogos'. Um arquivo de texto será baixado com todas as combinações formatadas, pronto para conferência ou registro."
      }
    ]
  },
  {
    id: "responsible",
    title: "Jogo Responsável",
    icon: AlertTriangle,
    color: "red",
    questions: [
      {
        q: "Qual a probabilidade real de ganhar na Mega Sena?",
        a: "Para acertar os 6 números (Sena): 1 em 50.063.860. Para a Quina (5 números): 1 em 154.518. Para a Quadra (4 números): 1 em 2.332. Essas probabilidades são fixas e não podem ser alteradas por nenhum método ou ferramenta."
      },
      {
        q: "Devo gastar muito dinheiro em apostas?",
        a: "Absolutamente não. Loterias devem ser vistas como entretenimento, não como investimento ou fonte de renda. Aposte apenas o que você pode perder sem impactar suas finanças. Estabeleça um limite mensal e nunca o ultrapasse."
      },
      {
        q: "Existe algum 'sistema infalível' para ganhar?",
        a: "Não. Qualquer pessoa ou site que prometa um método garantido para ganhar na loteria está mentindo. A Mega Sena é um jogo de puro azar com probabilidades matematicamente definidas. Desconfie de promessas milagrosas."
      },
      {
        q: "Onde buscar ajuda se o jogo virar um problema?",
        a: "Se você sente que está perdendo controle sobre suas apostas, procure ajuda. O CVV (Centro de Valorização da Vida) atende pelo 188. Também existem grupos de apoio como Jogadores Anônimos. Reconhecer o problema é o primeiro passo."
      }
    ]
  }
];

const colorClasses: Record<string, { bg: string; border: string; icon: string; title: string }> = {
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", icon: "text-indigo-600", title: "text-indigo-700" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", title: "text-emerald-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-600", title: "text-purple-700" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", title: "text-blue-700" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600", title: "text-amber-700" },
  red: { bg: "bg-red-50", border: "border-red-200", icon: "text-red-600", title: "text-red-700" },
};

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Voltar ao Simulador</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-slate-800">Central de Ajuda</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Perguntas Frequentes
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Tire suas <span className="text-indigo-600">Dúvidas</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Entenda como funciona o IFR, a simulação Monte Carlo e todas as funcionalidades 
              do nosso simulador de palpites para a Mega Sena.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="pb-12">
        <div className="container">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-800 text-lg mb-2">Dica Importante</h3>
                <p className="text-amber-700">
                  Este simulador é uma ferramenta <strong>educacional</strong> para análise estatística. 
                  Loterias são jogos de azar com probabilidades fixas. Nenhum método pode garantir vitória. 
                  Jogue com responsabilidade e apenas o que você pode perder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-16">
        <div className="container">
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => {
              const colors = colorClasses[category.color];
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden"
                >
                  {/* Category Header */}
                  <div className={`${colors.bg} ${colors.border} border-b px-6 py-4`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/60`}>
                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      <h2 className={`text-xl font-bold ${colors.title}`}>{category.title}</h2>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="p-6">
                    <Accordion type="single" collapsible className="space-y-3">
                      {category.questions.map((item, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.id}-${index}`}
                          className="border border-slate-200 rounded-xl px-4 data-[state=open]:bg-slate-50"
                        >
                          <AccordionTrigger className="text-left font-semibold text-slate-700 hover:text-indigo-600 py-4">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="pb-16">
        <div className="container">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Compromisso com Você</h3>
            <p className="text-slate-600">Transparência e segurança em primeiro lugar</p>
          </div>
          <TrustBadges variant="horizontal" />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="container">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <Calculator className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para Experimentar?
            </h3>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Explore o simulador gratuitamente e descubra insights estatísticos sobre os números da Mega Sena.
            </p>
            <Link href="/">
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors">
                Acessar Simulador
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
