# NttMovies

Projeto desenvolvido com [Angular CLI](https://github.com/angular/angular-cli), versão 17.3.0
O layout foi pensado apenas para organizar a aplicação e é bastante básico e genérico. Foi elaborado com auxílio do ChatGPT (os html) e estilizado com Bootstrap versão 4.3.1 (implementado via CDN no index.html, então não é necessário instalar nenhuma biblioteca).

O objetivo deste projeto compreender um pouco o funcionamento e alguns conceitos básicos do Angular. Consegui entender como funciona a componentização dos elementos, como fazer o uso de rotas (fixas e dinâmicas), como trabalhar com componentes "standalone" vs. modularizado e mais diversas características do framework. 

## Como executar

Clone o projeto e rode `ng serve` ou `npm start` para executar o projeto em modo desenvolvimento. Acesse `http://localhost:4200/`.
Além disso, este projeto está com deploy dispónivel em `https://ntt-movies-roan.vercel.app/`.

## Observações

- Eu nunca havia trabalhado com Angular mas tive uma experiência prévia com React, então embora eu não tenha conseguido entender totalmente os ciclos de vida dos componentes do Angular, acho que o conceito é um tanto parecido. De qualquer modo, acho que uma das dificuldades que estou tendo com uma funcionalidade da aplicação (fazer o favoritos funcionar com o localstorage) tem a ver com isso;
- Foram apenas 5 dias estudando o framework, então apesar de eu não ter conseguido fazer tudo o que gostaria (simplesmente porque não sei como mesmo) fiquei satisfeito com o que vou conseguir entregar no prazo final;
- Embora eu tenha trabalhado com assincronia em React, não consegui entender aqui o uso dos Observables e/ou Subscriptions (que, pelo que compreendi até o momento, são os modos que o Angular trata as requisições assíncronas.) Não sei se é possível usar o async/await ou then no Angular, mas é algo que tenho que explorar um pouco mais.


