/*Variáveis*/
let numeroSecreto = (Math.random() * 100 + 1).toFixed(0);
let tentativasMaximas = 10;
let tentativasRestantes = tentativasMaximas;
document.getElementById("tentativasNumero").textContent = tentativasRestantes;

let palpiteInput = document.getElementById("guess");
let botaoChutar = document.getElementById("guessButton");
let messageBox = document.getElementById("message");

/*Funções*/
function adicionarMensagem(texto, classe = "") {
  // cria o parágrafo da mensagem
  const p = document.createElement("p");
  p.textContent = texto;

  // se passou uma classe, aplica só nesse parágrafo
  if (classe) {
    p.classList.add(classe);
  }

  // adiciona ao container de mensagens
  messageBox.appendChild(p);

  // rolar para o final se as mensagens ocuparem área com overflow
  messageBox.scrollTop = messageBox.scrollHeight;
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
      adicionarMensagem(
        "Por favor, insira um número inteiro válido entre 1 e 100."
      );
      break;
    }

    switch (true) {
      case palpite === parseInt(numeroSecreto):
        adicionarMensagem(
          `Você acertou! O número secreto era ${palpite}`,
          "mensagem-sucesso"
        );
        fimDoJogo();
        break;

      case palpite < parseInt(numeroSecreto):
        tentativasRestantes--;
        adicionarMensagem(`O número secreto é maior que ${palpite}.`);
        document.getElementById("tentativasNumero").textContent =
          tentativasRestantes;
        break;

      case palpite > parseInt(numeroSecreto):
        tentativasRestantes--;
        adicionarMensagem(`O número secreto é menor que ${palpite}.`);
        document.getElementById("tentativasNumero").textContent =
          tentativasRestantes;
        break;
    }

    break;
  }

  if (tentativasRestantes === 0) {
    adicionarMensagem(
      `Suas chances acabaram =( O número secreto era ${numeroSecreto}.`
    );
    fimDoJogo();
  }

  palpiteInput.value = "";
  palpiteInput.focus();
}

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
  numeroSecreto = (Math.random() * 100 + 1).toFixed(0);
  tentativasRestantes = tentativasMaximas;
  tentativasNumero.textContent = tentativasRestantes;

  messageBox.innerHTML = ""; // limpa mensagens
  palpiteInput.value = "";
  palpiteInput.disabled = false;
  botaoChutar.disabled = false;
  while (messageBox.firstChild) {
    messageBox.removeChild(messageBox.firstChild);
  }

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
/*Criar modo difícil (em nova branch):
    - Diminuir número de tentativas para 7
    - Aumentar o range de números para 1-200
    - Deixar apenas a dica mais recente visível
*/
