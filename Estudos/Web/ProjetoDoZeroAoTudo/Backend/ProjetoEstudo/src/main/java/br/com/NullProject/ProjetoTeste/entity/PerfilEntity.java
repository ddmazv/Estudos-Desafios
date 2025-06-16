package br.com.NullProject.ProjetoTeste.entity;

import org.springframework.beans.BeanUtils;

import br.com.NullProject.ProjetoTeste.dto.PerfilDto;
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
@Table(name = "NPT_PERFIL")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
public class PerfilEntity {
	
	public PerfilEntity(PerfilDto dto) {
		BeanUtils.copyProperties(dto, this);
		}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String descri;
}
