// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");
    var msgConversao = document.getElementById("msgConversao");

    if (email != null && nome != null) {
        if (b_usuario != null) {
            b_usuario.innerHTML = nome;
        }

        // conversão do ID do usuário para binário
        let decimal = sessionStorage.ID_USUARIO;

        if (decimal != undefined && msgConversao != null) {
            decimal = Number(decimal);
            let binario = decimal.toString(2);
            msgConversao.innerHTML = `${binario}`;
        }

    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

