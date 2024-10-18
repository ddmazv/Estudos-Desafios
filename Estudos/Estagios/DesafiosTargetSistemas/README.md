# Respostas desafio Target Sistemas
Esse repositorio contem as respostas para os desafios da Target Sistemas.


## Desafio 1:
Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência.
#### [Resolução:](https://github.com/ddmazv/DesafiosTargetSistemas/blob/main/com.targetsistemas/src/desafios/fibonacci/Fibonacci.java)
Para verificar se um numero pertence a sequência de Fibonacci, deve ser aplicada a fórmula de Binet que consiste em um numero multiplicado por cinco, elevado por dois e somado ou subtraído por quatro (5n^2 + 4 ou 5n^2 – 4), se o resultado dessa formula resultar em um quadrado perfeito, o numero pertence a sequência Fibonacci, aplicar isso em código não foi difícil, primeiramente foi feito um método para verificar se um numero possuí uma raiz perfeita, com esse método pronto, o método que aplica a formula de Binet já pode ser criado usando a fórmula e retornando se o numero pertence ou não a sequência, com essa parte pronta pode ser feito outro método que executa essa função até achar um numero anterior que também pertence a sequência para ser somado e criar o próximo numero de Fibonacci.
## Desafio 2
Escreva um programa que verifique, em uma string, a existência da letra ‘a’, seja maiúscula ou minúscula, além de informar a quantidade de vezes em que ela ocorre.
#### [Resolução:](https://github.com/ddmazv/DesafiosTargetSistemas/blob/main/com.targetsistemas/src/desafios/stringverify/StringVerify.java)
Achar caracteres em um texto não é difícil, o Java possuí métodos da classe string que auxiliam a criação, modificação e verificação de variáveis de texto, com isso em mente utilizei os métodos ` .indexOf(), .toLowerCase()` para tratar a string digitada pelo usuário e transforma-la em um caractere único podendo realizar a comparação corretamente, essa string é passada para o método `indexOf` que busca no texto de input os elementos e passa sua posição para a variável `i`, em cada passada pelo loop for o código adiciona o caractere encontrado através de respectivo índice encontrado pelo método, ao fim é retornado o array com os caracteres encontrados.

## Desafio 3
Observe o trecho de código abaixo: int INDICE = 12, SOMA = 0, K = 1; enquanto K < INDICE faça { K = K + 1; SOMA = SOMA + K; } imprimir(SOMA);
####  [Resolução:](https://github.com/ddmazv/DesafiosTargetSistemas/blob/main/com.targetsistemas/src/desafios/valorsoma/SomaValue.java)
Realizando um simples teste de mesa pode-se concluir que após 12 loops, a variável soma termina com o valor 77, a classe ` SomaValue ` realiza o calculo e mostra o valor da variável em cada loop.
## Desafio 4
4) Descubra a lógica e complete o próximo elemento:

a) 1, 3, 5, 7,__

b) 2, 4, 8, 16, 32, 64,__

c) 0, 1, 4, 9, 16, 25, 36,__

d) 4, 16, 36, 64,__

e) 1, 1, 2, 3, 5, 8,__

f) 2,10, 12, 16, 17, 18, 19,__
### Resolução:
a) 1, 3, 5, 7, `9` (Sequência de elementos impares)

b) 2, 4, 8, 16, 32, 64, `128` (Soma dos mesmos números do elemento para formar o próximo)

c) 0, 1, 4, 9, 16, 25, 36, `49` (Raiz dos elementos ao quadrado)

d) 4, 16, 36, 64, `100` (Raiz dos elementos pares ao quadrado)

e) 1, 1, 2, 3, 5, 8, `200` (Números que começam com a letra D)

## Desafio 5
Você está em uma sala com três interruptores, cada um conectado a uma lâmpada em salas diferentes. Você não pode ver as lâmpadas da sala em que está, mas pode ligar e desligar os interruptores quantas vezes quiser. Seu objetivo é descobrir qual interruptor controla qual lâmpada. Como você faria para descobrir, usando apenas duas idas até uma das salas das lâmpadas, qual interruptor controla cada lâmpada?

### Resolução
entendendo que eu só tenho duas idas a uma das salas das lâmpadas e quero saber qual interruptor a liga:
```
eu aciono dois interruptores de uma vez, e vou verificar se a lâmpada está acesa, 
se nenhum dos que acionei ligou a lâmpada seria o único interruptor que eu não havia
ativado, caso um deles ligue a lâmpada, eu voltaria, desativava um dos dois, e voltava para
verificar, caso a lâmpada estivesse ligada seria o que deixei ativado, caso não seria o que desativei.
```
Entendendo que há 3 salas cada um com uma lâmpada e eu tenho 2 idas: 

```
na primeira ida eu aciono o interruptor 1 deixo uns 15 minutos ligados, desligo o 1, ligo
o interruptor 2 e 3 e desligo o 2 rapidamente, vou até a primeira sala e verifico

caso a lâmpada esteja ligada:
sei que é o interruptor 3, o único que deixei ligado.
caso a lâmpada esteja desligada:
verifico sua temperatura, se estiver quente é o interruptor 1 pois ficou mais
tempo acionado, se estiver fria é o 2 curto tempo.

volto e com o resultado espero todas as lampas esfriarem, sabendo qual interruptor liga a
primeira sala, aplico esse método para a segunda com os dois interruptores restantes, e
concluindo o resultado da primeira e da segunda, por eliminação chegamos a terceira.
```
