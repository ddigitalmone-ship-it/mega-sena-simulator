/**
 * Contato Page - Brazilian Tropical Modernism
 * Contact page with form and information
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-brazilian-soft">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                Entre em Contato
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tem alguma dúvida, sugestão ou feedback? Estamos à disposição
                para ajudar. Preencha o formulário abaixo ou utilize um dos
                nossos canais de contato.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">E-mail</h3>
                      <p className="text-muted-foreground text-sm">
                        contato@megasimulador.sbs
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Respondemos em até 48 horas úteis
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-secondary/20 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">Localização</h3>
                      <p className="text-muted-foreground text-sm">
                        Brasil
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Atendimento 100% online
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-accent/10 flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">Horário</h3>
                      <p className="text-muted-foreground text-sm">
                        Segunda a Sexta
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        09:00 às 18:00 (Horário de Brasília)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-display text-2xl mb-6">
                      Envie sua Mensagem
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            placeholder="Seu nome"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                          id="subject"
                          placeholder="Sobre o que deseja falar?"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          placeholder="Escreva sua mensagem aqui..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full md:w-auto bg-gradient-brazilian hover:opacity-90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Enviando..."
                        ) : (
                          <>
                            Enviar Mensagem
                            <Send className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
