/*
Ao carregar a página, o JavaScript deve:

Validar se o palpite é um número válido entre 1 e 100.

Comparar o palpite com o número secreto e exibir uma mensagem:

"Você acertou!" (e o jogo termina).

"O número secreto é maior" (e o jogador continua tentando).

"O número secreto é menor" (e o jogador continua tentando).

Decrementar o contador de tentativas.

Exibir o número de tentativas restantes.

Se o jogador atingir o número máximo de tentativas, o jogo termina com a mensagem "Você perdeu! O número secreto era X".
*/


/*Variáveis*/ 
let numeroSecreto = ((Math.random()*100)+1).toFixed(0);
let tentativasMaximas = 10;
let tentativasRestantes = tentativasMaximas;

let palpiteInput = parseInt(document.getElementById("guess").value);
let botaoChutar = document.getElementById("guessButton");


/*Funções*/
botaoChutar.addEventListener("click", function () {
    let palpite = palpiteInput;  // pega o que o usuário digitou
    console.log(`O seu palpite é ${palpite}`);

});

palpiteInput.addEventListener("keyup", function (evento) {
    if (evento.key === "Enter") {
        botaoChutar.click();
    }
});