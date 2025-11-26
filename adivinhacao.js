/*Variáveis*/
let numeroSecreto = (Math.random() * 100 + 1).toFixed(0);
let tentativasMaximas = 10;
let tentativasRestantes = tentativasMaximas;

let palpiteInput = document.getElementById("guess");
let botaoChutar = document.getElementById("guessButton");
let messageBox = document.getElementById("message");

/*Funções*/
function adicionarMensagem(texto) {
  messageBox.innerHTML += texto + "<br>";
}

document.addEventListener("keyup", function (evento) {
  if (evento.key === "Enter") {
    botaoChutar.click();
  }
});

//Função principal onde todo o jogo acontece//
function chutar() {
  while (tentativasRestantes > 0) {
    let palpite = parseInt(palpiteInput.value);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
      adicionarMensagem("Por favor, insira um número inteiro válido entre 1 e 100.");
      break;
    }

    switch (true) {
      case palpite === parseInt(numeroSecreto):
        adicionarMensagem(`Você acertou! O número secreto era ${palpite}`);
        fimDoJogo();
        break;

      case palpite < parseInt(numeroSecreto):
        tentativasRestantes--;
        adicionarMensagem(`O número secreto é maior que ${palpite}. Tentativas restantes: ${tentativasRestantes}`);
        break;

      case palpite > parseInt(numeroSecreto):
        tentativasRestantes--;
        adicionarMensagem(`O número secreto é menor que ${palpite}. Tentativas restantes: ${tentativasRestantes}`);
        break;
    }

    break;
  }

  if (tentativasRestantes === 0) {
    adicionarMensagem(`Suas chances acabaram =( O número secreto era ${numeroSecreto}.`);
    fimDoJogo();
  }

  palpiteInput.value = "";
  palpiteInput.focus();
};


//Função para finalizar o jogo//
function fimDoJogo() {
  botaoChutar.disabled = false;
  palpiteInput.disabled = true;

  botaoChutar.textContent = "Recomeçar";

  // remove o evento do jogo
  botaoChutar.removeEventListener("click", chutar);

  // adiciona o evento de reiniciar
  botaoChutar.addEventListener("click", reiniciarJogo);
}

//Função para reiniciar o jogo//
function reiniciarJogo() {
  numeroSecreto = ((Math.random() * 100) + 1).toFixed(0);
  tentativasRestantes = tentativasMaximas;

  messageBox.innerHTML = ""; // limpa mensagens
  palpiteInput.value = "";
  palpiteInput.disabled = false;
  botaoChutar.disabled = false;

  // volta o texto e o comportamento original
  botaoChutar.textContent = "Chutar";
  
  // remove o evento antigo "Recomeçar"
  botaoChutar.removeEventListener("click", reiniciarJogo);

  // recoloca o evento original (chutar)
  botaoChutar.addEventListener("click", chutar);
  
  palpiteInput.focus();
}

botaoChutar.addEventListener("click", chutar);

/*Próximos passos:*/
/*Escrever no início que tem 10 tentativas*/
/*Colocar a quantidade de tentativas em um quadro separado ao invés de junto com a dica*/
/*Criar CSS*/
/*Criar modo difícil (em nova branch):
    - Diminuir número de tentativas para 5
    - Aumentar o range de números para 1-200
    - Deixar apenas a dica mais recente visível
*/
