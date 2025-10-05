// Secção: Colocando em prática
// Nome da aula: Na prática parte 1
// Link: https://web.dio.me/track/santander-bootcamp-fullstack-developer/course/map-filter-e-reduce/learning/3d24d434-9ff7-4bf4-8a57-bb8279aa2e7c?autoplay=1

// Conteúdo: Pratica de conteúdos visto nas aulas.

// Atividade 01:
// Objetivos: Usar map para multiplicar números

const maca = {
  value: 2,
};

const laranja = {
  value: 3,
};

function mapComThis(arr, thisArg) {
  return arr.map(function (item) {
    return item * this.value;
  }, thisArg);
}

const nums = [1, 2];

console.log("this -> maçã: ", mapComThis(nums, maca));
console.log("this -> laranja: ", mapComThis(nums, laranja));
