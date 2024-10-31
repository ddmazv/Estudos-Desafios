package list.pesquisa;

import java.util.ArrayList;
import java.util.List;
public class SomaNumeros {
	List<Integer> numList;
	
	
public SomaNumeros() {
	this.numList = new ArrayList<>();
}

public void adicionarNumero(int numero) {
	numList.add(numero);
}

public int calcularSoma() {
	if (!numList.isEmpty()) {
	int total = 0;
	for(int n : numList) {
		total += n;		
	}
	return total;
	}else {
		 throw new RuntimeException("A lista está vazia!");
	}
}

public int encontrarMaiorNumero() {
	if (!numList.isEmpty()) {
	int maior=0;
	for(int n : numList) {
		if(n > maior) {
			maior = n;
		}
	}
	return maior; 
	}else {
		 throw new RuntimeException("A lista está vazia!");
	}
}

public int encontrarMenorNumero() {
	if (!numList.isEmpty()) {
	int menor = numList.get(0);
	for(int n : numList) {
		if(n < menor) {
			menor = n;
		}
	}
	return menor; 
	}else {
		 throw new RuntimeException("A lista está vazia!");
	}
}

public List<Integer> exibirNumeros(){
	
	return numList;
}

}
