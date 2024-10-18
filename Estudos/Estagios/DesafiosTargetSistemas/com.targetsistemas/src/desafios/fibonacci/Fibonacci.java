package desafios.fibonacci;

import java.util.ArrayList;

public class Fibonacci {
	int befFibo;
	int number;

	/*
	 * metodo para realizar o calculo e exibir a ordem fibonacci a partir de um
	 * numero digitado pelo usuario.
	 */

	public int calcFibo(int number, int qtd) {
		int nextFibo = 0;

		ArrayList<Integer> fibonums = new ArrayList<Integer>();
		for (int cont = 0; cont < qtd; cont++) {
			findBefFibo(number);
			nextFibo = number + this.befFibo;
			number = nextFibo;
			fibonums.add(number);

		}
		System.out.println(fibonums.toString());
		return nextFibo;

	}

	/*
	 * metodo para verificar se o numero pertence a ordem fibonacci.
	 */
	public boolean verifyFibo(int number) {

		return verifyPerfectRoot(5 * number * number + 4) || verifyPerfectRoot(5 * number * number - 4);

	}

	/*
	 * metodo para verificar se o numero pertence a ordem fibonacci com uma flag
	 * para exibir ou não uma mensagem.
	 */
	public boolean verifyFibo(int number, boolean mensage) {
		boolean verifiedNumber;

		if (verifyPerfectRoot(5 * number * number + 4) || verifyPerfectRoot(5 * number * number - 4)) {
			verifiedNumber = true;
			if (mensage) {
				System.out.println("O numero " + number + " é da ordem fibonacci");
			}
		} else {
			verifiedNumber = false;
			if (mensage) {
				System.out.println("O numero " + number + " não é da ordem fibonacci");
			}
		}

		return verifiedNumber;
	}

	/*
	 * metodo para verificar se o numero possui raiz raiz perfeita.
	 */
	public boolean verifyPerfectRoot(int number) {
		int sqroot = (int) Math.sqrt(number);
		int perfectroot = sqroot * sqroot;

		return perfectroot == number;
	}

	/*
	 * metodo para buscar o numero anterior ao do imput do usuario.
	 */
	public void findBefFibo(int number) {
		if (number != 1 && number != 0) {
			if (verifyFibo(number)) {
				this.befFibo = --number;
				while (!verifyFibo(this.befFibo)) {
					befFibo = --number;
					if (verifyFibo(this.befFibo)) {
						break;
					}

				}
			}

		} else {
			number = 1;
			befFibo = 1;
		}

	}

}
