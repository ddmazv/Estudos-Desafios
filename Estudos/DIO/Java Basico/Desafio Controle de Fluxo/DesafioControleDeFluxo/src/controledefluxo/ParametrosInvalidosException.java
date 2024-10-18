package controledefluxo;

public class ParametrosInvalidosException extends Exception {

@Override
	public String toString() {
		return "O segundo parâmetro deve ser maior que o primeiro!";
	}
}
