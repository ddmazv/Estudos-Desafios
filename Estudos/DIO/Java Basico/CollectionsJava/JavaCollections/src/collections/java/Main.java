package collections.java;

import list.operacoesbasicas.CarrinhoCompras;
import list.operacoesbasicas.ListaTarefas;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
	
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
