/**
 * BlogCard Component - Brazilian Tropical Modernism
 * Card with organic rounded corners and warm hover effects
 */

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    "Estatísticas": "bg-primary/10 text-primary hover:bg-primary/20",
    "Probabilidade": "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30",
    "Dicas": "bg-accent/10 text-accent-foreground hover:bg-accent/20",
    "Análise": "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer bg-card">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {post.featured && (
              <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                Destaque
              </Badge>
            )}
          </div>

          <CardHeader className="pb-2">
            <Badge
              variant="secondary"
              className={`w-fit ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}
            >
              {post.category}
            </Badge>
            <h3 className="font-display text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 mt-2">
              {post.title}
            </h3>
          </CardHeader>

          <CardContent className="pb-2">
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </CardContent>

          <CardFooter className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <span className="text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Ler mais
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
