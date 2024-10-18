package controledefluxo;

import java.util.Scanner;

public class Contador {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner scan = new Scanner(System.in);
		
		System.out.println("Digite o primeiro parâmetro");
		int parametro1 = scan.nextInt();
		
		System.out.println("Digite o segundo parâmetro");
		int parametro2 = scan.nextInt();
		
		try {
		contar(parametro1, parametro2);
		}catch (ParametrosInvalidosException e) {
			e.printStackTrace();
		}
		
	}

	static void contar(int parametro1, int parametro2) throws ParametrosInvalidosException {
		
		if(parametro1 > parametro2) {
		throw new ParametrosInvalidosException();
		}else {
		int contagem = parametro2 - parametro1;
		System.out.println(contagem);
		for(int i = 1; i<=contagem;i++){
			System.out.println("Imprimindo o numero: " + i);
		}
		
		}
	}
	
}
