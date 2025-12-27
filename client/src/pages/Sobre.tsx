/**
 * Sobre Page - Brazilian Tropical Modernism
 * About us page with mission, vision, and values
 */

import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Shield,
  BookOpen,
  Users,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Link } from "wouter";

const values = [
  {
    icon: Shield,
    title: "Transparência",
    description:
      "Todos os dados e metodologias utilizadas são públicos e verificáveis.",
  },
  {
    icon: BookOpen,
    title: "Educação",
    description:
      "Nosso foco é educar sobre probabilidades e estatísticas, não prometer ganhos.",
  },
  {
    icon: Heart,
    title: "Responsabilidade",
    description:
      "Promovemos o jogo responsável e consciente dos riscos envolvidos.",
  },
  {
    icon: Target,
    title: "Precisão",
    description:
      "Compromisso com a precisão dos dados e metodologias utilizadas.",
  },
];

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <SEO
          title="Quem Somos"
          description="Conheça a equipe por trás do Mega Simulador Blog. Nossa missão é fornecer ferramentas educacionais e estatísticas para análise de jogos de loteria."
        />
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/about-section.png"
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
                Quem Somos
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos uma equipe dedicada a desenvolver ferramentas educacionais
                e estatísticas para análise de jogos de loteria, utilizando
                metodologias científicas e transparentes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border-primary/20">
                  <CardContent className="p-8">
                    <div className="p-3 rounded-2xl bg-primary/10 w-fit mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl mb-4">Nossa Missão</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Fornecer ferramentas estatísticas educacionais que ajudem
                      os usuários a compreender probabilidades e frequências
                      históricas dos jogos de loteria, promovendo uma visão
                      realista e responsável sobre apostas.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full border-secondary/20">
                  <CardContent className="p-8">
                    <div className="p-3 rounded-2xl bg-secondary/20 w-fit mb-4">
                      <Eye className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h2 className="font-display text-2xl mb-4">Nossa Visão</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Ser referência em educação estatística aplicada a jogos de
                      azar, promovendo o jogo responsável e a compreensão
                      matemática por trás dos sorteios, contribuindo para uma
                      sociedade mais informada.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Nossos Valores
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Princípios que guiam todas as nossas ações e decisões
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About the Simulator */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-3xl md:text-4xl mb-6">
                  Sobre o Simulador
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    O <strong className="text-foreground">Simulador de Palpites Mega Sena</strong> é
                    uma ferramenta educacional desenvolvida para análise
                    estatística dos resultados históricos da Mega Sena desde 1996.
                  </p>
                  <p>
                    Utilizamos metodologias reconhecidas como o{" "}
                    <strong className="text-foreground">Índice de Força Relativa (IFR)</strong> e{" "}
                    <strong className="text-foreground">Simulações de Monte Carlo</strong> para
                    gerar análises e combinações baseadas em dados reais.
                  </p>
                  <p className="bg-secondary/10 p-4 rounded-lg border-l-4 border-secondary">
                    <strong className="text-foreground">Importante:</strong> Esta ferramenta tem
                    caráter exclusivamente educacional e de entretenimento. Não
                    garantimos nem prometemos ganhos em jogos de loteria.
                  </p>
                  <p>
                    Os dados utilizados são obtidos de fontes públicas oficiais
                    da Caixa Econômica Federal. Recomendamos o jogo responsável
                    e consciente dos riscos envolvidos.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="https://megasimulador.sbs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-gradient-brazilian hover:opacity-90 text-white">
                      Acessar Simulador
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="/images/blog-featured.png"
                  alt="Simulador Mega Sena"
                  className="rounded-3xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Entre em Contato
              </h2>
              <p className="text-muted-foreground mb-8">
                Dúvidas, sugestões ou feedback? Estamos à disposição.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">E-mail</p>
                      <p className="text-sm text-muted-foreground">
                        contato@megasimulador.sbs
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-secondary/20">
                      <MapPin className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Localização</p>
                      <p className="text-sm text-muted-foreground">Brasil</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
