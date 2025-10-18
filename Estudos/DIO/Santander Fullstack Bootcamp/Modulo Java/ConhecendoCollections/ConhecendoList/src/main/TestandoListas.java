package main;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

public class TestandoListas {

	public static void main(String[] args) {
//		Iniciando um ArrayList:

//		List notas = new ArrayList(); //antes do java 5
//		List<Double> notas = new ArrayList<Double>(); //Generics (JDK 5)
//		List<Double> notas = new ArrayList<>(); // Diamant Operator (JDK 7)
//		ArrayList<Double> notas = new ArrayList<>(); // Não Recomendado pois não utiliza da interface List para estabelecer seus métodos.
//		List<Double> notas = new ArrayList<>(Arrays.asList(7d, 8.5,9.5, 5d,7d,0d,3.6));
/*
		List<Double> notas = Arrays.asList(7d, 8.5, 9.5, 5d, 7d, 0d, 3.6); // Não pode ser alterado.
		System.out.println(notas);
		notas.add(10d);
		System.out.println("Adicionando 10d em notas:" + notas);
*/
/*		
		List<Double> notas = List.of(7d, 8.5, 9.5, 5d, 7d, 0d, 3.6); // Não pode ser alterado.
		System.out.println(notas);
		notas.add(10d);
		notas.remove(5d);
		System.out.println("Adicionando 10d em notas:" + notas);
*/
/*
//		Metodos principais:

//		Criando uma lista e adicionando elementos:
		List<Double> notas = new ArrayList<Double>();
		notas.addAll(Arrays.asList(7d, 8.5, 9.5, 5d, 7d, 0d, 3.6));
		System.out.println(notas.toString());

//		Exibindo index do elemento:
		System.out.println("O index do elemento 5d é: " + notas.indexOf(5d));

//		Adicionando elemntos em um index específico na lista:
		notas.add(5, 8.0);
		System.out.println("Elemento 8.0 adicionade em notas: " + notas);

//		Alterando elemento na lista:
		notas.set(notas.lastIndexOf(5d), 6.0);
		System.out.println("Alterando 5.0 para 6.0: " + notas);

//		Verificando existencia de elemento na lista		
		System.out.println("O elemento 5.0 existe na lista? " + notas.contains(5d));

// 		Exibindo elementos linha a linha:
		for (Double nota : notas)
			System.out.println(nota);

// 		Exivindo elementos pelo index 2:
		System.out.println("O elemento no index 2 é: " + notas.get(2));

// 		Retornando o menor elemento em uma lista:
		System.out.println("A menor nota é: " + Collections.min(notas));

// 		Retornando o maior elemento em uma lista:
		System.out.println("A maior nota é: " + Collections.max(notas));

// 		Retornando a soma de todos os valores da lista:
		Iterator<Double> iterator = notas.iterator();
		double soma = 0d;

		while (iterator.hasNext()) {
			Double next = iterator.next();
			soma += next;
		}
		System.out.println("A soma de todos os valores é: " + soma);

//		Exibindo a media de todos os valores na lista		
		System.out.println("A media dos valores na lista é: " + (soma / notas.size()));

//		removendo um elemento da lista
		notas.remove(0d);
		System.out.println("Elemento 0 removido: \n" + notas.toString());

//		removendo um elemento da lista por index
		notas.remove(0);
		System.out.println("Elemento na posição 0 removido: \n" + notas.toString());

// 		Removendo valores menores que 7 na lista:
		Iterator<Double> iterator1 = notas.iterator();
		while (iterator1.hasNext()) {
			Double next = iterator1.next();
			if (next < 7)
				iterator1.remove();
		}
		System.out.println("os elementos maiores que 7 são: \n" + notas);

// 		Removendo todos os elementos da lista:
		notas.clear();
		System.out.println("A lista esta vazia? " + notas.isEmpty());
*/
//		Organizando uma Lista:
		List<Gato> meusGatos = new ArrayList<>() {
			{
				add(new Gato("Jon", 18, "preto"));
				add(new Gato("Simba", 6, "tigrado"));
				add(new Gato("Jon", 12, "amarelo"));

			}

		};
//		Exibindo na ordem de inserção:
		System.out.println("Lista por ordem de inserção: " + meusGatos);

//		Exibindo em ordem aleatoria:
		Collections.shuffle(meusGatos);
		System.out.println("Lista embaralhada: " + meusGatos);

// 		Exibindo em ordem Natural:
		
		Collections.sort(meusGatos);
		System.out.println("Lista organizada em ordem natural: " + meusGatos);
		
// 		Exibindo em ordem de idade	:
		meusGatos.sort(new ComparatorIdade());
		System.out.println("Lista ordenadas por idade: " + meusGatos);
		
// 		Exibindo em ordem de idade	:
		meusGatos.sort(new ComparatorCor());
		System.out.println("Lista ordenadas por cor: " + meusGatos);
		
// 		Exibindo em ordem de idade	:
		meusGatos.sort(new ComparatorNomeCorIdade());
		System.out.println("Lista ordenadas por nome ou cor ou idade: " + meusGatos);
	}
	
	
}

class Gato implements Comparable<Gato>{
	private String nome;
	private Integer idade;
	private String cor;

	public Gato(String nome, Integer idade, String cor) {
		
		super();
		this.nome = nome;
		this.idade = idade;
		this.cor = cor;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	@Override
	public String toString() {
		return "{nome=" + nome + ", idade=" + idade + ", cor=" + cor + "}";
	}

	@Override
	public int compareTo(Gato gato) {
		return this.getNome().compareToIgnoreCase(gato.getNome());
	}


}
class ComparatorNomeCorIdade implements Comparator<Gato>{

	@Override
	public int compare(Gato gato1, Gato gato2) {
		int nome = gato1.getNome().compareToIgnoreCase(gato2.getNome());
		if(nome !=0) return nome;
		int cor = gato1.getCor().compareToIgnoreCase(gato2.getCor());
		if(cor != 0) return cor;
		
		return Integer.compare(gato1.getIdade(),gato2.getIdade()) ;
	}
	
}

class ComparatorCor implements Comparator<Gato>{

	@Override
	public int compare(Gato gato1, Gato gato2) {
		return gato1.getCor().compareToIgnoreCase(gato2.getCor());
	}
	
}

class ComparatorIdade implements Comparator<Gato>{

	@Override
	public int compare(Gato gato1, Gato gato2) {
		return Integer.compare(gato1.getIdade(), gato2.getIdade());
	}
	
}