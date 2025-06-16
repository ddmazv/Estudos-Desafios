package br.com.NullProject.ProjetoTeste.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.NullProject.ProjetoTeste.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
 
}
