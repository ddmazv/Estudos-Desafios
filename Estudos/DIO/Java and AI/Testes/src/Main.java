package src;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

public class Main {
		static class Candidato implements Comparable<Candidato>,Comparator<Candidato>{
	        String nome;
	        int pontuacao;
	
	        Candidato(String nome, int pontuacao) {
	            this.nome = nome;
	            this.pontuacao = pontuacao;
	        }
	        
	        public int compareTo(Candidato c) {
	        	if(this.pontuacao < c.pontuacao) {
	        		return -1;
	        	}
	        	if(this.pontuacao > c.pontuacao){
	        		return 1;
	        	}
	        	
	        	return 0;
	        };
	        
	        @Override
	        public int compare(Candidato o1, Candidato o2) {
	        	// TODO Auto-generated method stub
	        	return o1.nome.compareToIgnoreCase(o2.nome);
	        }
	    }
	
    public static void main(String[] args) {
    	
    	 Scanner scanner = new Scanner(System.in);

         int n = Integer.parseInt(scanner.nextLine().trim());
         List<Candidato> candidatos = new ArrayList<>();

         for (int i = 0; i < n; i++) {
             String linha = scanner.nextLine().trim();
             // Exemplo de entrada: "Ana,85"
             String[] partes = linha.split(",");
             String nome = partes[0].trim();
             int pontuacao = Integer.parseInt(partes[1].trim());

             candidatos.add(new Candidato(nome, pontuacao));
         }

         // TODO: Ordene: maior pontuação primeiro; se empate, ordem alfabética do nome
         
         Collections.sort(candidatos, new Candidato(null, n));
         Collections.sort(candidatos);
         
         
         // Imprimir nomes na ordem definida
         for (Candidato c : candidatos) {
             System.out.println(c.nome);
         }

         scanner.close();
    }
}