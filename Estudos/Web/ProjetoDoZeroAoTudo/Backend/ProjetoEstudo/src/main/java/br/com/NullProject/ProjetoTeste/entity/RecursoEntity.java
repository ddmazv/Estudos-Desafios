package br.com.NullProject.ProjetoTeste.entity;

import org.springframework.beans.BeanUtils;

import br.com.NullProject.ProjetoTeste.dto.RecursoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name= "NPT_RECURSO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class RecursoEntity {
	
	public RecursoEntity(RecursoDto recurso) {
		BeanUtils.copyProperties(recurso, this);
	}
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String nome;
	@Column(nullable = false)
	private String Chave;
	
	
}
