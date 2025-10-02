package Main;

import java.io.IOException;

import br.com.dio.persistence.FilePersistence;
import br.com.dio.persistence.IOFilePersistence;

public class Main {
public static void main(String[] args) throws IOException{
	FilePersistence persistence = new IOFilePersistence("user.csv");
	System.out.println(persistence.write("Edu;dd.mazv@gmail.com;36/04/05;"));
	System.out.println(persistence.write("Rengli;asd@gmail.com;26/24/25;"));
	System.out.println(persistence.write("Kauan;dsd@gmail.com;65/34/34;"));
	System.out.println("=================================");
	System.out.println(persistence.findAll());
	System.out.println("=================================");
	System.out.println(persistence.findBy("Rengli"));
}
}