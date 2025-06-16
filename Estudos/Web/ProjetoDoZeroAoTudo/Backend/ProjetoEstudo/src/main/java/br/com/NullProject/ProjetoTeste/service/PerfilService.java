package br.com.NullProject.ProjetoTeste.service;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.NullProject.ProjetoTeste.dto.PerfilDto;
import br.com.NullProject.ProjetoTeste.entity.PerfilEntity;
import br.com.NullProject.ProjetoTeste.repository.PerfilRepository;

@Service
public class PerfilService {

	@Autowired
	private PerfilRepository repository;

	public ResponseEntity<PerfilDto> createPerfil(PerfilDto dto, UriComponentsBuilder uriBuilder) {
		PerfilEntity perfil = new PerfilEntity(dto);
		repository.save(perfil);
		URI uri = uriBuilder.path("/newperfil/{id}").buildAndExpand(perfil.getId()).toUri();
		return ResponseEntity.created(uri).body(new PerfilDto(perfil));
	}

	public ResponseEntity<List<PerfilDto>> listAllPerfils() {
		List<PerfilEntity> perfils = repository.findAll();

		return ResponseEntity.ok(perfils.stream().map(PerfilDto::new).toList());
	}

	public ResponseEntity<Void> deletePerfil(Long id) {
		repository.deleteById(id);
		return ResponseEntity.ok().build();

	}

	public ResponseEntity<PerfilDto> updatePerfil(PerfilDto dto) {
		// PerfilEntity perfil = new PerfilEntity(dto);
		repository.save(new PerfilEntity(dto));
		return ResponseEntity.accepted().body(dto);
	}

	public ResponseEntity<PerfilDto> getUserById(Long id) {
		return ResponseEntity.ok(new PerfilDto(repository.getReferenceById(id)));
	}
}
