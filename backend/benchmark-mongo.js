const axios = require('axios');
const fs = require('fs');

async function rodarBenchmark() {
  const url = 'http://localhost:3000/test/mongo/pets';
  const resultados = [];

  console.log('Rodando 20 requisições no MongoDB...');

  for (let i = 1; i <= 20; i++) {
    const inicio = Date.now();
    try {
      await axios.get(url);
    } catch (err) {
      console.error(`Erro na execução ${i}:`, err.message);
      resultados.push('Erro');
      continue;
    }
    const fim = Date.now();
    const tempo = fim - inicio;
    resultados.push(tempo);
    console.log(`Execução ${i}: ${tempo} ms`);
  }

  // Calcular média (somente tempos válidos)
  const temposValidos = resultados.filter(x => typeof x === 'number');
  const soma = temposValidos.reduce((a, b) => a + b, 0);
  const media = temposValidos.length ? soma / temposValidos.length : 0;

  console.log('\n=== RESULTADO FINAL ===');
  console.log('Tempos:', resultados);
  console.log('Média:', media.toFixed(2), 'ms');

  // Salvar CSV
  let csv = 'Execução,Tempo(ms)\n';
  resultados.forEach((t, i) => {
    csv += `${i + 1},${t}\n`;
  });
  csv += `Média,${media.toFixed(2)}\n`;

  fs.writeFileSync('benchmark-mongo.csv', csv);
  console.log('\nArquivo benchmark-mongo.csv criado!');
}

rodarBenchmark();
