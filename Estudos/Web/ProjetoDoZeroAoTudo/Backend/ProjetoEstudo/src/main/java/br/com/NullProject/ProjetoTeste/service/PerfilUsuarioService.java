package br.com.NullProject.ProjetoTeste.service;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import br.com.NullProject.ProjetoTeste.dto.PerfilUsuarioDto;
import br.com.NullProject.ProjetoTeste.entity.PerfilUsuarioEntity;
import br.com.NullProject.ProjetoTeste.repository.PerfilUsuarioRepository;

@Service
public class PerfilUsuarioService {
	
	@Autowired
	PerfilUsuarioRepository repository;
	
	public ResponseEntity<PerfilUsuarioDto> createPerfilUser(PerfilUsuarioDto dto, UriComponentsBuilder uriBuilder){
		PerfilUsuarioEntity perfilUser = new PerfilUsuarioEntity(dto);
		repository.save(perfilUser);
		URI uri = uriBuilder.path("/newperfilusers/{id}").buildAndExpand(perfilUser.getId()).toUri();
		return ResponseEntity.created(uri).body(new PerfilUsuarioDto(perfilUser));
	}
	
	public ResponseEntity<List<PerfilUsuarioDto>> listAllPerfilUsers(){
		List<PerfilUsuarioEntity> allPerfilUsers = repository.findAll();
		return ResponseEntity.ok(allPerfilUsers.stream().map(PerfilUsuarioDto :: new).toList());
	}
	
	public ResponseEntity<PerfilUsuarioDto> getPerfilUsersById(Long id){
		return ResponseEntity.ok(new PerfilUsuarioDto(repository.getReferenceById(id)));
	}
	
	public ResponseEntity<PerfilUsuarioDto> updatePerfilUser(PerfilUsuarioDto dto){
		PerfilUsuarioEntity perfilUser = new PerfilUsuarioEntity(dto);
		repository.save(perfilUser);
		return ResponseEntity.ok(new PerfilUsuarioDto(perfilUser));
	}
	
	public ResponseEntity<Void> deletePerfilUser(Long id){
		repository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	
}
