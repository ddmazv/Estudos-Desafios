// O código abaixo tem alguns erros e não funciona como deveria. Você pode identificar quais são e corrigi-los em um arquivo TS?

// versão da aula:

let botaoAtualizar = document.getElementById(
  "atualizar-saldo"
) as HTMLButtonElement;
let botaoLimpar = document.getElementById("limpar-saldo") as HTMLButtonElement;
let soma = document.getElementById("soma") as HTMLInputElement;
let campoSaldo = document.getElementById("campo-saldo");

let novoSaldo = 0;
limparSaldo;

function somarAoSaldo(soma: number) {
  if (campoSaldo) {
    novoSaldo += soma;
    campoSaldo.innerHTML = novoSaldo.toString();
    limparSaldo;
  }
}

function limparSaldo() {
  soma.value = "";
}

botaoAtualizar.addEventListener("click", function () {
  somarAoSaldo(Number(soma.value));
});

botaoLimpar.addEventListener("click", function () {
  limparSaldo();
});

/* //Minha Versão:

let botaoAtualizar = document.getElementById(
  "atualizar-saldo"
) as HTMLButtonElement;
let botaoLimpar = document.getElementById("limpar-saldo") as HTMLButtonElement;
let soma = document.getElementById("soma") as HTMLTextAreaElement;
let campoSaldo = document.getElementById("campo-saldo") as HTMLSpanElement;

campoSaldo.innerHTML = "0";

function somarAoSaldo(soma: number) {
  let novoSaldo: number = Number(campoSaldo.innerHTML);
  novoSaldo += soma;
  campoSaldo.innerHTML = novoSaldo.toString();
}

function limparSaldo() {
  campoSaldo.innerHTML = "";
}

botaoAtualizar.addEventListener("click", function () {
  somarAoSaldo(Number(soma.value));
});

botaoLimpar.addEventListener("click", function () {
  limparSaldo();
});

/**
    <h4>Valor a ser adicionado: <input id="soma"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>"Seu saldo é: " <span id="campo-saldo"></span></h1>
 */
