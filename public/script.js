async function rodarTeste(endpoint, outputId) {
  const output = document.getElementById(outputId);
  output.textContent = `Executando ${endpoint}...\n\n`;

  let tempos = [];

  for (let i = 1; i <= 20; i++) {
    const res = await fetch(endpoint);
    const data = await res.json();

    const tempo = data.tempo_ms;
    tempos.push(tempo);

    output.textContent += `Execução ${i}: ${tempo} ms\n`;
  }

  const soma = tempos.reduce((a, b) => a + b, 0);
  const media = (soma / tempos.length).toFixed(2);

  output.textContent += `\n----------------------\n`;
  output.textContent += `MÉDIA FINAL: ${media} ms`;
}
