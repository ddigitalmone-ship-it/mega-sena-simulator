/**
 * Blog Page - Brazilian Tropical Modernism
 * Article listing with filters and search
 */

import { useState } from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data-blog/blogPosts";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const categories = ["Todos", "Estatísticas", "Probabilidade", "Dicas", "Análise"];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <SEO
          title="Blog"
          description="Artigos educacionais sobre estatísticas, probabilidades e análises da Mega Sena. Conteúdo gratuito para entender melhor o mundo das loterias."
        />
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-brazilian-soft">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                Blog
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Artigos educacionais sobre estatísticas, probabilidades e análises
                da Mega Sena. Conteúdo gratuito para entender melhor o mundo das loterias.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b border-border/50">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              {/* Search */}
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            {filteredPosts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-8">
                  {filteredPosts.length} artigo{filteredPosts.length !== 1 ? "s" : ""} encontrado{filteredPosts.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2">Nenhum artigo encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou termo de busca
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
