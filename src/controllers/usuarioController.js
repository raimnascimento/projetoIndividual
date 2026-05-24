var usuarioModel = require("../models/usuarioModel");
var diarioModel = require("../models/diarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var erro = false;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);

                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
                    });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var contatoArte = req.body.contatoArteServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (contatoArte == undefined) {
        res.status(400).send("Seu contato com a arte está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha, contatoArte)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function registrarAcesso(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.registrarAcesso(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o registro de acesso! Erro: ",
                    erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarAcessos(req, res) {
    usuarioModel.buscarAcessosGrafico().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    }); 
}

function buscarKpis(req, res) {
    var idUsuario = req.params.idUsuario;
    var kpis = { acessos: 0, treino: 0, tecnica: 'Nenhuma' };

    usuarioModel.buscarAcessosHoje()
        .then(function (resultadoAcessos) {
            if (resultadoAcessos.length > 0 && resultadoAcessos[0].totalAcessos !== undefined) {
                kpis.acessos = resultadoAcessos[0].totalAcessos;
            }
            return usuarioModel.buscarMediaTreino();
        })
        .then(function (resultadoTreino) {
            if (resultadoTreino.length > 0 && resultadoTreino[0].mediaTreino != null) {
                kpis.treino = resultadoTreino[0].mediaTreino;
            }
            return usuarioModel.buscarTecnicaFavorita(idUsuario);
        })
        .then(function (resultadoTecnica) {
            if (resultadoTecnica.length > 0 && resultadoTecnica[0].tecnica != null) {
                kpis.tecnica = resultadoTecnica[0].tecnica;
            }
            res.status(200).json(kpis);
        })
        .catch(function (erro) {
            console.log("Erro no Controller das KPIs:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarTecnicas(req, res) {
    var idUsuario = req.params.idUsuario; 

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined no controller!");
    } else {
        usuarioModel.buscarTecnicas(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }); 
    }
}

module.exports = {
    autenticar,
    cadastrar,
    registrarAcesso,
    buscarAcessos,
    buscarKpis,
    buscarTecnicas
}

    
