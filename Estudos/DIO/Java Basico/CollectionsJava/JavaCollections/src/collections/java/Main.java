package collections.java;

import list.operacoesbasicas.CarrinhoCompras;
import list.operacoesbasicas.ListaTarefas;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("testando Lista de tarefas");

		ListaTarefas lt = new ListaTarefas(); 
		
		lt.adicionarTarefa("fazer codigo");
		lt.adicionarTarefa("fazer cafe");
		lt.adicionarTarefa("dormir");
		lt.adicionarTarefa("continue;");
		
		System.out.println(lt.obterNumeroTotalTarefas());
		lt.obterDescricoesTarefas();
		System.out.println();
		
		lt.removerTarefa("fazer codigo");
		System.out.println(lt.obterNumeroTotalTarefas());
		lt.obterDescricoesTarefas();
	System.out.println();
	System.out.println("testando carrinho de compras");
	System.out.println();
		CarrinhoCompras cc = new CarrinhoCompras();
		
		cc.adicionarItem("Celular", 5000.00, 1);
		cc.adicionarItem("Pc Gamer", 5000.00, 1);
		cc.adicionarItem("Monitor Gamer", 5000.00, 2);
		cc.exibirItens();
		System.out.println(cc.calcularValorTotal());
		cc.removerItem("Pc Gamer");
		cc.exibirItens();
		System.out.println(cc.calcularValorTotal());

		
		
	}

}
