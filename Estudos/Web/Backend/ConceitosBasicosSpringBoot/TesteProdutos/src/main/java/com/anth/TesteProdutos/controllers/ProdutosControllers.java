package com.anth.TesteProdutos.controllers;


import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.util.UriComponentsBuilder;

import com.anth.TesteProdutos.DadosDetalhamentoProduto;
import com.anth.TesteProdutos.Produtos;
import com.anth.TesteProdutos.ProdutosRepository;
import com.anth.TesteProdutos.Data.DadosListagemProdutos;
import com.anth.TesteProdutos.Data.DataProducts;
import com.anth.TesteProdutos.Data.UpdateDataProducts;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("cdProdutos")

public class ProdutosControllers {

	@Autowired	
	private ProdutosRepository repository;

	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoProduto> cadastrar(@RequestBody @Valid DataProducts dados, UriComponentsBuilder uriBuilder) {
		
		Produtos produto = new Produtos(dados); 
		repository.save(produto);
		System.out.println(produto.getId());
		URI uri= uriBuilder.path("/produtos/{id}").buildAndExpand(produto.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new DadosDetalhamentoProduto(produto));
	}
	
	@GetMapping
	public ResponseEntity<List<DadosListagemProdutos>> listar(){	
	   List<DadosListagemProdutos> lista = repository.findAllByAtivoTrue().stream().map(DadosListagemProdutos::new).toList();
		return ResponseEntity.ok(lista);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoProduto> atualizar(@RequestBody @Valid UpdateDataProducts dados) {
		Produtos produtos = repository.getReferenceById(dados.id());
		produtos.atualizarInformações(dados);
		return ResponseEntity.ok(new DadosDetalhamentoProduto(produtos));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("inativar/{id}")
	@Transactional
	public ResponseEntity<Void> inativar(@PathVariable Long id) {
		Produtos produtos = repository.getReferenceById(id);
		produtos.setAtivo(false);	
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("reativar/{id}")
	@Transactional
	public ResponseEntity<Void> reativar(@PathVariable Long id) {
		Produtos produtos = repository.getReferenceById(id);
		produtos.setAtivo(true);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	
	public ResponseEntity<DadosDetalhamentoProduto> getProtudo(@PathVariable Long id) {
		System.out.println("Id do produto: "+ id);
		Produtos produto =  repository.getReferenceById(id);
		System.out.println("Produto encontrado: " + produto.getNome() + " com id: " + id);
		
		return ResponseEntity.ok(new DadosDetalhamentoProduto(produto));
	}
	
}
