package com.anth.TesteProdutos.Data;

import com.anth.TesteProdutos.Categoria;
import com.anth.TesteProdutos.Produtos;

public record DadosListagemProdutos(Long id,String nome, float valor, Categoria categoria) {
	
	public DadosListagemProdutos(Produtos produto) {
		this(produto.getId(),produto.getNome(), produto.getValor(), produto.getCategoria());
	}

}
