package br.com.NullProject.ProjetoTeste.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.NullProject.ProjetoTeste.dto.UserDto;
import br.com.NullProject.ProjetoTeste.service.UserService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService services;
	
	@PostMapping
	@Transactional
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto dto, UriComponentsBuilder uri){
		return services.createUser(dto, uri);
	}
	
	@GetMapping
	public ResponseEntity<List<UserDto>> listAllUsers(){
		return services.listAllUsers();
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<UserDto> updateUser(@RequestBody UserDto dto){
		return services.updateUser(dto);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> deleteUser(@PathVariable Long id){
		return services.deleteUser(id);
	}
}
