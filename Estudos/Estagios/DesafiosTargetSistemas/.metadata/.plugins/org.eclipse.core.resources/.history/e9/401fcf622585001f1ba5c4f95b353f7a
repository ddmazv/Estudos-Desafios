package desafios.stringverify;

import java.util.ArrayList;

public class StringVerify {
	ArrayList<Character> charactersmach;
	int qtdchars;

	public String containAChar(String text, String verifychar) {
		String textLower = text.toLowerCase();
		char[] charactersArray = new char[text.length()];
		
		charactersmach = new ArrayList<Character>();
		textLower.getChars(0, textLower.length(), charactersArray, 0);
		
		

		
		for(int i = textLower.indexOf(verifychar);i > -1; i = textLower.indexOf(verifychar,i+1), qtdchars++){
				charactersmach.add(charactersArray[i]);
		}

		
		qtdchars = charactersmach.size();
		if (qtdchars < 1) {
			System.out.println("caractere não encontrado");
		}
		return charactersmach.toString();
	}

	public int getQtdChars() {
		return qtdchars;
	}
		
}
