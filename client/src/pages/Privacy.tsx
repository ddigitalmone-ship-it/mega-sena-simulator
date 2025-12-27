/**
 * Página Política de Privacidade - Compliance Google Ads
 * Design: Quantum Probability - Neomorfismo futurista
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Bell } from "lucide-react";
import { Link } from "wouter";

export default function Privacy() {
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
            <Link href="/terms">
              <Button variant="ghost" size="sm">Termos</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Política de Privacidade
            </h1>
            <p className="text-slate-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <CardContent className="p-8 md:p-12 space-y-10">
              
              {/* Introdução */}
              <div>
                <p className="text-slate-600 leading-relaxed">
                  O <strong>Simulador de Palpites Mega Sena</strong> ("nós", "nosso" ou "Simulador") 
                  está comprometido em proteger a privacidade dos nossos usuários. Esta Política de 
                  Privacidade descreve como coletamos, usamos e protegemos suas informações quando 
                  você utiliza nosso site e serviços.
                </p>
              </div>

              {/* Seção 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Database className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">1. Informações que Coletamos</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    <strong>Dados de Uso:</strong> Coletamos informações sobre como você interage com 
                    nosso site, incluindo páginas visitadas, tempo de permanência, cliques e ações 
                    realizadas no simulador.
                  </p>
                  <p>
                    <strong>Dados Técnicos:</strong> Podemos coletar informações técnicas como endereço 
                    IP, tipo de navegador, sistema operacional e dispositivo utilizado para fins de 
                    análise e melhoria do serviço.
                  </p>
                  <p>
                    <strong>Cookies:</strong> Utilizamos cookies e tecnologias similares para melhorar 
                    sua experiência, lembrar preferências e analisar o uso do site.
                  </p>
                </div>
              </div>

              {/* Seção 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">2. Como Usamos suas Informações</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>Utilizamos as informações coletadas para:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer e manter nossos serviços</li>
                    <li>Melhorar e personalizar a experiência do usuário</li>
                    <li>Analisar tendências de uso e desempenho do site</li>
                    <li>Detectar e prevenir atividades fraudulentas ou abusivas</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                  </ul>
                </div>
              </div>

              {/* Seção 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">3. Proteção de Dados</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Implementamos medidas de segurança técnicas e organizacionais adequadas para 
                    proteger suas informações contra acesso não autorizado, alteração, divulgação 
                    ou destruição. No entanto, nenhum método de transmissão pela Internet ou 
                    armazenamento eletrônico é 100% seguro.
                  </p>
                </div>
              </div>

              {/* Seção 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">4. Seus Direitos</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos ou desatualizados</li>
                    <li>Solicitar a exclusão de seus dados</li>
                    <li>Revogar consentimento a qualquer momento</li>
                    <li>Solicitar portabilidade dos dados</li>
                  </ul>
                  <p>
                    Para exercer esses direitos, entre em contato conosco através do e-mail: 
                    <strong> contato@simuladormegasena.com.br</strong>
                  </p>
                </div>
              </div>

              {/* Seção 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">5. Alterações nesta Política</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                    sobre quaisquer alterações publicando a nova política nesta página com a data 
                    de atualização revisada. Recomendamos revisar esta política regularmente.
                  </p>
                </div>
              </div>

              {/* Contato */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Contato</h2>
                <p className="text-slate-600 leading-relaxed">
                  Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
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
