/**
 * Página Termos de Uso - Compliance Google Ads
 * Design: Quantum Probability - Neomorfismo futurista
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Scale, Ban, CheckCircle, HelpCircle } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Simulador
            </Button>
          </Link>
          <nav className="flex gap-4">
            <Link href="/about">
              <Button variant="ghost" size="sm">Quem Somos</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="ghost" size="sm">Privacidade</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Termos de Uso
            </h1>
            <p className="text-slate-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Aviso Importante */}
      <section className="pb-8">
        <div className="container max-w-4xl">
          <Card className="bg-amber-50 border-amber-200 shadow-lg">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-2">Aviso Importante</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Este simulador é uma ferramenta <strong>exclusivamente educacional e de entretenimento</strong>. 
                  Não garantimos nem prometemos ganhos em jogos de loteria. O jogo deve ser praticado 
                  com responsabilidade e consciência dos riscos envolvidos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <CardContent className="p-8 md:p-12 space-y-10">
              
              {/* Seção 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">1. Aceitação dos Termos</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Ao acessar e utilizar o Simulador de Palpites Mega Sena ("Serviço"), você concorda 
                    em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com 
                    qualquer parte destes termos, não deve utilizar nosso Serviço.
                  </p>
                </div>
              </div>

              {/* Seção 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">2. Descrição do Serviço</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    O Simulador de Palpites Mega Sena é uma ferramenta online que oferece:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Análise estatística de resultados históricos da Mega Sena desde 1996</li>
                    <li>Cálculo do Índice de Força Relativa (IFR) para cada número</li>
                    <li>Geração de combinações através de simulações Monte Carlo</li>
                    <li>Comparação de palpites com resultados oficiais</li>
                    <li>Visualização de frequências e estatísticas históricas</li>
                  </ul>
                </div>
              </div>

              {/* Seção 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Ban className="w-5 h-5 text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">3. Limitações e Isenções</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    <strong>Natureza Educacional:</strong> Este Serviço tem finalidade exclusivamente 
                    educacional e de entretenimento. Não somos uma casa de apostas nem temos qualquer 
                    vínculo com a Caixa Econômica Federal.
                  </p>
                  <p>
                    <strong>Sem Garantia de Ganhos:</strong> Não garantimos, prometemos ou sugerimos 
                    que o uso deste Serviço resultará em ganhos em jogos de loteria. Cada sorteio é 
                    um evento independente com probabilidades fixas.
                  </p>
                  <p>
                    <strong>Dados Históricos:</strong> Os dados apresentados são baseados em informações 
                    públicas. Não nos responsabilizamos por eventuais imprecisões ou desatualizações.
                  </p>
                  <p>
                    <strong>Decisões do Usuário:</strong> Qualquer decisão de jogar na loteria é de 
                    responsabilidade exclusiva do usuário. Não nos responsabilizamos por perdas 
                    financeiras decorrentes de apostas.
                  </p>
                </div>
              </div>

              {/* Seção 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">4. Uso Responsável</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>Ao utilizar nosso Serviço, você concorda em:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Utilizar o Serviço apenas para fins legais e de acordo com estes Termos</li>
                    <li>Não utilizar o Serviço de forma que possa danificar, desabilitar ou sobrecarregar nossos sistemas</li>
                    <li>Não tentar acessar áreas restritas do Serviço</li>
                    <li>Praticar o jogo de forma responsável, consciente dos riscos</li>
                    <li>Ter no mínimo 18 anos de idade para utilizar o Serviço</li>
                  </ul>
                </div>
              </div>

              {/* Seção 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">5. Propriedade Intelectual</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Todo o conteúdo do Serviço, incluindo textos, gráficos, logos, ícones, imagens, 
                    código-fonte e software, é de propriedade exclusiva do Simulador Mega Sena ou 
                    de seus licenciadores e está protegido por leis de direitos autorais e propriedade 
                    intelectual.
                  </p>
                  <p>
                    É proibida a reprodução, distribuição, modificação ou uso comercial do conteúdo 
                    sem autorização prévia por escrito.
                  </p>
                </div>
              </div>

              {/* Seção 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-slate-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">6. Lei Aplicável</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
                    Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva 
                    dos tribunais brasileiros.
                  </p>
                </div>
              </div>

              {/* Contato */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Contato</h2>
                <p className="text-slate-600 leading-relaxed">
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <p className="text-slate-600 mt-2">
                  <strong>E-mail:</strong> contato@simuladormegasena.com.br
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/60 bg-white/70">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Simulador Mega Sena. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Quem Somos
              </Link>
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Simulador
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
