package desafios;

import java.util.Scanner;

import desafios.fibonacci.Fibonacci;
import desafios.stringverify.StringVerify;
import desafios.valorsoma.SomaValue;

public class Desafios {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// codigo referente ao menu de escolha dos desafios proporcionados

		boolean exit = false;
		while (!exit) {

			System.out.println("Olá, seja bem-vindo a resolução dos desafios para a TargetSistemas");
			System.out.println("1: Ordem fibonacci");
			System.out.println("2: Verifica se existe uma letra em uma String");
			System.out.println("3: Realiza o calculo com os valores das variaveis e mostra o resultado 77");
			System.out.print("Digite o numero da opção desejada: ");
			try {
				Scanner scan = new Scanner(System.in);
				int options = scan.nextInt();
				System.out.println();

				switch (options) {
				case 1: // exibe o conteudo relacionado com o desafio 1
					int num;
					Fibonacci fibo = new Fibonacci();
					System.out.println(
							"Esse desafio tem como objetivo verificar se um numero digitado pertence a ordem fibonacci.");
					System.out.print("Digite um numero para veriifcar: ");
					num = scan.nextInt();
					boolean fiboTrue = fibo.verifyFibo(num, true);
					if (fiboTrue) {
						System.out.print("Deseja verificar os proximos numeros da ordem a partir desse? [s/n] : ");
						String option = scan.next();
						if (option.equalsIgnoreCase("s")) {
							System.out.print("Digite quantos numeros quer ver: ");
							fibo.calcFibo(num, scan.nextInt());
						}
					}
					System.out.println();
					continue;

				case 2: //exibe o conteudo relacionado com o desafio 2
					StringVerify sv = new StringVerify();
					System.out.print("Digite o texto que desejar:");				
					String text = scan.next();
					System.out.print("Digite o caractere que quer verificar: ");
					String character = scan.next();
					System.out.println(sv.containAChar(text, character));
					System.out.println("Existem " + sv.getQtdChars()+" letras "+character.charAt(0)+ " em seu texto");
					System.out.println();
					continue;
				case 3:
					SomaValue smv = new SomaValue(12,0,1);
					System.out.println("O resultado do calculo com as variaveis passadas é: "+smv.calc());
					System.out.println();
					continue;
				default:
					System.out.println("Digite uma opção valida!");
					System.out.println();
				}

			} catch (java.util.InputMismatchException e) {
				System.out.println("Digite uma opção valida!");
				System.out.println("inmput error");
			}

		}
	}

}
