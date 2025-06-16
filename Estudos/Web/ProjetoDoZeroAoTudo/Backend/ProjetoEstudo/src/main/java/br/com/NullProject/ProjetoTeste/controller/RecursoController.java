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

import br.com.NullProject.ProjetoTeste.dto.RecursoDto;
import br.com.NullProject.ProjetoTeste.service.RecursoService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/recurso")
@CrossOrigin
public class RecursoController {
	
	@Autowired
	private RecursoService services;
	
	@PostMapping
	@Transactional
	public ResponseEntity<RecursoDto> createRecurso(@RequestBody RecursoDto dto,UriComponentsBuilder uri) {
		return services.createRecurso(dto, uri); 
	}
	
	@GetMapping
	public ResponseEntity<List<RecursoDto>> listAllRecursos(){
		return services.listAllRecursos();
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<RecursoDto> updateRecurso(@RequestBody RecursoDto dto){
		return services.updateRecurso(dto);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> deleteRecurso(@PathVariable Long id){
		return services.deleteRecurso(id);
	}

	@GetMapping("/{id}")
	@Transactional
	public ResponseEntity<RecursoDto> getRecursoById(@PathVariable Long id){
		return services.getRecrusoById(id);
	}

}
