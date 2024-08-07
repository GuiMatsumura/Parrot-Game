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
let cartaClicada1 = "";
let cartaClicada2 = "";

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
  const acharHtml = document.querySelector("main");

  for (let i = 0; i < qtdCartas; i++) {
    const cartaSimples = `
    <div onclick="escolherCarta(this)" id=${i} class="carta"><img src="img/${novoBaralho[i]}.gif" alt="front parrot" /></div>
    `;
    acharHtml.innerHTML += cartaSimples;
  }
}

function aleatorizar() {
  return Math.random() - 0.5;
}

function escolherCarta(div) {
  console.log(document.getElementById(div.id).children[0].src);
  if (cartaClicada1 !== "" && cartaClicada2 === "") {
    cartaClicada2 = document.getElementById(div.id).children[0].src;
    if (cartaClicada1 === cartaClicada2) {
      console.log("acertou mizeravi");
      resetarEscolhas();
      return;
    }
    if (cartaClicada1 !== cartaClicada2) {
      console.log("errou mizeravi");
      resetarEscolhas();
      return;
    }
  }
  if (cartaClicada1 === "") {
    cartaClicada1 = document.getElementById(div.id).children[0].src;
  }
}

function resetarEscolhas() {
  cartaClicada1 = "";
  cartaClicada2 = "";
}
