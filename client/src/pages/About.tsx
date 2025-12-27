/**
 * Página Quem Somos - Compliance Google Ads
 * Design: Quantum Probability - Neomorfismo futurista
 * Cores: Lavanda suave, índigo profundo, coral, turquesa
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Target, Users, Award, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function About() {
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
            <Link href="/privacy">
              <Button variant="ghost" size="sm">Privacidade</Button>
            </Link>
            <Link href="/terms">
              <Button variant="ghost" size="sm">Termos</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              Sobre Nós
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Quem Somos
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Somos uma equipe dedicada a desenvolver ferramentas educacionais e estatísticas 
              para análise de jogos de loteria, utilizando metodologias científicas e transparentes.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-12 bg-white/50">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Nossa Missão</h3>
                <p className="text-slate-600 leading-relaxed">
                  Fornecer ferramentas estatísticas educacionais que ajudem os usuários a 
                  compreender probabilidades e frequências históricas dos jogos de loteria.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Nossa Visão</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ser referência em educação estatística aplicada a jogos de azar, 
                  promovendo o jogo responsável e a compreensão matemática.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Nossos Valores</h3>
                <p className="text-slate-600 leading-relaxed">
                  Transparência, educação, responsabilidade e compromisso com a 
                  precisão dos dados e metodologias utilizadas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sobre o Simulador */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Sobre o Simulador</h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  O <strong>Simulador de Palpites Mega Sena</strong> é uma ferramenta educacional 
                  desenvolvida para análise estatística dos resultados históricos da Mega Sena 
                  desde 1996. Utilizamos metodologias reconhecidas como o <strong>Índice de Força 
                  Relativa (IFR)</strong> e <strong>Simulações de Monte Carlo</strong> para gerar 
                  análises e combinações baseadas em dados reais.
                </p>
                
                <p>
                  <strong>Importante:</strong> Esta ferramenta tem caráter exclusivamente educacional 
                  e de entretenimento. Não garantimos nem prometemos ganhos em jogos de loteria. 
                  Cada sorteio da Mega Sena é um evento independente com probabilidades fixas, 
                  e resultados passados não influenciam sorteios futuros.
                </p>

                <p>
                  Os dados utilizados são obtidos de fontes públicas oficiais da Caixa Econômica 
                  Federal. Recomendamos o jogo responsável e consciente dos riscos envolvidos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-white/50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Entre em Contato</h2>
            <p className="text-slate-600">Dúvidas, sugestões ou feedback? Estamos à disposição.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">E-mail</h4>
                  <p className="text-slate-600">contato@simuladormegasena.com.br</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Localização</h4>
                  <p className="text-slate-600">Brasil</p>
                </div>
              </CardContent>
            </Card>
          </div>
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
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Termos de Uso
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
