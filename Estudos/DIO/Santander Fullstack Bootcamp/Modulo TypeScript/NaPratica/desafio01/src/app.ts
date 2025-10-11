/* Como podemos rodar isso em um arquivo .ts sem causar erros? 

let employee = {};
employee.code = 10;
employee.name = "John";
*/

// Resposta 01: Ao declarar a vadiavel
let employee01 = {
  code: 10,
  nome: "Edu",
};

// Resposta 02: Injetando diretamente na variavel
let employee02: { code: number; nome: string } = {
  code: 10,
  nome: "Edu",
};

// Resposta 03: Usando interface modo 1
interface employeeProps {
  code: number;
  name: string;
}

let employee03: employeeProps = {
  code: 10,
  name: "Edu",
};

// Resposta 04: Usando interface modo 2
let employee04 = {} as employeeProps;

employee04.code = 10;
employee04.name = "Edu";
