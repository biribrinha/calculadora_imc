// algoritmo

// CALCULAR IMC

// 1. Pegar os valores
// 2. Calcular o IMC
// 3. Gerar classficação de IMC
// 4. Organizar as informações
// 5. Salvar os dados na lista
// 6. Ler a lista com os dados
// 7. Renderizar o conteudo do html
// 8. Botão de limpar os registros


// função principal, o html só chama essa função
function calculaImc(event) {
    event.preventDefault()

    console.log("funciono!!!!!!!!!!!!");



    let dadosUsuario = pegarValores();


    let imc = calcular(dadosUsuario.altura, dadosUsuario.peso);

    let classificacaoImc = classificarImc(imc);

    let usuarioAtualizado = organizarDados(dadosUsuario, imc, classificacaoImc);

    cadastrarUsuario(usuarioAtualizado);

}


//passo 1 - pegar valor

function pegarValores() {

    let nomeRecebido = document.getElementById("nome").value.trim()
    // trim corta o espaço vazio no começo e final do valor

    let alturaRecebido = parseFloat(document.getElementById("altura").value)

    let pesoRecebido = parseFloat(document.getElementById("peso").value)

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebido,
        peso: pesoRecebido
    }


    console.log(dadosUsuario);

    return dadosUsuario;

}

//passo 1 - calcular

function calcular(altura, peso) {


    let imc = peso / (altura * altura)

    console.log(imc);

    return imc;

}


//passo 3 - classificar

function classificarImc(imc) {

    if (imc < 18.5) {

        return "FILEZINHO (abaixo do peso)"


    } else if (imc < 25) {

        return "Diliça"


    } else if (imc < 30) {

        return "ta top!"

    } else {

        return "oh la em casa!!!"

    }

}


// Passo 4 - Organizar as informações

function organizarDados(dadosUsuario, valorImc, classificarImc) {

    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now()) //Intl é uma biblioteca utilizada pra formatação geral de dados que são coletados no sistema, DateTimeFormat() é uma função que foi chamada especificando que é uma data para ser formatada


    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacao: classificarImc,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;

}


// Parte 5 - Salvar os dados na lista

function cadastrarUsuario(usuario) {

    let listaUsuarios = [];

    // if (localStorage.getItem("usuariosCadastrados") == true) {
        // quando nao tem comparacao, ele identifica como == true
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }


    //pegando o usuario e passando pra lista
    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

    // setItem altera o localStorage
}


//passo 8 - listar