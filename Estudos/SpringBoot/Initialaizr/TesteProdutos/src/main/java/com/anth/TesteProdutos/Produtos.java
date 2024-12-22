package com.anth.TesteProdutos;

import com.anth.TesteProdutos.Data.DataProducts;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
		this.nome = dados.nome();
		this.categoria = dados.categoria();
		this.quantidade = dados.quantidade();
		this.valor = dados.valor();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private int quantidade;
	private int valor;
	
	@Enumerated(EnumType.STRING)
	private Categoria categoria;
	
}
