package list.pesquisa;

import java.util.ArrayList;
import java.util.List;

public class CatalogoLivros {
	private List<Livro> livroList;
	
	
public CatalogoLivros() {
	this.livroList = new ArrayList<>();
}

public void adicionarLivro(String titulo, String autor, int anoPublicacao){
	livroList.add(new Livro(titulo,autor,anoPublicacao));
}

public List<Livro> pesquisarPorAutor(String autor){
	List<Livro> livrosPorAutor = new ArrayList<>();
	
	if(!livroList.isEmpty()) {
		for(Livro l : livroList) {
			if(l.getAutor().equalsIgnoreCase(autor)) {
				livrosPorAutor.add(l);
			}
		}
	}
	return livrosPorAutor;
}
	
public List<Livro> pesquisarPorIntervaloAnos(int anoInicial, int anoFinal){
	List<Livro> livrosPorIntervaloAno = new ArrayList<>();
	if(!livroList.isEmpty()) {
		for(Livro l : livroList) {
			if(l.getAnopubli() >= anoInicial && l.getAnopubli() <= anoFinal) {
				livrosPorIntervaloAno.add(l);
			}
		}
	}
	return livrosPorIntervaloAno;
}


public Livro pesquisarPorTitulo(String titulo) {
	Livro lt = null;
	if(!livroList.isEmpty()) {
	for(Livro l : livroList) {
		if(l.getTitulo().equalsIgnoreCase(titulo)) {
			lt = l;
			break;
		}
	}
}
	return lt;
}

}
