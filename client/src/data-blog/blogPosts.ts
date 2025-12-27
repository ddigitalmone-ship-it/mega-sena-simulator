/**
 * Blog Posts Data - Mega Simulador Blog
 * Articles about lottery statistics, probability, and responsible gaming
 */

import { BlogPost } from "@/components/BlogCard";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "como-funciona-probabilidade-mega-sena",
    title: "Como Funciona a Probabilidade na Mega Sena: Guia Completo",
    excerpt: "Entenda a matemática por trás dos sorteios da Mega Sena. Descubra as chances reais de ganhar e como os números são calculados estatisticamente.",
    category: "Probabilidade",
    image: "/images/blog-featured.png",
    date: "27 Dez 2025",
    readTime: "8 min",
    featured: true,
  },
  {
    id: "2",
    slug: "numeros-mais-sorteados-mega-sena-2024",
    title: "Os 10 Números Mais Sorteados da Mega Sena em 2024",
    excerpt: "Análise completa dos números que mais apareceram nos sorteios da Mega Sena ao longo de 2024. Dados atualizados e estatísticas detalhadas.",
    category: "Estatísticas",
    image: "/images/statistics-section.png",
    date: "26 Dez 2025",
    readTime: "6 min",
    featured: true,
  },
  {
    id: "3",
    slug: "dicas-bolao-mega-sena",
    title: "Dicas para Fazer um Bolão Inteligente na Mega Sena",
    excerpt: "Aprenda estratégias para organizar bolões eficientes, dividir cotas de forma justa e aumentar suas chances de forma coletiva.",
    category: "Dicas",
    image: "/images/about-section.png",
    date: "25 Dez 2025",
    readTime: "5 min",
  },
  {
    id: "4",
    slug: "historia-mega-sena-brasil",
    title: "A História da Mega Sena no Brasil: De 1996 até Hoje",
    excerpt: "Conheça a trajetória da loteria mais popular do Brasil, os maiores prêmios já pagos e como ela se tornou um fenômeno nacional.",
    category: "Análise",
    image: "/images/hero-banner.png",
    date: "24 Dez 2025",
    readTime: "10 min",
  },
  {
    id: "5",
    slug: "indice-forca-relativa-ifr-loteria",
    title: "O que é o Índice de Força Relativa (IFR) nas Loterias",
    excerpt: "Descubra como o IFR é calculado e utilizado para analisar a frequência dos números nos sorteios da Mega Sena.",
    category: "Estatísticas",
    image: "/images/statistics-section.png",
    date: "23 Dez 2025",
    readTime: "7 min",
  },
  {
    id: "6",
    slug: "simulacao-monte-carlo-loteria",
    title: "Simulação de Monte Carlo Aplicada às Loterias",
    excerpt: "Entenda como o método de Monte Carlo pode ser usado para simular milhões de combinações e analisar padrões estatísticos.",
    category: "Probabilidade",
    image: "/images/blog-featured.png",
    date: "22 Dez 2025",
    readTime: "9 min",
  },
  {
    id: "7",
    slug: "jogo-responsavel-loteria",
    title: "Jogo Responsável: Como Apostar com Consciência",
    excerpt: "Orientações importantes sobre como manter uma relação saudável com jogos de loteria e reconhecer sinais de alerta.",
    category: "Dicas",
    image: "/images/about-section.png",
    date: "21 Dez 2025",
    readTime: "4 min",
  },
  {
    id: "8",
    slug: "maiores-premios-mega-sena-historia",
    title: "Os Maiores Prêmios da Mega Sena da História",
    excerpt: "Relembre os sorteios que pagaram os maiores prêmios da história da Mega Sena e descubra curiosidades sobre os ganhadores.",
    category: "Análise",
    image: "/images/hero-banner.png",
    date: "20 Dez 2025",
    readTime: "6 min",
  },
  {
    id: "9",
    slug: "numeros-frios-quentes-mega-sena",
    title: "Números Quentes vs Frios: Mito ou Realidade?",
    excerpt: "Análise científica sobre a teoria dos números quentes e frios nas loterias. O que dizem as estatísticas?",
    category: "Estatísticas",
    image: "/images/statistics-section.png",
    date: "19 Dez 2025",
    readTime: "8 min",
  },
  {
    id: "10",
    slug: "como-conferir-resultado-mega-sena",
    title: "Como Conferir o Resultado da Mega Sena: Guia Prático",
    excerpt: "Passo a passo completo para conferir seus jogos, entender as faixas de premiação e resgatar prêmios.",
    category: "Dicas",
    image: "/images/cta-background.png",
    date: "18 Dez 2025",
    readTime: "3 min",
  },
];

export const featuredPosts = blogPosts.filter((post) => post.featured);
export const recentPosts = blogPosts.slice(0, 6);
