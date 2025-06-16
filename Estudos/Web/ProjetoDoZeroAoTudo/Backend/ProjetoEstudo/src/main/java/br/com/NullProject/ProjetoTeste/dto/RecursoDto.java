package br.com.NullProject.ProjetoTeste.dto;

import org.springframework.beans.BeanUtils;

import br.com.NullProject.ProjetoTeste.entity.RecursoEntity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class RecursoDto {
	
	public RecursoDto(RecursoEntity recurso) {
		BeanUtils.copyProperties(recurso, this);
	}
	
	private Long id;
	private String nome;
	private String chave;
}
