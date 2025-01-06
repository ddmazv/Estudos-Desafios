package com.anth.TesteProdutos.Data;

import com.anth.TesteProdutos.Categoria;

import jakarta.validation.constraints.NotNull;

public record UpdateDataProducts(
		@NotNull
		Long id, 
		String nome,
		Categoria categoria,
		int quantidade,
		float valor) {

	
}
