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

import br.com.NullProject.ProjetoTeste.dto.PerfilUsuarioDto;
import br.com.NullProject.ProjetoTeste.service.PerfilUsuarioService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/perfiluser")
@CrossOrigin
public class PerfilUsuarioController {
	
	@Autowired
	private PerfilUsuarioService service;
	
	
	@PostMapping
	@Transactional
	public ResponseEntity<PerfilUsuarioDto> createUser(@RequestBody PerfilUsuarioDto dto, UriComponentsBuilder uri){
		return service.createPerfilUser(dto, uri);
	}
	
	@GetMapping
	public ResponseEntity<List<PerfilUsuarioDto>> listAllPerfilUsers(){
		return service.listAllPerfilUsers();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PerfilUsuarioDto> getPerfilUserById(@PathVariable Long id){
		return service.getPerfilUsersById(id);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<PerfilUsuarioDto> updatePerfilUser(@RequestBody PerfilUsuarioDto dto){
		return service.updatePerfilUser(dto);	
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> deletePerfilUser(@PathVariable Long id){
		return service.deletePerfilUser(id);
	}
}
