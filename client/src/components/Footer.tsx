/**
 * Footer Component - Brazilian Tropical Modernism
 * Organic wave divider with warm colors and comprehensive links
 */

import { Link } from "wouter";

const footerLinks = {
  blog: [
    { href: "/blog", label: "Todos os Artigos" },
    { href: "/blog/probabilidade", label: "Probabilidade" },
    { href: "/blog/estatisticas", label: "Estatísticas" },
    { href: "/blog/dicas", label: "Dicas de Bolão" },
  ],
  institucional: [
    { href: "/sobre", label: "Quem Somos" },
    { href: "/privacidade", label: "Política de Privacidade" },
    { href: "/termos", label: "Termos de Uso" },
    { href: "/contato", label: "Contato" },
  ],
  recursos: [
    { href: "https://megasimulador.sbs", label: "Simulador", external: true },
    { href: "https://www.caixa.gov.br/loterias", label: "Caixa Loterias", external: true },
    { href: "https://www.cvv.org.br", label: "CVV - Apoio (188)", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
        <svg
          className="relative block w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="oklch(0.596 0.145 163.225)"
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                  <span className="font-mono font-bold text-lg">M</span>
                </div>
                <span className="font-display text-xl">Mega Simulador</span>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Blog educacional sobre estatísticas e análises da Mega Sena. 
                Conteúdo informativo para entender probabilidades e jogar com responsabilidade.
              </p>
            </div>

            {/* Blog Links */}
            <div>
              <h3 className="font-display text-lg mb-4">Blog</h3>
              <ul className="space-y-2">
                {footerLinks.blog.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institucional Links */}
            <div>
              <h3 className="font-display text-lg mb-4">Institucional</h3>
              <ul className="space-y-2">
                {footerLinks.institucional.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-display text-lg mb-4">Recursos</h3>
              <ul className="space-y-2">
                {footerLinks.recursos.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-primary-foreground/70 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Mega Simulador Blog. Todos os direitos reservados.
              </p>
              <p className="text-primary-foreground/60 text-xs text-center md:text-right max-w-md">
                Este site tem caráter exclusivamente educacional e informativo. 
                Não garantimos ganhos em jogos de loteria. Jogue com responsabilidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
