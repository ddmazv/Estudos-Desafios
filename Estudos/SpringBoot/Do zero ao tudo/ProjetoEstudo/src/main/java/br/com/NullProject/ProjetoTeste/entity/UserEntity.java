package br.com.NullProject.ProjetoTeste.entity;

import org.springframework.beans.BeanUtils;

import br.com.NullProject.ProjetoTeste.dto.UserDto;
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
@Table(name = "NPT_USER")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false, unique = true)
	private String login;
	
	@Column(nullable = false)
	private String senha;
	
	@Column(nullable = false)
	private String email;
	
	public UserEntity(UserDto user) {
		BeanUtils.copyProperties(user, this);
	}
	
}
