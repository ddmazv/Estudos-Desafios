package br.com.NullProject.ProjetoTeste.entity;


import br.com.NullProject.ProjetoTeste.dto.PerfilUsuarioDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "NPT_PERFIL_USUARIO")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
public class PerfilUsuarioEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "ID_USER")
	private UserEntity user;
	@ManyToOne
	@JoinColumn(name = "ID_PERFIL")
	private PerfilEntity perfil;
	
	public PerfilUsuarioEntity(PerfilUsuarioDto perfilUser) {
		if(perfilUser != null && perfilUser.getUser() != null) {
			this.user = new UserEntity(perfilUser.getUser());
		}
		if(perfilUser != null && perfilUser.getPerfil() != null) {
			this.perfil = new PerfilEntity(perfilUser.getPerfil()); 
		}
	}
	
}
