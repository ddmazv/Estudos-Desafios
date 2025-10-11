let valorAny: any;

valorAny = 3;
valorAny = "ola";
valorAny = true;

let valorString: string = "teste";
valorString = valorAny;
let valorString2: string = "testão";

valorString2 = valorAny;

function somarStrings(string1: string, string2: string) {
  console.log(string1 + string2);
}

somarStrings(valorString, valorString2);
