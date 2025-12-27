# API de Loterias da Caixa

## Base URL
https://loteriascaixa-api.herokuapp.com/api

## Endpoints

1. **GET /api** - Retorna todas as loterias disponíveis
2. **GET /api/{loteria}** - Retorna todos os resultados da loteria especificada
3. **GET /api/{loteria}/{concurso}** - Retorna resultado de um concurso específico
4. **GET /api/{loteria}/latest** - Retorna o resultado mais recente

## Para Mega Sena
- Último resultado: GET /api/megasena/latest
- Resultado específico: GET /api/megasena/{numero_concurso}
- Todos os resultados: GET /api/megasena
