package list.pesquisa;

public class Livro {
	private String titulo;
	private String autor;
	private int anopubli;

public Livro(String titulo, String autor, int anopubli) {
	this.titulo = titulo;
	this.autor = autor;
	this.anopubli = anopubli;
}

public String getTitulo() {
	return titulo;
}

public void setTitulo(String titulo) {
	this.titulo = titulo;
}

public String getAutor() {
	return autor;
}

public void setAutor(String autor) {
	this.autor = autor;
}

public int getAnopubli() {
	return anopubli;
}

public void setAnopubli(int anopubli) {
	this.anopubli = anopubli;
}

@Override
public String toString() {
	return "Livro [Titulo: " + titulo + ", Autor: " + autor + ", Ano Publicação: " + anopubli + "]";
}
	


}
