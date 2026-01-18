📊 Prova de Conceito – Comparativo de Performance
MariaDB vs MongoDB (VidaPet.tech)
📌 Visão Geral

Este repositório contém uma Prova de Conceito (PoC) desenvolvida para comparar performance de leitura e escrita entre MariaDB (banco relacional) e MongoDB (banco NoSQL), utilizando Node.js + Express.

O objetivo não é apenas medir qual banco é mais rápido, mas avaliar qual tecnologia é mais adequada para sustentar o crescimento, escalabilidade e evolução da plataforma VidaPet.tech, especialmente considerando futuras demandas como alto volume de usuários, dados dinâmicos e integração com IA.

🎯 Problema que o projeto resolve

A infraestrutura atual da VidaPet.tech apresenta limitações críticas:

Banco relacional (MariaDB) rodando em uma única VM

Gargalo de escalabilidade vertical

Alto risco de indisponibilidade

Crescente custo operacional

Dificuldade para suportar novas funcionalidades (IA, grandes volumes de dados, eventos)

Esta PoC fornece dados objetivos para apoiar decisões arquiteturais estratégicas.

🧪 O que foi testado

Foram realizados testes de:

✅ Leitura

✅ Escrita (insert)

🔁 20 execuções automáticas por endpoint

⏱️ Medição de tempo em milissegundos (ms)

Endpoints testados
Banco	Operação	Endpoint
MariaDB	Leitura	/mariadb/read
MariaDB	Escrita	/mariadb/create
MongoDB	Leitura	/mongodb/read
MongoDB	Escrita	/mongodb/create
📈 Resultados dos Testes
📖 Leitura – MariaDB

Média: 1.35 ms

✍️ Escrita – MariaDB

Média: 1.15 ms

✍️ Escrita – MongoDB

Média: 11.75 ms

📖 Leitura – MongoDB

Média: 15.55 ms

📌 Observação:
Os testes foram realizados em ambiente controlado, com dados simples e sem concorrência massiva.

🧠 Análise Técnica

MariaDB

Excelente performance em operações simples

Ideal para dados estruturados e transacionais

Limitações claras de escalabilidade horizontal

MongoDB

Maior latência em operações simples

Forte capacidade de escalabilidade horizontal

Mais adequado para dados dinâmicos, crescimento rápido e integração com IA

➡️ Conclusão técnica:
MariaDB é mais rápido em cenários simples, mas MongoDB é mais preparado para crescimento em larga escala.

🏗️ Arquitetura Recomendada

Arquitetura híbrida:

MariaDB

Dados transacionais críticos

Pagamentos, cadastros principais, integridade referencial

MongoDB

Logs, eventos, históricos

Dados de IA, analytics, comportamento de usuários

Escalabilidade horizontal

Essa abordagem equilibra performance, custo e crescimento futuro.

🚀 Tecnologias Utilizadas

Node.js

Express

MariaDB

MongoDB

dotenv

HTML + JavaScript (frontend de testes)

⚙️ Configuração do Ambiente
1️⃣ Clonar o repositório
git clone https://github.com/matheusades/VIDA-PET-BFD.git
cd VIDA-PET-BFD

2️⃣ Instalar dependências
npm install

3️⃣ Configurar variáveis de ambiente (.env)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=vida_pet

MONGO_URI=mongodb://localhost:27017/vida_pet

4️⃣ Iniciar o servidor
node index.js


Servidor disponível em:

http://localhost:3000

🖥️ Frontend de Testes

O frontend permite:

Executar testes de leitura e escrita

Rodar 20 execuções automáticas

Visualizar tempos individuais e média

Comparar resultados entre bancos

📄 Documentação Complementar

📘 Whitepaper técnico do projeto

📊 Resultados reais de benchmark

📐 Análise arquitetural para tomada de decisão

📌 Conclusão

Este projeto demonstra que performance isolada não é o único fator decisivo.
A escolha correta de banco de dados deve considerar:

Crescimento

Escalabilidade

Manutenção

Evolução tecnológica

A PoC fornece base sólida para uma decisão estratégica orientada a dados.
