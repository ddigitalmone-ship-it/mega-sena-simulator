/**
 * Header Component - Brazilian Tropical Modernism
 * Navigation with organic curves and warm Brazilian colors
 */

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/blog", label: "Blog" },
  { href: "/estatisticas", label: "Estatísticas" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-brazilian flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-mono font-bold text-lg">M</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary shadow-md" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg leading-tight text-foreground">
              Mega Simulador
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              Blog & Estatísticas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                className={`font-medium ${
                  location === link.href
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
          <a
            href="https://megasimulador.sbs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="ml-2 bg-gradient-brazilian hover:opacity-90 text-white shadow-lg">
              Acessar Simulador
            </Button>
          </a>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={location === link.href ? "secondary" : "ghost"}
                    className={`w-full justify-start text-lg ${
                      location === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <a
                href="https://megasimulador.sbs"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button className="w-full bg-gradient-brazilian hover:opacity-90 text-white shadow-lg">
                  Acessar Simulador
                </Button>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
