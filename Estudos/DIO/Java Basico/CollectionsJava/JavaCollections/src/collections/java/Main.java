package collections.java;

import list.operacoesbasicas.CarrinhoCompras;
import list.operacoesbasicas.ListaTarefas;
import list.ordenacao.OrdenacaoNumeros;
import list.ordenacao.OrdenacaoPessoa;
import list.pesquisa.CatalogoLivros;
import list.pesquisa.SomaNumeros;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//// TESTE LISTA DE TAREFAS
		System.out.println("testando Lista de tarefas");
		System.out.println();
		ListaTarefas lt = new ListaTarefas();
		lt.adicionarTarefa("fazer codigo");
		lt.adicionarTarefa("fazer cafe");
		lt.adicionarTarefa("dormir");
		lt.adicionarTarefa("continue;");
		System.out.println("Existem "+lt.obterNumeroTotalTarefas()+" tarefas adicionadas.");
		lt.obterDescricoesTarefas();
		System.out.println("Removendo tarefa \"fazer codigo\" ");
		lt.removerTarefa("fazer codigo");
		System.out.println("Agora existem "+lt.obterNumeroTotalTarefas()+" tarefas adicionadas.");
		lt.obterDescricoesTarefas();
		
		////TESTE CARRINHO DE COMPRAS
		System.out.println();
		System.out.println("testando carrinho de compras");
		System.out.println();
		CarrinhoCompras cc = new CarrinhoCompras();
		cc.adicionarItem("Celular", 5000.00, 1);
		cc.adicionarItem("Pc Gamer", 5000.00, 1);
		cc.adicionarItem("Monitor Gamer", 5000.00, 2);
		System.out.println("Existem "+cc.exibirQtdItens()+" itens adicionados.");
		cc.exibirItens();
		System.out.println("O Valor total do carrinho é: R$"+cc.calcularValorTotal());
		System.out.println("Removendo item \"Pc Gamer\" ");
		cc.removerItem("Pc Gamer");
		System.out.println("Agora existem "+cc.exibirQtdItens()+" itens adicionados.");
		cc.exibirItens();
		System.out.println("O valor total atual do carrinho é: R$"+cc.calcularValorTotal());
		
		//// TESTE CATALOGO DE LIVROS
		System.out.println();
		System.out.println("testando catalogo de livros");
		System.out.println();
		CatalogoLivros cl = new CatalogoLivros();
		cl.adicionarLivro("Livro #1", "Autor #1", 2020);
		cl.adicionarLivro("Livro #1", "Autor #2", 2021);
		cl.adicionarLivro("Livro #2", "Autor #2", 2022);
		cl.adicionarLivro("Livro #3", "Autor #3", 2023);
		cl.adicionarLivro("Livro #4", "Autor #4", 1994);
		System.out.println("Pesquisando livro por \"Autor #2\"");
		System.out.println("Livros encontrados: "+cl.pesquisarPorAutor("Autor #2"));
		System.out.println("Pesquisando livro por Intervalo de anos (2020 a 2022)");
		System.out.println("Livros encontrados: "+cl.pesquisarPorIntervaloAnos(2020, 2022));
		System.out.println("Pesquisando livro por titulo \"Livro #1\"");
		System.out.println("Livros encontrados: "+cl.pesquisarPorTitulo("Livro #1"));
		
		//// TESTE LISTA DE NUMEROS
		System.out.println();
		System.out.println("testando lista de numeros");
		System.out.println();
		SomaNumeros sn = new SomaNumeros();
		sn.adicionarNumero(1);
		sn.adicionarNumero(2);
		sn.adicionarNumero(3);
		sn.adicionarNumero(5);
		sn.adicionarNumero(8);
		sn.adicionarNumero(3);
		System.out.println("A Lista comtem os seguintes valores: "+ sn.exibirNumeros());
		System.out.println("A soma dos valores da lista é: " +sn.calcularSoma());
		System.out.println("O maior valor da lista é: " +sn.encontrarMaiorNumero());
		System.out.println("O menor valor da lista é: " +sn.encontrarMenorNumero());
		
		//// TESTE LISTA DE PESSOAS
		System.out.println();
		System.out.println("testando lista de pessoas");
		System.out.println();
		
		OrdenacaoPessoa ordenacaoPessoas = new OrdenacaoPessoa();
		 ordenacaoPessoas.adicionarPessoa("Alice", 20, 1.56);
		    ordenacaoPessoas.adicionarPessoa("Bob", 30, 1.80);
		    ordenacaoPessoas.adicionarPessoa("Charlie", 25, 1.70);
		    ordenacaoPessoas.adicionarPessoa("David", 17, 1.56);

		    // Exibindo a lista de pessoas adicionadas
		    System.out.println("Exibindo a lista de pessoas adicionadas: "+ordenacaoPessoas.toString());

		    // Ordenando e exibindo por idade
		    System.out.println("Ordenando e exibindo por idade: "+ordenacaoPessoas.ordenarPorIdade());

		    // Ordenando e exibindo por altura
		    System.out.println("Ordenando e exibindo por altura: "+ordenacaoPessoas.ordenarPorAltura());
		    
		//// TESTE LISTA DE NUMEROS
			System.out.println();
			System.out.println("testando lista de numeros");
			System.out.println();
			
			OrdenacaoNumeros on = new OrdenacaoNumeros();
			
			on.adicionarNumero(0);
			on.adicionarNumero(6);
			on.adicionarNumero(5);
			on.adicionarNumero(2);
			on.adicionarNumero(4);
			on.adicionarNumero(1);
			on.adicionarNumero(3);
			on.adicionarNumero(7);
			System.out.println(on.ordenarAscendente());
			System.out.println(on.ordenarDescendente());
	}

}
