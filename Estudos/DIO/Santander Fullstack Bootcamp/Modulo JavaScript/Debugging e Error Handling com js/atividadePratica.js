// Secção: Colocando em prática
// Nome da aula: Na prática parte 1
// Link: https://web.dio.me/track/santander-bootcamp-fullstack-developer/course/debugging-e-error-handling-com-javascript/learning/61732474-2428-45c9-be5d-885f777e9e31?autoplay=1

// Conteúdo: Pratica de conteúdos visto nas aulas.

// Atividade 01:
// Objetivos: Disparar erros conforme o uso incorreto da função

function validaArray(arr, num) {
  try {
    if (!arr && !num) throw new ReferenceError("Envie os parâmetros");
    if (typeof arr !== "object")
      throw new TypeError("Array precisa ser do tipo object");
    if (typeof num !== "number")
      throw new TypeError("num precisa ser do tipo number");
    if (arr.length !== num) throw new RangeError("Tamanho inválido");
    return arr;
  } catch (e) {
    if (e instanceof ReferenceError) {
      console.log("reference error");
      console.log(e.message);
    } else if (e instanceof TypeError) {
      console.log("type error");
      console.log(e.message);
    } else if (e instanceof RangeError) {
      console.log("range error");
      console.log(e.message);
    } else {
      console.log("Typo de erro inesperado: " + e);
    }
  }
}

console.log(validaArray([1, 2, 3, 4, 5], 5));
