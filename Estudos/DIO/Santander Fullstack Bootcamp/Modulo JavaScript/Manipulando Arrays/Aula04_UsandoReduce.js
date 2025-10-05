// Secção: Colocando em prática
// Nome da aula: Na prática parte 1
// Link: https://web.dio.me/track/santander-bootcamp-fullstack-developer/course/map-filter-e-reduce/learning/41510fb3-39d3-49d2-95be-cdfc940a191d?autoplay=1

// Conteúdo: Pratica de conteúdos visto nas aulas.

// Atividade 04:
// Objetivos: Usar Reduce para somar números em um array

//atividade 05:

function somaNumeros(arr) {
  return arr.reduce(function (prev, current) {
    console.log({ prev });
    console.log({ current });
    return prev + current;
  }, 0);
}
console.log(somaNumeros([1, 2]));

// objetivos: Crie uma função que recebe uma lista de preços e um número representando o saldo disponível. Calcule qual será o saldo final após subtrair todos os preços da lista enviada.

const lista = [
  {
    name: "sabão em pó",
    preco: 30,
  },
  {
    name: "cereal",
    preco: 12,
  },
  {
    name: "toalha",
    preco: 30,
  },
];
const saldoDisponivel = 100;

function calculaSaldo(saldoDisponivel, lista) {
  return lista.reduce(function (prev, current, index) {
    console.log("rodada", index + 1);
    console.log({ prev });
    console.log({ current });
    return prev - current.preco;
  }, saldoDisponivel);
}

console.log(calculaSaldo(saldoDisponivel, lista));
