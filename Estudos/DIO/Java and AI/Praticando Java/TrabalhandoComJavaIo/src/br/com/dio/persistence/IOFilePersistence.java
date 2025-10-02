package br.com.dio.persistence;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

public class IOFilePersistence implements FilePersistence {

	private final String currentDir = System.getProperty("user.dir");
	private final String storageDir = "/managedFiles/IO/";
	private final String fileName;

	public IOFilePersistence(String filename) throws IOException {
		this.fileName = filename;
		var file = new File(currentDir + storageDir);
		if (!file.exists() && !file.mkdirs())
			throw new IOException("Erro ao criar arquivo");
		clearFile();

	}

	@Override
	public String write(String data) {
		try (var fileWriter = new FileWriter(currentDir + storageDir + fileName, true);
				var bufferedWeite = new BufferedWriter(fileWriter);
				var printWriter = new PrintWriter(bufferedWeite);) {
			printWriter.println(data);
		} catch (IOException ex) {
			ex.printStackTrace();
		}

		return data;
	}

	@Override
	public boolean removeContent(String sentence) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String replace(String oldContent, String newContent) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String findAll() {
		var content = new StringBuilder();
		try (var reader = new BufferedReader(new FileReader(currentDir + storageDir + fileName))) {
			String line;
			do {
				line = reader.readLine();
				if (line != null) {
					content.append(line).append(System.lineSeparator());
				}
			} while (line != null);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return content.toString();
	}

	@Override
	public String findBy(String sentence) {
		String found ="";
		try (var reader = new BufferedReader(new FileReader(currentDir + storageDir + fileName))) {
			String line = reader.readLine();
			while(line != null){
				if(line.contains(sentence)) {
					found = line;
					break;
				}
			}
			line = reader.readLine();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return found;
	}

	private void clearFile() {
		try {
			OutputStream outputStream = new FileOutputStream(new File(currentDir + storageDir + fileName));
			outputStream.close();
			System.out.println("Arquivo criado em: " + currentDir + storageDir + fileName);

		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

}
