package br.com.NullProject.ProjetoTeste.service;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.NullProject.ProjetoTeste.dto.UserDto;
import br.com.NullProject.ProjetoTeste.entity.UserEntity;
import br.com.NullProject.ProjetoTeste.repository.UserRepository;

@Service

public class UserService  {

	@Autowired
	private UserRepository repository;
	
	
	public ResponseEntity<List<UserDto>> listAllUsers(){
		List<UserEntity> lista = repository.findAll();
		return ResponseEntity.ok(lista.stream().map(UserDto :: new).toList());
	}
	
	public ResponseEntity<UserDto> createUser(UserDto dto, UriComponentsBuilder uriBuilder){
		UserEntity user = new UserEntity(dto);
		repository.save(user);
		
		URI uri = uriBuilder.path("/newusers/{id}").buildAndExpand(user.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new UserDto(user));
	}
	 
	/*
	public void createUser(@RequestBody UserDto dto){
		UserEntity user = new UserEntity(dto);
		repository.save(user);
	
	}
	*/
	public ResponseEntity<UserDto> updateUser(UserDto dto){
		 UserEntity user = new UserEntity(dto);
		 repository.save(user);
		 return ResponseEntity.ok(new UserDto(user));
	 }
	
	 public ResponseEntity<Void> deleteUser(Long id){
		 repository.deleteById(id);
		 return ResponseEntity.ok().build();
	 }
	 
	 public ResponseEntity<UserDto> getUserById(Long id){
		 return ResponseEntity.ok(new UserDto(repository.getReferenceById(id)));
	 }
	 
}
