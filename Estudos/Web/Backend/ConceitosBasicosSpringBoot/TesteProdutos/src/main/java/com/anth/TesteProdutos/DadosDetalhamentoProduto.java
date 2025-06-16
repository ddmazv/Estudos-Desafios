package com.anth.TesteProdutos;

import java.time.LocalDate;

public record DadosDetalhamentoProduto(
		
		Long id,
		String nome,
		float valor,
		Categoria categoria,
		int quantidade,
		LocalDate data,
		boolean ativo) {

	public DadosDetalhamentoProduto(Produtos produtos) {
	this(produtos.getId(), 
			produtos.getNome(),
			produtos.getValor(), 
			produtos.getCategoria(), 
			produtos.getQuantidade(), 
			produtos.getData(),
			produtos.isAtivo());
	}

	
}
