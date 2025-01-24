package br.com.NullProject.ProjetoTeste.dto;

import org.springframework.beans.BeanUtils;

import br.com.NullProject.ProjetoTeste.entity.PerfilEntity;
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
public class PerfilDto {
	
	private Long id;
	private String descri;
	
	public PerfilDto(PerfilEntity perfil) {
		BeanUtils.copyProperties(perfil, this);
	}

	
}
