package
br.com.NullProject.ProjetoTeste.dto;

import org.springframework.beans.BeanUtils;

import br.com.NullProject.ProjetoTeste.entity.PerfilUsuarioEntity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class PerfilUsuarioDto {

	
	private Long id;
	private UserDto user;
	private PerfilDto perfil;
	
	public PerfilUsuarioDto(PerfilUsuarioEntity perfilUsuario) {
		BeanUtils.copyProperties(perfilUsuario, this);
	if(perfilUsuario != null && perfilUsuario.getUser() != null) {
		this.user = new UserDto(perfilUsuario.getUser());
	}
	if(perfilUsuario != null && perfilUsuario.getPerfil() != null) {
		this.perfil = new PerfilDto(perfilUsuario.getPerfil());
	}
	
	}
	
	
	
}
