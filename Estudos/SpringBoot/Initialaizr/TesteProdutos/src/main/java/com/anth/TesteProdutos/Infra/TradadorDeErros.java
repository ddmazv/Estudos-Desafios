package com.anth.TesteProdutos.Infra;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;

@RestControllerAdvice
public class TradadorDeErros {

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<?> tratador404() {
		return ResponseEntity.notFound().build();
	}
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> tratadorArgumentoInvalido(MethodArgumentNotValidException ex){
		var erros = ex.getFieldErrors();
		
		return ResponseEntity.badRequest().body(erros.stream().map(DadosErros :: new).toList());
	}
	
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<?> tratadorHttpNotRedable(){
		return ResponseEntity.badRequest().build();
	}
	
	public record DadosErros(String menssagem, String campo) {
		
		public DadosErros(FieldError erro) {
			this(erro.getField(), erro.getDefaultMessage());
		}
	}
}
