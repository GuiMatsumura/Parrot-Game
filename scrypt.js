const minCartas = 4;
const maxCartas = 14;
const todosPapagaios = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];

let qtdCartas = 0;
let qtdJogadas = 0;
let numDuplas = 0;
let novoBaralho = [];

obterQtdCartas();
criarBaralho();
criarCartas();

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

function criarBaralho() {
  numDuplas = qtdCartas / 2;

  let baralhoProvisorio1 = [];
  let baralhoProvisorio2 = [];

  for (let i = 0; i < numDuplas; i++) {
    baralhoProvisorio1[i] += todosPapagaios[i];
    baralhoProvisorio2[i] += todosPapagaios[i];
  }
  novoBaralho = baralhoProvisorio1.concat(baralhoProvisorio2);

  for (let i = 0; i < novoBaralho.length; i++) {
    novoBaralho[i] = novoBaralho[i].replace("undefined", "");
  }

  novoBaralho.sort(aleatorizar);
}

function criarCartas() {
  console.log("entrouaq");
  const acharHtml = document.querySelector("main");

  for (let i = 0; i < qtdCartas; i++) {
    const cartaSimples = `
    <div class="carta"><img id=${i} src="img/${novoBaralho[i]}.gif" alt="front parrot" /></div>
    `;
    acharHtml.innerHTML += cartaSimples;
  }
}

function aleatorizar() {
  return Math.random() - 0.5;
}
