package com.anth.TesteProdutos;

import java.time.LocalDate;

import com.anth.TesteProdutos.Data.DataProducts;
import com.anth.TesteProdutos.Data.UpdateDataProducts;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table	(name = "Produto")
@Entity (name = "Produtos")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor

public class Produtos {
	
	public Produtos(DataProducts dados) {
		// TODO Auto-generated constructor stub
		this.ativo = true;
		this.nome = dados.nome();
		this.categoria = dados.categoria();
		this.quantidade = dados.quantidade();
		this.valor = dados.valor();
		this.data = dados.data();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private int quantidade;
	private float valor;
	private LocalDate data;
	private boolean ativo;
	
	@Enumerated(EnumType.STRING)
	private Categoria categoria;

	public void atualizarInformações(@Valid UpdateDataProducts dados) {
		if(dados.nome() != null) {
		this.nome = dados.nome();
		}
		if(dados.categoria() != null) {
			this.categoria = dados.categoria();
		}
		if(dados.quantidade() > 0) {
			this.quantidade = dados.quantidade();
		}
		if(dados.valor() > 0) {
			this.valor = dados.valor();
		}
	}
	
}
