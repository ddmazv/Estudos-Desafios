package br.com.NullProject.ProjetoTeste.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.util.UriComponentsBuilder;

import br.com.NullProject.ProjetoTeste.dto.PerfilDto;
import br.com.NullProject.ProjetoTeste.service.PerfilService;
import jakarta.transaction.Transactional;

@RestController
@CrossOrigin
@RequestMapping("/perfil")
public class PerfilController {
	
	@Autowired
	PerfilService service;
	
	@PostMapping
	@Transactional
	public ResponseEntity<PerfilDto> createPerfil(@RequestBody PerfilDto dto, UriComponentsBuilder uri){
		return service.createPerfil(dto, uri);
	}
	
	@GetMapping
	public ResponseEntity<List<PerfilDto>> listAllPerfils(){
		return service.listAllPerfils();
	}
	
	
	
	@PutMapping
	@Transactional
	public ResponseEntity<PerfilDto> updatePerfil(@RequestBody PerfilDto dto){
		return service.updatePerfil(dto);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> deletePerfil(@PathVariable Long id){
		return service.deletePerfil(id);
	}
	
	@GetMapping("/{id}")
	@Transactional
	public ResponseEntity<PerfilDto> getPerfilById(@PathVariable Long id){
		return service.getUserById(id);
	}
	
	
}
