// Como podemos melhorar o esse código usando TS?

enum Proficoes {
  Atriz,
  Padeiro,
}

interface pessoaProps {
  nome: string;
  idade: number;
  profissao: Proficoes;
}

let pessoa1 = {} as pessoaProps;
pessoa1.nome = "maria";
pessoa1.idade = 29;
pessoa1.profissao = Proficoes.Atriz;

let pessoa2 = {} as pessoaProps;

pessoa2.nome = "roberto";
pessoa2.idade = 19;
pessoa2.profissao = Proficoes.Padeiro;

let pessoa3: pessoaProps = {
  nome: "laura",
  idade: 32,
  profissao: Proficoes.Atriz,
};

let pessoa4: pessoaProps = {
  nome: "carlos",
  idade: 19,
  profissao: Proficoes.Padeiro,
};
