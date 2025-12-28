# 🎰 Mega Sena Simulator

**Simulador inteligente de palpites para a Mega Sena com validação, análise IFR (Índice de Força Relativa) e simulação Monte Carlo.**

## 🚀 Recursos

- 📊 **Validação de combinações**: Verifica combinações únicas e válidas
- 📈 **Análise IFR**: Calcula o Índice de Força Relativa baseado em dados históricos
- 🎲 **Simulação Monte Carlo**: Gera simulações estatísticas para otimizar palpites
- 🔐 **Autenticação OAuth**: Login seguro com contas de terceiros
- 💾 **Banco de dados**: Armazena histórico de concursos e simulações
- 🌐 **Full-stack**: Frontend React + Backend Express.js

## 🛠️ Tech Stack

### Frontend
- **React 18** com Vite
- **TypeScript** para type safety
- **Tailwind CSS** para styling
- **Shadcn/UI** para componentes

### Backend
- **Express.js** - Framework Node.js
- **Drizzle ORM** - Type-safe database queries
- **OAuth2** - Autenticação segura
- **PostgreSQL/SQLite** - Banco de dados

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/ddigitalmone-ship-it/mega-sena-simulator.git
cd mega-sena-simulator

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Inicie o servidor
npm start
```

## 🔑 Variáveis de Ambiente

Configure no arquivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000
NODE_ENV=development
PORT=3000
DATABASE_URL=sqlite:./data.db
```

## 📊 Usando a Aplicação

1. **Acesse** https://megasimulador.sbs ou https://mega-sena-simulator.vercel.app
2. **Faça login** com sua conta
3. **Gere palpites** usando IFR e Monte Carlo
4. **Visualize estatísticas** dos concursos
5. **Compare resultados** com suas simulações

## 🚀 Deploy

Este projeto está hospedado em **Vercel** com CI/CD automático.

- **Production**: https://mega-sena-simulator.vercel.app
- **Custom Domain**: https://megasimulador.sbs

## 📄 Licença

MIT - Veja LICENSE.md para detalhes

## 👤 Autor

**ddigitalmone-ship-it**

---

⭐ Se gostou, considere dar uma estrela no repositório!
