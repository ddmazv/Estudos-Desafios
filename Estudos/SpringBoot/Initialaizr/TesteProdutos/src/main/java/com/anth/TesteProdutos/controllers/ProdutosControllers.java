package com.anth.TesteProdutos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anth.TesteProdutos.Produtos;
import com.anth.TesteProdutos.ProdutosRepository;
import com.anth.TesteProdutos.Data.DataProducts;

@RestController
@RequestMapping("cdProdutos")

public class ProdutosControllers {

	@Autowired
	private ProdutosRepository repository;

	@PostMapping
	public void cadastrar(@RequestBody DataProducts dados) {

		repository.save(new Produtos(dados));
	}

}
