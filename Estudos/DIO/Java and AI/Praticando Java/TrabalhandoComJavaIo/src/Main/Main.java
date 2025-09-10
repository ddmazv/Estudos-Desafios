package Main;

import java.io.IOException;

import br.com.dio.persistence.FilePersistence;
import br.com.dio.persistence.IOFilePersistence;

public class Main {
public static void main(String[] args) throws IOException{
	FilePersistence persistence = new IOFilePersistence("user.csv");
	System.out.println(persistence.write("Edu;dd.mazv@gmail.com;06/04/05;"));
}
}