package main;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;

public class TestandoSets {

	public static void main(String[] args) {
		System.out.println("Criando um set");
		Set<Double> notas = new HashSet<>(Arrays.asList(7d,8.5,9.3,5d,7d,0d,3.6));
		System.out.println(notas.toString());
		
		System.out.println("Conferindo se a nota 5 está no conjunto: " + notas.contains(5d));
		System.out.println("exibindo a menor nota no conjunto: " + Collections.min(notas));
		System.out.println("exibindo a maior nota no conjunto: " + Collections.max(notas));
		
		Iterator<Double> iterator = notas.iterator();
		double soma = 0.0;
		while(iterator.hasNext()) {
			double next = iterator.next();
			soma += next;
		}
		System.out.println("exibindo a o valor total das notas no conjunto: " + soma);
		
		System.out.println("exibindo a media das notas no conjunto: " + (soma/notas.size()));
		System.out.println("Removendo a nota 0: " + notas.remove(0d));
		System.out.println(notas.toString());
		Iterator<Double> iterator2 = notas.iterator();
		while(iterator2.hasNext()) {
			if(iterator2.next() < 7) iterator2.remove();
		}
		System.out.println("Removendo notas menores que 7: " + notas.toString());
		
		Set<Double> notas2 = new LinkedHashSet<>(Arrays.asList(7d,8.5,9.3,5d,7d,0d,3.6));
		System.out.println("exibindo as notas em ordem de inserção no conjunto: " +notas2.toString());
		Set<Double> notas3 = new TreeSet<>(notas2); 
		System.out.println("exibindo as notas em ordem cescente: " +notas3.toString());
		notas2.clear();
		System.out.println("Apagando todo o conjunto: " + notas2.isEmpty());	
		Set<Serie> minhasSeries = new HashSet<>() {{
			add(new Serie("got","fantasia",60));
			add(new Serie("dark","drama",60));
			add(new Serie("that '70s show","comédia",25));
		}};
		for(Serie  serie : minhasSeries) System.out.println("exibindo series em ordem aleatoria: " + serie.getNome());
		
		Set<Serie> minhasSeries2 = new TreeSet<>(minhasSeries)
				;
		System.out.println("exibindo series em ordem natural (Tempo de Episodios): " + minhasSeries2);
		Set<Serie> minhasSeries3 = new TreeSet<>(new ComparatorNomeGenTemp());
		minhasSeries3.addAll(minhasSeries);
		for(Serie serie : minhasSeries3) System.out.println("exibindo series em ordem nome/genero/tempo de episodio: " + serie.getNome());
		
	}
	
}

class Serie implements Comparable<Serie>{
	private String nome;
	private String genero;
	private int tempoEpisodio;
	public Serie(String nome, String genero, int tempoEpisodio) {
		super();
		this.nome = nome;
		this.genero = genero;
		this.tempoEpisodio = tempoEpisodio;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getGenero() {
		return genero;
	}
	public void setGenero(String genero) {
		this.genero = genero;
	}
	public int getTempoEpisodio() {
		return tempoEpisodio;
	}
	public void setTempoEpisodio(int tempoEpisodio) {
		this.tempoEpisodio = tempoEpisodio;
	}
	@Override
	public String toString() {
		return "Serie [nome=" + nome + ", genero=" + genero + ", tempoEpisodio=" + tempoEpisodio + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(genero, nome, tempoEpisodio);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Serie other = (Serie) obj;
		return Objects.equals(genero, other.genero) && Objects.equals(nome, other.nome)
				&& Objects.equals(tempoEpisodio, other.tempoEpisodio);
	}
	@Override
	public int compareTo(Serie serie) {
		// TODO Auto-generated method stub
		int tempoEpisodio = Integer.compare(this.getTempoEpisodio(), serie.getTempoEpisodio());
		if(tempoEpisodio !=0 ) return tempoEpisodio;
		return this.getGenero().compareTo(serie.getGenero());
	}
	
}

class ComparatorNomeGenTemp implements Comparator<Serie>{

	@Override
	public int compare(Serie s1, Serie s2) {
		int nome = s1.getNome().compareTo(s2.getNome());
		if(nome !=0) return nome;
		int genero = s1.getGenero().compareTo(s2.getGenero());
		if(genero != 0) return genero;
		return Integer.compare(s1.getTempoEpisodio(), s2.getTempoEpisodio());

	}
	
}