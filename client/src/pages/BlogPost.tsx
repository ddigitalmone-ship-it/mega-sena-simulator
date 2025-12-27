/**
 * BlogPost Page - Brazilian Tropical Modernism
 * Individual article page with full content
 */

import { useParams, Link } from "wouter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data-blog/blogPosts";
import { articleContent } from "@/data-blog/articleContent";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              O artigo que você procura não existe ou foi removido.
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get article content or generate default content
  const content = articleContent[slug] || `
<h2>${post.title}</h2>

<p>${post.excerpt}</p>

<p>Este artigo está em desenvolvimento. Em breve teremos o conteúdo completo disponível.</p>

<h3>Tópicos que serão abordados:</h3>

<ul>
<li>Análise detalhada do tema</li>
<li>Dados estatísticos relevantes</li>
<li>Dicas práticas</li>
<li>Conclusões baseadas em evidências</li>
</ul>

<p>Enquanto isso, explore outros artigos do nosso blog ou acesse o simulador para testar suas combinações.</p>
`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <SEO
          title={post.title}
          description={post.excerpt}
          image={post.image}
          type="article"
          publishedTime={post.date}
        />
        {/* Article Header */}
        <section className="relative py-12 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/blog">
                <Button variant="ghost" className="mb-6 -ml-2">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Voltar ao Blog
                </Button>
              </Link>

              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                {post.category}
              </Badge>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de leitura
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-w-4xl rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-8"
              >
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-display prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4
                    prose-h2:text-2xl prose-h2:md:text-3xl
                    prose-h3:text-xl prose-h3:md:text-2xl
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:my-4 prose-ul:pl-6
                    prose-li:text-muted-foreground prose-li:my-1
                    prose-table:my-6 prose-table:w-full prose-table:border-collapse
                    prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-display prose-th:text-sm prose-th:border prose-th:border-border
                    prose-td:p-3 prose-td:border prose-td:border-border prose-td:text-sm"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </motion.article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <Card className="bg-gradient-brazilian text-white overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl mb-3">
                        Experimente o Simulador
                      </h3>
                      <p className="text-white/90 text-sm mb-4">
                        Gere palpites baseados em análises estatísticas e simulações de Monte Carlo.
                      </p>
                      <a
                        href="https://megasimulador.sbs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-white text-primary hover:bg-white/90">
                          Acessar Simulador
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>

                  {/* Related Articles */}
                  {relatedPosts.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-display text-lg mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Artigos Relacionados
                        </h3>
                        <div className="space-y-4">
                          {relatedPosts.map((relatedPost) => (
                            <Link
                              key={relatedPost.id}
                              href={`/blog/${relatedPost.slug}`}
                            >
                              <div className="group cursor-pointer">
                                <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {relatedPost.readTime}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Disclaimer Card */}
                  <Card className="border-secondary/30 bg-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="font-display text-sm mb-2 text-secondary-foreground">
                        Aviso Importante
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Este conteúdo tem caráter exclusivamente educacional e informativo.
                        Não garantimos ganhos em jogos de loteria. Jogue com responsabilidade.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* More Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl mb-8">
              Continue Lendo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
