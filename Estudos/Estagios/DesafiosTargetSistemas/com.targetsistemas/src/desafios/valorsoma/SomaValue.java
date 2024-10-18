package desafios.valorsoma;

public class SomaValue {
	int indice;
	int soma;
	int k;
	
public SomaValue(int indice, int soma, int k) {
	this.indice = indice;
	this.soma = soma;
	this.k = k;
}

	public int calc() {
		while(k<indice) {
			System.out.println(k);
			this.k = k + 1;
			this.soma = soma + k;
		}
		return soma;
	}
	
}
