package list.ordenacao;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class OrdenacaoNumeros {

	List<Integer> numList;

	public OrdenacaoNumeros() {
		this.numList = new ArrayList<>();
	}

	public void adicionarNumero(int numero) {
		numList.add(numero);
	}

	public List<Integer> ordenarAscendente() {
		List<Integer> numerosAscendente = new ArrayList<>(this.numList);
		if (!numList.isEmpty()) {
			Collections.sort(numerosAscendente);
			return numerosAscendente;
		} else {
			throw new RuntimeException("A lista está vazia!");
		}
	}

	public List<Integer> ordenarDescendente() {
		List<Integer> numerosAscendente = new ArrayList<>(this.numList);
		if (!numList.isEmpty()) {
			return numerosAscendente.reversed();
		} else {
			throw new RuntimeException("A lista está vazia!");
		}
	}

}
