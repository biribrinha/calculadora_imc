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


//passo 6 - listar

function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = ` <tr class="linha-mensagem"> <td colspan="6">Nenhum usuário cadastrado!</td> </tr> `
    } else {

        montarTabela(listaUsuarios);
    }
}


window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

// Passo 7 - Montar a tabela

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    listaDeCadastrados.forEach(pessoa => {

        template +=
            ` <tr>
            <td data-cell="nome">${pessoa.nome}</td>
            <td data-cell="altura">${pessoa.altura}</td>
            <td data-cell="peso">${pessoa.peso}</td>
            <td data-cell="valor do IMC">${pessoa.imc}</td>
            <td data-cell="classificação do IMC">${pessoa.classificacao}</td>
            <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
        </tr> `

    });

    tabela.innerHTML = template;
}

// passo 8 - Limpar local storage

function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")
    window.location.reload();
}