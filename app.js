let listaNumerosSorteados = [];
let numeroMaximo = 4;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

textoMensagemInicial();

function textoMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}.`);
}

function verificarChute() {
    let numeroChute = document.querySelector('input').value;
    tentativas++;
    if (numeroChute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemAposAcertar = `Parabéns, você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;

        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemAposAcertar);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let mensagemTotalTentativas = `\nTentativas: ${tentativas}`
        if (numeroSecreto < numeroChute) {
            exibirTextoNaTela('p', 'O número secreto é MENOR.' + mensagemTotalTentativas);
        } else {
            exibirTextoNaTela('p', 'O número secreto é MAIOR.' + mensagemTotalTentativas);
        }
        limparCampo();
    }
}

function exibirTextoNaTela(tag, texto) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosSorteados = listaNumerosSorteados.length;

    if (quantidadeElementosSorteados == numeroMaximo) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroGerado)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroGerado);
        console.log(listaNumerosSorteados);
        return numeroGerado;
    }
}

function limparCampo() {
    numeroChute = document.querySelector('input');
    numeroChute.value = '';
}

function reiniciarJogo() {
    textoMensagemInicial();
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}