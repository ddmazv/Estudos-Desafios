package br.com.NullProject.ProjetoTeste.dto;


import org.springframework.beans.BeanUtils;

import br.com.NullProject.ProjetoTeste.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	
	private Long id;
	private String nome;
	private String login;
	private String senha;
	private String email;
	
	public UserDto(UserEntity user) {
		BeanUtils.copyProperties(user, this);
	}
}
