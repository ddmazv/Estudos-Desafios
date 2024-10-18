package com.apples;

public class Iphone {
	
	private int bateria;
	private AparelhoTelefonico telefone;
	private NavegadorInternet safari;
	private ReprodutorMusical itunes;
	
	public Iphone() {
		this.telefone = new AparelhoTelefonico();
		this.safari = new NavegadorInternet();
		this.itunes = new ReprodutorMusical();
	}
	
	
	public void carregar() {
		if (bateria < 100) {
			for (int i = bateria; bateria <= 100; i++) {
				System.out.println("carregando: " + getBateria() + "%");
				setBateria(i);
			}
		}
	}

	public void setBateria(int num) {
		bateria = num;
	}
	
	public int getBateria() {
		return bateria;
	}

	public AparelhoTelefonico getTelefone() {
		return telefone;
	}


	public void setTelefone(AparelhoTelefonico telefone) {
		this.telefone = telefone;
	}


	public NavegadorInternet getSafari() {
		return safari;
	}


	public void setSafari(NavegadorInternet safari) {
		this.safari = safari;
	}


	public ReprodutorMusical getItunes() {
		return itunes;
	}


	public void setItunes(ReprodutorMusical itunes) {
		this.itunes = itunes;
	}
}
