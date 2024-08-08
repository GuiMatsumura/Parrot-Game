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
let jogada = [];

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
    <div onclick="escolherCarta(this)" class="carta">
     <div class="face-carta frente">
        <img src="img/front.png" alt="front parrot" />
      </div>
     <div class="face-carta verso">
       <img src="img/${novoBaralho[i]}.gif" alt="parrot" />
     </div>
    </div>
    `;
    acharHtml.innerHTML += cartaSimples;
  }
}

function aleatorizar() {
  return Math.random() - 0.5;
}

function escolherCarta(div) {
  if (isCartaValida(div)) {
    div.classList.add("selecionado");
    jogada.push(div);

    if (jogada.length === 2) {
      checarCartasIguais();
    }
  }
}

function resetarEscolhas() {
  cartaClicada1 = "";
  cartaClicada2 = "";
}

function isCartaValida(div) {
  return (
    !div.classList.contains("selecionado") ||
    !div.classList.contains("finalizado")
  );
}

function checarCartasIguais() {
  const primeiraCarta = jogada[0];
  const segundaCarta = jogada[1];
  if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
    primeiraCarta.classList.add("finalizado");
    segundaCarta.classList.add("finalizado");
    setTimeout(checarFinalJogo, 500);
  } else {
    setTimeout(virarCartasDoAvesso, 1000);
  }
}

function virarCartasDoAvesso() {
  jogada[0].classList.remove("selecionado");
  jogada[1].classList.remove("selecionado");
  jogada = [];
}

function checarFinalJogo() {
  const cartasViradas = document.querySelectorAll(".finalizado").length;
  if (cartasViradas === qtdCartas) {
    alert("Boooooa, você ganhou!");
    window.location.reload(true);
  }
  jogada = [];
}
