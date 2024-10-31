package list.operacoesbasicas;

import java.util.ArrayList;
import java.util.List;

public class CarrinhoCompras {
	List<Item> listaitems;
	
public CarrinhoCompras() {
	this.listaitems = new ArrayList<>();
}
	

public void adicionarItem(String nome, double preco, int quantidade) {
	listaitems.add(new Item(nome, preco, quantidade));
}

public void removerItem(String nome) {
	for(Item i : listaitems) {
		if(i.nome.equalsIgnoreCase(nome)) {
			listaitems.remove(i);
			break;
		}
	}
}

public double calcularValorTotal() {
	double total = 0;
	for(Item i : listaitems) {
		total += i.preco ;
	} 
	return total;
}

public int exibirQtdItens() {
	return listaitems.size();
}

public void exibirItens() {
	System.out.println(listaitems);
}

}
