// Secção: Colocando em prática
// Nome da aula: Na prática parte 1
// Link: https://web.dio.me/track/santander-bootcamp-fullstack-developer/course/map-filter-e-reduce/learning/47359156-051e-4e65-9e20-d95c617dd164?autoplay=1

// Conteúdo: Pratica de conteúdos visto nas aulas.

// Atividade 03:
// Objetivos: Usar filter para filtrar numeros pares

function filtraPares(arr) {
  return arr.filter(callback);
}

function callback(item) {
  return item % 2 === 0;
}

const meuArray = [1, 23, 55, 67, 30, 2, 4];

console.log(filtraPares(meuArray));
