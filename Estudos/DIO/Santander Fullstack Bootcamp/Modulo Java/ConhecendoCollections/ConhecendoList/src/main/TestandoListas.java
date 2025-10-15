package main;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
		List<Double> notas = Arrays.asList(7d, 8.5,9.5, 5d,7d,0d,3.6); //Não pode ser alterado.
		System.out.println(notas);
  		notas.add(10d);
  		System.out.println("Adicionando 10d em notas:" + notas);
*/  		
/*	
		List<Double> notas = List.of(7d, 8.5,9.5, 5d,7d,0d,3.6); //Não pode ser alterado.
		System.out.println(notas);
  		notas.add(10d);
  		notas.remove(5d);
  		System.out.println("Adicionando 10d em notas:" + notas);
*/		
  
//		Criando uma lista e adicionando elementos:
		List<Double> notas = new ArrayList<Double>();
		notas.addAll(Arrays.asList(7d, 8.5,9.5, 5d,7d,0d,3.6));
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
		System.out.println("O elemento 5.0 existe na lista? "+ notas.contains(5d));
		
// 		Exibindo elementos linha a linha:
		for(Double nota:notas) System.out.println(nota);
		
		
// 		Exivindo elementos pelo index 2:
		System.out.println("O elemento no index 2 é: "+notas.get(2));
		
		
// 		Retornando o menor elemento em uma lista:
		System.out.println("A menor nota é: "+Collections.min(notas));
		
// 		Retornando o maior elemento em uma lista:
		System.out.println("A maior nota é: "+Collections.max(notas));
		
// 		Retornando a soma de todos os valores da lista:
		Iterator<Double> iterator = notas.iterator();
		double soma = 0d;
		
		while(iterator.hasNext()) {
			Double next = iterator.next();
			soma += next;
		}
		System.out.println("A soma de todos os valores é: "+ soma);
		
//		Exibindo a media de todos os valores na lista		
		System.out.println("A media dos valores na lista é: "+ (soma/notas.size()));
		
//		removendo um elemento da lista
		notas.remove(0d);
		System.out.println("Elemento 0 removido: \n"+notas.toString());
		
//		removendo um elemento da lista por index
		notas.remove(0);
		System.out.println("Elemento na posição 0 removido: \n"+notas.toString());

		
// 		Removendo valores menores que 7 na lista:
		Iterator<Double> iterator1 = notas.iterator();
		while(iterator1.hasNext()) {
			Double next = iterator1.next();
			if(next < 7) iterator1.remove();
		}
		System.out.println("os elementos maiores que 7 são: \n"+ notas);		

// 		Removendo todos os elementos da lista:
		notas.clear();
		System.out.println("A lista esta vazia? " + notas.isEmpty());
		
	}

	
}
