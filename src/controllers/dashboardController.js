var usuarioModel = require("../models/usuarioModel");
var dashboardModel = require("../models/dashboardModel");

function registrarAcesso(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        dashboardModel.registrarAcesso(idUsuario)
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
    dashboardModel.buscarAcessosGrafico().then(function (resultado) {
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

    dashboardModel.buscarAcessosHoje()
        .then(function (resultadoAcessos) {
            if (resultadoAcessos.length > 0 && resultadoAcessos[0].totalAcessos !== undefined) {
                kpis.acessos = resultadoAcessos[0].totalAcessos;
            }
            return dashboardModel.buscarMediaTreino();
        })
        .then(function (resultadoTreino) {
            if (resultadoTreino.length > 0 && resultadoTreino[0].mediaTreino != null) {
                kpis.treino = resultadoTreino[0].mediaTreino;
            }
            return dashboardModel.buscarTecnicaFavorita(idUsuario);
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
        dashboardModel.buscarTecnicas(idUsuario)
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
    registrarAcesso,
    buscarAcessos,
    buscarKpis,
    buscarTecnicas
}

    
