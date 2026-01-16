const PDFDocument = require('pdfkit');
const fs = require('fs');

// Tabela de benchmark exemplo
const tempos = [65,24,7,7,9,9,8,5,3,3,2,4,3,3,3,2,3,3,2,3];
const media = (tempos.reduce((a,b)=>a+b,0)/tempos.length).toFixed(2);

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('Vidapet_PoC.pdf'));

// Título
doc.fontSize(20).text('Vidapet – PoC Backend MariaDB vs MongoDB', {align: 'center'});
doc.moveDown();

// Descrição
doc.fontSize(12).text('Projeto para comparação de performance entre MariaDB e MongoDB em operações de leitura.');

// Estrutura do projeto
doc.moveDown();
doc.fontSize(14).text('Estrutura do Projeto');
doc.fontSize(10).text(`
backend/
├─ src/
│  ├─ config/
│  ├─ models/
│  ├─ routes/
│  └─ app.js
`);

// Endpoints
doc.moveDown();
doc.fontSize(14).text('Endpoints Disponíveis');
doc.fontSize(10).text(`
- MariaDB: GET /test/maria/pets
- MongoDB: GET /test/mongo/pets
`);

// Benchmark
doc.moveDown();
doc.fontSize(14).text('Benchmark MongoDB – 20 Execuções');
doc.fontSize(10).text(`Tempos (ms): ${tempos.join(', ')}\nMédia: ${media} ms`);

// Resultado final
doc.moveDown();
doc.fontSize(14).text('Resultados Observados');
doc.fontSize(10).text(`Teste de Leitura – MongoDB: média de ${media} ms em 20 execuções.`);

// Instruções para rodar
doc.moveDown();
doc.fontSize(14).text('Como Rodar Localmente');
doc.fontSize(10).text(`
1. git clone <repo>
2. npm install
3. Configurar .env
4. node src/app.js
5. Testar endpoints
`);

// Observações
doc.moveDown();
doc.fontSize(14).text('Observações');
doc.fontSize(10).text('- Não versionar node_modules/ e .env\n- Projeto é apenas PoC');

// Finaliza
doc.end();

console.log('PDF Vidapet_PoC.pdf gerado com sucesso!');
