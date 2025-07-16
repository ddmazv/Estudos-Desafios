package src.br.com.dio.desafio.dominio;

import java.time.LocalDate;

public class Mentoria extends Conteudo{
	
	private LocalDate data;
	
	public Mentoria() {
		
	}
	
	@Override
	public double calcularXp() {
		// TODO Auto-generated method stub
		return XP_PADRAO + 10;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Mentoria{" +
	"titulo='"+ getTitulo() +'\''+
	", descrição='"+ getDescricao() + '\''+
	", data=" + getData() +'}';
	}
 
	
	
	
}
