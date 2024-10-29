package list.operacoesbasicas;

import java.util.ArrayList;
import java.util.List;

public class ListaTarefas {
	private List<Tarefa> tarefalist;
	
public ListaTarefas() {
	this.tarefalist = new ArrayList<>();
}

public void adicionarTarefa(String desc) {
	tarefalist.add(new Tarefa(desc));
}

public void removerTarefa(String desc) {
	for(Tarefa t : tarefalist) {
		if(t.getDescricao().equalsIgnoreCase(desc)) {
			tarefalist.remove(t);
			break;
		}
	}
			
			
}

public int obterNumeroTotalTarefas() {
	return tarefalist.size();
}
public void obterDescricoesTarefas() {
		System.out.println(tarefalist);

}

}
