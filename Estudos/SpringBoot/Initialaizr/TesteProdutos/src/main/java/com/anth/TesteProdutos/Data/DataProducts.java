package com.anth.TesteProdutos.Data;

import java.time.LocalDate;

import com.anth.TesteProdutos.Categoria;

import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record DataProducts(
		@NotBlank
		String nome,
		
		@NotNull
		int quantidade,
		@NotNull
		float valor,
		@Enumerated
		Categoria categoria,
		@Future
		LocalDate data
		) {

	
	
	
}
