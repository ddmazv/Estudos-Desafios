// Secção: Colocando em prática
// Nome da aula: Na prática parte 1
// Link: https://web.dio.me/track/santander-bootcamp-fullstack-developer/course/map-filter-e-reduce/learning/a191c12e-7e24-4659-8117-57534f8b6b9d?autoplay=1

// Conteúdo: Pratica de conteúdos visto nas aulas.

// Atividade 02:
// Objetivos: Usar map para multiplicar números sem this

function mapSemthis(arr) {
  return arr.map(function (item) {
    return item * 2;
  });
}

const nums = [2, 4, 6, 8, 10];
console.log(mapSemthis(nums));
