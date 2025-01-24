package br.com.NullProject.ProjetoTeste.service;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.util.UriComponentsBuilder;

import br.com.NullProject.ProjetoTeste.dto.RecursoDto;
import br.com.NullProject.ProjetoTeste.entity.RecursoEntity;

import br.com.NullProject.ProjetoTeste.repository.RecursoRepository;


@Service
public class RecursoService {

	@Autowired
	private RecursoRepository repository;
	
	public ResponseEntity<List<RecursoDto>> listAllRecursos(){
		List<RecursoEntity> lista = repository.findAll();
		return ResponseEntity.ok(lista.stream().map(RecursoDto :: new).toList());
	}
	
	public ResponseEntity<RecursoDto> createRecurso(RecursoDto dto, UriComponentsBuilder uriBuilder){
		RecursoEntity recurso = new RecursoEntity(dto);
		repository.save(recurso);
		URI uri = uriBuilder.path("/new/{id}").buildAndExpand(recurso.getId()).toUri();
		return ResponseEntity.created(uri).body(new RecursoDto(recurso));
	}
	
	public ResponseEntity<RecursoDto> updateRecurso(RecursoDto dto){
		RecursoEntity recurso = new RecursoEntity(dto);
		repository.save(recurso);
		return ResponseEntity.ok(dto); //teste org: new RecursoDto(recurso) 
	}
	
	
	public ResponseEntity<Void> deleteRecurso(Long id){
		repository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	public ResponseEntity<RecursoDto> getRecrusoById(Long id){
		return ResponseEntity.ok(new RecursoDto(repository.getReferenceById(id)));
	}
}
