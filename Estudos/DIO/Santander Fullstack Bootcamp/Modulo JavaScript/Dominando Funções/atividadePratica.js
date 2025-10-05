// Secção: Arrow functions
// Nome da aula: Atividade prática
// Link: https://web.dio.me/track/santander-bootcamp-fullstack-developer/course/dominando-funcoes-em-javascript/learning/0a54c71b-949d-4157-8509-6dbe68492dae?autoplay=1

// Conteúdo: Pratica de conteúdos visto nas aulas.

// Atividade 01:
// Objetivos: criar funções para gerar um novo array com base em condições
const alunos = [
  {
    nome: "edu",
    nota: 10,
    idade: 20,
  },
  {
    nome: "Marcos",
    nota: 10,
    idade: 26,
  },
  {
    nome: "Fernando",
    nota: 9,
    idade: 15,
  },
  {
    nome: "zva",
    nota: 7,
    idade: 22,
  },
  {
    nome: "Lucas",
    nota: 6,
    idade: 17,
  },
];

function alunosAprovados(arrayAlunos, notaDeCorte) {
  console.log("Solução apresentada na aula:");
  let aprovados = [];
  for (let i = 0; i < arrayAlunos.length; i++) {
    const { nota, nome } = arrayAlunos[i]; //object destructuring
    if (nota >= notaDeCorte) {
      aprovados.push(nome);
    }
  }
  return aprovados;
}

function cutNote(arrayAlunos, notaDeCorte) {
  console.log("Minha solução:");
  let passaram = [];
  for (aluno of arrayAlunos) {
    if (aluno.nota >= notaDeCorte) {
      passaram.push(aluno.nome);
    } else {
      continue;
    }
  }
  return passaram;
}

console.log("Atividade 01:");
console.log(alunosAprovados(alunos, 7));
console.log(cutNote(alunos, 7));

// Atividade 02:
// Objetivos: Modificar o valor de this utilizando call e aplly
console.log("Atividade 02:");

function calculaIdade(anos) {
  return `Daqui a ${anos} anos, ${this.nome} terá ${
    this.idade + anos
  } anos de idade.`;
}
console.log("Usando call");
console.log(calculaIdade.call(alunos[1], 30));
console.log("Usando apply");
console.log(calculaIdade.apply(alunos[1], [30]));
