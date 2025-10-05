// Secção: Set
// Nome da aula: Atividade prática
// Link:https://web.dio.me/track/santander-bootcamp-fullstack-developer/course/mapas-e-conjuntos-com-javascript/learning/e273cc44-fc17-4f16-91f1-c81cf3efa847?autoplay=1

// Conteúdo: Pratica de conteúdos de maps e set visto nas aulas.

// Atividade 01:

function getAdmins(map) {
  let admins = [];
  for ([key, value] of map) {
    if (value === "admin") {
      admins.push(key);
    }
  }
  return admins;
}

const usuarios = new Map();

usuarios.set("Luis", "admin");
usuarios.set("Stephany", "admin");
usuarios.set("Jorge", "user");
usuarios.set("Natália", "admin");

console.log("atividade 01:");
console.log(getAdmins(usuarios));

// Atividade 02:

const array = [30, 30, 40, 5, 223, 2049, 3034, 5];

function valoresUnicos(array) {
  const mySet = new Set(array);
  return [...mySet];
}
console.log("atividade 02:");
console.log(valoresUnicos(array));
