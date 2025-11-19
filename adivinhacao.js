/*Variáveis*/ 
let numeroSecreto = ((Math.random()*100)+1).toFixed(0);
let tentativasMaximas = 10;
let tentativasRestantes = tentativasMaximas;

let palpiteInput = document.getElementById("guess");
let botaoChutar = document.getElementById("guessButton");
let messageBox = document.getElementById("message");


/*Funções*/
function adicionarMensagem(texto) {
    messageBox.innerHTML += texto + "<br>";
}

palpiteInput.addEventListener("keyup", function (evento) {
    if (evento.key === "Enter") {
        botaoChutar.click();
    }
});

botaoChutar.addEventListener("click", function () {
    let palpite = parseInt(palpiteInput.value);
    console.log(`O seu palpite é ${palpite}`);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        alert("Por favor, insira um número inteiro válido entre 1 e 100.");
        return;
    }

    switch (true) {
        case palpite === parseInt(numeroSecreto):
            adicionarMensagem("Você acertou!");
            botaoChutar.disabled = true;
            break;
        case palpite < parseInt(numeroSecreto):
            tentativasRestantes--;
            adicionarMensagem(`O número secreto é maior. Tentativas restantes: ${tentativasRestantes}`);
            break;
        case palpite > parseInt(numeroSecreto):
            tentativasRestantes--;
            adicionarMensagem(`O número secreto é menor. Tentativas restantes: ${tentativasRestantes}`);
            break;
        default:
            alert("Erro inesperado.");
            break;
    }

    if (tentativasRestantes === 0) {
        alert(`Suas chances acabaram =( O número secreto era ${numeroSecreto}.`);
        botaoChutar.disabled = true;
    }

    palpiteInput.value = "";
    palpiteInput.focus();
});