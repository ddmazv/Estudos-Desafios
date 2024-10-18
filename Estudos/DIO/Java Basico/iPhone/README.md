# Implementação de classes basicas em java a partir de um projeto UML 


```mermaid
classDiagram
    main --* iPhone
    main: +main()
    iPhone "1" --* "1"ReprodutorMusical
    iPhone "1" --* "1" AparelhoTelefonico
    iPhone "1" --* "1" NavegadorInternet
    iPhone : -int bateria
    iPhone: +carregar()

    class ReprodutorMusical{
      +String musicaAtual
      +boolean tocando
      +tocar()
      +pausar()
      +selecionarMusica(String musica)
      +proximaMusica()
      +voltarMusica()
    }
    class AparelhoTelefonico{
      -String  numeroUltimaChamada
      +ligar(String numero)
      +atender()
      +recusar()
      +desligarChamada()
      +iniciarCorreioVoz()
    }
    class NavegadorInternet{
      -String ultimaPagina
      +exibirPagina(String url)
      +adicionarNovaAba()
      +atualizarPagina()
    }
```