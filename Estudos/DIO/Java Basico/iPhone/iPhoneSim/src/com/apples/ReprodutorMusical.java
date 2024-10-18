package com.apples;

public class ReprodutorMusical {
	private String musicaAtual;
	private boolean tocando;

	public void tocar() {
		if (tocando) {
			System.out.println("a musica já está sendo reproduzida");
		} else {
			System.out.println("tocando" + musicaAtual);
			tocando = true;
		}
	}

	public void pausar() {
		if (tocando) {
			System.out.println("Musica pausada");
			tocando = false;
		} else {
			System.out.println("a musica já está pausada");
		}
	}
	
	public void selecionarMusica(String musica) {
		setMusicaAtual(musica);
	}
	
	
	public boolean isTocando() {
		return tocando;
	}

	public String getMusicaAtual() {
		return musicaAtual;
	}

	public void setMusicaAtual(String musicaAtual) {
		this.musicaAtual = musicaAtual;
	}
}
