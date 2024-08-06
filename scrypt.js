const minCartas = 4;
const maxCartas = 14;

let qtdCartas = 0;
let qtdJogadas = 0;

//obterQtdCartas();

function obterQtdCartas() {
  while (!validarQtdCartas()) {
    qtdCartas =
      prompt(`Insira a quantidade de cartas (4, 6, 8, 10, 12 ou 14)`) * 1;
  }
}

function validarQtdCartas() {
  const par = qtdCartas % 2 === 0;
  const qtdValida = qtdCartas >= minCartas && qtdCartas <= maxCartas;

  return par && qtdValida;
}
